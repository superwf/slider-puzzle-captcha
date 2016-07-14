'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _canvas = require('canvas');

var _canvas2 = _interopRequireDefault(_canvas);

var _background = require('../../lib/util/background');

var _background2 = _interopRequireDefault(_background);

var _puzzle = require('../../lib/puzzle');

var _puzzle2 = _interopRequireDefault(_puzzle);

var _background3 = require('../../lib/puzzle/background');

var _background4 = _interopRequireDefault(_background3);

var _shape = require('../../lib/puzzle/shape');

var _shape2 = _interopRequireDefault(_shape);

var _position = require('../../lib/puzzle/position');

var _position2 = _interopRequireDefault(_position);

var _allowIp = require('../allowIp');

var _allowIp2 = _interopRequireDefault(_allowIp);

var _generateToken = require('../../lib/util/generateToken');

var _generateToken2 = _interopRequireDefault(_generateToken);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _index = require('../../lib/store/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var width = _config2.default.bgWidth,
    height = _config2.default.bgHeight;
var canvas = new _canvas2.default(width, height);
var canvasCtx = canvas.getContext('2d');

function captcha(req, res) {
  res.format({
    'application/json': function applicationJson() {
      // console.log(process.memoryUsage().rss / 1024 / 1024)
      if (!(0, _allowIp2.default)(req.ip)) {
        res.send(JSON.stringify({ ok: false, message: 'no auth' }));
        return;
      }
      canvasCtx.clearRect(0, 0, width, height);
      _background2.default.render(canvasCtx);
      var bg = canvas.toDataURL();
      var position = (0, _position2.default)();
      var token = (0, _generateToken2.default)();
      _index2.default.set(token, {
        x: position.x - _config2.default.slotRadius,
        time: Date.now()
      });

      var shape = (0, _shape2.default)(position);
      var body = { ok: true, bg: bg, puzzle: (0, _puzzle2.default)(bg, shape, position), 'puzzle-bg': (0, _background4.default)(bg, shape), token: token };
      shape = null;
      res.end(JSON.stringify(body));
    }
  });
}
exports.default = captcha;