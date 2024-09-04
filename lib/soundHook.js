"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
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
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function useAudioFeatures(playerRef) {
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    dataArray = _useState2[0],
    setDataArray = _useState2[1];
  var audioContext = (0, _react.useRef)(null);
  var analyser = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (!playerRef.current) {
      return function () {};
    }
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
      var audioElement = playerRef.current;
      var track = audioContext.current.createMediaElementSource(audioElement);
      analyser.current = audioContext.current.createAnalyser();
      track.connect(analyser.current);
      analyser.current.connect(audioContext.current.destination);
      analyser.current.fftSize = 256;
      var bufferLength = analyser.current.frequencyBinCount;
      setDataArray(new Uint8Array(bufferLength));
      audioElement.onplay = function () {
        audioContext.current.resume();
      };
    }
    var updateFrequencyData = function updateFrequencyData() {
      if (analyser.current) {
        var newDataArray = new Uint8Array(analyser.current.frequencyBinCount);
        analyser.current.getByteFrequencyData(newDataArray);
        setDataArray(newDataArray);
      }
    };
    var intervalId = setInterval(updateFrequencyData, 30);
    return function () {
      return clearInterval(intervalId);
    };
  }, [playerRef, playerRef.current]);
  var getLowFrequencyData = function getLowFrequencyData() {
    if (!analyser.current) {
      return [];
    }
    var bufferLength = analyser.current.frequencyBinCount;
    var lowerBound = Math.floor(bufferLength / 8);
    var upperBound = Math.floor(bufferLength / 2);
    var dataArraySlice = dataArray.slice(lowerBound, upperBound);
    return dataArraySlice;
  };
  var getHighFrequencyData = function getHighFrequencyData() {
    if (!analyser.current) {
      return [];
    }
    var bufferLength = analyser.current.frequencyBinCount;
    var lowerBound = Math.floor(bufferLength / 2);
    var upperBound = Math.floor(bufferLength * 7 / 8);
    var dataArraySlice = dataArray.slice(lowerBound, upperBound);
    return dataArraySlice;
  };
  var getMidFrequencyData = function getMidFrequencyData() {
    if (!analyser.current) {
      return [];
    }
    var bufferLength = analyser.current.frequencyBinCount;
    var lowerBound = Math.floor(bufferLength / 4);
    var upperBound = Math.floor(bufferLength * 3 / 4);
    var dataArraySlice = dataArray.slice(lowerBound, upperBound);
    return dataArraySlice;
  };
  var getLowAvg = function getLowAvg() {
    var trashold = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    if (!analyser.current) {
      return 0;
    }
    var bufferLength = analyser.current.frequencyBinCount;
    var lowerBound = Math.floor(bufferLength / 8);
    var upperBound = Math.floor(bufferLength / 2);
    var dataArraySlice = dataArray.slice(lowerBound, upperBound);
    return dataArraySlice.reduce(function (a, b) {
      return a + b;
    }, 0) / dataArraySlice.length - trashold;
  };
  var getMidAvg = function getMidAvg() {
    var trashold = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    if (!analyser.current) {
      return 0;
    }
    var bufferLength = analyser.current.frequencyBinCount;
    var lowerBound = Math.floor(bufferLength / 4);
    var upperBound = Math.floor(bufferLength * 3 / 4);
    var dataArraySlice = dataArray.slice(lowerBound, upperBound);
    return dataArraySlice.reduce(function (a, b) {
      return a + b;
    }, 0) / dataArraySlice.length - trashold;
  };
  var getHighAvg = function getHighAvg() {
    var trashold = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    if (!analyser.current) {
      return 0;
    }
    var bufferLength = analyser.current.frequencyBinCount;
    var lowerBound = Math.floor(bufferLength / 2);
    var upperBound = Math.floor(bufferLength * 7 / 8);
    var dataArraySlice = dataArray.slice(lowerBound, upperBound);
    return dataArraySlice.reduce(function (a, b) {
      return a + b;
    }, 0) / dataArraySlice.length - trashold;
  };
  var getLowTop = function getLowTop() {
    if (!analyser.current) {
      return 0;
    }
    var bufferLength = analyser.current.frequencyBinCount;
    var lowerBound = Math.floor(bufferLength / 8);
    var upperBound = Math.floor(bufferLength / 2);
    var dataArraySlice = dataArray.slice(lowerBound, upperBound);
    return Math.max.apply(Math, _toConsumableArray(dataArraySlice));
  };
  var getMidTop = function getMidTop() {
    if (!analyser.current) {
      return 0;
    }
    var bufferLength = analyser.current.frequencyBinCount;
    var lowerBound = Math.floor(bufferLength / 4);
    var upperBound = Math.floor(bufferLength * 3 / 4);
    var dataArraySlice = dataArray.slice(lowerBound, upperBound);
    return Math.max.apply(Math, _toConsumableArray(dataArraySlice));
  };
  var getHighTop = function getHighTop() {
    if (!analyser.current) {
      return 0;
    }
    var bufferLength = analyser.current.frequencyBinCount;
    var lowerBound = Math.floor(bufferLength / 2);
    var upperBound = Math.floor(bufferLength * 7 / 8);
    var dataArraySlice = dataArray.slice(lowerBound, upperBound);
    return Math.max.apply(Math, _toConsumableArray(dataArraySlice));
  };
  var getLowBottom = function getLowBottom() {
    if (!analyser.current) {
      return 0;
    }
    var bufferLength = analyser.current.frequencyBinCount;
    var lowerBound = Math.floor(bufferLength / 8);
    var upperBound = Math.floor(bufferLength / 2);
    var dataArraySlice = dataArray.slice(lowerBound, upperBound);
    return Math.min.apply(Math, _toConsumableArray(dataArraySlice));
  };
  var getMidBottom = function getMidBottom() {
    if (!analyser.current) {
      return 0;
    }
    var bufferLength = analyser.current.frequencyBinCount;
    var lowerBound = Math.floor(bufferLength / 4);
    var upperBound = Math.floor(bufferLength * 3 / 4);
    var dataArraySlice = dataArray.slice(lowerBound, upperBound);
    return Math.min.apply(Math, _toConsumableArray(dataArraySlice));
  };
  var getHighBottom = function getHighBottom() {
    if (!analyser.current) {
      return 0;
    }
    var bufferLength = analyser.current.frequencyBinCount;
    var lowerBound = Math.floor(bufferLength / 2);
    var upperBound = Math.floor(bufferLength * 7 / 8);
    var dataArraySlice = dataArray.slice(lowerBound, upperBound);
    return Math.min.apply(Math, _toConsumableArray(dataArraySlice));
  };
  var getBeatSignal = function getBeatSignal() {
    if (!analyser.current) {
      return 0;
    }
    var bufferLength = analyser.current.frequencyBinCount;
    var lowerBound = Math.floor(bufferLength / 8);
    var upperBound = Math.floor(bufferLength / 2);
    var dataArraySlice = dataArray.slice(lowerBound, upperBound);
    return Math.min.apply(Math, _toConsumableArray(dataArraySlice));
  };
  var useFrequency = function useFrequency(start, end) {
    if (!analyser.current || !start || !end) {
      return [];
    }
    var bufferLength = analyser.current.frequencyBinCount;
    var lowerBound = Math.floor(bufferLength * start);
    var upperBound = Math.floor(bufferLength * end);
    var dataArraySlice = dataArray.slice(lowerBound, upperBound);
    return dataArraySlice;
  };
  return {
    getLowFrequencyData: getLowFrequencyData,
    getMidFrequencyData: getMidFrequencyData,
    getHighFrequencyData: getHighFrequencyData,
    getLowAvg: getLowAvg,
    getMidAvg: getMidAvg,
    getHighAvg: getHighAvg,
    getLowTop: getLowTop,
    getMidTop: getMidTop,
    getHighTop: getHighTop,
    getLowBottom: getLowBottom,
    getMidBottom: getMidBottom,
    getHighBottom: getHighBottom,
    getBeatSignal: getBeatSignal,
    useFrequency: useFrequency
  };
}
var _default = exports["default"] = useAudioFeatures;