'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var token = function token() {
  return (Date.now() * Math.random()).toString(36).replace('.', '');
};
exports.default = token;