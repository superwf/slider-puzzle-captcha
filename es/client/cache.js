'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 存储各个元素，当重新获取验证信息时更新该对象
var cache = {
  enable: false
};

var set = function set(obj) {
  (0, _assign2.default)(cache, obj);
};
cache.set = set;

// clear all cache
// only use in test
cache.clear = function () {
  var keys = Object.keys(cache);
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    if (key === 'set' || key === 'clear') {
      continue;
    }
    delete cache[key];
  }
  cache.enable = false;
};

exports.default = cache;