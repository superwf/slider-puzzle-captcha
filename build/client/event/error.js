'use strict';

var _cache = require('../cache');

var _cache2 = _interopRequireDefault(_cache);

var _emitter = require('../../lib/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _dom = require('../dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_emitter2.default.on('server:error', function () {
  _cache2.default.set({ enable: false });
  var tip = _cache2.default.tip;

  (0, _dom.updateClass)(tip, 'disable', 'remove');
  (0, _dom.updateClass)(tip, 'fail', 'remove');
  (0, _dom.updateClass)(tip, 'broken', 'add');
  _emitter2.default.emit('notify', '<span class="error">服务器错误</span>请稍后刷新重试');
});