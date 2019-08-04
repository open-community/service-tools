"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// ============================================================
// Error
var RequestError = function RequestError(parameter, message) {
  _classCallCheck(this, RequestError);

  this.message = message;
  this.parameter = parameter;
}; // ============================================================
// Exports


var _default = RequestError;
exports["default"] = _default;
//# sourceMappingURL=RequestError.js.map
