'use strict';

var _cache = require('../cache');

var _cache2 = _interopRequireDefault(_cache);

var _emitter = require('../../lib/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _dom = require('../dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_emitter2.default.on('reset', function () {
  var slider = _cache2.default.slider;
  var puzzle = _cache2.default.puzzle;

  (0, _dom.updateClass)(puzzle, ['animated', 'flash'], 'add');
  _emitter2.default.emit('disable');

  setTimeout(function () {
    var speed = 4;
    var tick = setInterval(function () {
      if (slider.offsetLeft > 0) {
        var left = slider.offsetLeft - speed;
        if (left < 0) {
          left = 0;
        }
        left += 'px';
        slider.style.left = left;
        puzzle.style.left = left;
      } else {
        clearInterval(tick);
        (0, _dom.updateClass)(puzzle, ['animated', 'flash'], 'remove');
        _emitter2.default.emit('enable');
        setTimeout(function () {
          _emitter2.default.emit('notify:hide');
        }, 1500);
        (0, _dom.updateClass)(_cache2.default.root, 'ok', 'remove');
        (0, _dom.updateClass)(_cache2.default.tip, 'ok', 'remove');
      }
    }, 5);
  }, 500);
});