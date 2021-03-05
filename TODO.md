## Tasks

- Style Register and Login pages
- Update Answer to use GraphQL
  - Add "Mark Answering" functionality
  - Add "Being Answered By" functionality
  - Add "Answered by" functionality
- Update PubSub to a production library (https://www.apollographql.com/docs/apollo-server/data/subscriptions/#production-pubsub-libraries)
- Create remove a question functionality
- Add an FAQ model/schema tied to the topic
- Add UI for changing live questions to FAQ
- Update individual topic page with FAQ questions
- Add a Resources model/schema tied to the topic
- Add UI for managing resources
- Update individual topic page with Resources
- Investigate slow loading of queries or ORM
- Look for queries that can be updated to use DataLoader
- Set admin forms to disabled while it's sending query
- Refactor user cohort queries to be cached
- Add user admin UI
  - Add generate new avatar functionality for user
- Add a program/cohort admin privileges for other roles
- Update site color scheme
- Add admin remove functionality for programs, cohorts and topics
- Do error catching and reporting for program and cohort add
- Add text-to-speech question posting
- Write automated tests

## Tweaks

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
- Error handling
- Auth handling
- Add preloaders 