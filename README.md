# Union Booth

This project is a combination of Live Questions, FAQ and Support Resources repository functionality meant to be a helper tool for educators doing Online Delivery.

Planned functionality is having unique cohort spaces, timed unlock for lessons, live questions supported by sockets, admin space to monitor and moderate the questions, persistent FAQ and Additional Lesson Resources.

Current functionality:

- register for an account
- support for account roles
- adding programs, cohorts and topics
- managing live topics
- posting questions
- replying to the questions
- moderating a question as being currently answered or answered by an educator
- converting cohort questions to persistent FAQs.

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
- `/admin/faqs` - Managing FAQs
- `/admin/faqs/:faqId` - Managing a Topic FAQ

### Environment Variables

```
.env

SERVER_URL
SESSION_SECRET
DATABASE
DATABASE_USER
DATABASE_PASSWORD
REDIS_DOMAIN_NAME
REDIS_PORT_NUMBER
```

Check `.env.example` for an example of `.env` file.

### Running the project

Once you have cloned the project, install [Redis](https://redis.io/topics/quickstart), create the PostgreSQL DB (defined in .env file), install dependencies and run the project in development mode:

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
- Redis
- Sequelize
- Markdown

### Deployment

Currently the app is configured to be deployed on Qovery. Make sure you [install Qovery CLI](https://docs.qovery.com/docs/using-qovery/interface/cli/) for deployment tasks.

First, fork or clone the `union-booth` repo to your own GitHub account.

Create [Qovery Account](https://console.qovery.com/login) and then create a new project and a new application.

Choose to deploy an existing application with "I have an application".

Connect to GitHub and select the `union-booth` repo you cloned.

Select **Nodejs** for your type of application and give an app a name.

On *Select services...* screen select **postgresql** and **Storage**.

For PostgreSQL you can select version 11 and give a name to your DB (ie: union-booth).

For Storage enter **static** for a disk name and choose **ssd** for storage type. You can keep the default mount point and size of the disk.

Before deploying set environment variables required for the app (on your local):

```
qovery environment env add SERVER_URL '$QOVERY_ROUTER_MAIN_UNION_BOOTH_HOST'
qovery environment env add SESSION_SECRET $YOUR_SESSION_SECRET (#Run `node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"` to generate)
```

You can now deploy the app.

To view the deployment log go into *Projects* page on Qovery Dashboard, click on **main** environment and then select *Deployment Logs*.

Once your application is deployed to view the application logs you can use `qovery log` command.