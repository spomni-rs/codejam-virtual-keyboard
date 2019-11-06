module.exports = {

  codes: [
    'Escape F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 Delete',
    'Backquote Digit1 Digit2 Digit3 Digit4 Digit5 Digit6 Digit7 Digit8 Digit9 Digit0 Minus Equal Backspace Home',
    'Tab KeyQ KeyW KeyE KeyR KeyT KeyY KeyU KeyI KeyO KeyP BracketLeft BracketRight Backslash End',
    'CapsLock KeyA KeyS KeyD KeyF KeyG KeyH KeyJ KeyK KeyL Semicolon Quote Enter PageUp',
    'ShiftLeft KeyZ KeyX KeyC KeyV KeyB KeyN KeyM Comma Period Slash ShiftRight ArrowUp PageDown',
    'ControlLeft MetaLeft AltLeft Space AltRight ContextMenu ControlRight ArrowLeft ArrowDown ArrowRight',
  ],

  'en-us': [
    [ // shift not pressed
      'Esc F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 Del',
      '` 1 2 3 4 5 6 7 8 9 0 - = Backspace Home',
      'Tab q w e r t y u i o p [ ] \\ End',
      'CapsLock a s d f g h j k l ; \' Enter PgUp',
      'Shift z x c v b n m , . / Shift ⇧ PgDn',
      'Ctrl Win Alt Space Alt Menu Ctrl ⇦ ⇩ ⇨',
    ],
    [ // shift pressed
      'Esc F1 F2 F3 F4 F5 F6 F7 F8 F9 F10 F11 F12 Del',
      '~ ! @ # $ % ^ & * ( ) _ + Backspace Home',
      'Tab Q W E R T Y U I O P { } | End',
      'CapsLock A S D F G H J K L : " Enter PgUp',
      'Shift Z X C V B N M < > ? Shift ⇧ PgDn',
      'Ctrl Win Alt Space Alt Menu Ctrl ⇦ ⇩ ⇨',
    ],
  ],
};