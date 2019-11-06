require('./App.scss');

const createElement = require('../js/lib/create-element');
const Keyboard = require('./Keyboard');

/* BEM structure
  app
    app__input
    app__keyboard-container
      keyboard
        keyboard__line
        keyboard__key key
          key__print
*/

/** Generate DOM structure for App module and insert it into the "node" element.
 * @param {HTMLElement} node - Mount Point
*/
function createAppDOM(node) {
  if (!node.classList.contains('app')) node.classList.add('app');

  const childs = {
    input: createElement('textarea', 'app__input'),
    keyboardContainer: createElement('div', 'app__keyboard-container'),
  };

  Object.keys(childs).forEach((name) => node.appendChild(childs[name]));

  return childs;
}

/** Create the App component and attach it to the "node" option.
 * @param {object} opts
 * @param {HTMLElement} opts.node - App mount point
 */
function App(opts) {
  const { node } = opts;

  const { input, keyboardContainer } = createAppDOM(node);

  const keyboard = Keyboard({
    node: keyboardContainer.appendChild(createElement('div')),
    input,
  });

  const { keydown, keyup } = keyboard;

  document.addEventListener('keydown', (event) => {
    event.preventDefault();
    keydown(event.code);
  });
  document.addEventListener('keyup', (event) => {
    event.preventDefault();
    keyup(event.code);
  });
}

module.exports = App;
