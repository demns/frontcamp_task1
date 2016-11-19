'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('es6-promise').polyfill();
require('isomorphic-fetch');

var Loader = function () {
    function Loader(link, apiKey) {
        _classCallCheck(this, Loader);

        this.link = link;
        this.apiKey = apiKey;
    }

    Loader.prototype.load = function load() {
        return fetch(new Request(this.requestLink), {
            method: 'GET',
            mode: 'cors'
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            return data.articles;
        }).catch(function (error) {
            return error;
        });
    };

    _createClass(Loader, [{
        key: 'requestLink',
        get: function get() {
            return this.link + '&apiKey=' + this.apiKey;
        }
    }]);

    return Loader;
}();

exports.default = Loader;