require('./Keyboard.scss');

const elementResizeEvent = require('element-resize-event');
const createElement = require('../../js/lib/create-element');

const symbolKeyCodes = require('./keyboard-data/symbol-key-codes');
const codeLayout = require('./keyboard-data/code-layout');
const layouts = require('./keyboard-data/keyboard-layouts');

/** Check if passed key node is key of symbol to typing.
 *
 * @param {HTMLElement} key
 */
const isSymbolKey = (key) => symbolKeyCodes.includes(key.dataset.code);

/** Generate DOM structure for Keyboard component and insert it into the "node" element.
 * @param {HTMLElement} node - Keyboard component mount point.
*/
const createKeyboardDOM = (node) => {
  if (!node.classList.contains('keyboard')) {
    node.classList.add('keyboard');
  }

  codeLayout.forEach((lineStr) => {
    const line = createElement('div', 'keyboard__line');
    node.appendChild(line);

    lineStr.split(' ').forEach(((keyCode) => {
      const key = createElement('div', 'keyboard__key', {
        'data-code': keyCode,
      });

      line.appendChild(key);
    }));
  });
};

/** Calculate and set sizes of the DOM elements
 * @param {HTMLElement} node - Keyboard component mount point.
 */
const setSizes = (node) => {
  const keyboardWidth = parseInt(getComputedStyle(node).width, 10);
  const keyHeight = keyboardWidth * 0.05;
  const keyGap = (keyboardWidth - keyHeight * 16) / 17;

  const firstLine = node.firstChild;
  firstLine.style.paddingTop = `${keyGap}px`;

  const keys = [...node.querySelectorAll('.keyboard__key')];

  keys.forEach((currKey) => {
    const { code } = currKey.dataset;
    const keyStyle = currKey.style;

    keyStyle.width = `${keyHeight}px`;
    keyStyle.height = `${keyHeight}px`;
    keyStyle.margin = `0 0 ${keyGap}px ${keyGap}px`;

    keyStyle.fontSize = isSymbolKey(currKey)
      ? `${keyHeight / 2}px`
      : `${keyHeight / 3.5}px`;

    switch (code) {
      case 'F1':
        keyStyle.marginLeft = `${keyGap * 2 + keyHeight}px`;
        break;

      case 'F5':
      case 'F9':
        keyStyle.marginLeft = `${(keyGap * 3 + keyHeight) / 2}px`;
        break;

      case 'Backspace':
        keyStyle.width = `${keyHeight * 2 + keyGap}px`;
        break;

      case 'Tab':
        keyStyle.width = `${keyHeight * (1 + 1 / 3) + keyGap}px`;
        break;

      case 'Backslash':
        keyStyle.width = `${keyHeight * (1 + 2 / 3)}px`;
        break;

      case 'CapsLock':
        keyStyle.width = `${keyHeight * (1 + 2 / 3) + keyGap}px`;
        break;

      case 'Enter':
        keyStyle.width = `${keyHeight * (2 + 1 / 3) + keyGap}px`;
        break;

      case 'ShiftLeft':
        keyStyle.width = `${keyHeight * (1 + 4 / 3) + keyGap}px`;
        break;

      case 'ShiftRight':
        keyStyle.width = `${keyHeight * (1 + 2 / 3) + keyGap}px`;
        break;

      case 'ControlLeft':
        keyStyle.width = `${keyHeight * (1 + 2 / 3)}px`;
        break;

      case 'Space':
        keyStyle.width = `${keyHeight * 6 + keyGap * 5}px`;
        break;

      case 'ControlRight':
        keyStyle.width = `${keyHeight * (1 + 1 / 3) + keyGap}px`;
        break;

      default:
        break;
    }
  });
};

/* Set keyboard layout and print its symbols on the keys.
 *
 * @param {object} - the keyboard instance state
 * @param {HTMLElement} state.node - Keyboard component mount point.
 * @param {boolean} isShiftPressed - What layout should use.
 */
const setLayout = ({ node, isShiftPressed, layoutName }) => {
  if (!layouts[layoutName]) {
    throw new Error(`Incorrect layout name "${layoutName}."`);
  }

  const newLayout = isShiftPressed
    ? layouts[layoutName][1]
    : layouts[layoutName][0];

  codeLayout.forEach((lineStr, lineNumber) => {
    lineStr.split(' ').forEach((code, keyNumber) => {
      const key = node.querySelector(`[data-code=${code}]`);
      const value = newLayout[lineNumber].split(' ')[keyNumber];

      key.innerHTML = value;
      if (isSymbolKey(key)) key.setAttribute('data-symbol', value);
    });
  });
};

/** Create the Keyboard component and attach it to the "node" option.
 * @param {object} opts
 * @param {HTMLElement} opts.node - App mount point
 */
function Keyboard({ node }) {
  createKeyboardDOM(node);
  setSizes(node);

  const state = {
    node,
    isShiftPressed: false,
    layoutName: 'en-us',
  };

  setLayout(state);

  /* Dzmitry, I remember your desire to write like this:
  *    elementResizeEvent(node, setSizes.bind(null, node));
  *
  *  But I think the way with the arrow function is more
  *    readable in this certain case.
  */
  elementResizeEvent(node, () => setSizes(node));
}

module.exports = Keyboard;
