'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 初始化html结构并且将所有node缓存
var init = function init(root) {
  // 如果已经初始化过
  if (root.querySelector('.image-container')) {
    return false;
  }
  root.classList.add('slider-puzzle');

  root.setAttribute('tabeindex', '-1');
  var appendByClass = function appendByClass(className) {
    var parentNode = arguments.length <= 1 || arguments[1] === undefined ? root : arguments[1];

    var dom = document.createElement('div');
    dom.classList.add(className);
    parentNode.appendChild(dom);
    return dom;
  };

  var imageContainer = appendByClass('image-container');

  var images = appendByClass('images', imageContainer);
  var notify = appendByClass('notify', images);

  var controll = appendByClass('controll', imageContainer);
  var refresh = appendByClass('refresh', controll);

  var operation = appendByClass('operation');
  var track = appendByClass('track', operation);
  var slider = appendByClass('slider', track);
  var hint = appendByClass('hint', track);
  hint.textContent = _config2.default.hint;
  var tip = appendByClass('tip', operation);

  _cache2.default.set({ root: root, imageContainer: imageContainer, images: images, notify: notify, controll: controll, refresh: refresh, operation: operation, track: track, slider: slider, hint: hint, tip: tip });
};

exports.default = init;