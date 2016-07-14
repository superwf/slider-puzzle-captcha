'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = {};

var fetchKeys = function fetchKeys() {
  return Promise.resolve(Object.keys(store));
};

var remove = function remove(key) {
  delete store[key];
};

exports.default = {
  set: function set(key, val) {
    store[key] = val;
  },

  get: function get(key) {
    var val = store[key];
    if (val !== undefined) {
      return Promise.resolve(val);
    }
    return Promise.reject(null);
  },

  remove: remove,

  keys: fetchKeys,

  clear: function clear(force) {
    if (force) {
      return fetchKeys().then(function (keys) {
        return keys.forEach(remove);
      });
    }
    return fetchKeys().then(function (keys) {
      var now = Date.now();
      keys.forEach(function (key) {
        var time = store[key] ? store[key].time : false;
        if (time && now - store[key].time > _config2.default.expire) {
          remove(key);
        }
      });
    });
  }
};