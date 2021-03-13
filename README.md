# Union Booth

This project is a combination of Live Questions, FAQ and Support Resources repository functionality meant to be a helper tool for educators doing Online Delivery.

Planned functionality is having unique cohort spaces, timed unlock for lessons, live questions supported by sockets, admin space to monitor and moderate the questions, persistent FAQ and Additional Lesson Resources.

Current functionality is being able to register for an account, support for account roles, adding programs, cohorts and topics, managing live topics, posting questions, replying to the questions and moderating a question as being currently answered.

## Project structure

- `/register` - Register a new student or educator
- `/login` - Logs in a student or educator
- `/` - Register/Login links for anonymous user, Live questions for current lecture for signed in user (ask a question, add an answer, mark question as being answered by the moderator)
- `/topics` - All Topics in a list
- `/topics/:topicId` - All Questions for a topic
- `/admin` - Admin Section
- `/admin/programs` - Managing programs
- `/admin/cohorts` - Managing cohorts
- `/admin/topics` - Managing topics

### Environment Variables

```
.env

SERVER_URL
SESSION_SECRET
DATABASE
DATABASE_USER
DATABASE_PASSWORD
```

Check `.env.example` for an example of `.env` file.

### Running the project

Once you have cloned the project, create the PostgreSQL DB (defined in .env file), install dependencies and run the project in development mode:

```bash
cd union-booth
npm install
npm run dev
```

This will start the development server on [localhost:3000](http://localhost:3000). Open it and click around.

GraphQL Playground is available at [http://localhost:3000/graphql](http://localhost:3000/graphql).

### Project tech stack

- Svelte
- Sapper
- Apollo GraphQL (Server, Client, Subscriptions)
- PostgreSQL
- Sequelize
- Markdown

### Deployment

Currently the app is configured to be deployed on Heroku. Make sure you [install Heroku CLI](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up) for deployment tasks.

After cloning the repo, create a new app with `heroku create` and then you can deploy it by running `heroku push heroku main`.

If for whatever reason, your Heroku remote isn't available you can always add a new one with this command:

```
heroku git:remote -a heroku-appname-12345
```

In the Heroku settings for your deployed app, make following changes:

- Under *Resources > Add-ons* add **Heroku Postgres**
- Under *Settings > Buildpacks* add a Buildpack for **heroku/nodejs**.
- Under *Settings > Config Vars* add following Config Vars:
  - `SERVER_URL` - this should be the app host, ie: **heroku-appname-12345.herokuapp.com**
  - `SESSION_SECRET` - randomly generated hash
    - Can generate it by running `node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"`
  - Confirm that `DATABASE_URL` config var is present

For any troubleshooting, you can check the logs, or SSH into your Dyno.

*Logging*

```
heroku logs --tail
```

*SSH Tunnelling*

```
heroku ps:exec
```