## Tasks

- Add a nice tooltip to "Posted by" avatar in Live Question component
- Rename "live" query to "liveTopic"
- Update Answer to use GraphQL
  - Connect UI for fetching answers
  - Connect UI for adding answers
  - Create subscription for Answer
- Update PubSub to a production library (https://www.apollographql.com/docs/apollo-server/data/subscriptions/#production-pubsub-libraries)
- Create remove a question functionality
- Add an FAQ model/schema tied to the topic
- Add UI for changing live questions to FAQ
- Update individual topic page with FAQ questions
- Add Markdown editor to question and answer textareas
- Investigate slow loading of queries or ORM
- Look for queries that can be updated to use DataLoader
- Set admin forms to disabled while it's sending query
- Refactor user cohort queries to be cached
- Add user admin UI
  - Add generate new avatar functionality for user
- When user is deleted, invalidate their session
- Add a program/cohort admin privileges for other roles
- Update site color scheme
- Add admin remove functionality for programs, cohorts and topics
- Do error catching and reporting for program and cohort add
- Add text-to-speech question posting
- Write automated tests

## Ongoing

- Refactor relative paths to absolute paths
- Clean up Sapper backend files
- Add cascading functionality to all managed tables
- Authenticate WebSocket requests
- Error handling
- Auth handling
- Add preloaders 
