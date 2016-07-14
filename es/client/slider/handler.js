'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startFunc = exports.offHover = exports.onHover = undefined;

var _eventName = require('../eventName');

var _eventName2 = _interopRequireDefault(_eventName);

var _cache = require('../cache');

var _cache2 = _interopRequireDefault(_cache);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _emitter = require('../../lib/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _dom = require('../dom');

var _validate = require('./validate');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var move = _eventName2.default.move;
var end = _eventName2.default.end;


var startFunc = function startFunc(startEvt) {

  if (_eventName2.default.touch) {
    onHover();
  }

  _cache2.default.set({ startTime: Date.now() });
  if (!_cache2.default.enable) {
    return;
  }

  var track = _cache2.default.track;
  var slider = _cache2.default.slider;
  var bg = _cache2.default.bg;
  var puzzleBg = _cache2.default.puzzleBg;
  var puzzle = _cache2.default.puzzle;
  var token = _cache2.default.token;

  var maxX = track.clientWidth - slider.offsetWidth;
  bg.style.opacity = 0;
  puzzle.style.opacity = 1;
  puzzleBg.style.opacity = 1;

  var originX = slider.offsetLeft;
  var startX = (0, _dom.clientX)(startEvt);

  (0, _dom.updateClass)(slider, 'move', 'add');

  // 移动的距离
  var offsetX = void 0;

  var moveFunc = function moveFunc(moveEvt) {
    moveEvt.preventDefault();
    var x = (0, _dom.clientX)(moveEvt) - startX;
    offsetX = originX + x;
    if (offsetX < 0) {
      offsetX = 0;
    }
    if (offsetX > maxX) {
      offsetX = maxX;
    }
    slider.style.left = offsetX + 'px';
    puzzle.style.left = offsetX + 'px';
  };

  var endFunc = function endFunc() {
    (0, _dom.remove)(document, move, moveFunc);
    (0, _dom.remove)(document, end, endFunc);
    _cache2.default.set({ endTime: Date.now() });
    (0, _dom.updateClass)(slider, 'move', 'remove');
    // 移动距离最小为一个puzzle边长
    if (offsetX < _config2.default.puzzleSide) {
      _emitter2.default.emit('validate:failure');
    } else {
      (0, _validate2.default)({ token: token, x: offsetX }).then(function (r) {
        if (r.ok) {
          _emitter2.default.emit('validate:success');
        } else {
          _emitter2.default.emit('validate:failure');
        }
        if (_eventName2.default.touch) {
          setTimeout(offHover, 1500);
        }
      });
    }
  };
  (0, _dom.listen)(document, move, moveFunc);

  (0, _dom.listen)(document, end, endFunc);
};

var fadeTick = void 0;
var onHover = function onHover() {
  (0, _dom.updateClass)(_cache2.default.imageContainer, ['animated', 'fadeIn'], 'add');
  clearTimeout(fadeTick);
};
var offHover = function offHover() {
  var hide = function hide() {
    (0, _dom.updateClass)(_cache2.default.imageContainer, ['animated', 'fadeIn'], 'remove');
  };
  if (_eventName2.default.touch) {
    hide();
  } else {
    fadeTick = setTimeout(hide, 1500);
  }
};
exports.onHover = onHover;
exports.offHover = offHover;
exports.startFunc = startFunc;