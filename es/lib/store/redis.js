'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createStore = function createStore() {
  var client = _redis2.default.createClient(_config2.default.redisConfig);
  client.on('error', function (err) {
    console.log('error event - ' + client.host + ':' + client.port + ' - ' + err);
  });

  var store = {
    set: function set(key, val) {
      return client.set(key, JSON.stringify(val));
    },
    get: function get(key) {
      return new Promise(function (resolve, reject) {
        client.get(key, function (err, result) {
          if (err) {
            reject(err);
          } else if (result === null) {
            reject(null);
          } else {
            try {
              resolve(JSON.parse(result));
            } catch (e) {
              resolve(result);
            }
          }
        });
      });
    },

    keys: function keys() {
      return new Promise(function (resolve, reject) {
        client.keys('*', function (err, results) {
          // console.log(results)
          err ? reject(err) : resolve(results);
        });
      });
    },

    remove: function remove(key) {
      client.del(key);
    },

    clear: function clear(force) {
      if (force) {
        return store.keys().then(function (keys) {
          keys.forEach(function (key) {
            return client.del(key);
          });
        });
      }
      return store.keys().then(function (keys) {
        var now = Date.now();
        return Promise.all(keys.map(function (key) {
          return store.get(key).then(function (val) {
            if (val.time && now - val.time > _config2.default.expire) {
              client.del(key);
            }
          });
        }));
      });
    }
  };
  return store;
};

exports.default = createStore;