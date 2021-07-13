import gql from 'graphql-tag';

const TOPIC_FAQ_ADMIN = gql`
  query TopicFAQ($slug: ID!) {
    topicFAQ(slug: $slug) {
      topic {
        id
        slug
        title
      }
      topicFAQQuestions {
        id
        question
        answer
        createdAt
        cohortQuestion {
          id
          cohort {
            title
          }
        }
      }
      cohortQuestions {
        id
        question
        createdAt
        convertedToFAQ
        cohort {
          title
        }
        cohortAnswers {
          id
          answer
        }
      }
    }
  }
`;

const ADD_TOPIC_FAQ_QUESTION = gql`
  mutation AddTopicFAQQuestion($id: ID, $topicId: ID!, $cohortQuestionId: ID, $question: String!, $answer: String!) {
    addTopicFAQQuestion(id: $id, topicId: $topicId, cohortQuestionId: $cohortQuestionId, question: $question, answer: $answer) {
      id
      question
      answer
      createdAt
      cohortQuestion {
        id
      }
    }
  }
`;

const DEACTIVATE_TOPIC_FAQ_QUESTION = gql`
  mutation DeactivateTopicFAQQuestion($id: ID!) {
    deactivateTopicFAQQuestion(id: $id) {
      id
      isInactive
    }
  }
`;

export {
  TOPIC_FAQ_ADMIN,
  ADD_TOPIC_FAQ_QUESTION,
  DEACTIVATE_TOPIC_FAQ_QUESTION
}