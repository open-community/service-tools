// ============================================================
// Import packages
import base64url from 'base64url';

// ============================================================
// Import modules
import {
    RESOURCE_TYPE,
} from './constants';

import {
    isValidBase64,
} from '../helpers';

// ============================================================
// Module's constants and variables
const API_ID_REGEXP = /^([a-zA-Z0-9-_:]+):([a-zA-Z0-9-_]+)$/;

// ============================================================
// Functions

/**
 * @param {string} dateString
 * @returns {Date}
 * @public
 */
function toDateFromString(dateString) {
    if (!dateString) {
        return null;
    }

    const date = new Date(dateString);


    if (Number.isNaN(date.getTime())) {
        invalidDates.push(dateString);
        return null;
    }

    return date;
}

/**
 * Filter a list of string and return all elements that are not valid Api ID
 * @param {string[]} list
 * @returns {Array.<id: string[], invalidApiId: string[]>}
 * @private
 */
function getInvalidApiIdList(list, resourceType) {
    return list.filter(apiID => !isValidApiId(apiID, resourceType));
}

/**
 * Check that the given API id is valid.
 * @param {string}                      id
 * @param {ResourceType|[ResourceType]} [resourceType] - Type of resource
 * @returns {boolean}
 * @public
 */
function isValidApiId(id, resourceType) {
    const info = parsePublicId(id);

    if (!info) {
        return false;
    }

    if (!info.type) {
        return false;
    }

    // If resource type is defined, then we check if it match
    if (typeof resourceType === 'string' && info.type !== resourceType) {
        return false;
    }
    else if (Array.isArray(resourceType) && resourceType.length && !resourceType.includes(info.type)) {
        return false;
    }

    if (!isValidBase64(info.id)) {
        return false;
    }

    return Boolean(info.id);
}

/**
 * Parse a public ID and return it's type and real id
 * @param {string} apiId
 * @returns {{type: string, id: string}}
 * @public
 */
function parsePublicId(apiId) {
    const decoded = base64url.decode(apiId);

    const match = decoded.match(API_ID_REGEXP);

    if (!match) {
        return null;
    }

    return {
        type: match[1],
        id: match[2],
    };
}

/**
 * @param {ApiId} apiId
 * @returns {Id}
 */
function getResourceId(apiId) {
    const parse = parsePublicId(id);

    if (!parse) {
        return null;
    }

    return parse.id;
}

/**
 * Transform an account ID to it's API equivalent
 * @param {string} id
 * @public
 */
function toApiId(id) {
    return base64url.encode(`${ACCOUNT_TYPE_CODE}:${id}`);
}

/**
 * Create a query parameter error
 * @param {string} code    - Code of the error
 * @param {string} message - 
 * @returns {QueryParameterError}
 */
function toQueryParameterError({
    code,
    message,
    parameter,
    value,
}) {
    return {
        code,
        message,
        parameter,
        value,
    };
}

// ============================================================
// Exports
export {
    getInvalidApiIdList,
    getResourceId,
    isValidApiId,
    parsePublicId,
    toApiId,
    toDateFromString,
    toQueryParameterError,
};
