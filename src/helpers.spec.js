/* eslint-env node, mocha */

// ============================================================
// Import packages
import { assert } from 'chai';

// ============================================================
// Import modules
import {
    toDateFromString,
} from './helpers';

// ============================================================
// Tests

describe('helpers', () => {
    describe('toDateFromString', () => {
        it('return null if invalid date string', () => {
            assert.isNull(toDateFromString(), 'No date provided');
            assert.isNull(toDateFromString(''), 'Parameter is an empty string');
            assert.isNull(toDateFromString([]), 'Parameter is an array');
            assert.isNull(toDateFromString({}), 'Parameter is an object');
            assert.isNull(toDateFromString(1), 'Parameter is a number');
            assert.isNull(toDateFromString(null), 'Parameter is null');

            const date = new Date();

            assert.isNull(toDateFromString('|'), 'Parameter is a fake string');
            assert.isNull(toDateFromString(`|${date}`), 'Parameter is an invalid date');
        });

        it('return a date if valid', () => {
            const date = new Date();

            const stringDate = date.toISOString();

            const newDate = toDateFromString(stringDate);

            assert.equal(date.getTime(), newDate.getTime());
            assert.notEqual(date, newDate);
        });
    });
});
