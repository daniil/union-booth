## Tasks

- Update avatar storage to use what can work on Heroku
- Update PubSub to a production library (https://www.apollographql.com/docs/apollo-server/data/subscriptions/#production-pubsub-libraries)
- Add UI for changing live questions to FAQ
- Add UI for adding FAQ questions from scratch
- Style PublishedQAs component
- Style CohortQuestions component
- Update individual topic page with FAQ questions
- Add a Resources model/schema tied to the topic
- Add UI for managing resources
- Update individual topic page with Resources
- Create remove a question functionality
- Create edit a question functionality
- Create remove an answer functionality
- Create edit an answer functionality
- Open Studio Queue functionality
  - Queue for an educator
  - Educator can keep track of students they are currently helping / need help
  - Average answer time (based off startTime and endTime)
- Select random student to answer question
- Setup notifications system (new question, new answer, watch answer, etc.)
- Investigate the error that comes up after switching topics and getting "can not post to topic GraphQL error"
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
- Write automated tests

## Tweaks

- Add placeholders for Admin FAQ section for empty FAQ or Cohort questions
- Update Admin side forms to look better
- Set admin forms to disabled while it's sending query
- Add a back button on individual topic page back to list of topics
- Update Answers to be expandable
- Update Button component to have different types
- Add a nice tooltip to "Posted by" avatar in Live Question component
- When user is deleted, invalidate their session

## Ongoing

- Look for queries that can be updated to use DataLoader
- Add cascading functionality to all managed tables
- Authenticate WebSocket requests
- Error handling (Add global error state and UI to replace all console.logs)
- Auth handling
- Add preloaders 
