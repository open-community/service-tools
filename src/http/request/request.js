// ============================================================
// Import modules
import {
    isValidApiId,
} from '../../api';

import * as httpErrors from './errors';
import { toDateFromString } from '../../helpers';

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
        return { errors: [] };
    }

    const date = toDateFromString(dateString);

    if (!date) {
        /** @type {RequestError} */
        const error = new httpErrors.InvalidParameterError({
            parameter,
            expectedType: 'Date',
            value: dateString,
        });

        return { errors: [error] };
    }

    return { value: date, errors: [] };
}

/**
 *
 * @param {Request} req
 * @param {string}  parameter
 * @returns {string[]}
 */
function getListFromReq(req, parameter) {
    return typeof req.query[parameter] === 'string'
        ? [req.query[parameter]]
        : req.query[parameter] || [];
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

    const createError = expectedTypes
        ? apiId => new httpErrors.InvalidResourceTypeError({
            parameter,
            expectedTypes,
            apiId,
        })
        : apiId => new httpErrors.InvalidApiIdError({
            parameter,
            apiId,
        });

    // Returning the list and the errors
    return listId.reduce(({ value, errors }, apiId) => {
        if (isValidApiId(apiId, expectedTypes)) {
            value.push(apiId);
        }
        else {
            errors.push(createError(apiId));
        }

        return { value, errors };
    }, { value: [], errors: [] });
}

// ============================================================
// Exports
export {
    getListApiIdFromReq,
    getListFromReq,
    getOneDate,
};
