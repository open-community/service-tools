// ============================================================
// Helpers

/**
 * @param {string} dateString
 * @returns {Date}
 * @public
 */
function toDateFromString(dateString) {
    if (typeof dateString !== 'string') {
        return null;
    }

    const epoch = Date.parse(dateString);
    const date = new Date(epoch);

    if (Number.isNaN(date.getTime()) || date.toISOString() !== dateString) {
        return null;
    }

    return date;
}

// ============================================================
// Exports
export {
    toDateFromString,
};
