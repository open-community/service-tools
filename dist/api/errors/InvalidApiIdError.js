"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ApiError = _interopRequireDefault(require("./ApiError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ============================================================
// Import modules
// ============================================================
// Error

/**
 * @memberOf http.request.errors
 * @public
 */
class InvalidApiIdError extends _ApiError.default {
  /**
   *
   * @param {string} parameter
   * @param {string} message
   * @param {string} apiId
   */
  constructor({
    message = 'Not a valid api ID',
    apiId
  }) {
    super(message);
    this.apiId = apiId;
  }

} // ============================================================
// Exports


var _default = InvalidApiIdError;
exports.default = _default;
//# sourceMappingURL=InvalidApiIdError.js.map
