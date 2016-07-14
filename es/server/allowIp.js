'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// cache for memory allow ip
var allow = {};

// ip 可能是ipv6格式
var testIp = function testIp(ip) {
  if (!ip) {
    return false;
  }
  var result = ip.split(':');
  var v4ip = result[result.length - 1];
  if (v4ip in allow) {
    return allow[v4ip];
  }

  allow[v4ip] = _config2.default.allowedIps.indexOf(v4ip) > -1;
  return allow[v4ip];
};

exports.default = testIp;