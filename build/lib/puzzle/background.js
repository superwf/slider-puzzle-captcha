'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _canvas = require('canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var img = new _canvas2.default.Image();
var canvas = new _canvas2.default(_config2.default.bgWidth, _config2.default.bgHeight);
var ctx = canvas.getContext('2d');

var puzzledBg = function puzzledBg(data, shape) {
  ctx.clearRect(0, 0, _config2.default.bgWidth, _config2.default.bgHeight);
  img.src = data;
  ctx.drawImage(img, 0, 0);
  shape(ctx, function () {
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 5;
    ctx.shadowColor = 'rgba(0, 0, 0, 1)';
    ctx.clip();
    ctx.stroke();
    ctx.restore();
  });
  return canvas.toDataURL();
};

exports.default = puzzledBg;