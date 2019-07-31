// ============================================================
// Import modules
import RequestError from './RequestError';

// ============================================================
// Error
/**
 * @memberOf http.request.errors
 * @public
 */
class InvalidApiIdError extends RequestError {
    /**
     *
     * @param {string} parameter
     * @param {string} message
     * @param {string} apiId
     */
    constructor({
        parameter,
        message = 'Not a valid api ID',
        apiId,
    }) {
        super(
            parameter,
            message,
        );
        this.apiId = apiId;
    }
}

// ============================================================
// Exports
export default InvalidApiIdError;
