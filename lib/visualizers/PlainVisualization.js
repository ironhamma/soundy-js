"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _fiber = require("@react-three/fiber");
var _react = _interopRequireWildcard(require("react"));
var _drei = require("@react-three/drei");
var _postprocessing = require("@react-three/postprocessing");
var _useSoundHook = _interopRequireDefault(require("../useSoundHook"));
var _postprocessing2 = require("postprocessing");
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
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var MoveablePlane = function MoveablePlane(_ref) {
  var freq = _ref.freq,
    position = _ref.position,
    color = _ref.color,
    negative = _ref.negative,
    lookAtCamera = _ref.lookAtCamera,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 64 : _ref$size;
  var planeRef = (0, _react.useRef)();
  var gridSize = size;
  var initialVertexPositions = new Array((gridSize + 1) * (gridSize + 1)).fill(0).map(function (_, i) {
    var x = i % (gridSize + 1) - gridSize / 2;
    var y = Math.floor(i / (gridSize + 1)) - gridSize / 2;
    return [x, y, 0]; // Initial Z value is 0 (flat plane)
  });
  var _useState = (0, _react.useState)(initialVertexPositions),
    _useState2 = _slicedToArray(_useState, 2),
    vertexPositions = _useState2[0],
    setVertexPositions = _useState2[1];
  var _useSoundy = (0, _useSoundHook["default"])(),
    getLowFrequencyData = _useSoundy.getLowFrequencyData,
    getMidFrequencyData = _useSoundy.getMidFrequencyData,
    getHighFrequencyData = _useSoundy.getHighFrequencyData;
  var low = _toConsumableArray(getLowFrequencyData());
  var mid = _toConsumableArray(getMidFrequencyData());
  var high = _toConsumableArray(getHighFrequencyData());
  var freqs = {
    low: [],
    mid: [],
    high: []
  };
  (0, _react.useEffect)(function () {
    freqs.current = {
      low: low,
      mid: mid,
      high: high
    };
  }, [low, mid, high]);
  (0, _fiber.useFrame)(function (_ref2) {
    var camera = _ref2.camera;
    /* if (planeRef.current && lookAtCamera) {
        const plane = planeRef.current;
        const cameraPosition = camera.position;
        const planePosition = plane.position;
        
        // Align the plane to face the camera
        const direction = new THREE.Vector3().subVectors(cameraPosition, planePosition).normalize();
        const up = new THREE.Vector3(0, 1, 0); // Assuming Y-up orientation
        const right = new THREE.Vector3().crossVectors(up, direction).normalize();
        const newUp = new THREE.Vector3().crossVectors(direction, right).normalize();
        
        // Set the new rotation based on camera direction
        plane.lookAt(cameraPosition);
    } */
    // update all vertex positions based on the low frequency data

    var newVertexPositions = vertexPositions.map(function (pos, i) {
      var _pos = _slicedToArray(pos, 3),
        x = _pos[0],
        y = _pos[1],
        z = _pos[2];
      var value = freqs.current[freq][i % freqs.current[freq].length];
      var newZ = value * -0.02 + position;
      if (negative) {
        newZ = value * 0.02 + position;
      }
      return [x, y, newZ];
    });
    setVertexPositions(newVertexPositions);
  });
  (0, _react.useEffect)(function () {
    if (planeRef.current) {
      var geometry = planeRef.current.geometry;
      var _position = geometry.attributes.position;
      // Update the vertices with the passed-in vertex positions
      for (var i = 0; i < vertexPositions.length; i++) {
        _position.setXYZ(i, vertexPositions[i][0], vertexPositions[i][1], vertexPositions[i][2]);
      }
      _position.needsUpdate = true; // Mark the position as needing an update
      geometry.computeVertexNormals(); // Recompute the normals for correct lighting
    }
  }, [vertexPositions]);
  return /*#__PURE__*/_react["default"].createElement("mesh", {
    ref: planeRef,
    position: lookAtCamera ? [negative ? -20 : 20, 0, 0] : [0, 0, 0],
    rotation: lookAtCamera ? [0, Math.PI / 2, 0] : [0, 0, 0]
  }, /*#__PURE__*/_react["default"].createElement("planeGeometry", {
    args: [size, size, size, size]
  }), /*#__PURE__*/_react["default"].createElement("meshStandardMaterial", {
    color: color,
    toneMapped: false,
    emissive: color,
    emissiveIntensity: 5,
    wireframe: true
  }));
};
var PlainVisualization = function PlainVisualization(_ref3) {
  var width = _ref3.width,
    height = _ref3.height;
  return /*#__PURE__*/_react["default"].createElement(_fiber.Canvas, {
    style: {
      width: width,
      height: height
    },
    camera: {
      position: [0, -10, 0],
      fov: 150
    }
  }, /*#__PURE__*/_react["default"].createElement("ambientLight", {
    intensity: 0.5
  }), /*#__PURE__*/_react["default"].createElement(MoveablePlane, {
    freq: "high",
    position: 10,
    color: '#e1ff00'
  }), /*#__PURE__*/_react["default"].createElement(MoveablePlane, {
    freq: "mid",
    position: -2,
    color: '#00f2ff',
    lookAtCamera: true,
    size: 20
  }), /*#__PURE__*/_react["default"].createElement(MoveablePlane, {
    freq: "mid",
    position: -2,
    color: '#00f2ff',
    lookAtCamera: true,
    negative: true,
    size: 20
  }), /*#__PURE__*/_react["default"].createElement(MoveablePlane, {
    freq: "low",
    position: -10,
    color: '#0039e3',
    negative: true
  }), /*#__PURE__*/_react["default"].createElement(_postprocessing.EffectComposer, null, /*#__PURE__*/_react["default"].createElement(_postprocessing.Bloom, {
    luminanceThreshold: 0.2 // luminance threshold. Raise this value to mask out darker elements in the scene.
    ,
    luminanceSmoothing: 0.025,
    intensity: 0.1,
    resolutionX: _postprocessing2.Resolution.AUTO_SIZE,
    resolutionY: _postprocessing2.Resolution.AUTO_SIZE,
    blurPass: undefined
  })));
};
var RoomVisualization = function RoomVisualization(_ref4) {
  var _ref4$width = _ref4.width,
    width = _ref4$width === void 0 ? 450 : _ref4$width,
    _ref4$height = _ref4.height,
    height = _ref4$height === void 0 ? 300 : _ref4$height;
  var containerStyle = {
    width: width,
    height: height,
    border: '2px solid white',
    position: 'relative',
    borderRadius: '8px',
    boxShadow: '0 0 10px white'
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    style: containerStyle
  }, /*#__PURE__*/_react["default"].createElement(PlainVisualization, {
    width: width,
    height: height
  })));
};
var _default = exports["default"] = RoomVisualization;