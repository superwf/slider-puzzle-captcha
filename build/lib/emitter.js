'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _microevent = require('microevent');

var _microevent2 = _interopRequireDefault(_microevent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emitter = new _microevent2.default();
emitter.on = emitter.bind;
emitter.emit = emitter.trigger;
emitter.off = emitter.unbind;

// 清空所有事件，只在测试代码中使用
// emitter.clear = () => {
//   emitter._events = {}
// }

exports.default = emitter;