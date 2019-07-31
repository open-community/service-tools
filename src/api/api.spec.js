/* eslint-env node, mocha */

// ============================================================
// Import packages
import { assert } from 'chai';
import faker from 'faker';
import base64url from 'base64url';

// ============================================================
// Import modules
import {
    ResourceType,
} from '../constants';

import {
    getInvalidApiIdList,
    getResourceId,
    getResourceType,
    isValidApiId,
    parsePublicId,
    toApiId,
    toQueryParameterError,
} from './api';

// ============================================================
// Tests

describe('getInvalidApiIdList', () => {
    it('should return empty list if initial list is empty', () => {
        const result = getInvalidApiIdList([]);
        assert.isArray(result);
        assert.isEmpty(result);
    });

    it('should empty list if no invalid ID', () => {
        let list;
        let result;

        // ===============
        // 1 element
        list = [
            generateId(),
        ];

        result = getInvalidApiIdList(list);

        assert.isArray(result);
        assert.isEmpty(result);

        // ===============
        // 3 element
        list = [
            generateId(),
            generateId(),
            generateId(),
        ];

        result = getInvalidApiIdList(list);

        assert.isArray(result);
        assert.isEmpty(result);
    });

    it('should non-empty list if invalid ID', () => {
        let list;
        let result;

        // ===============
        // 1 element, 1 fake
        list = [
            generateFakeId(),
        ];

        result = getInvalidApiIdList(list);

        assert.isArray(result);
        assert.equal(result.length, 1);
        assert.include(result, list[0]);

        // ===============
        // 2 element, 1 fake
        list = [
            generateFakeId(),
            generateId(),
        ];

        result = getInvalidApiIdList(list);

        assert.isArray(result);
        assert.equal(result.length, 1);
        assert.include(result, list[0]);

        // ===============
        // 2 element, 1 fake
        list = [
            generateFakeId(),
            generateId(),
            generateFakeId(),
        ];

        result = getInvalidApiIdList(list);

        assert.isArray(result);
        assert.equal(result.length, 2);
        assert.include(result, list[0]);
        assert.include(result, list[2]);
    });

    it('should return unique elements', () => {
        const fakeId = generateFakeId();

        const list = [
            fakeId,
            generateId(),
            fakeId,
        ];

        const result = getInvalidApiIdList(list);

        assert.isArray(result);
        assert.equal(result.length, 1);
        assert.include(result, fakeId);
    });

    it('should return ID that doesn\'t match resource type', () => {
        const invalidType = ResourceType.ACCOUNT;
        const validType = ResourceType.TEXT;

        const list = [
            generateId(invalidType),
            generateId(invalidType),
            generateId(validType),
        ];

        const result = getInvalidApiIdList(list, validType);

        assert.isArray(result);
        assert.equal(result.length, 2);
        assert.include(result, list[0]);
        assert.include(result, list[1]);
    });

    it('should return ID that doesn\'t match one of resource', () => {
        const invalidType = ResourceType.ACCOUNT;
        const validTypes = [ResourceType.TEXT, ResourceType.IDENTITY];

        const list = [
            generateId(invalidType),
            generateId(invalidType),
            generateId(validTypes[0]),
            generateId(validTypes[0]),
            generateId(validTypes[1]),
            generateId(validTypes[1]),
        ];

        const result = getInvalidApiIdList(list, validTypes);

        assert.isArray(result);
        assert.equal(result.length, 2);
        assert.include(result, list[0]);
        assert.include(result, list[1]);
    });
});

describe('getResourceId', () => {
    it('return null if invalid apiId', () => {
        const apiId = generateFakeId();
        assert.isNull(getResourceId(apiId));
    });

    it('return null if invalid resource type', () => {
        const validResourceType = ResourceType.ACCOUNT;
        const invalidResourceType = ResourceType.TEXT;

        const apiId = generateId(invalidResourceType);

        assert.isNull(getResourceId(apiId, validResourceType));
    });

    it('return null if invalid resource type', () => {
        const validResourceType = [ResourceType.ACCOUNT, ResourceType.IDENTITY];
        const invalidResourceType = ResourceType.TEXT;

        const apiId = generateId(invalidResourceType);

        assert.isNull(getResourceId(apiId, validResourceType));
    });

    it('return ID if valid resource type', () => {
        const resourceType = ResourceType.ACCOUNT;
        const resourceId = faker.random.uuid();

        const apiId = toApiId(resourceType, resourceId);

        assert.equal(getResourceId(apiId, resourceType), resourceId);
    });

    it('return ID if type is in list', () => {
        const resourceTypes = [ResourceType.ACCOUNT, ResourceType.IDENTITY];
        const resourceId = faker.random.uuid();

        const apiIdAccount = toApiId(resourceTypes[0], resourceId);
        const apiIdIdentity = toApiId(resourceTypes[1], resourceId);

        assert.equal(getResourceId(apiIdAccount, resourceTypes), resourceId);
        assert.equal(getResourceId(apiIdIdentity, resourceTypes), resourceId);
    });

    it('return ID if no resource type', () => {
        const resourceId = faker.random.uuid();

        const apiId = toApiId(
            faker.random.arrayElement(Object.values(ResourceType)),
            resourceId,
        );

        assert.equal(getResourceId(apiId), resourceId);
    });
});

describe('getResourceType', () => {
    it('return null if invalid apiId', () => {
        const fakeId = generateFakeId();

        assert.isNull(getResourceType(fakeId));
    });

    it('return the type of the resource', () => {
        const resourcetype = ResourceType.IDENTITY;
        const apiId = generateId(resourcetype);

        assert.equal(getResourceType(apiId), resourcetype);
    });
});

describe('isValidApiId', () => {
    it('return false if type is invalid', () => {
        assert.isFalse(isValidApiId());
        assert.isFalse(isValidApiId([]));
        assert.isFalse(isValidApiId({}));
        assert.isFalse(isValidApiId(1));
    });

    it('return false if resource type is invalid', () => {

    });
});

describe('parsePublicId', () => {
    it('should return null if not a valid apiID', () => {
        assert.isNull(parsePublicId());
        assert.isNull(parsePublicId([]));
        assert.isNull(parsePublicId(0));
        assert.isNull(parsePublicId(''));
        assert.isNull(parsePublicId('12457'));

        const encode = base64url.encode('1123456');

        assert.isNull(parsePublicId(encode));
    });

    it('should return the type and ID', () => {
        const resourceType = ResourceType.TEXT;
        const resourceId = faker.random.uuid();

        const apiId = toApiId(resourceType, resourceId);

        const parse = parsePublicId(apiId);

        assert.equal(parse.id, resourceId);
        assert.equal(parse.type, resourceType);
    });
});

describe('toApiId', () => {
    it('Should return a string', () => {
        const resourceId = faker.random.uuid();
        const resourceType = ResourceType.IDENTITY;

        const apiId = toApiId(resourceType, resourceId);

        assert.isString(apiId, 'return a string');

        assert.match(apiId, BASE64_REGEXP);

        const parse = parsePublicId(apiId);

        assert.equal(parse.id, resourceId);
        assert.equal(parse.type, resourceType);
    });
});

describe('toQueryParameterError', () => {
    it('Should return a QueryParameterError object', () => {
        const code = faker.lorem.word(1);
        const message = faker.lorem.sentences(2);
        const parameter = faker.lorem.word(1);
        const value = {
            x: faker.lorem.word(1),
        };

        const queryParameterError = toQueryParameterError({
            code,
            message,
            parameter,
            value,
        });

        assert.equal(queryParameterError.code, code);
        assert.equal(queryParameterError.message, message);
        assert.equal(queryParameterError.parameter, parameter);
        assert.deepEqual(queryParameterError.value, value);
        assert.notStrictEqual(queryParameterError.value, value);
    });
});

// ============================================================
// Helpers

function generateId(type) {
    let resourceType = type;

    if (!resourceType) {
        resourceType = faker.random.arrayElement(Object.values(ResourceType));
    }

    const id = faker.random.uuid();

    return toApiId(resourceType, id);
}

function generateFakeId() {
    return faker.random.uuid();
}
