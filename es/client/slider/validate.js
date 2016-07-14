'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _emitter = require('../../lib/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validate = function validate() {
  var post = arguments.length <= 0 || arguments[0] === undefined ? { token: '', x: '' } : arguments[0];
  var api = _config2.default.api;

  return window.fetch(api.validate, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(function (res) {
    if (res.status !== 200) {
      _emitter2.default.emit('server:error');
    }
    return res.json().then(function (json) {
      if (json.expired) {
        _emitter2.default.emit('token:expired');
      }
      return json;
    });
  }, function (err) {
    console.log('fetch ' + api.validate + ' err ', err);
    _emitter2.default.emit('server:error');
  });
};
exports.default = validate;