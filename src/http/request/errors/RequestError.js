// ============================================================
// Error
class RequestError {
    constructor(parameter, message) {
        this.message = message;
        this.parameter = parameter;
    }
}

// ============================================================
// Exports
export default RequestError;
