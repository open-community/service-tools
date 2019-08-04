"use strict";

var _chai = require("chai");

var _faker = _interopRequireDefault(require("faker"));

var _base64url = _interopRequireDefault(require("base64url"));

var _constants = require("../constants");

var _api = require("./api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-env node, mocha */
// ============================================================
// Import packages
// ============================================================
// Import modules
// ============================================================
// Tests
describe('getInvalidApiIdList', function () {
  it('should return empty list if initial list is empty', function () {
    var result = (0, _api.getInvalidApiIdList)([]);

    _chai.assert.isArray(result);

    _chai.assert.isEmpty(result);
  });
  it('should empty list if no invalid ID', function () {
    var list;
    var result; // ===============
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
  it('should non-empty list if invalid ID', function () {
    var list;
    var result; // ===============
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
  it('should return unique elements', function () {
    var fakeId = generateFakeId();
    var list = [fakeId, generateId(), fakeId];
    var result = (0, _api.getInvalidApiIdList)(list);

    _chai.assert.isArray(result);

    _chai.assert.equal(result.length, 1);

    _chai.assert.include(result, fakeId);
  });
  it('should return ID that doesn\'t match resource type', function () {
    var invalidType = _constants.ResourceType.ACCOUNT;
    var validType = _constants.ResourceType.TEXT;
    var list = [generateId(invalidType), generateId(invalidType), generateId(validType)];
    var result = (0, _api.getInvalidApiIdList)(list, validType);

    _chai.assert.isArray(result);

    _chai.assert.equal(result.length, 2);

    _chai.assert.include(result, list[0]);

    _chai.assert.include(result, list[1]);
  });
  it('should return ID that doesn\'t match one of resource', function () {
    var invalidType = _constants.ResourceType.ACCOUNT;
    var validTypes = [_constants.ResourceType.TEXT, _constants.ResourceType.IDENTITY];
    var list = [generateId(invalidType), generateId(invalidType), generateId(validTypes[0]), generateId(validTypes[0]), generateId(validTypes[1]), generateId(validTypes[1])];
    var result = (0, _api.getInvalidApiIdList)(list, validTypes);

    _chai.assert.isArray(result);

    _chai.assert.equal(result.length, 2);

    _chai.assert.include(result, list[0]);

    _chai.assert.include(result, list[1]);
  });
});
describe('getResourceId', function () {
  it('return null if invalid apiId', function () {
    var apiId = generateFakeId();

    _chai.assert.isNull((0, _api.getResourceId)(apiId));
  });
  it('return null if invalid resource type', function () {
    var validResourceType = _constants.ResourceType.ACCOUNT;
    var invalidResourceType = _constants.ResourceType.TEXT;
    var apiId = generateId(invalidResourceType);

    _chai.assert.isNull((0, _api.getResourceId)(apiId, validResourceType));
  });
  it('return null if invalid resource type', function () {
    var validResourceType = [_constants.ResourceType.ACCOUNT, _constants.ResourceType.IDENTITY];
    var invalidResourceType = _constants.ResourceType.TEXT;
    var apiId = generateId(invalidResourceType);

    _chai.assert.isNull((0, _api.getResourceId)(apiId, validResourceType));
  });
  it('return ID if valid resource type', function () {
    var resourceType = _constants.ResourceType.ACCOUNT;

    var resourceId = _faker["default"].random.uuid();

    var apiId = (0, _api.toApiId)(resourceType, resourceId);

    _chai.assert.equal((0, _api.getResourceId)(apiId, resourceType), resourceId);
  });
  it('return ID if type is in list', function () {
    var resourceTypes = [_constants.ResourceType.ACCOUNT, _constants.ResourceType.IDENTITY];

    var resourceId = _faker["default"].random.uuid();

    var apiIdAccount = (0, _api.toApiId)(resourceTypes[0], resourceId);
    var apiIdIdentity = (0, _api.toApiId)(resourceTypes[1], resourceId);

    _chai.assert.equal((0, _api.getResourceId)(apiIdAccount, resourceTypes), resourceId);

    _chai.assert.equal((0, _api.getResourceId)(apiIdIdentity, resourceTypes), resourceId);
  });
  it('return ID if no resource type', function () {
    var resourceId = _faker["default"].random.uuid();

    var apiId = (0, _api.toApiId)(_faker["default"].random.arrayElement(Object.values(_constants.ResourceType)), resourceId);

    _chai.assert.equal((0, _api.getResourceId)(apiId), resourceId);
  });
});
describe('getResourceType', function () {
  it('return null if invalid apiId', function () {
    var fakeId = generateFakeId();

    _chai.assert.isNull((0, _api.getResourceType)(fakeId));
  });
  it('return the type of the resource', function () {
    var resourcetype = _constants.ResourceType.IDENTITY;
    var apiId = generateId(resourcetype);

    _chai.assert.equal((0, _api.getResourceType)(apiId), resourcetype);
  });
});
describe('isValidApiId', function () {
  it('return false if type is invalid', function () {
    _chai.assert.isFalse((0, _api.isValidApiId)());

    _chai.assert.isFalse((0, _api.isValidApiId)([]));

    _chai.assert.isFalse((0, _api.isValidApiId)({}));

    _chai.assert.isFalse((0, _api.isValidApiId)(1));
  });
  it('return false if resource type is invalid', function () {});
});
describe('parsePublicId', function () {
  it('should return null if not a valid apiID', function () {
    _chai.assert.isNull((0, _api.parsePublicId)());

    _chai.assert.isNull((0, _api.parsePublicId)([]));

    _chai.assert.isNull((0, _api.parsePublicId)(0));

    _chai.assert.isNull((0, _api.parsePublicId)(''));

    _chai.assert.isNull((0, _api.parsePublicId)('12457'));

    var encode = _base64url["default"].encode('1123456');

    _chai.assert.isNull((0, _api.parsePublicId)(encode));
  });
  it('should return the type and ID', function () {
    var resourceType = _constants.ResourceType.TEXT;

    var resourceId = _faker["default"].random.uuid();

    var apiId = (0, _api.toApiId)(resourceType, resourceId);
    var parse = (0, _api.parsePublicId)(apiId);

    _chai.assert.equal(parse.id, resourceId);

    _chai.assert.equal(parse.type, resourceType);
  });
});
describe('toApiId', function () {
  it('Should return a string', function () {
    var resourceId = _faker["default"].random.uuid();

    var resourceType = _constants.ResourceType.IDENTITY;
    var apiId = (0, _api.toApiId)(resourceType, resourceId);

    _chai.assert.isString(apiId, 'return a string');

    _chai.assert.match(apiId, BASE64_REGEXP);

    var parse = (0, _api.parsePublicId)(apiId);

    _chai.assert.equal(parse.id, resourceId);

    _chai.assert.equal(parse.type, resourceType);
  });
});
describe('toQueryParameterError', function () {
  it('Should return a QueryParameterError object', function () {
    var code = _faker["default"].lorem.word(1);

    var message = _faker["default"].lorem.sentences(2);

    var parameter = _faker["default"].lorem.word(1);

    var value = {
      x: _faker["default"].lorem.word(1)
    };
    var queryParameterError = (0, _api.toQueryParameterError)({
      code: code,
      message: message,
      parameter: parameter,
      value: value
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
  var resourceType = type;

  if (!resourceType) {
    resourceType = _faker["default"].random.arrayElement(Object.values(_constants.ResourceType));
  }

  var id = _faker["default"].random.uuid();

  return (0, _api.toApiId)(resourceType, id);
}

function generateFakeId() {
  return _faker["default"].random.uuid();
}
//# sourceMappingURL=api.spec.js.map
