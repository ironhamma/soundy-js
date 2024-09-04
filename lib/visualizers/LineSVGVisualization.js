"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _useSoundHook = _interopRequireDefault(require("../useSoundHook"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var LineSVGVisualization = function LineSVGVisualization(_ref) {
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
  var maxDataCount = Math.min(low.length, mid.length, high.length);
  var containerStyle = {
    width: width,
    height: height,
    border: '2px solid white',
    position: 'relative',
    borderRadius: '8px',
    boxShadow: '0 0 10px white'
  };
  var connectLines = function connectLines(inPoints) {
    var points = inPoints.slice(0, maxDataCount);
    if (points.length === 0) {
      return '';
    }

    // returns an svg path that connects the points (x, y)
    var path = "M".concat(points[0].x, " ").concat(points[0].y);
    for (var i = 1; i < points.length; i++) {
      path += " L".concat(points[i].x, " ").concat(points[i].y);
    }
    return path;
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: containerStyle
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    width: width,
    height: height
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: connectLines(low.map(function (value, index) {
      return {
        x: index * (width / Math.min(low.length, mid.length, high.length) + 1),
        y: height - value / height * 100
      };
    })),
    fill: "none",
    stroke: "red",
    strokeWidth: "2"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    d: connectLines(mid.map(function (value, index) {
      return {
        x: index * (width / Math.min(low.length, mid.length, high.length) + 1),
        y: height - value / height * 100
      };
    })),
    fill: "none",
    stroke: "blue",
    strokeWidth: "2"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    d: connectLines(high.map(function (value, index) {
      return {
        x: index * (width / Math.min(low.length, mid.length, high.length) + 1),
        y: height - value / height * 100
      };
    })),
    fill: "none",
    stroke: "cyan",
    strokeWidth: "2"
  })));
};
var _default = exports["default"] = LineSVGVisualization;