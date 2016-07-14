'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var touch = false;
if (typeof window !== 'undefined') {
  global = window;
  touch = 'ontouchstart' in global;
}

// 根据当前浏览器环境获取事件名称
var evt = {
  touch: touch,
  start: touch ? 'touchstart' : 'mousedown',
  move: touch ? 'touchmove' : 'mousemove',
  end: touch ? 'touchend' : 'mouseup',
  onHover: touch ? 'focus' : 'mouseover',
  offHover: touch ? 'blur' : 'mouseout'
};

exports.default = evt;