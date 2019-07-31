// ============================================================
// Import modules
import RequestError from './RequestError';

// ============================================================
// Error
/**
 * @memberOf http.request.errors
 * @public
 */
class InvalidResourceTypeError extends RequestError {
    /**
     * @param {string}         parameter
     * @param {string}         message
     * @param {ResourceType[]} expectedTypes
     * @param {string}         apiId
     */
    constructor({
        parameter,
        message = 'Invalid resource type or not a valid resource ID',
        expectedTypes = [],
        apiId,
    }) {
        super(parameter, message);

        this.exptedTypes = typeof expectedTypes === 'string'
            ? [expectedTypes]
            : expectedTypes;

        this.apiId = apiId;
    }
}

// ============================================================
// Exports
export default InvalidResourceTypeError;
