'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _randomBackground = require('./randomBackground');

var _randomBackground2 = _interopRequireDefault(_randomBackground);

var _imgBackground = require('./imgBackground');

var _imgBackground2 = _interopRequireDefault(_imgBackground);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var background = _config2.default.bgPath ? _imgBackground2.default : _randomBackground2.default;

exports.default = background;