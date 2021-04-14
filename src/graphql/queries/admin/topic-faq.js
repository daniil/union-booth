import gql from 'graphql-tag';

const TOPIC_FAQ_ADMIN = gql`
  query TopicFAQAdmin($slug: ID!) {
    topicFAQAdmin(slug: $slug) {
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

export {
  TOPIC_FAQ_ADMIN,
  ADD_TOPIC_FAQ_QUESTION
}