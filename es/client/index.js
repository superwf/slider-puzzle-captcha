'use strict';

require('isomorphic-fetch');

var _es6Promise = require('es6-promise');

var _es6Promise2 = _interopRequireDefault(_es6Promise);

var _initDomTree = require('./initDomTree');

var _initDomTree2 = _interopRequireDefault(_initDomTree);

var _puzzle = require('./puzzle');

var _puzzle2 = _interopRequireDefault(_puzzle);

var _slider = require('./slider');

var _slider2 = _interopRequireDefault(_slider);

require('./event/reset');

require('./event/enable');

require('./event/disable');

require('./event/validate');

require('./event/notify');

require('./event/refresh');

require('./event/error');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_es6Promise2.default.polyfill();

window.addEventListener('load', function () {
  var root = document.querySelector('.slider-puzzle');
  (0, _initDomTree2.default)(root);
  (0, _puzzle2.default)(root);
  (0, _slider2.default)();
});