'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _redis = require('./redis');

var _redis2 = _interopRequireDefault(_redis);

var _memory = require('./memory');

var _memory2 = _interopRequireDefault(_memory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = _config2.default.store === 'redis' ? (0, _redis2.default)() : _memory2.default; /*
                                                                                             * 所有store类型需要实现五个方法
                                                                                             * get set keys remove clear
                                                                                             * */

exports.default = store;