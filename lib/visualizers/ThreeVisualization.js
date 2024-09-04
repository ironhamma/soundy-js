"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var THREE = _interopRequireWildcard(require("three"));
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
var LOW_HEIGHT = 0.7;
var MID_HEIGHT = 0.6;
var HIGH_HEIGHT = 0.5;
var ThreeVisualization = function ThreeVisualization(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 450 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 300 : _ref$height;
  var mountRef = (0, _react.useRef)(null);
  var requestRef = (0, _react.useRef)();
  var animateRef = (0, _react.useRef)();
  var lowGeometriesRef = (0, _react.useRef)([]);
  var midGeometriesRef = (0, _react.useRef)([]);
  var highGeometriesRef = (0, _react.useRef)([]);
  var lowEdgesRef = (0, _react.useRef)([]);
  var midEdgesRef = (0, _react.useRef)([]);
  var highEdgesRef = (0, _react.useRef)([]);
  var lowRef = (0, _react.useRef)([]);
  var midRef = (0, _react.useRef)([]);
  var highRef = (0, _react.useRef)([]);
  var _useSoundy = (0, _useSoundHook["default"])(),
    getLowFrequencyData = _useSoundy.getLowFrequencyData,
    getMidFrequencyData = _useSoundy.getMidFrequencyData,
    getHighFrequencyData = _useSoundy.getHighFrequencyData;
  var low = _toConsumableArray(getLowFrequencyData());
  var mid = _toConsumableArray(getMidFrequencyData());
  var high = _toConsumableArray(getHighFrequencyData());
  var minElCount = Math.min(low.length, mid.length, high.length);
  (0, _react.useEffect)(function () {
    lowRef.current = low;
    midRef.current = mid;
    highRef.current = high;
  }, [low, mid, high]);
  (0, _react.useEffect)(function () {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x242424);
    var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    var renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);
    var geometryLow = new THREE.BoxGeometry(minElCount === 0 ? 0 : 10 / minElCount, LOW_HEIGHT, 1);
    var geometryMid = new THREE.BoxGeometry(minElCount === 0 ? 0 : 10 / minElCount, MID_HEIGHT, 1);
    var geometryHigh = new THREE.BoxGeometry(minElCount === 0 ? 0 : 10 / minElCount, HIGH_HEIGHT, 1);
    var edgLow = new THREE.EdgesGeometry(geometryLow);
    var edgMid = new THREE.EdgesGeometry(geometryMid);
    var edgHigh = new THREE.EdgesGeometry(geometryHigh);
    var materialLow = new THREE.MeshBasicMaterial({
      color: 0x01786a
    });
    var materialMid = new THREE.MeshBasicMaterial({
      color: 0x00baa4
    });
    var materialHigh = new THREE.MeshBasicMaterial({
      color: 0x00ffe1
    });
    var edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x000000
    });
    var lowGeometries = [];
    var midGeometries = [];
    var highGeometries = [];
    for (var i = 0; i < minElCount; i++) {
      var wireframeBox = new THREE.Mesh(geometryLow, materialLow);
      var wireframeBox2 = new THREE.Mesh(geometryMid, materialMid);
      var wireframeBox3 = new THREE.Mesh(geometryHigh, materialHigh);
      var edgeLow = new THREE.LineSegments(edgLow, edgeMaterial);
      var edgeMid = new THREE.LineSegments(edgMid, edgeMaterial);
      var edgeHigh = new THREE.LineSegments(edgHigh, edgeMaterial);
      wireframeBox.position.set(i * 0.2 - 5, -2, 0);
      wireframeBox2.position.set(i * 0.2 - 5, -2, 1);
      wireframeBox3.position.set(i * 0.2 - 5, -2, 2);
      edgeLow.position.set(i * 0.2 - 5, -2, 0);
      edgeMid.position.set(i * 0.2 - 5, -2, 1);
      edgeHigh.position.set(i * 0.2 - 5, -2, 2);
      scene.add(wireframeBox);
      scene.add(wireframeBox2);
      scene.add(wireframeBox3);
      scene.add(edgeLow);
      scene.add(edgeMid);
      scene.add(edgeHigh);
      lowGeometries.push(wireframeBox);
      midGeometries.push(wireframeBox2);
      highGeometries.push(wireframeBox3);
      lowEdgesRef.current.push(edgeLow);
      midEdgesRef.current.push(edgeMid);
      highEdgesRef.current.push(edgeHigh);
    }
    lowGeometriesRef.current = lowGeometries;
    midGeometriesRef.current = midGeometries;
    highGeometriesRef.current = highGeometries;
    animateRef.current = function () {
      if (lowGeometriesRef.current.length !== 0) {
        lowGeometriesRef.current.forEach(function (wireframeBox, index) {
          wireframeBox.scale.y = lowRef.current[index] / 255 * 5;
          wireframeBox.position.y = LOW_HEIGHT * (lowRef.current[index] / 255 * 5) - 2;
        });
        lowEdgesRef.current.forEach(function (edge, index) {
          edge.scale.y = lowRef.current[index] / 255 * 5;
          edge.position.y = LOW_HEIGHT * (lowRef.current[index] / 255 * 5) - 2;
        });
      }
      if (midGeometriesRef.current.length !== 0) {
        midGeometriesRef.current.forEach(function (wireframeBox, index) {
          wireframeBox.scale.y = midRef.current[index] / 255 * 5;
          wireframeBox.position.y = MID_HEIGHT * (midRef.current[index] / 255 * 5) - 2;
        });
        midEdgesRef.current.forEach(function (edge, index) {
          edge.scale.y = midRef.current[index] / 255 * 5;
          edge.position.y = MID_HEIGHT * (midRef.current[index] / 255 * 5) - 2;
        });
      }
      if (highGeometriesRef.current.length !== 0) {
        highGeometriesRef.current.forEach(function (wireframeBox, index) {
          wireframeBox.scale.y = highRef.current[index] / 255 * 5;
          wireframeBox.position.y = HIGH_HEIGHT * (highRef.current[index] / 255 * 5) - 2;
        });
        highEdgesRef.current.forEach(function (edge, index) {
          edge.scale.y = highRef.current[index] / 255 * 5;
          edge.position.y = HIGH_HEIGHT * (highRef.current[index] / 255 * 5) - 2;
        });
      }
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animateRef.current);
    };
    requestRef.current = requestAnimationFrame(animateRef.current);
    return function () {
      cancelAnimationFrame(requestRef.current);
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [minElCount]);
  var containerStyle = {
    width: width,
    height: height,
    border: '2px solid white',
    position: 'relative',
    borderRadius: '8px',
    boxShadow: '0 0 10px white',
    overflow: 'hidden'
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    style: containerStyle
  }, /*#__PURE__*/_react["default"].createElement("div", {
    ref: mountRef
  })));
};
var _default = exports["default"] = ThreeVisualization;