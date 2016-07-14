'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../lib/store/index');

var _index2 = _interopRequireDefault(_index);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(req, res) {
  res.format({
    'application/json': function applicationJson() {
      // res.sendStatus(404)
      var ok = false;
      var post = req.body;
      var response = function response() {
        res.send(JSON.stringify({ ok: ok }));
      };
      if (!post || !post.token) {
        response();
        return;
      }
      _index2.default.get(post.token).then(function (position) {
        if (Math.abs(post.x - position.x) < _config2.default.allowedDistance) {
          ok = true;
        }
        response();
      }, function (err) {
        // 若没有找到token说明已经过期被清除，应提示刷新重试
        if (err === null) {
          res.send(JSON.stringify({ ok: ok, expired: true }));
        }
      });
    }
  });
}
exports.default = validate;