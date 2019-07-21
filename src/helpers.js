import { BASE64_REGEXP } from './constants';

// ============================================================
// Helpers
/**
 * Indicate if the given string is a valid base64 string or not.
 * @param {*} string
 * @returns {boolean}
 */
function isValidBase64(string) {
    return BASE64_REGEXP.test(string);
}

// ============================================================
// Exports
export {
    isValidBase64,
};
