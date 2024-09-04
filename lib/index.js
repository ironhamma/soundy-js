"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SoundyProvider", {
  enumerable: true,
  get: function get() {
    return _useSound.SoundyProvider;
  }
});
Object.defineProperty(exports, "useAudioFeatures", {
  enumerable: true,
  get: function get() {
    return _soundHook["default"];
  }
});
Object.defineProperty(exports, "useSoundy", {
  enumerable: true,
  get: function get() {
    return _useSoundHook["default"];
  }
});
var _react = _interopRequireDefault(require("react"));
var _soundHook = _interopRequireDefault(require("./soundHook"));
var _useSound = require("../lib/useSound");
var _useSoundHook = _interopRequireDefault(require("./useSoundHook"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }