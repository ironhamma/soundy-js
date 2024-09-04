"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _soundHook = _interopRequireDefault(require("../soundHook"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } /* eslint-disable jsx-a11y/media-has-caption */
var LineSVGVisualizationHook = function LineSVGVisualizationHook(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 450 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 300 : _ref$height;
  var playerRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    uploaded = _useState2[0],
    setUploaded = _useState2[1];
  var _useAudioFeatures = (0, _soundHook["default"])(playerRef),
    getLowFrequencyData = _useAudioFeatures.getLowFrequencyData,
    getMidFrequencyData = _useAudioFeatures.getMidFrequencyData,
    getHighFrequencyData = _useAudioFeatures.getHighFrequencyData;

  // add an audio file upload that changes the player src
  var handleFileChange = function handleFileChange(e) {
    var file = e.target.files[0];
    var url = URL.createObjectURL(file);
    playerRef.current.src = url;
    setUploaded(true);
  };
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
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '32px 0',
      flexDirection: 'column',
      gap: '16px'
    }
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "file",
    onChange: handleFileChange
  }), /*#__PURE__*/_react["default"].createElement("audio", {
    id: "audioPlayer",
    ref: playerRef,
    src: "csoki.mp3",
    controls: true
  })), uploaded ? /*#__PURE__*/_react["default"].createElement("div", {
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
  }))) : /*#__PURE__*/_react["default"].createElement("h3", {
    style: {
      color: 'lightcoral'
    }
  }, "For the Visualization demo to be visible, please select an audio"));
};
var _default = exports["default"] = LineSVGVisualizationHook;