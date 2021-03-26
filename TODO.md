## Tasks

- Update avatar storage to use S3
- Style Register and Login pages
- Update PubSub to a production library (https://www.apollographql.com/docs/apollo-server/data/subscriptions/#production-pubsub-libraries)
- Create remove a question functionality
- Add an FAQ model/schema tied to the topic
- Add UI for changing live questions to FAQ
- Add UI for adding FAQ questions from scratch
- Update individual topic page with FAQ questions
- Add a Resources model/schema tied to the topic
- Add UI for managing resources
- Update individual topic page with Resources
- Open Studio Queue functionality
  - Queue for an educator
  - Educator can keep track of students they are currently helping / need help
  - Average answer time (based off startTime and endTime)
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
- Add SSO Login options
- Select random student to answer question
- Setup notifications system (new question, new answer, watch answer, etc.)
- Write automated tests

## Tweaks

- Update app to use first name and last name instead of username
- Add a back button on individual topic page back to list of topics
- Update Answers to be expandable
- Update Button component to have different types
- Add a nice tooltip to "Posted by" avatar in Live Question component
- Add Markdown editor to question and answer textareas
- When user is deleted, invalidate their session

## Ongoing

- Refactor relative paths to absolute paths
- Add cascading functionality to all managed tables
- Authenticate WebSocket requests
- Error handling (Add global error state and UI to replace all console.logs)
- Auth handling
- Add preloaders 
