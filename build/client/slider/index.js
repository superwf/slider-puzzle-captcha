'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _eventName = require('../eventName');

var _eventName2 = _interopRequireDefault(_eventName);

var _emitter = require('../../lib/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _dom = require('../dom');

var _cache = require('../cache');

var _cache2 = _interopRequireDefault(_cache);

var _handler = require('./handler');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// slider中绑定事件
var slider = function slider() {
  var root = _cache2.default.root;
  var refresh = _cache2.default.refresh;
  var slider = _cache2.default.slider;

  (0, _dom.hover)(root, _handler.onHover, _handler.offHover);
  (0, _dom.listen)(slider, _eventName2.default.start, _handler.startFunc);

  var refreshFunc = function refreshFunc() {
    _emitter2.default.emit('refresh');
  };
  (0, _dom.listen)(refresh, _eventName2.default.start, refreshFunc);
  var removeSlider = function removeSlider() {
    (0, _dom.remove)(slider, _eventName2.default.start, _handler.startFunc);
    (0, _dom.remove)(refresh, _eventName2.default.start, refreshFunc);
  };

  removeSlider.cache = _cache2.default;
  removeSlider.emitter = _emitter2.default;
  return removeSlider;
};

// events


exports.default = slider;