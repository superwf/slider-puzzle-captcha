'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('../dom');

var _cache = require('../cache');

var _cache2 = _interopRequireDefault(_cache);

var _camelCase = require('lodash/camelCase');

var _camelCase2 = _interopRequireDefault(_camelCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 插入获取的图片
 * @param {Node}
 * @param {Object} image data
 * @return {Object}
 * */
var insertImg = function insertImg(root, data) {
  var result = {};
  var images = root.querySelector('.images');
  if (!images) {
    images = document.createElement('div');
    images.classList.add('images');
    root.insertBefore(images, root.firstChild);
  }
  var createImg = function createImg() {
    return document.createElement('img');
  };
  var insert = function insert(className) {
    var originImg = root.querySelector('img.' + className);
    if (originImg) {
      originImg.src = data[className];
      result[(0, _camelCase2.default)(className)] = originImg;
    } else {
      var img = createImg();
      img.src = data[className];
      result[(0, _camelCase2.default)(className)] = img;
      (0, _dom.updateClass)(img, className, 'add');
      images.insertBefore(img, images.firstChild);
    }
  };
  ['bg', 'puzzle-bg', 'puzzle'].forEach(insert);
  result.token = data.token;
  result.enable = true;

  _cache2.default.set(result);

  // const track = document.querySelector('.track')
};

exports.default = insertImg;