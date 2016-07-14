'use strict';

var _cache = require('../cache');

var _cache2 = _interopRequireDefault(_cache);

var _emitter = require('../../lib/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _dom = require('../dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import eventName from '../../eventName'

_emitter2.default.on('notify', function (message) {
  _cache2.default.notify.innerHTML = message;

  (0, _dom.updateClass)(_cache2.default.notify, 'active', 'add');
});

_emitter2.default.on('notify:hide', function () {
  (0, _dom.updateClass)(_cache2.default.notify, 'active', 'remove');
});