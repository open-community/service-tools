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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

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
  var dateString = req.query[parameter];

  if (!dateString) {
    return {
      errors: []
    };
  }

  var date = (0, _helpers.toDateFromString)(dateString);

  if (!date) {
    /** @type {RequestError} */
    var error = new httpErrors.InvalidParameterError({
      parameter: parameter,
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
  var listId = getListFromReq(req, parameter);
  var createError = expectedTypes ? function (apiId) {
    return new httpErrors.InvalidResourceTypeError({
      parameter: parameter,
      expectedTypes: expectedTypes,
      apiId: apiId
    });
  } : function (apiId) {
    return new httpErrors.InvalidApiIdError({
      parameter: parameter,
      apiId: apiId
    });
  }; // Returning the list and the errors

  return listId.reduce(function (_ref, apiId) {
    var list = _ref.list,
        errors = _ref.errors;

    if ((0, _api.isValidApiId)(apiId, expectedTypes)) {
      list.push(apiId);
    } else {
      errors.push(createError(apiId));
    }

    return {
      list: list,
      errors: errors
    };
  }, {
    value: [],
    errors: []
  });
} // ============================================================
// Exports
//# sourceMappingURL=request.js.map
