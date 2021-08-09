# Union Booth

This project is a combination of Live Questions, FAQ and Support Resources repository functionality meant to be a helper tool for educators doing Online Delivery.

Planned functionality is having unique cohort spaces, timed unlock for lessons, live questions supported by sockets, admin space to monitor and moderate the questions, persistent FAQ and Additional Lesson Resources.

Current functionality:

- register for an account
- support for account roles
- adding programs, cohorts and topics
- managing live topics
- managing users and team member roles
- posting questions
- replying to the questions
- question and replies management (edit/delete) by posters and moderators
- moderating a question as being currently answered or answered by a moderator
- converting cohort questions to persistent FAQs.

## Project structure

- `/register` - Register a new user (with support for moderator or admin roles)
- `/login` - Logs in a user
- `/` - Landing page with Register/Login links for anonymous user, live questions for active lecture for signed in user (ask a question, add an answer, mark question as being answered by the moderator)
- `/topics` - All unlocked topics for a program
- `/topics/:topicSlug/faqs` - FAQs for a topic
- `/topics/:topicSlug/resources` - Resources for a topic
- `/admin` - Admin Section
- `/admin/programs` - Managing programs
- `/admin/cohorts` - Managing cohorts
- `/admin/topics` - Managing topics
- `/admin/active-cohort` - Managing active cohort's unlocked and active topics
- `/admin/faqs` - List of active program topics for topic FAQs
- `/admin/faqs/:topicSlug` - Managing topic FAQs (publishing live questions, adding new QA, edit/deactivate existing QAs)
- `/admin/resources` - List of active program topics for topic resources
- `/admin/resources/:topicSlug` - Managing topic resources (adding/editing/deactivating resources)
- `/admin/users` - Managing users and team members

## Environment Variables

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

## Running the project

Once you have cloned the project, install [Redis](https://redis.io/topics/quickstart), create the PostgreSQL DB (defined in .env file), install dependencies and run the project in development mode:

```bash
cd union-booth
npm install
npm run dev
```

This will start the development server on [localhost:3000](http://localhost:3000). Open it and click around.

GraphQL Playground is available at [http://localhost:3000/graphql](http://localhost:3000/graphql).

## Project tech stack

- Svelte
- Sapper
- Apollo GraphQL (Server, Client, Subscriptions)
- PostgreSQL
- Redis
- Sequelize
- Markdown

## Deployment

Currently the app is configured to be deployed on Qovery. Make sure you [install Qovery CLI](https://docs.qovery.com/docs/using-qovery/interface/cli/) for deployment tasks.

First, fork or clone the `union-booth` repo to your own GitHub account.

- Create [Qovery Account](https://start.qovery.com/)
- Create a new project (ie: union-booth)
- Create a new environment (ie: production)
- Create a new application (ie: union-booth for *App name*, then select the union-booth repo from your GitHub, enter the branch name (ie: main), keep *Root application* path as `/`).

On application page, click on *Settings*. Make sure to click **Save** for every tab change.

- In **General** tab, change *Build mode* to "Dockerfile", keep *Dockerfile path* as `Dockefile`
- In **Resources** tab, change *vCPU* to `1` and *RAM* to `512`.
- In **Storage** tab, click **+ Add**, change *Mount point* to `/mnt/static` and size to `10` GB
- In **Port** tab, add `8080` as a port and in *Advanced settings* under meatball menu ensure the *Publicly* setting is checked

Go back to environment page (ie: production), click **+ Add** and then *Database* (twice):

- Enter `union-booth-postgres` as a name, `POSTGRESQL` as a *Type*, `12` as a *Version*
- Enter `union-booth-redis` as a name, `REDIS` as a *Type*, `6` as a *Version*

On an environment page, click on each database and under **Actions** select *Deploy*. You might need to deploy it one at a time. You might also get some deploy errors (Redis in particular), but try the full deploy process described below anyway.

Go back to application page, click **+ Add**, then *Database* and then select both `Union-Booth-Redis` and `Union-Booth-Postgres` databases you have added. It might take a while for DB to appear in the list or try refreshing the environment and application pages.

On an application page go into *Environment Variables* tab and under *Secret variables* and *Environment Variables*, in a meatball menu, *Create alias* for following keys:

- `QOVERY_REDIS_*********_HOST` to `PROD_REDIS_HOST`
- `QOVERY_REDIS_*********_PORT` to `PROD_REDIS_PORT`
- `QOVERY_REDIS_*********_DEFAULT_DATABASE_NAME` to `PROD_REDIS_DATABASE`
- `QOVERY_REDIS_*********_PASSWORD` to `PROD_REDIS_PASSWORD`
- `QOVERY_POSTGRESQL_*********_DEFAULT_DATABASE_NAME` to `PROD_POSTGRES_DATABASE`
- `QOVERY_POSTGRESQL_*********_LOGIN` to `PROD_POSTGRES_USER`
- `QOVERY_POSTGRESQL_*********_PASSWORD` to `PROD_POSTGRES_PASSWORD`
- `QOVERY_POSTGRESQL_*********_HOST` to `PROD_POSTGRES_HOST`
- `QOVERY_POSTGRESQL_*********_PORT` to `PROD_POSTGRES_PORT`

Before deploying set environment variables required for the app:

- Add `SESSION_SECRET`. You can use result of running `node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"` in your Terminal as a value.
- Add `ENV_TYPE` with a value of `qovery`.

You can now deploy the app (from application page).

After deploying, check the URL generated for your app (On application page, you can go to *Actions*, then *Open*) and add these environment variables:

- Add `SERVER_URL` with a URL value, ie: `z565df859-gtw.qovery.io`, make sure to not include the "https://" and trailing slash.
- Add `PORT` with a value of `8080` to allow for public access to the app.

Restart your app from *Actions* dropdown of the application page.

To view the deployment log go on an environment page, and select **Show Logs**.

Once your application is deployed to view the application logs you can use `qovery log` command in the Terminal.

### Deploying to custom production environment

For deploying to a non Qovery environment, do a global search for `// Custom production config` in the project and update the values accordingly to your server and environment configuration.