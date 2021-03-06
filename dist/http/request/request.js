"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getListApiIdFromReq = getListApiIdFromReq;
exports.getListFromReq = getListFromReq;
exports.getOneDate = getOneDate;

var _api = require("../../api");

var httpErrors = _interopRequireWildcard(require("./errors"));

var _helpers = require("../../helpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// ============================================================
// Import modules
// ============================================================
// Functions

/**
 *
 * @param {Request} req
 * @param {string}  parameter
 * @returns {{value: Date?, errors: RequestError[]}}
 * @public
 */
function getOneDate(req, parameter) {
  const dateString = req.query[parameter];

  if (!dateString) {
    return {
      errors: []
    };
  }

  const date = (0, _helpers.toDateFromString)(dateString);

  if (!date) {
    /** @type {RequestError} */
    const error = new httpErrors.InvalidParameterError({
      parameter,
      expectedType: 'Date',
      value: dateString
    });
    return {
      errors: [error]
    };
  }

  return {
    value: date,
    errors: []
  };
}
/**
 *
 * @param {Request} req
 * @param {string}  parameter
 * @returns {string[]}
 */


function getListFromReq(req, parameter) {
  return typeof req.query[parameter] === 'string' ? [req.query[parameter]] : req.query[parameter] || [];
}
/**
 *
 * @param {Request}                     req
 * @param {string}                      parameter
 * @param {ResourceType|ResourceType[]} expectedTypes
 * @returns {{list: ApiId[], errors: RequestError[]}}
 */


function getListApiIdFromReq(req, parameter, expectedTypes) {
  const listId = getListFromReq(req, parameter);
  const createError = expectedTypes ? apiId => new httpErrors.InvalidResourceTypeError({
    parameter,
    expectedTypes,
    apiId
  }) : apiId => new httpErrors.InvalidApiIdError({
    parameter,
    apiId
  }); // Returning the list and the errors

  return listId.reduce(({
    value,
    errors
  }, apiId) => {
    if ((0, _api.isValidApiId)(apiId, expectedTypes)) {
      value.push(apiId);
    } else {
      errors.push(createError(apiId));
    }

    return {
      value,
      errors
    };
  }, {
    value: [],
    errors: []
  });
} // ============================================================
// Exports
//# sourceMappingURL=request.js.map
