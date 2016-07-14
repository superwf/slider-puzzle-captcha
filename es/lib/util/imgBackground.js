'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _canvas = require('canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _random = require('lodash/random');

var _random2 = _interopRequireDefault(_random);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var imgDataList = void 0,
    background = void 0;
if (_config2.default.bgPath) {
  (function () {
    var bgList = _fs2.default.readdirSync(_config2.default.bgPath);
    var length = bgList.length - 1;

    imgDataList = bgList.map(function (path) {
      var data = _fs2.default.readFileSync(_config2.default.bgPath + path).toString('base64');
      data = 'data:image/png;base64,' + data;
      return data;
    });

    var img = new _canvas2.default.Image();
    background = {
      render: function render(ctx) {
        var i = (0, _random2.default)(length);
        img.src = imgDataList[i];
        ctx.drawImage(img, 0, 0);
      }
    };
  })();
} else {
  background = { render: function render() {} };
}

exports.default = background;