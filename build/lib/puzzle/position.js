'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _random = require('lodash/random');

var _random2 = _interopRequireDefault(_random);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  // x坐标从总宽度三分之一开始取
  // puzzle块距离右边至少有一个puzzleSide的距离
  var x = (0, _random2.default)(_config2.default.bgWidth / 3, _config2.default.bgWidth - _config2.default.puzzleSide * 2);

  // puzzle块距离下边至少有一个puzzleSide的距离
  var y = (0, _random2.default)(_config2.default.puzzleSide / 2, _config2.default.bgHeight - _config2.default.puzzleSide * 2);
  return { x: x, y: y };
};