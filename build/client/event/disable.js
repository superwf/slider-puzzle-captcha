'use strict';

var _cache = require('../cache');

var _cache2 = _interopRequireDefault(_cache);

var _emitter = require('../../lib/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _dom = require('../dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_emitter2.default.on('disable', function () {
  _cache2.default.set({ enable: false });
  var tip = _cache2.default.tip;

  (0, _dom.updateClass)(tip, 'disable', 'add');
});