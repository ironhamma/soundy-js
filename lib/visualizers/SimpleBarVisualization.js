"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _useSoundHook = _interopRequireDefault(require("../useSoundHook"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var SimpleBarVisualization = function SimpleBarVisualization(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 450 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 300 : _ref$height;
  var _useSoundy = (0, _useSoundHook["default"])(),
    getLowAvg = _useSoundy.getLowAvg,
    getMidAvg = _useSoundy.getMidAvg,
    getHighAvg = _useSoundy.getHighAvg;
  var containerStyle = {
    width: width,
    height: height,
    border: '2px solid white',
    position: 'relative',
    borderRadius: '8px',
    boxShadow: '0 0 10px white'
  };
  var getBarStyle = function getBarStyle(val, color) {
    if (val <= 0) {
      return {};
    }
    return {
      width: '100%',
      height: val,
      backgroundColor: color,
      position: 'absolute',
      bottom: 0,
      left: 0
    };
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    style: containerStyle
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: getBarStyle(getLowAvg(80) * 2, 'rgba(255,255,255,1)')
  }), /*#__PURE__*/_react["default"].createElement("div", {
    style: getBarStyle(getMidAvg(40) * 2, 'rgba(0,255,0,0.5)')
  }), /*#__PURE__*/_react["default"].createElement("div", {
    style: getBarStyle(getHighAvg() * 2, 'rgba(0,0,255,0.5)')
  })));
};
var _default = exports["default"] = SimpleBarVisualization;