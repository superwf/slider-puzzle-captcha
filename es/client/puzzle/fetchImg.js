'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _emitter = require('../../lib/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = _config2.default.api;

// 从api获取puzzle图像

var fetchImg = function fetchImg() {
  return fetch(api.captcha, {
    headers: {
      Accept: 'application/json'
    }
  }).then(function (res) {
    if (res.status !== 200) {
      _emitter2.default.emit('server:error');
      return;
    }
    return res.json().then(function (data) {
      if (data.ok) {
        return data;
      }
      throw data;
    }, function (err) {
      return console.log('in fetchImg, json err ' + err);
    });
  }, function (err) {
    _emitter2.default.emit('server:error');
  });
};

exports.default = fetchImg;