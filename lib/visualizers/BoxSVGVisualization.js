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
var BoxSVGVisualization = function BoxSVGVisualization(_ref) {
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
  var connectLines = function connectLines(inPoints, boxWidth, boxHeight) {
    var points = inPoints.slice(0, maxDataCount);
    if (points.length === 0) {
      return '';
    }

    // Calculate side length of the square
    var squareSize = Math.min(boxWidth, boxHeight) * 0.8; // Use 80% of the available space
    var offsetX = (boxWidth - squareSize) / 2 + 300;
    var offsetY = (boxHeight - squareSize) / 2 + 50;

    // Define the four corners of the square
    var squarePoints = [{
      x: offsetX,
      y: offsetY
    },
    // Top-left corner
    {
      x: offsetX + squareSize,
      y: offsetY
    },
    // Top-right corner
    {
      x: offsetX + squareSize,
      y: offsetY + squareSize
    },
    // Bottom-right corner
    {
      x: offsetX,
      y: offsetY + squareSize
    },
    // Bottom-left corner
    {
      x: offsetX,
      y: offsetY
    } // Close the square back to the top-left corner
    ];
    var path = "M".concat(squarePoints[0].x, " ").concat(squarePoints[0].y - points[0] * 0.1);
    var pointsPerSide = Math.floor(points.length / 4);
    var widthStep = squareSize / pointsPerSide;
    var heightStep = squareSize / pointsPerSide;
    var widthCounter = 0;
    var widthCounter2 = 0;
    var heightCounter = 0;
    var heightCounter2 = 0;
    for (var i = 0; i < points.length; i++) {
      var pointFactor = points[i] * 0.1;
      if (i < pointsPerSide) {
        // fent
        path += " L".concat(squarePoints[0].x + widthCounter, " ").concat(squarePoints[0].y - pointFactor);
        widthCounter += widthStep;
      } else if (i < pointsPerSide * 2) {
        // jobb
        path += " L".concat(squarePoints[1].x + pointFactor, " ").concat(squarePoints[1].y + heightCounter);
        heightCounter += heightStep;
      } else if (i < pointsPerSide * 3) {
        // lent
        path += " L".concat(squarePoints[2].x - widthCounter2, " ").concat(squarePoints[2].y + pointFactor);
        widthCounter2 += widthStep;
      } else if (i < pointsPerSide * 4) {
        // bal
        path += " L".concat(squarePoints[3].x - pointFactor, " ").concat(squarePoints[3].y - heightCounter2);
        heightCounter2 += heightStep;
      }
    }
    path += " L".concat(squarePoints[0].x - points[points.length - 1] * 0.1, " ").concat(squarePoints[0].y);
    path += 'Z';
    return path;
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: containerStyle
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    width: width,
    height: height
  }, /*#__PURE__*/_react["default"].createElement("defs", null, /*#__PURE__*/_react["default"].createElement("linearGradient", {
    id: "gradient1",
    x1: "50%",
    y1: "0%",
    x2: "50%",
    y2: "100%"
  }, /*#__PURE__*/_react["default"].createElement("stop", {
    offset: "0%",
    style: {
      stopColor: 'purple',
      stopOpacity: 1
    }
  }), /*#__PURE__*/_react["default"].createElement("stop", {
    offset: "100%",
    style: {
      stopColor: 'cyan',
      stopOpacity: 1
    }
  }))), /*#__PURE__*/_react["default"].createElement("path", {
    d: connectLines(low, 200, 200),
    fill: "none",
    stroke: "url(#gradient1)",
    strokeWidth: "4"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    d: connectLines(mid, 200, 200),
    fill: "none",
    stroke: "url(#gradient1)",
    strokeWidth: "4"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    d: connectLines(high, 200, 200),
    fill: "none",
    stroke: "url(#gradient1)",
    strokeWidth: "4"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      position: 'absolute',
      width: 160,
      height: 160,
      background: 'white',
      top: 70,
      left: 320,
      boxShadow: '0 0 10px white'
    }
  }));
};
var _default = exports["default"] = BoxSVGVisualization;