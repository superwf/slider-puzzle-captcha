'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _env = require('../lib/util/env');

var _captcha = require('./controller/captcha');

var _captcha2 = _interopRequireDefault(_captcha);

var _validate = require('./controller/validate');

var _validate2 = _interopRequireDefault(_validate);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import logger from 'morgan'

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());
// app.use(logger())

if (!_env.isProduction) {
  app.use(_express2.default.static(__dirname + '/../../public'));
}

var api = _config2.default.api;
var port = _config2.default.port;


app.get(api.captcha, _captcha2.default);
app.post(api.validate, _validate2.default);

app.listen(port);
console.info('app start to listen port ' + port);

if (!_env.isProduction) {
  process.on('message', function () {
    return process.send({ connected: true });
  });
}