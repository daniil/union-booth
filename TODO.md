## Tasks

- Update avatar storage to use S3
- Style Register and Login pages
- Update Answer to use GraphQL
  - Add "Mark Answering" functionality
  - Add "Stop Answering" functionality
  - Add "Being Answered By" functionality
  - Add "Answered by" functionality
- Update PubSub to a production library (https://www.apollographql.com/docs/apollo-server/data/subscriptions/#production-pubsub-libraries)
- Create remove a question functionality
- Add an FAQ model/schema tied to the topic
- Add UI for changing live questions to FAQ
- Add UI for adding FAQ questions from scratch
- Update individual topic page with FAQ questions
- Add a Resources model/schema tied to the topic
- Add UI for managing resources
- Update individual topic page with Resources
- Look for queries that can be updated to use DataLoader
- Investigate the error that comes up after switching topics and getting "can not post to topic GraphQL error"
- Set admin forms to disabled while it's sending query
- Factor out common validations out of the resolvers
- Refactor user cohort queries to be cached
- Add user admin UI
  - Add generate new avatar functionality for user
- Add a program/cohort admin privileges for other roles
- Update site color scheme
- Add admin remove functionality for programs, cohorts and topics
- Do error catching and reporting for program and cohort add
- Add speech-to-text question posting
- Write automated tests

## Tweaks

- Add a back button on individual topic page back to list of topics
- Update Answers to be expandable
- Update Button component to have different types
- Add a nice tooltip to "Posted by" avatar in Live Question component
- Add Markdown editor to question and answer textareas
- When user is deleted, invalidate their session

## Ongoing

- Refactor relative paths to absolute paths
- Clean up Sapper backend files
- Add cascading functionality to all managed tables
- Authenticate WebSocket requests
- Error handling (Add global error state and UI to replace all console.logs)
- Auth handling
- Add preloaders 