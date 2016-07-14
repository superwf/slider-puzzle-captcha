'use strict';

var _cache = require('../cache');

var _cache2 = _interopRequireDefault(_cache);

var _emitter = require('../../lib/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _dom = require('../dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_emitter2.default.on('validate:success', function () {
  _emitter2.default.emit('disable');
  (0, _dom.updateClass)(_cache2.default.root, 'ok', 'add');
  (0, _dom.updateClass)(_cache2.default.tip, 'ok', 'add');
  _cache2.default.puzzle.style.opacity = 0;
  _cache2.default.puzzleBg.style.opacity = 0;
  _cache2.default.bg.style.opacity = 1;
  _cache2.default.hint.style.opacity = 0;

  var elapsedTime = (_cache2.default.endTime - _cache2.default.startTime) / 1000;
  _emitter2.default.emit('notify', '<span class="success">验证成功</span>花费了' + elapsedTime + '秒');
  setTimeout(function () {
    _emitter2.default.emit('notify:hide');
  }, 1500);
});

_emitter2.default.on('validate:failure', function () {
  (0, _dom.updateClass)(_cache2.default.tip, 'fail', 'add');
  _emitter2.default.emit('notify', '<span class="error">验证失败</span>，请重新拖动拼图');
  setTimeout(function () {
    (0, _dom.updateClass)(_cache2.default.tip, 'fail', 'remove');
    _emitter2.default.emit('reset');
  }, 500);
});