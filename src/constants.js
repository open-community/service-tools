// ============================================================
// Constants
const BASE64_REGEXP = /^[a-zA-Z0-9-_]*$/;

/**
 * @enum {string} ResourceType
 */
const ResourceType = {
    /** Represent a user account resource */
    ACCOUNT: 'account',

    /** Represent an identity */
    IDENTITY: 'identity',

    /** Represent a text */
    TEXT: 'text',
};

// ============================================================
// Exports
export {
    BASE64_REGEXP,
    ResourceType,
};
