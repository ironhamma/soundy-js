"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var THREE = _interopRequireWildcard(require("three"));
var _useSoundHook = _interopRequireDefault(require("../useSoundHook"));
var _EffectComposer = require("three/examples/jsm/postprocessing/EffectComposer");
var _UnrealBloomPass = require("three/examples/jsm/postprocessing/UnrealBloomPass");
var _RenderPass = require("three/examples/jsm/postprocessing/RenderPass");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var SphereFieldVisualization = function SphereFieldVisualization(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 500 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 300 : _ref$height;
  var mountRef = (0, _react.useRef)(null);
  var requestRef = (0, _react.useRef)();
  var animateRef = (0, _react.useRef)();
  var lightRef = (0, _react.useRef)(null);
  var lowRef = (0, _react.useRef)([]);
  var midRef = (0, _react.useRef)([]);
  var highRef = (0, _react.useRef)([]);
  var lowAvgRef = (0, _react.useRef)(0);
  var lowGeometriesRef = (0, _react.useRef)([]);
  var midGeometriesRef = (0, _react.useRef)([]);
  var highGeometriesRef = (0, _react.useRef)([]);
  var lowEdgesRef = (0, _react.useRef)([]);
  var midEdgesRef = (0, _react.useRef)([]);
  var highEdgesRef = (0, _react.useRef)([]);
  var _useSoundy = (0, _useSoundHook["default"])(),
    getLowFrequencyData = _useSoundy.getLowFrequencyData,
    getMidFrequencyData = _useSoundy.getMidFrequencyData,
    getHighFrequencyData = _useSoundy.getHighFrequencyData,
    getLowAvg = _useSoundy.getLowAvg;
  var low = _toConsumableArray(getLowFrequencyData());
  var mid = _toConsumableArray(getMidFrequencyData());
  var high = _toConsumableArray(getHighFrequencyData());
  var lowAvg = getLowAvg();
  (0, _react.useEffect)(function () {
    lowRef.current = low;
    midRef.current = mid;
    highRef.current = high;
    lowAvgRef.current = lowAvg;
  }, [low, mid, high, lowAvg]);
  var minElCount = Math.min(low.length, mid.length, high.length);
  var X_OFFSET = 4;
  var LOW_Y_OFFSET = 3;
  var MID_Y_OFFSET = -6;
  var HIGH_Y_OFFSET = -15;
  var Y_OFFSET = 3;
  var Y_SEGMENTS = 10;
  var X_SEGMENTS = 10;
  var MAX_SCALE = 20;
  var MIN_SCALE = 0;
  var LIGHT_X = 0;
  var LIGHT_Y = 10;
  var LIGHT_Z = 10;
  (0, _react.useEffect)(function () {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x242424);
    var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 20;
    camera.rotation.x = 0.25;
    var renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.shadowMap.enabled = true; // Enable shadow maps in the renderer
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    var composer = new _EffectComposer.EffectComposer(renderer);
    var renderPass = new _RenderPass.RenderPass(scene, camera);
    composer.addPass(renderPass);
    composer.setSize(width, height);
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    composer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    var bloomPass = new _UnrealBloomPass.UnrealBloomPass(new THREE.Vector2(width, height), 1.5, 0.4, 0.85);
    bloomPass.threshold = 0.4;
    bloomPass.strength = 0.2;
    bloomPass.radius = 2;
    composer.addPass(bloomPass);
    var directionalLight = new THREE.DirectionalLight(0xffffff, 10);
    directionalLight.position.set(LIGHT_X, LIGHT_Y, LIGHT_Z);
    directionalLight.castShadow = true; // Enable shadow casting for this

    var targetObject = new THREE.Object3D();
    targetObject.position.set(0, 0, 0); // Light target's position
    scene.add(targetObject);
    directionalLight.target = targetObject; // Set light target

    scene.add(directionalLight);
    lightRef.current = directionalLight;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -50;
    var geometryLow = new THREE.SphereGeometry(1, X_SEGMENTS, Y_SEGMENTS);
    var geometryMid = new THREE.SphereGeometry(1, X_SEGMENTS, Y_SEGMENTS);
    var geometryHigh = new THREE.SphereGeometry(1, X_SEGMENTS, Y_SEGMENTS);
    var edgLow = new THREE.EdgesGeometry(geometryLow);
    var edgMid = new THREE.EdgesGeometry(geometryMid);
    var edgHigh = new THREE.EdgesGeometry(geometryHigh);
    var materialLow = new THREE.MeshStandardMaterial({
      color: 0xff0000
    });
    var materialMid = new THREE.MeshStandardMaterial({
      color: 0xff0000
    });
    var materialHigh = new THREE.MeshStandardMaterial({
      color: 0xff0000
    });
    var edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x010345
    });
    var lowGeometries = [];
    var spherePerRow = Math.floor(minElCount / 3);
    var sphereCount = 0;
    var shpereIndex = 0;
    var rowCount = 0;
    for (var i = 0; i < minElCount; i++) {
      var wireframeBox = new THREE.Mesh(geometryLow, materialLow);
      var wireframeBoxMid = new THREE.Mesh(geometryLow, materialMid);
      var wireframeBoxHigh = new THREE.Mesh(geometryLow, materialHigh);
      wireframeBox.castShadow = true;
      wireframeBox.receiveShadow = true;
      wireframeBoxMid.castShadow = true;
      wireframeBoxMid.receiveShadow = true;
      wireframeBoxHigh.castShadow = true;
      wireframeBoxHigh.receiveShadow = true;
      var edgeLow = new THREE.LineSegments(edgLow, edgeMaterial);
      var edgeMid = new THREE.LineSegments(edgMid, edgeMaterial);
      var edgeHigh = new THREE.LineSegments(edgHigh, edgeMaterial);
      wireframeBox.position.set(shpereIndex * X_OFFSET - 50, -2 + rowCount * Y_OFFSET - LOW_Y_OFFSET, 0);
      wireframeBoxMid.position.set(shpereIndex * X_OFFSET - 50, -2 + rowCount * Y_OFFSET - MID_Y_OFFSET, 0);
      wireframeBoxHigh.position.set(shpereIndex * X_OFFSET - 50, -2 + rowCount * Y_OFFSET - HIGH_Y_OFFSET, 0);
      edgeLow.position.set(shpereIndex * X_OFFSET - 50, -2 + rowCount * Y_OFFSET - LOW_Y_OFFSET, 0);
      edgeMid.position.set(shpereIndex * X_OFFSET - 50, -2 + rowCount * Y_OFFSET - MID_Y_OFFSET, 0);
      edgeHigh.position.set(shpereIndex * X_OFFSET - 50, -2 + rowCount * Y_OFFSET - HIGH_Y_OFFSET, 0);
      scene.add(wireframeBox);
      scene.add(wireframeBoxMid);
      scene.add(wireframeBoxHigh);
      scene.add(edgeLow);
      scene.add(edgeMid);
      scene.add(edgeHigh);
      lowGeometries.push(wireframeBox);
      midGeometriesRef.current.push(wireframeBoxMid);
      highGeometriesRef.current.push(wireframeBoxHigh);
      lowEdgesRef.current.push(edgeLow);
      midEdgesRef.current.push(edgeMid);
      highEdgesRef.current.push(edgeHigh);
      sphereCount++;
      shpereIndex++;
      if (sphereCount >= spherePerRow) {
        rowCount++;
        sphereCount = 0;
        shpereIndex = 0;
      }
    }
    lowGeometriesRef.current = lowGeometries;
    var clock = new THREE.Clock();
    animateRef.current = function () {
      if (lowGeometriesRef.current.length !== 0) {
        lowGeometriesRef.current.forEach(function (wireframeBox, index) {
          wireframeBox.scale.y = Math.min(Math.max(lowRef.current[index] / 255 * 5, MIN_SCALE), MAX_SCALE);
          wireframeBox.scale.x = Math.min(Math.max(lowRef.current[index] / 255 * 5, MIN_SCALE), MAX_SCALE);
          wireframeBox.scale.z = Math.min(Math.max(lowRef.current[index] / 255 * 5, MIN_SCALE), MAX_SCALE);
        });
        lowEdgesRef.current.forEach(function (edge, index) {
          edge.scale.y = Math.min(Math.max(lowRef.current[index] / 255 * 5, MIN_SCALE), MAX_SCALE);
          edge.scale.x = Math.min(Math.max(lowRef.current[index] / 255 * 5, MIN_SCALE), MAX_SCALE);
          edge.scale.z = Math.min(Math.max(lowRef.current[index] / 255 * 5, MIN_SCALE), MAX_SCALE);
        });
      }
      if (midGeometriesRef.current.length !== 0) {
        midGeometriesRef.current.forEach(function (wireframeBox, index) {
          wireframeBox.scale.y = Math.min(Math.max(midRef.current[index] / 255 * 5, MIN_SCALE), MAX_SCALE);
          wireframeBox.scale.x = Math.min(Math.max(midRef.current[index] / 255 * 5, MIN_SCALE), MAX_SCALE);
          wireframeBox.scale.z = Math.min(Math.max(midRef.current[index] / 255 * 5, MIN_SCALE), MAX_SCALE);
        });
        midEdgesRef.current.forEach(function (edge, index) {
          edge.scale.y = Math.min(Math.max(midRef.current[index] / 255 * 5, MIN_SCALE), MAX_SCALE);
          edge.scale.x = Math.min(Math.max(midRef.current[index] / 255 * 5, MIN_SCALE), MAX_SCALE);
          edge.scale.z = Math.min(Math.max(midRef.current[index] / 255 * 5, MIN_SCALE), MAX_SCALE);
        });
      }
      if (highGeometriesRef.current.length !== 0) {
        highGeometriesRef.current.forEach(function (wireframeBox, index) {
          wireframeBox.scale.y = Math.min(Math.max(highRef.current[index] / 255 * 5, MIN_SCALE), MAX_SCALE);
          wireframeBox.scale.x = Math.min(Math.max(highRef.current[index] / 255 * 5, MIN_SCALE), MAX_SCALE);
          wireframeBox.scale.z = Math.min(Math.max(highRef.current[index] / 255 * 5, MIN_SCALE), MAX_SCALE);
        });
        highEdgesRef.current.forEach(function (edge, index) {
          edge.scale.y = Math.min(Math.max(highRef.current[index] / 255 * 5, MIN_SCALE), MAX_SCALE);
          edge.scale.x = Math.min(Math.max(highRef.current[index] / 255 * 5, MIN_SCALE), MAX_SCALE);
          edge.scale.z = Math.min(Math.max(highRef.current[index] / 255 * 5, MIN_SCALE), MAX_SCALE);
        });
      }
      if (lowAvgRef.current !== 0) {
        lightRef.current.intensity = lowAvgRef.current / 10;
      }

      // move the light between -2 + LIGHT_X and 2 + LIGHT_X on the x-axis in 3 seconds using the clock
      var t = clock.getElapsedTime();
      directionalLight.position.x = 10 * Math.sin(t);
      directionalLight.position.y = LIGHT_Y;
      directionalLight.position.z = LIGHT_Z;
      directionalLight.updateMatrixWorld();
      composer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animateRef.current);
    };
    requestRef.current = requestAnimationFrame(animateRef.current);
    return function () {
      cancelAnimationFrame(requestRef.current);
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
      composer.dispose();
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
var _default = exports["default"] = SphereFieldVisualization;