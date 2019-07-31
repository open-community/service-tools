import RequestError from './RequestError';

// ============================================================
// Error
class InvalidParameterError extends RequestError {
    constructor({
        message = 'Invalid parameter value',
        parameter,
        type,
        value,
        expectedType,
    }) {
        super(parameter, message);
        this.parameter = parameter;
        this.value = value;
        this.expectedType = expectedType;
        this.type = type;
    }
}

// ============================================================
// Exports
export default InvalidParameterError;

