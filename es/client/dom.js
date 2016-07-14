'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateClass = exports.hover = exports.clientX = exports.remove = exports.listen = undefined;

var _eventName = require('./eventName');

var _eventName2 = _interopRequireDefault(_eventName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 添加监听
var listen = function listen(elem, evt, func) {
  elem.addEventListener(evt, func, false);
};

// 删除监听事件
var remove = function remove(elem, evt, func) {
  elem.removeEventListener(evt, func);
};

// 获取当前事件x坐标，兼容移动端
var clientX = function clientX(e) {
  if (e.type.indexOf('mouse') > -1) {
    return e.clientX;
  }
  if (e.type.indexOf('touch') > -1) {
    return e.touches[0].clientX;
  }
};

/* 监听hover事件
 * @param {Node} elem
 * @param {Function} overFunc hover函数
 * @param {Function} outFunc 鼠标移出函数，可选
 * */
var hover = function hover(elem, overFunc, outFunc) {
  var over = false;
  listen(elem, _eventName2.default.onHover, function () {
    if (!over) {
      over = true;
      overFunc(elem);
    }
  });

  listen(elem, _eventName2.default.offHover, function () {
    over = false;
    if (outFunc) {
      outFunc(elem);
    }
  });
};

/* 为元素添加或删除多个class
 * @param {Node}
 * @param {Array, String}
 * @param {String} add, remove or toggle
 * */
var updateClass = function updateClass(elem, classList, action) {
  if (Array.isArray(classList)) {
    classList.forEach(function (c) {
      return elem.classList[action](c);
    });
  }
  elem.classList[action](classList);
};

exports.listen = listen;
exports.remove = remove;
exports.clientX = clientX;
exports.hover = hover;
exports.updateClass = updateClass;