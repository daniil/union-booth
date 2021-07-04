export default (event, elementClass, stateCb) => {
  let currTarget = event.target;
  while (currTarget.parentNode) {
    if (currTarget.classList.contains(elementClass)) {
      return;
    }
    currTarget = currTarget.parentNode;
  }
  stateCb();
}