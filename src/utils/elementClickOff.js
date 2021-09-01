/**
 * @param {Object} event - Event object from event handler
 * @param {string} elementClass - A classname CSS selector for an element that should ignore the click off (ie: the trigger of the state that click off is updating in it's callback, such as button container that would open a menu)
 * @param {string} elementId - A unique id of the element that is ignored (ie: if you have multiples of the same elementClass, such as action buttons for multiple similar elements on the page)
 * @param {Function} stateCb - A callback function for successful click off (ie: if click happened outside of elementClass element or it's children)
 */
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