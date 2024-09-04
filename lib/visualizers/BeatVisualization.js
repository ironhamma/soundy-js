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
var BeatVisualization = function BeatVisualization(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 450 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 300 : _ref$height;
  var mountRef = (0, _react.useRef)(null);
  var requestRef = (0, _react.useRef)();
  var animateRef = (0, _react.useRef)();
  var beatsRef = (0, _react.useRef)(0);
  var _useSoundy = (0, _useSoundHook["default"])(),
    getBeatSignal = _useSoundy.getBeatSignal;
  var beats = getBeatSignal();
  (0, _react.useEffect)(function () {
    beatsRef.current = beats;
  }, [beats]);
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
    var geometry = new THREE.BoxGeometry(3, 3, 3);
    var material = new THREE.MeshBasicMaterial({
      color: 0x000000
    });
    var edges = new THREE.EdgesGeometry(geometry);
    var edgeMaterial = new THREE.LineBasicMaterial({
      color: 0xfff700
    });
    var box = new THREE.Mesh(geometry, material);
    var line = new THREE.LineSegments(edges, edgeMaterial);
    scene.add(box);
    scene.add(line);
    animateRef.current = function () {
      box.rotation.x += 0.005;
      line.rotation.x = box.rotation.x;
      box.scale.x = beatsRef.current === 0 ? 0 : 0.1 * beatsRef.current / 4;
      line.scale.x = beatsRef.current === 0 ? 0 : 0.1 * beatsRef.current / 4;
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animateRef.current);
    };
    requestRef.current = requestAnimationFrame(animateRef.current);
    return function () {
      cancelAnimationFrame(requestRef.current);
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);
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
var _default = exports["default"] = BeatVisualization;