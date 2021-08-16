import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import generateAvatar from 'utils/generateAvatar';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isInactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  User.beforeCreate(async user => {
    user.password = await user.generatePasswordHash();
  });

  User.afterCreate(user => {
    generateAvatar(user.id);
  });

  User.findByLogin = async login => {
    let user = await User.findOne({
      where: {
        username: login,
        isInactive: false
      },
    });

    if (!user) {
      user = await User.findOne({
        where: {
          email: login,
          isInactive: false
        },
      });
    }

    return user;
  };

  User.prototype.generatePasswordHash = async function() {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds);
  };

  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
}

export default user;