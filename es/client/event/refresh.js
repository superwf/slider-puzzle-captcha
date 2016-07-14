'use strict';

var _cache = require('../cache');

var _cache2 = _interopRequireDefault(_cache);

var _emitter = require('../../lib/emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _insertImg = require('../puzzle/insertImg');

var _insertImg2 = _interopRequireDefault(_insertImg);

var _fetchImg = require('../puzzle/fetchImg');

var _fetchImg2 = _interopRequireDefault(_fetchImg);

var _curry = require('lodash/curry');

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_emitter2.default.on('refresh', function () {
  var root = _cache2.default.root;


  (0, _fetchImg2.default)().then((0, _curry2.default)(_insertImg2.default)(root)).then(function () {
    var bg = _cache2.default.bg;
    var puzzleBg = _cache2.default.puzzleBg;
    var puzzle = _cache2.default.puzzle;
    var token = _cache2.default.token;
    var hint = _cache2.default.hint;
    var tip = _cache2.default.tip;


    bg.style.opacity = 1;
    puzzle.style.opacity = 0;
    puzzleBg.style.opacity = 0;
    hint.style.opacity = 1;

    tip.className = 'tip';

    _cache2.default.set({
      enable: true,
      token: token
    });
    _emitter2.default.emit('reset');
  }, function () {
    _emitter2.default.emit('server:error');
  });
});