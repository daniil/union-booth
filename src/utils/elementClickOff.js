// TODO: Add parameter explanation
export default (event, elementClass, elementId, stateCb) => {
  let currTarget = event.target;
  while (currTarget.parentNode) {
    if (currTarget.classList.contains(elementClass) && currTarget.dataset.id === elementId) {
      return;
    }
    currTarget = currTarget.parentNode;
  }
  stateCb();
}