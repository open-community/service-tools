"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _RequestError2 = _interopRequireDefault(require("./RequestError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// ============================================================
// Error

/**
 * @memberOf http.request.errors
 * @public
 */
var InvalidResourceTypeError =
/*#__PURE__*/
function (_RequestError) {
  _inherits(InvalidResourceTypeError, _RequestError);

  /**
   * @param {string}         parameter
   * @param {string}         message
   * @param {ResourceType[]} expectedTypes
   * @param {string}         apiId
   */
  function InvalidResourceTypeError(_ref) {
    var _this;

    var parameter = _ref.parameter,
        _ref$message = _ref.message,
        message = _ref$message === void 0 ? 'Invalid resource type or not a valid resource ID' : _ref$message,
        _ref$expectedTypes = _ref.expectedTypes,
        expectedTypes = _ref$expectedTypes === void 0 ? [] : _ref$expectedTypes,
        apiId = _ref.apiId;

    _classCallCheck(this, InvalidResourceTypeError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InvalidResourceTypeError).call(this, parameter, message));
    _this.exptedTypes = typeof expectedTypes === 'string' ? [expectedTypes] : expectedTypes;
    _this.apiId = apiId;
    return _this;
  }

  return InvalidResourceTypeError;
}(_RequestError2["default"]); // ============================================================
// Exports


var _default = InvalidResourceTypeError;
exports["default"] = _default;
//# sourceMappingURL=InvalidResourceTypeError.js.map
