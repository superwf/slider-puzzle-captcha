'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _add = require('lodash/add');

var _add2 = _interopRequireDefault(_add);

var _subtract = require('lodash/subtract');

var _subtract2 = _interopRequireDefault(_subtract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import puzzlePosition from './position'

function randomBool() {
  return Math.random() > 0.5;
}

// 生成puzzle形状

exports.default = function (position) {
  var line1Arc = randomBool();
  var line1ArcDir = line1Arc && randomBool() ? _add2.default : _subtract2.default;

  var line2Arc = randomBool();
  var line2ArcDir = line2Arc && randomBool() ? _add2.default : _subtract2.default;

  var line3Arc = !(line1Arc || line2Arc) ? true : randomBool();
  var line3ArcDir = line3Arc && randomBool() ? _add2.default : _subtract2.default;

  var line4Arc = !(line1Arc || line3Arc) ? true : randomBool();
  var line4ArcDir = line4Arc && randomBool() ? _add2.default : _subtract2.default;

  var puzzleSide = _config2.default.puzzleSide;
  var slotRadius = _config2.default.slotRadius;
  var x = position.x;
  var y = position.y;

  return function (ctx, cb) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    if (line1Arc) {
      ctx.lineTo(x + puzzleSide / 2 - slotRadius, y);
      ctx.quadraticCurveTo(x + puzzleSide / 2, line1ArcDir(y, slotRadius), x + (puzzleSide / 2 + slotRadius), y);
    }
    ctx.lineTo(x + puzzleSide, y);
    if (line2Arc) {
      ctx.lineTo(x + puzzleSide, y + puzzleSide / 2 - slotRadius);
      var x1 = x + puzzleSide;
      ctx.quadraticCurveTo(line2ArcDir(x1, slotRadius), y + puzzleSide / 2, x1, y + (puzzleSide / 2 + slotRadius));
    }
    ctx.lineTo(x + puzzleSide, y + puzzleSide);

    if (line3Arc) {
      // let x1 = x + puzzleSide
      var y1 = y + puzzleSide;
      ctx.lineTo(x + puzzleSide / 2 + slotRadius, y1);
      ctx.quadraticCurveTo(x + puzzleSide / 2, line3ArcDir(y1, slotRadius), x + puzzleSide / 2 - slotRadius, y1);
    }
    ctx.lineTo(x, y + puzzleSide);

    if (line4Arc) {
      ctx.lineTo(x, y + puzzleSide / 2 + slotRadius);
      ctx.quadraticCurveTo(line4ArcDir(x, slotRadius), y + puzzleSide / 2, x, y + puzzleSide / 2 - slotRadius);
    }
    ctx.lineTo(x, y);
    ctx.closePath();
    cb();
  };
};