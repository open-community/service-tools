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
class InvalidApiIdError extends _RequestError.default {
  /**
   *
   * @param {string} parameter
   * @param {string} message
   * @param {string} apiId
   */
  constructor({
    parameter,
    message = 'Not a valid api ID',
    apiId
  }) {
    super(parameter, message);
    this.apiId = apiId;
  }

} // ============================================================
// Exports


var _default = InvalidApiIdError;
exports.default = _default;
//# sourceMappingURL=InvalidApiIdError.js.map
