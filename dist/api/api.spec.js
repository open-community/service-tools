"use strict";

var _chai = require("chai");

var _faker = _interopRequireDefault(require("faker"));

var _base64url = _interopRequireDefault(require("base64url"));

var _constants = require("../constants");

var _api = require("./api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env node, mocha */
// ============================================================
// Import packages
// ============================================================
// Import modules
// ============================================================
// Tests
describe('getInvalidApiIdList', () => {
  it('should return empty list if initial list is empty', () => {
    const result = (0, _api.getInvalidApiIdList)([]);

    _chai.assert.isArray(result);

    _chai.assert.isEmpty(result);
  });
  it('should empty list if no invalid ID', () => {
    let list;
    let result; // ===============
    // 1 element

    list = [generateId()];
    result = (0, _api.getInvalidApiIdList)(list);

    _chai.assert.isArray(result);

    _chai.assert.isEmpty(result); // ===============
    // 3 element


    list = [generateId(), generateId(), generateId()];
    result = (0, _api.getInvalidApiIdList)(list);

    _chai.assert.isArray(result);

    _chai.assert.isEmpty(result);
  });
  it('should non-empty list if invalid ID', () => {
    let list;
    let result; // ===============
    // 1 element, 1 fake

    list = [generateFakeId()];
    result = (0, _api.getInvalidApiIdList)(list);

    _chai.assert.isArray(result);

    _chai.assert.equal(result.length, 1);

    _chai.assert.include(result, list[0]); // ===============
    // 2 element, 1 fake


    list = [generateFakeId(), generateId()];
    result = (0, _api.getInvalidApiIdList)(list);

    _chai.assert.isArray(result);

    _chai.assert.equal(result.length, 1);

    _chai.assert.include(result, list[0]); // ===============
    // 2 element, 1 fake


    list = [generateFakeId(), generateId(), generateFakeId()];
    result = (0, _api.getInvalidApiIdList)(list);

    _chai.assert.isArray(result);

    _chai.assert.equal(result.length, 2);

    _chai.assert.include(result, list[0]);

    _chai.assert.include(result, list[2]);
  });
  it('should return unique elements', () => {
    const fakeId = generateFakeId();
    const list = [fakeId, generateId(), fakeId];
    const result = (0, _api.getInvalidApiIdList)(list);

    _chai.assert.isArray(result);

    _chai.assert.equal(result.length, 1);

    _chai.assert.include(result, fakeId);
  });
  it('should return ID that doesn\'t match resource type', () => {
    const invalidType = _constants.ResourceType.ACCOUNT;
    const validType = _constants.ResourceType.TEXT;
    const list = [generateId(invalidType), generateId(invalidType), generateId(validType)];
    const result = (0, _api.getInvalidApiIdList)(list, validType);

    _chai.assert.isArray(result);

    _chai.assert.equal(result.length, 2);

    _chai.assert.include(result, list[0]);

    _chai.assert.include(result, list[1]);
  });
  it('should return ID that doesn\'t match one of resource', () => {
    const invalidType = _constants.ResourceType.ACCOUNT;
    const validTypes = [_constants.ResourceType.TEXT, _constants.ResourceType.IDENTITY];
    const list = [generateId(invalidType), generateId(invalidType), generateId(validTypes[0]), generateId(validTypes[0]), generateId(validTypes[1]), generateId(validTypes[1])];
    const result = (0, _api.getInvalidApiIdList)(list, validTypes);

    _chai.assert.isArray(result);

    _chai.assert.equal(result.length, 2);

    _chai.assert.include(result, list[0]);

    _chai.assert.include(result, list[1]);
  });
});
describe('getResourceId', () => {
  it('return null if invalid apiId', () => {
    const apiId = generateFakeId();

    _chai.assert.isNull((0, _api.getResourceId)(apiId));
  });
  it('return null if invalid resource type', () => {
    const validResourceType = _constants.ResourceType.ACCOUNT;
    const invalidResourceType = _constants.ResourceType.TEXT;
    const apiId = generateId(invalidResourceType);

    _chai.assert.isNull((0, _api.getResourceId)(apiId, validResourceType));
  });
  it('return null if invalid resource type', () => {
    const validResourceType = [_constants.ResourceType.ACCOUNT, _constants.ResourceType.IDENTITY];
    const invalidResourceType = _constants.ResourceType.TEXT;
    const apiId = generateId(invalidResourceType);

    _chai.assert.isNull((0, _api.getResourceId)(apiId, validResourceType));
  });
  it('return ID if valid resource type', () => {
    const resourceType = _constants.ResourceType.ACCOUNT;

    const resourceId = _faker.default.random.uuid();

    const apiId = (0, _api.toApiId)(resourceType, resourceId);

    _chai.assert.equal((0, _api.getResourceId)(apiId, resourceType), resourceId);
  });
  it('return ID if type is in list', () => {
    const resourceTypes = [_constants.ResourceType.ACCOUNT, _constants.ResourceType.IDENTITY];

    const resourceId = _faker.default.random.uuid();

    const apiIdAccount = (0, _api.toApiId)(resourceTypes[0], resourceId);
    const apiIdIdentity = (0, _api.toApiId)(resourceTypes[1], resourceId);

    _chai.assert.equal((0, _api.getResourceId)(apiIdAccount, resourceTypes), resourceId);

    _chai.assert.equal((0, _api.getResourceId)(apiIdIdentity, resourceTypes), resourceId);
  });
  it('return ID if no resource type', () => {
    const resourceId = _faker.default.random.uuid();

    const apiId = (0, _api.toApiId)(_faker.default.random.arrayElement(Object.values(_constants.ResourceType)), resourceId);

    _chai.assert.equal((0, _api.getResourceId)(apiId), resourceId);
  });
});
describe('getResourceType', () => {
  it('return null if invalid apiId', () => {
    const fakeId = generateFakeId();

    _chai.assert.isNull((0, _api.getResourceType)(fakeId));
  });
  it('return the type of the resource', () => {
    const resourcetype = _constants.ResourceType.IDENTITY;
    const apiId = generateId(resourcetype);

    _chai.assert.equal((0, _api.getResourceType)(apiId), resourcetype);
  });
});
describe('isValidApiId', () => {
  it('return false if type is invalid', () => {
    _chai.assert.isFalse((0, _api.isValidApiId)());

    _chai.assert.isFalse((0, _api.isValidApiId)([]));

    _chai.assert.isFalse((0, _api.isValidApiId)({}));

    _chai.assert.isFalse((0, _api.isValidApiId)(1));
  });
  it('return false if resource type is invalid', () => {});
});
describe('parsePublicId', () => {
  it('should return null if not a valid apiID', () => {
    _chai.assert.isNull((0, _api.parsePublicId)());

    _chai.assert.isNull((0, _api.parsePublicId)([]));

    _chai.assert.isNull((0, _api.parsePublicId)(0));

    _chai.assert.isNull((0, _api.parsePublicId)(''));

    _chai.assert.isNull((0, _api.parsePublicId)('12457'));

    const encode = _base64url.default.encode('1123456');

    _chai.assert.isNull((0, _api.parsePublicId)(encode));
  });
  it('should return the type and ID', () => {
    const resourceType = _constants.ResourceType.TEXT;

    const resourceId = _faker.default.random.uuid();

    const apiId = (0, _api.toApiId)(resourceType, resourceId);
    const parse = (0, _api.parsePublicId)(apiId);

    _chai.assert.equal(parse.id, resourceId);

    _chai.assert.equal(parse.type, resourceType);
  });
});
describe('toApiId', () => {
  it('Should return a string', () => {
    const resourceId = _faker.default.random.uuid();

    const resourceType = _constants.ResourceType.IDENTITY;
    const apiId = (0, _api.toApiId)(resourceType, resourceId);

    _chai.assert.isString(apiId, 'return a string');

    _chai.assert.match(apiId, BASE64_REGEXP);

    const parse = (0, _api.parsePublicId)(apiId);

    _chai.assert.equal(parse.id, resourceId);

    _chai.assert.equal(parse.type, resourceType);
  });
});
describe('toQueryParameterError', () => {
  it('Should return a QueryParameterError object', () => {
    const code = _faker.default.lorem.word(1);

    const message = _faker.default.lorem.sentences(2);

    const parameter = _faker.default.lorem.word(1);

    const value = {
      x: _faker.default.lorem.word(1)
    };
    const queryParameterError = (0, _api.toQueryParameterError)({
      code,
      message,
      parameter,
      value
    });

    _chai.assert.equal(queryParameterError.code, code);

    _chai.assert.equal(queryParameterError.message, message);

    _chai.assert.equal(queryParameterError.parameter, parameter);

    _chai.assert.deepEqual(queryParameterError.value, value);

    _chai.assert.notStrictEqual(queryParameterError.value, value);
  });
}); // ============================================================
// Helpers

function generateId(type) {
  let resourceType = type;

  if (!resourceType) {
    resourceType = _faker.default.random.arrayElement(Object.values(_constants.ResourceType));
  }

  const id = _faker.default.random.uuid();

  return (0, _api.toApiId)(resourceType, id);
}

function generateFakeId() {
  return _faker.default.random.uuid();
}
//# sourceMappingURL=api.spec.js.map
