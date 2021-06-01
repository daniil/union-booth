<script>
  import { stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { createEventDispatcher } from 'svelte';
  import SlideOutPanel from 'components/SlideOutPanel.svelte';
  import MDEditor from 'components/MDEditor.svelte';
  import Button from 'components/Button.svelte';
  import { TOPIC_FAQ_ADMIN, ADD_TOPIC_FAQ_QUESTION } from 'graphql/queries/admin/topic-faq';

  export let topic;
  export let mode;
  export let question;
  export let visible;

  const { session } = stores();
  const dispatch = createEventDispatcher();

  const addTopicFAQQuestion = mutation(ADD_TOPIC_FAQ_QUESTION);

  let editorValues = {
    question: '',
    answer: ''
  }
  let formDisabled = false;

  $: submitDisabled = editorValues.question === '' || editorValues.answer === '';
  $: buttonVariant = formDisabled ? 'loading' : 'success';
  $: if (question) setEditorValues();

  const setEditorValues = () => {
    const answerMap = {
      'edit': () => question.answer,
      'publish': () => question.cohortAnswers.map(answer => answer.answer).join('\n\n')
    }
    editorValues = {
      question: question.question,
      answer: answerMap[mode]()
    };
  }

  const handleEditorChange = event => {
    editorValues[event.detail.id] = event.detail.value;
  }

  const saveQA = async () => {
    formDisabled = true;

    const mutationVariables = {
      topicId: topic.id,
      question: editorValues.question,
      answer: editorValues.answer
    };

    if (mode === 'publish' && question) {
      mutationVariables.cohortQuestionId = question.id;
    }

    if (mode === 'edit' && question) {
      mutationVariables.id = question.id;
      if (question.cohortQuestion) {
        mutationVariables.cohortQuestionId = question.cohortQuestion.id;
      }
    }

    try {
      await addTopicFAQQuestion({
        variables: mutationVariables,
        update: (_, mutationResult) => {
          let topicFAQData = $session.apolloClient.readQuery({
            query: TOPIC_FAQ_ADMIN,
            variables: {
              slug: topic.slug
            }
          }).topicFAQ;

          const newTopicFAQQuestion = mutationResult.data.addTopicFAQQuestion;
          let newTopicFAQData = {
            ...topicFAQData
          };

          if (mode === 'add' || mode === 'publish') {
            newTopicFAQData = {
              ...newTopicFAQData,
              topicFAQQuestions: [
                ...newTopicFAQData.topicFAQQuestions,
                newTopicFAQQuestion
              ]
            }
          }

          if (mode === 'publish' && question) {
            newTopicFAQData = {
              ...newTopicFAQData,
              cohortQuestions: newTopicFAQData.cohortQuestions.map(question => {
                if (question.id === newTopicFAQQuestion.cohortQuestion.id) {
                  return { ...question, convertedToFAQ: true }
                } else {
                  return question;
                }
              })
            }
          }

          if (mode === 'edit' && question) {
            newTopicFAQData = {
              ...newTopicFAQData,
              topicFAQQuestions: newTopicFAQData.topicFAQQuestions.map(question => {
                if (question.id === newTopicFAQQuestion.id) {
                  return newTopicFAQQuestion;
                } else {
                  return question;
                }
              })
            }
          }

          $session.apolloClient.writeQuery({
            query: TOPIC_FAQ_ADMIN,
            variables: {
              slug: topic.slug
            },
            data: {
              topicFAQ: newTopicFAQData
            }
          })
        }
      });
      formDisabled = false;
      triggerClose();
    } catch(err) {
      console.log('ERROR: ', err);
    }
  }

  const triggerClose = () => {
    editorValues = {
      question: '',
      answer: ''
    };
    dispatch('close');
  }
</script>

<SlideOutPanel
  title="QA Editor"
  on:close={triggerClose}
  {visible}
>
  <MDEditor
    id="question"
    label="Question"
    placeholder="Question details"
    value={editorValues.question}
    on:change={handleEditorChange}
    disabled={formDisabled}
  />
  <MDEditor
    id="answer"
    label="Answer"
    placeholder="Answer details"
    value={editorValues.answer}
    on:change={handleEditorChange}
    disabled={formDisabled}
  />
  <Button
    variant={buttonVariant}
    icon="👍"
    label="Save"
    action={saveQA}
    disabled={submitDisabled}
  />
</SlideOutPanel>