/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/element-resize-event/index.js":
/*!****************************************************!*\
  !*** ./node_modules/element-resize-event/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function resizeListener(e) {
  var win = e.target || e.srcElement
  if (win.__resizeRAF__) {
    cancelAnimationFrame(win.__resizeRAF__)
  }
  win.__resizeRAF__ = requestAnimationFrame(function () {
    var trigger = win.__resizeTrigger__
    var listeners = trigger &&  trigger.__resizeListeners__
    if (listeners) {
      listeners.forEach(function (fn) {
        fn.call(trigger, e)
      })
    }
  })
}

var exports = function exports(element, fn) {
  var window = this
  var document = window.document
  var isIE

  var attachEvent = document.attachEvent
  if (typeof navigator !== 'undefined') {
    isIE = navigator.userAgent.match(/Trident/) ||
      navigator.userAgent.match(/Edge/)
  }

  function objectLoad() {
    this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__
    this.contentDocument.defaultView.addEventListener('resize', resizeListener)
  }

  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = []
    if (attachEvent) {
      element.__resizeTrigger__ = element
      element.attachEvent('onresize', resizeListener)
    } else {
      if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative'
      }
      var obj = (element.__resizeTrigger__ = document.createElement('object'))
      obj.setAttribute(
        'style',
        'position: absolute; top: 0; left: 0; height: 100%; width: 100%; pointer-events: none; z-index: -1; opacity: 0;'
      )
      obj.setAttribute('class', 'resize-sensor')

      // prevent <object> from stealing keyboard focus
      obj.setAttribute('tabindex', '-1');

      obj.__resizeElement__ = element
      obj.onload = objectLoad
      obj.type = 'text/html'
      if (isIE) {
        element.appendChild(obj)
      }
      obj.data = 'about:blank'
      if (!isIE) {
        element.appendChild(obj)
      }
    }
  }
  element.__resizeListeners__.push(fn)
}

module.exports = typeof window === 'undefined' ? exports : exports.bind(window)

module.exports.unbind = function (element, fn) {
  var attachEvent = document.attachEvent
  var listeners = element.__resizeListeners__ || []
  if (fn) {
    var index = listeners.indexOf(fn)
    if (index !== -1) {
      listeners.splice(index, 1)
    }
  } else {
    listeners = element.__resizeListeners__ = []
  }
  if (!listeners.length) {
    if (attachEvent) {
      element.detachEvent('onresize', resizeListener)
    } else if (element.__resizeTrigger__) {
      var contentDocument = element.__resizeTrigger__.contentDocument;
      var defaultView = contentDocument && contentDocument.defaultView;
      if (defaultView) {
        defaultView.removeEventListener('resize', resizeListener);
        delete defaultView.__resizeTrigger__;
      }
      element.__resizeTrigger__ = !element.removeChild(
        element.__resizeTrigger__
      )
    }
    delete element.__resizeListeners__
  }
}


/***/ }),

/***/ "./src/components/App.js":
/*!*******************************!*\
  !*** ./src/components/App.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./App.scss */ "./src/components/App.scss");

const createElement = __webpack_require__(/*! ../js/lib/create-element */ "./src/js/lib/create-element.js");
const Keyboard = __webpack_require__(/*! ./Keyboard */ "./src/components/Keyboard/index.js");

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


/***/ }),

/***/ "./src/components/App.scss":
/*!*********************************!*\
  !*** ./src/components/App.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/components/Keyboard/Keyboard.js":
/*!*********************************************!*\
  !*** ./src/components/Keyboard/Keyboard.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./Keyboard.scss */ "./src/components/Keyboard/Keyboard.scss");

const elementResizeEvent = __webpack_require__(/*! element-resize-event */ "./node_modules/element-resize-event/index.js");
const createElement = __webpack_require__(/*! ../../js/lib/create-element */ "./src/js/lib/create-element.js");

const symbolKeyCodes = __webpack_require__(/*! ./keyboard-data/symbol-key-codes */ "./src/components/Keyboard/keyboard-data/symbol-key-codes.js");
const codeLayout = __webpack_require__(/*! ./keyboard-data/code-layout */ "./src/components/Keyboard/keyboard-data/code-layout.js");
const layouts = __webpack_require__(/*! ./keyboard-data/keyboard-layouts */ "./src/components/Keyboard/keyboard-data/keyboard-layouts.js");

/** Check if passed key node is key of symbol to typing.
 *
 * @param {HTMLElement} key
 */
const isSymbolKey = (key) => symbolKeyCodes.includes(key.dataset.code);

/** Generate DOM structure for Keyboard component and insert it into the "node" element.
 * @param {HTMLElement} node - Keyboard component mount point.
*/
const createKeyboardDOM = ({ node }) => {
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
const setSizes = ({ node }) => {
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
 * Save data about current layout in the sessionStorage.
 *
 * @param {object} - the keyboard instance state
 * @param {HTMLElement} state.node - Keyboard component mount point.
 * @param {boolean} hasShiftedLayout - What layout should use.
 */
const setLayout = ({ node, hasShiftedLayout, currLayoutName }) => {
  if (!layouts[currLayoutName]) {
    throw new Error(`Incorrect layout name "${currLayoutName}."`);
  }

  const newLayout = hasShiftedLayout
    ? layouts[currLayoutName][1]
    : layouts[currLayoutName][0];

  codeLayout.forEach((lineStr, lineNumber) => {
    lineStr.split(' ').forEach((code, keyNumber) => {
      const key = node.querySelector(`[data-code=${code}]`);
      const value = newLayout[lineNumber].split(' ')[keyNumber];

      const symbol = value.match(/.*\[.*\]$/)
        ? value.split('[')[0]
        : value;

      const print = value.match(/.*\[.*\]$/)
        ? value.split(/\[|\]/)[1]
        : value;

      key.innerHTML = print;
      if (isSymbolKey(key)) key.setAttribute('data-symbol', symbol);
    });
  });

  sessionStorage.setItem('currLayoutName', currLayoutName);
};

/** Switch between defined keyboard layouts.
 *
 * @param {object} state - the keyboard instance state
 */
const switchLayout = (state) => {
  const { currLayoutName, layoutNames } = state;

  const currIndex = layoutNames.indexOf(currLayoutName);
  const newIndex = (currIndex + 1) % layoutNames.length;

  state.currLayoutName = layoutNames[newIndex]; // eslint-disable-line no-param-reassign
  setLayout(state);
};

/** Check if the "Shift" key is pressed.
 *
 * @param {object} state - the keyboard instance state
 * @param {HTMLElement} state.node - Keyboard component mount point.
 *
 * @returns {boolean}
 */
const isShiftPressed = ({ node }) => !!(
  node.querySelector('.keyboard__key.active[data-code=ShiftLeft]')
  || node.querySelector('.keyboard__key.active[data-code=ShiftRight]')
);

/** Check if the "Alt" key is pressed.
 *
 * @param {object} state - the keyboard instance state
 * @param {HTMLElement} state.node - Keyboard component mount point.
 *
 * @returns {boolean}
 */
const isAltPressed = ({ node }) => !!(
  node.querySelector('.keyboard__key.active[data-code=AltLeft]')
  || node.querySelector('.keyboard__key.active[data-code=AltRight]')
);

/** Set the “active” class of the key node
 * whose code is equal to the “code” property.
 *  Print symbol into the state.input.
 *
 * @param {object} state - the keyboard instance state
 * @param {HTMLElement} state.node - Keyboard component mount point.
 * @param {string} code - key code
 */
const keydown = (state, code) => {
  const { node, input } = state;
  const key = node.querySelector(`[data-code=${code}]`);

  if (key) {
    key.classList.add('active');

    // this way make a bug on chrome !!!
    // const { selectionStart, selectionEnd } = input;

    const selectionStart = input.value.length;
    const selectionEnd = selectionStart;

    if (isSymbolKey(key)) {
      const { symbol } = key.dataset;
      input.setRangeText(symbol, selectionStart, selectionEnd, 'end');
    } else if (code === 'Backspace') {
      input.setRangeText('', selectionStart - 1, selectionEnd, 'end');
    } else if (isShiftPressed(state)) {
      state.hasShiftedLayout = true; // eslint-disable-line no-param-reassign
      setLayout(state);
    }
  }
};

/** Remove the “active” class of the key node
 * whose code is equal to the “code” property.
 *  Switch inpput language if "shift+alt" combination is found.
 *
 * @param {object} state - the keyboard instance state
 * @param {HTMLElement} state.node - Keyboard component mount point.
 * @param {string} code - key code
 */
const keyup = (state, code) => {
  const { node } = state;

  const shiftAltCodes = ['ShiftLeft', 'ShiftRight', 'AltLeft', ' AltRight'];
  if (shiftAltCodes.includes(code)
    && isShiftPressed(state)
    && isAltPressed(state)
  ) {
    switchLayout(state);
  }

  const key = node.querySelector(`[data-code=${code}]`);
  if (key) {
    key.classList.remove('active');

    if (
      (code === 'ShiftLeft' || code === 'ShiftRight')
      && !isShiftPressed(state)
    ) {
      state.hasShiftedLayout = false; // eslint-disable-line no-param-reassign
      setLayout(state);
    }
  }
};

/** Check if the passed HTMLElement is a keyboard key.
 * @param {HTMLElement} duck - Node do check.
 *
 * @returns {boolean}
 */
const isKeyNode = (duck) => duck.classList.contains('keyboard__key');

/** Create the Keyboard component and attach it to the "node" option.
 * @param {object} opts
 * @param {HTMLElement} opts.node - App mount point
 * @param {HTMLInputElement} opts.input - Input to print symbols.
 */
const Keyboard = ({ node, input }) => {
  const currLayoutName = sessionStorage.getItem('currLayoutName') || 'en-us';

  /* Be carefull! This variable are passed to methods and may mutate! */
  let state = { // eslint-disable-line prefer-const
    node,
    input,
    currLayoutName,
    layoutNames: Object.keys(layouts),
    hasShiftedLayout: false,
  };

  createKeyboardDOM(state);
  setSizes(state);
  setLayout(state);

  node.addEventListener('mousedown', (event) => {
    const { target } = event;
    if (isKeyNode(target)) keydown(state, target.dataset.code);
  });

  node.addEventListener('mouseup', (event) => {
    const { target } = event;
    if (isKeyNode(target)) keyup(state, target.dataset.code);
  });

  /* TO DISCUSS: arrow function versus the bind() method
   * Dzmitry, I remember your desire to write like this:
   *    elementResizeEvent(node, setSizes.bind(null, node));
   *
   *  But I think the way with the arrow function is more
   *    readable in this certain case.
   */
  elementResizeEvent(node, () => setSizes(state));

  return {
    /* TO DISCUSS: arrow function versus the bind() method
     * The method "keydown" and "keyup" was makes using diffrent ways
     *   by design. Thus, we can see illustrative examples
     *   of the discuss topic.
     */
    keydown: (code) => keydown(state, code),
    keyup: keyup.bind(null, state),
  };
};

module.exports = Keyboard;

// TODO: delegate the working with sessionStorage to the higher level component

// TODO: style keys using .scss file instead inline styles

// TODO: process tuch events on keyboard

// TODO: Remove class "active" when mouse out from key.


/***/ }),

/***/ "./src/components/Keyboard/Keyboard.scss":
/*!***********************************************!*\
  !*** ./src/components/Keyboard/Keyboard.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/components/Keyboard/index.js":
/*!******************************************!*\
  !*** ./src/components/Keyboard/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./Keyboard */ "./src/components/Keyboard/Keyboard.js");


/***/ }),

/***/ "./src/components/Keyboard/keyboard-data/code-layout.js":
/*!**************************************************************!*\
  !*** ./src/components/Keyboard/keyboard-data/code-layout.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const codeLayout = [
  'Escape F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 Delete',
  'Backquote Digit1 Digit2 Digit3 Digit4 Digit5 Digit6 Digit7 Digit8 Digit9 Digit0 Minus Equal Backspace Home',
  'Tab KeyQ KeyW KeyE KeyR KeyT KeyY KeyU KeyI KeyO KeyP BracketLeft BracketRight Backslash End',
  'CapsLock KeyA KeyS KeyD KeyF KeyG KeyH KeyJ KeyK KeyL Semicolon Quote Enter PageUp',
  'ShiftLeft KeyZ KeyX KeyC KeyV KeyB KeyN KeyM Comma Period Slash ShiftRight ArrowUp PageDown',
  'ControlLeft MetaLeft AltLeft Space AltRight ContextMenu ControlRight ArrowLeft ArrowDown ArrowRight',
];

module.exports = codeLayout;


/***/ }),

/***/ "./src/components/Keyboard/keyboard-data/keyboard-layouts.js":
/*!*******************************************************************!*\
  !*** ./src/components/Keyboard/keyboard-data/keyboard-layouts.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  'en-us': [
    [ // shift not pressed
      'Esc F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 Del',
      '` 1 2 3 4 5 6 7 8 9 0 - = Backspace Home',
      '\u0009[Tab] q w e r t y u i o p [ ] \\ End',
      'CapsLock a s d f g h j k l ; \' \u000D[Enter] PgUp',
      'Shift z x c v b n m , . / Shift ⇧ PgDn',
      'Ctrl Win Alt \u00A0[Space] Alt Menu Ctrl ⇦ ⇩ ⇨',
    ],
    [ // shift pressed
      'Esc F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 Del',
      '~ ! @ # $ % ^ & * ( ) _ + Backspace Home',
      '\u0009[Tab] Q W E R T Y U I O P { } | End',
      'CapsLock A S D F G H J K L : " \u000D[Enter] PgUp',
      'Shift Z X C V B N M < > ? Shift ⇧ PgDn',
      'Ctrl Win Alt \u00A0[Space] Alt Menu Ctrl ⇦ ⇩ ⇨',
    ],
  ],

  'ru-ru': [
    [ // shift not pressed
      'Esc F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 Del',
      'ё 1 2 3 4 5 6 7 8 9 0 - = Backspace Home',
      '\u0009[Tab] й ц у к е н г ш щ з х ъ \\ End',
      'CapsLock ф ы в а п р о л д ж э \u000D[Enter] PgUp',
      'Shift я ч с м и т ь б ю . Shift ⇧ PgDn',
      'Ctrl Win Alt \u00A0[Space] Alt Menu Ctrl ⇦ ⇩ ⇨',
    ],
    [ // shift pressed
      'Esc F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 Del',
      'Ё ! " № ; % : ? * ( ) _ + Backspace Home',
      '\u0009[Tab] Й Ц У К Е Н Г Ш Щ З Х Ъ / End',
      'CapsLock Ф Ы В А П Р О Л Д Ж Э \u000D[Enter] PgUp',
      'Shift Я Ч С М И Т Ь Б Ю , Shift ⇧ PgDn',
      'Ctrl Win Alt \u00A0[Space] Alt Menu Ctrl ⇦ ⇩ ⇨',
    ],
  ],
};


/***/ }),

/***/ "./src/components/Keyboard/keyboard-data/symbol-key-codes.js":
/*!*******************************************************************!*\
  !*** ./src/components/Keyboard/keyboard-data/symbol-key-codes.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
  'Tab',
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
  'Enter',
  'Space',
];

module.exports = symbolKeyCodes;


/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../scss/index.scss */ "./src/scss/index.scss");

const App = __webpack_require__(/*! ../components/App */ "./src/components/App.js");
const createElement = __webpack_require__(/*! ./lib/create-element */ "./src/js/lib/create-element.js");

const appMountPoint = document.body.appendChild(createElement('div'));
App({ node: appMountPoint });

// TODO: Refactor components to make they as classes


/***/ }),

/***/ "./src/js/lib/create-element.js":
/*!**************************************!*\
  !*** ./src/js/lib/create-element.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const is = __webpack_require__(/*! ./is */ "./src/js/lib/is.js");

/** Create an instance of HTMLElement by tagName and set its some properties.
 * This function can't proccess non primitive properties.
 *
 * @param {string} tagName
 * @param {string} [className]
 * @param {Object} [attrs]
*/
module.exports = function createElement(tagName, className, attrs) {
  if (!attrs && is.object(className)) {
    className = null; // eslint-disable-line no-param-reassign
    attrs = className; // eslint-disable-line no-param-reassign
  }

  const node = document.createElement(tagName);

  if (attrs) {
    Object.keys(attrs).forEach((attrName) => {
      const value = attrs[attrName];

      if (!is.primitive(value)) {
        throw new Error('Unable to proccess non promitive value.');
      }

      node.setAttribute(attrName, value);
    });
  }

  if (className) node.classList.add(className);

  return node;
};


/***/ }),

/***/ "./src/js/lib/is.js":
/*!**************************!*\
  !*** ./src/js/lib/is.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  object: (duck) => typeof duck === 'object'
    && duck !== null,

  primitive: (duck) => typeof duck === 'number'
    || typeof duck === 'string'
    || typeof duck === 'boolean'
    || duck === undefined
    || duck === null,
};


/***/ }),

/***/ "./src/scss/index.scss":
/*!*****************************!*\
  !*** ./src/scss/index.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=../maps/js/index.js.map