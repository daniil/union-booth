# Union Booth

This project is a combination of Live Questions, FAQ and Support Resources repository functionality meant to be a helper tool for educators doing Online Delivery.

Planned functionality is having unique cohort spaces, timed unlock for lessons, live questions supported by sockets, admin space to monitor and moderate the questions, persistent FAQ and Additional Lesson Resources.

Current functionality is being able to register for an account, support for account roles, adding new topic, managing live topics, posting questions, replying to the questions and moderating a question as being currently answered.

## Project structure

- `/register` - Register a new student or educator
- `/login` - Logs in a student or educator
- `/` - Register/Login links for anonymous user, Live questions for current lecture for signed in user (ask a question, add an answer, mark question as being answered by the moderator)
- `/topics` - All Topics in a list
- `/topics/:topicId` - All Questions for a topic
- `/admin` - Admin Section (add new topic, manage existing topics)

### Environment Variables

```
.env

SERVER_URL
SESSION_SECRET
DATABASE
DATABASE_USER
DATABASE_PASSWORD
```

### Running the project

Once you have cloned the project, install dependencies and run the project in development mode:

```bash
cd union-booth
npm install
npm run dev
```

This will start the development server on [localhost:3000](http://localhost:3000). Open it and click around.

### Project tech stack

- Svelte
- Sapper
- Apollo GraphQL (Full-Stack)
- PostgreSQL
- Sequelize