## Tasks

- Add user management admin functionality
  - Add user deactivate functionality
  - Add cohort team section (for manager+)
  - Add change role functionality for users and team
  - Add admin functionality for managers (active state change and promoting to admin)
  - Add default inactive state for manager role registration
  - Add default inactive state for user role registration
- Create likes (or +1) functionality for answers and maybe questions
- Add realtime check (on blur) for username and email uniqueness
  - Register and update profile pages
- Add Live Question topic Cheatsheet field (also available on individual topic page)
- Add subscription to switching the active topic (Live page)
- Open Studio Queue functionality
  - Queue for an educator
  - Educator can keep track of students they are currently helping / need help
  - Average answer time (based off startTime and endTime)
- Select random student to answer question
- Setup notifications system (new question, new answer, watch answer, etc.)
- Factor out common validations out of the resolvers
- Refactor user cohort queries to be cached
- Add a program/cohort admin privileges for other roles
- Update site color scheme
- Add "About" page
- Add admin deactivate functionality for programs, cohorts and topics
- Add deactivated topic FAQ questions list (and reactivate functionality)
- Add timed unlock for topics
- Add question and answer moderation before posting
- Add speech-to-text question posting
- Log user out after their session expires (ie: period of inactivity)
- Add SSO Login options
- Add user invitation functionality (invite for program, invite for cohort)
- Ensure that moderator functionality only works for cohort moderators are part of
- Write automated tests
- Convert to SvelteKit

## Tweaks

- Add subscription for avatar update
- Add scroll to updated question functionality
- Scroll to updated answer after update
- Update all colors to use SASS variables
- Add toast messages (ie: when QA question is published)
- Add a nice tooltip to "Posted by" avatar in Live Question component
- When user is deleted, invalidate their session

## Ongoing

- Look for queries that can be updated to use DataLoader
- Add cascading functionality to all managed tables
- Authenticate WebSocket requests
- Error handling (Add global error state and UI to replace all console.logs)
 
## Bug Tracking

- Investigate the error that comes up after switching topics and getting "can not post to topic GraphQL error"