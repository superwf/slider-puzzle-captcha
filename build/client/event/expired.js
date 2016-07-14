'use strict';

var _emitter = require('../../lib/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_emitter2.default.on('token:expired', function () {
  _emitter2.default.emit('disable');
  _emitter2.default.emit('notify', '<span class="error">验证码过期</span>');
  _emitter2.default.emit('refresh');
});