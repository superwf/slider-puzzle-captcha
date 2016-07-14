'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// import random from 'lodash/random'
var random = function random(number) {
  return Math.random() * number;
};

// 生成随机颜色
// return 由三个1至255之间的数据组成的数组
// 例如 [3, 42, 223]
var randomRgbDigit = function randomRgbDigit() {
  return [Math.ceil(random(255)), Math.ceil(random(255)), Math.ceil(random(255))];
};

// param rgbDigit 由三个1-255之间的数字组成的数组
// 例如[3, 42, 223]
// return String 例如 '#32ef4a'
var rgbDigitToString = function rgbDigitToString(color) {
  return '#' + color.map(function (v) {
    var c = v.toString(16);
    if (c.length === 1) {
      return '0' + c;
    }
    return c;
  }).join('');
};

// 生成随机色
// return String #e3f8a7
var randomRgbColorString = function randomRgbColorString() {
  var color = randomRgbDigit();
  return rgbDigitToString(color);
};

var makeJamLine = function makeJamLine(ctx, config, times) {
  if (!times) {
    return;
  }

  var randomPosition = function randomPosition() {
    return [random(config.width), random(config.height)];
  };

  while (times) {
    ctx.save();

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo.apply(ctx, _toConsumableArray(randomPosition()));
    ctx.lineTo.apply(ctx, _toConsumableArray(randomPosition()));
    ctx.strokeStyle = randomRgbColorString();
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
    times--;
  }
};

exports.default = makeJamLine;