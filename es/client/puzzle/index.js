'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fetchImg = require('./fetchImg');

var _fetchImg2 = _interopRequireDefault(_fetchImg);

var _insertImg = require('./insertImg');

var _insertImg2 = _interopRequireDefault(_insertImg);

var _curry = require('lodash/curry');

var _curry2 = _interopRequireDefault(_curry);

var _cache = require('../cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// puzzle中加载数据与图片

exports.default = function () {
  return (0, _fetchImg2.default)().then((0, _curry2.default)(_insertImg2.default)(_cache2.default.root));
};