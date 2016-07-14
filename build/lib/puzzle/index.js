'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _canvas = require('canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var slotRadius = _config2.default.slotRadius;
var puzzleSide = _config2.default.puzzleSide;
var bgWidth = _config2.default.bgWidth;
var bgHeight = _config2.default.bgHeight;

var sideLength = puzzleSide + slotRadius * 2;
var canvas = new _canvas2.default(bgWidth, bgHeight);
var ctx = canvas.getContext('2d');
var img = new _canvas2.default.Image();

var img1 = new _canvas2.default.Image();
var canvas1 = new _canvas2.default(sideLength, bgHeight);
var ctx1 = canvas1.getContext('2d');

var puzzle = function puzzle(data, shape, position) {
  ctx.clearRect(0, 0, bgWidth, bgHeight);
  ctx1.clearRect(0, 0, bgWidth, bgHeight);
  img.src = data;
  ctx.drawImage(img, 0, 0);
  shape(ctx, function () {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-in';
    ctx.fill();
    ctx.restore();

    // 外侧阴影
    ctx.save();
    ctx.shadowBlur = 4;
    ctx.shadowColor = '#000';
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.globalCompositeOperation = 'destination-over';
    ctx.stroke();
    ctx.restore();
  });

  img1.src = canvas.toDataURL();
  var x = position.x;

  ctx1.drawImage(img1, x - slotRadius, 0, sideLength, bgHeight, 0, 0, sideLength, bgHeight);
  return canvas1.toDataURL();
};

exports.default = puzzle;