require('./Keyboard.scss');

const createElement = require('../js/lib/create-element');
const elementResizeEvent = require('element-resize-event');
const layouts = require('./keyboard-layouts');

const symbolKeyCodes = [
  'Backquote',
  'Digit1',
  'Digit2',
  'Digit3',
  'Digit4',
  'Digit5',
  'Digit6',
  'Digit7',
  'Digit8',
  'Digit9',
  'Digit0',
  'Minus',
  'Equal',
  'KeyQ',
  'KeyW',
  'KeyE',
  'KeyR',
  'KeyT',
  'KeyY',
  'KeyU',
  'KeyI',
  'KeyO',
  'KeyP',
  'BracketLeft',
  'BracketRight',
  'Backslash',
  'KeyA',
  'KeyS',
  'KeyD',
  'KeyF',
  'KeyG',
  'KeyH',
  'KeyJ',
  'KeyK',
  'KeyL',
  'Semicolon',
  'Quote',
  'KeyZ',
  'KeyX',
  'KeyC',
  'KeyV',
  'KeyB',
  'KeyN',
  'KeyM',
  'Comma',
  'Period',
  'Slash',
];

/** Check if passed key node is key of symbol to typing. 
 *
 * @param {HTMLElement} key
 */
const isSymbolKey = (key) => symbolKeyCodes.includes(key.dataset.code);

/** Generate DOM structure for Keyboard component and insert it into the "node" element.
 * @param {HTMLElement} node - Keyboard component mount point.
*/
function createKeyboardDOM(node) {
  if (!node.classList.contains('keyboard')) { 
    node.classList.add('keyboard');
  }

  layouts.codes.forEach((lineStr) => {
    const line = createElement('div', 'keyboard__line');
    node.appendChild(line);
    
    lineStr.split(' ').forEach((keyCode => {
      const key = createElement('div', 'keyboard__key', { 
        'data-code': keyCode
      });
      
      line.appendChild(key);
    }));
  })
}

/** Calculate and set sizes of the DOM elements
 * @param {HTMLElement} node - Keyboard component mount point.
 */
function setSizes(node) {
  const keyboardWidth = parseInt(getComputedStyle(node).width, 10);
  const keyHeight = keyboardWidth * 0.05;
  const keyGap = (keyboardWidth - keyHeight * 16) / 17;
  
  const firstLine = node.firstChild;
  firstLine.style.paddingTop = `${keyGap}px`;

  const keys = Array.from(node.querySelectorAll('.keyboard__key'));

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
}

/* Set keyboard layout and print its symbols on the keys.
 *
 * @param {object} - the keyboard instance state
 * @param {HTMLElement} state.node - Keyboard component mount point.
 * @param {oolean} isShifted - Contains true if should use the layout for the case when Shift key is pressed.
 */
const setLayout = (state) => {

  const {node, isShifted, layoutName} = state;

  if (!layouts[layoutName]) {
    throw new Error(`Incorrect layout name "${layoutName}."`)
  }
  
  const newLayout = isShifted 
    ? layouts[layoutName][1]
    : layouts[layoutName][0];
   
  layouts.codes.forEach((lineStr, lineNumber) => {
    lineStr.split(' ').forEach((code, keyNumber) => {
      const key = node.querySelector(`[data-code=${code}]`);
      const value = newLayout[lineNumber].split(' ')[keyNumber];
      
      key.innerHTML = value;
      if (isSymbolKey(key)) key.setAttribute('data-symbol', value);
    });
  });
}

function Keyboard(opts) {
  const {node} = opts;
  
  createKeyboardDOM(node);
  setSizes(node);
  
  let state = {
    node,
    isShifted: false,
    layoutName: 'en-us'
  };

  setLayout(state);
  
  /* Dzmitry, I remember your desire to write like this:
  *    elementResizeEvent(node, setSizes.bind(null, node));
  *
  *  But I think the way with the arrow function is more 
  *    readable in this case.
  */
  elementResizeEvent(node, () => setSizes(node));
}

module.exports = Keyboard;
