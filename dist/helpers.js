"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toDateFromString = toDateFromString;

// ============================================================
// Helpers

/**
 * @param {string} dateString
 * @returns {Date}
 * @public
 */
function toDateFromString(dateString) {
  if (typeof dateString !== 'string') {
    return null;
  }

  var epoch = Date.parse(dateString);
  var date = new Date(epoch);

  if (Number.isNaN(date.getTime()) || date.toISOString() !== dateString) {
    return null;
  }

  return date;
} // ============================================================
// Exports
//# sourceMappingURL=helpers.js.map
