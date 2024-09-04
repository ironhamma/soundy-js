"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _useSoundHook = _interopRequireDefault(require("../useSoundHook"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var BarVisualization = function BarVisualization(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 450 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 300 : _ref$height;
  var _useSoundy = (0, _useSoundHook["default"])(),
    getLowFrequencyData = _useSoundy.getLowFrequencyData,
    getMidFrequencyData = _useSoundy.getMidFrequencyData,
    getHighFrequencyData = _useSoundy.getHighFrequencyData;
  var low = _toConsumableArray(getLowFrequencyData());
  var mid = _toConsumableArray(getMidFrequencyData());
  var high = _toConsumableArray(getHighFrequencyData());
  var getDotStyle = function getDotStyle(value, index) {
    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'white';
    return {
      width: width / Math.max(low.length, mid.length, high.length),
      height: 10,
      backgroundColor: color,
      position: 'absolute',
      left: index * (width / Math.max(low.length, mid.length, high.length)),
      bottom: value / height * 100,
      boxShadow: "0 0 10px ".concat(color),
      borderRadius: '2px'
    };
  };
  var containerStyle = {
    width: width,
    height: height,
    border: '2px solid white',
    position: 'relative',
    borderRadius: '8px',
    boxShadow: '0 0 10px white'
  };
  var connectLines = function connectLines(points) {
    if (points.length === 0) {
      return;
    }

    // returns an svg path that connects the points (x, y)
    var path = 'M' + points[0].x + ' ' + points[0].y;
    for (var i = 1; i < points.length; i++) {
      path += ' L' + points[i].x + ' ' + points[i].y;
    }
    return path;
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    style: containerStyle
  }, low.map(function (value, index) {
    return value !== 0 ? /*#__PURE__*/_react["default"].createElement("div", {
      style: getDotStyle(value, index, 'black')
    }) : null;
  }), mid.map(function (value, index) {
    return value !== 0 ? /*#__PURE__*/_react["default"].createElement("div", {
      style: getDotStyle(value, index, 'gray')
    }) : null;
  }), high.map(function (value, index) {
    return value !== 0 ? /*#__PURE__*/_react["default"].createElement("div", {
      style: getDotStyle(value, index, 'white')
    }) : null;
  })));
};
var _default = exports["default"] = BarVisualization;