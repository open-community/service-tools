"use strict";

var _chai = require("chai");

var _helpers = require("./helpers");

/* eslint-env node, mocha */
// ============================================================
// Import packages
// ============================================================
// Import modules
// ============================================================
// Tests
describe('helpers', function () {
  describe('toDateFromString', function () {
    it('return null if invalid date string', function () {
      _chai.assert.isNull((0, _helpers.toDateFromString)(), 'No date provided');

      _chai.assert.isNull((0, _helpers.toDateFromString)(''), 'Parameter is an empty string');

      _chai.assert.isNull((0, _helpers.toDateFromString)([]), 'Parameter is an array');

      _chai.assert.isNull((0, _helpers.toDateFromString)({}), 'Parameter is an object');

      _chai.assert.isNull((0, _helpers.toDateFromString)(1), 'Parameter is a number');

      _chai.assert.isNull((0, _helpers.toDateFromString)(null), 'Parameter is null');

      var date = new Date();

      _chai.assert.isNull((0, _helpers.toDateFromString)('|'), 'Parameter is a fake string');

      _chai.assert.isNull((0, _helpers.toDateFromString)("|".concat(date)), 'Parameter is an invalid date');
    });
    it('return a date if valid', function () {
      var date = new Date();
      var stringDate = date.toISOString();
      var newDate = (0, _helpers.toDateFromString)(stringDate);

      _chai.assert.equal(date.getTime(), newDate.getTime());

      _chai.assert.notEqual(date, newDate);
    });
  });
});
//# sourceMappingURL=helpers.spec.js.map
