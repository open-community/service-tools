"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RequestError = _interopRequireDefault(require("./RequestError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ============================================================
// Error
class InvalidParameterError extends _RequestError.default {
  constructor({
    message = 'Invalid parameter value',
    parameter,
    type,
    value,
    expectedType
  }) {
    super(parameter, message);
    this.parameter = parameter;
    this.value = value;
    this.expectedType = expectedType;
    this.type = type;
  }

} // ============================================================
// Exports


var _default = InvalidParameterError;
exports.default = _default;
//# sourceMappingURL=InvalidParameterError.js.map
