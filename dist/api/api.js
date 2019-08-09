"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInvalidApiIdList = getInvalidApiIdList;
exports.getResourceId = getResourceId;
exports.getResourceType = getResourceType;
exports.isValidApiId = isValidApiId;
exports.parseApiId = parseApiId;
exports.toApiId = toApiId;
exports.toQueryParameterError = toQueryParameterError;

var _base64url = _interopRequireDefault(require("base64url"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ============================================================
// Import packages
// ============================================================
// Module's constants and variables
const API_ID_REGEXP = /^([a-zA-Z0-9-_:]+):([a-zA-Z0-9-_]+)$/; // ============================================================
// Functions

/**
 * API Helpers.
 * @namespace api
 */

/**
 * Filter a list of string and return all elements that are not valid Api ID.
 * @param {ApiId[]}                     list           - List of ID to validate
 * @param {ResourceType|ResourceType[]} [resourceType] - Resource type allowed
 * @returns {string[]}
 * @memberOf api
 * @public
 */

function getInvalidApiIdList(list, resourceType) {
  const invalidList = list.filter(apiID => !isValidApiId(apiID, resourceType));
  return _lodash.default.uniq(invalidList);
}
/**
 * Return the resource id corresponding to the given api ID.
 * If the ID is not a valid apiId or resource doesn't match the expected type, then return null.
 * @param {ApiId}                       apiId
 * @param {ResourceType|ResourceType[]} [resourceType]
 * @returns {?ResourceId}
 * @memberOf api
 * @public
 */


function getResourceId(apiId, resourceType) {
  const parse = parseApiId(apiId);

  if (!parse) {
    return null;
  }

  if (typeof resourceType === 'string') {
    if (parse.type !== resourceType) {
      return null;
    }
  } else if (Array.isArray(resourceType)) {
    if (!resourceType.includes(parse.type)) {
      return null;
    }
  }

  return parse.id;
}
/**
 * Return the resource type of the given api id.
 * If invalid api ID, return null
 * @param {ApiId} apiId
 * @returns {?ResourceType}
 * @public
 */


function getResourceType(apiId) {
  const parse = parseApiId(apiId);

  if (!parse) {
    return null;
  }

  return parse.type;
}
/**
 * Check that the given API id is valid.
 * @param {ApiId}                       apiId
 * @param {ResourceType|ResourceType[]} [resourceType] - Type of resource
 * @returns {boolean}
 * @memberOf api
 * @public
 */


function isValidApiId(apiId, resourceType) {
  const id = getResourceId(apiId, resourceType);

  if (!id) {
    return false;
  }

  return Boolean(id);
}
/**
 * Parse a public ID and return it's type and real id
 * @param {ApiId} apiId
 * @returns {?{id: ResourceId, type: ResourceType}}
 * @memberOf api
 * @public
 */


function parseApiId(apiId) {
  if (typeof apiId !== 'string') {
    return null;
  }

  const decoded = _base64url.default.decode(apiId);

  const match = decoded.match(API_ID_REGEXP);

  if (!match) {
    return null;
  }

  return {
    type: match[1],
    id: match[2]
  };
}
/**
 * Transform an account ID to it's API equivalent
 * @param {ResourceType} resourceType
 * @param {ResourceId}   resourceId
 * @memberOf api
 * @public
 */


function toApiId(resourceType, resourceId) {
  return _base64url.default.encode(`${resourceType}:${resourceId}`);
}
/**
 * Create a query parameter error
 * @param {string} code      - Code of the error
 * @param {string} message   - Error message
 * @param {string} parameter - Name of the parameter concerned by the error
 * @param {*}      value     - Parameter value
 * @returns {QueryParameterError}
 */


function toQueryParameterError({
  code,
  message,
  parameter,
  value
}) {
  return {
    code,
    message,
    parameter,
    value: _lodash.default.cloneDeep(value)
  };
} // ============================================================
// Exports
//# sourceMappingURL=api.js.map
