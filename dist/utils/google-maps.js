'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

exports['default'] = {

  callbacks: [],

  appended: false,

  load: function load(params, callback) {
    var index = this.callbacks.push(callback);
    if (googleMapsExists()) {
      setTimeout(this.fireCallbacks.bind(this));
    } else {
      if (!this.appended) {
        window.mapsCallback = this.mapsCallback.bind(this);
        this.appendScript(params);
      }
    }
    return index;
  },

  getSrc: function getSrc(params) {
    var src = params.src;

    var rest_params = _objectWithoutProperties(params, ['src']);

    src = src || 'https://maps.googleapis.com/maps/api/js';
    // src += '?callback=mapsCallback&';
    src += _querystring2['default'].stringify(rest_params);
    return src;
  },

  appendScript: function appendScript(params) {
    var src = this.getSrc(params);
    var script = document.createElement('script');
    script.setAttribute('src', src);
    document.head.appendChild(script);
    this.appended = true;
  },

  mapsCallback: function mapsCallback() {
    window.mapsCallback = undefined;
    this.fireCallbacks();
  },

  fireCallbacks: function fireCallbacks() {
    this.callbacks.forEach(function (callback) {
      return callback();
    });
    this.callbacks = [];
  },

  removeCallback: function removeCallback(index) {
    this.callbacks.splice(index - 1, 1);
  }

};

var googleMapsExists = function googleMapsExists() {
  return typeof window.google === 'object' && typeof window.google.maps === 'object';
};
module.exports = exports['default'];