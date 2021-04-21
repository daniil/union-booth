<script>
  import { stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { createEventDispatcher } from 'svelte';
  import MDEditor from 'components/MDEditor.svelte';
  import Button from 'components/Button.svelte';
  import { TOPIC_FAQ_ADMIN, ADD_TOPIC_FAQ_QUESTION } from 'graphql/queries/admin/topic-faq';

  export let topicFAQ;
  export let question;
  export let visible;

  const { session } = stores();
  const dispatch = createEventDispatcher();

  const addTopicFAQQuestion = mutation(ADD_TOPIC_FAQ_QUESTION);

  let editorValues = {
    question: '',
    answer: ''
  }

  $: submitDisabled = editorValues.question === '' || editorValues.answer === '';
  $: if (question) setEditorValues();

  const setEditorValues = () => {
    editorValues = {
      question: question.question,
      answer: question.cohortAnswers.map(answer => answer.answer).join('\n\n')
    };
  }

  const handleEditorChange = event => {
    editorValues[event.detail.id] = event.detail.value;
  }

  const saveQA = async () => {
    try {
      await addTopicFAQQuestion({
        variables: {
          topicId: topicFAQ.topic.id,
          question: editorValues.question,
          answer: editorValues.answer
        },
        update: (_, mutationResult) => {
          let topicFAQData = $session.apolloClient.readQuery({
            query: TOPIC_FAQ_ADMIN,
            variables: {
              slug: topicFAQ.topic.slug
            }
          }).topicFAQAdmin;

          $session.apolloClient.writeQuery({
            query: TOPIC_FAQ_ADMIN,
            variables: {
              slug: topicFAQ.topic.slug
            },
            data: {
              topicFAQAdmin: {
                ...topicFAQData,
                topicFAQQuestions: [
                  mutationResult.data.addTopicFAQQuestion,
                  ...topicFAQData.topicFAQQuestions
                ]
              }
            }
          })
        }
      });
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

<style>
  .qa-editor {
    position: fixed;
    padding: 2rem;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    box-shadow: rgb(0 0 0 / 15%) 0px 10px 60px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    transform: translateY(100%);
    transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
  }
  h2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .close {
    padding: 0.5rem 0.75rem;
    border: 1px solid #D4C4C7;
    border-radius: 50%;
    background: none;
    font-size: 1rem;
    color: #9B6A6C;
    cursor: pointer;
  }
  .close:hover {
    background-color: #F6F3F4;
    border-color: #B09398;
    color: #B09398;
  }
  .visible {
    transform: translateY(0%);
  }
</style>

<section class="qa-editor" class:visible>
  <h2>
    QA Editor
    <button class="close" on:click={triggerClose}>X</button>
  </h2>
  <MDEditor
    id="question"
    label="Question"
    placeholder="Question details"
    value={editorValues.question}
    on:change={handleEditorChange}
  />
  <MDEditor
    id="answer"
    label="Answer"
    placeholder="Answer details"
    value={editorValues.answer}
    on:change={handleEditorChange}
  />
  <Button variant="success" icon="👍" label="Save" action={saveQA} disabled={submitDisabled}/>
</section>
