// ============================================================
// Import modules
import ApiError from './ApiError';

// ============================================================
// Error
/**
 * @memberOf http.request.errors
 * @public
 */
class InvalidApiIdError extends ApiError {
    /**
     *
     * @param {string} parameter
     * @param {string} message
     * @param {string} apiId
     */
    constructor({
        message = 'Not a valid api ID',
        apiId,
    }) {
        super(
            message,
        );
        this.apiId = apiId;
    }
}

// ============================================================
// Exports
export default InvalidApiIdError;
