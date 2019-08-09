"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RequestError = _interopRequireDefault(require("./RequestError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ============================================================
// Import modules
// ============================================================
// Error

/**
 * @memberOf http.request.errors
 * @public
 */
class InvalidResourceTypeError extends _RequestError.default {
  /**
   * @param {string}         parameter
   * @param {string}         message
   * @param {ResourceType[]} expectedTypes
   * @param {string}         apiId
   */
  constructor({
    parameter,
    message = 'Invalid resource type or not a valid resource ID',
    expectedTypes = [],
    apiId
  }) {
    super(parameter, message);
    this.exptedTypes = typeof expectedTypes === 'string' ? [expectedTypes] : expectedTypes;
    this.apiId = apiId;
  }

} // ============================================================
// Exports


var _default = InvalidResourceTypeError;
exports.default = _default;
//# sourceMappingURL=InvalidResourceTypeError.js.map
