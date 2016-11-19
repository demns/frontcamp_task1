'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiKeyProvider = function () {
    function ApiKeyProvider() {
        _classCallCheck(this, ApiKeyProvider);
    }

    ApiKeyProvider.prototype.getApiKey = function getApiKey() {
        var locationString = window.location.search.substring(1).split('=');
        var apiKey = void 0;

        if (locationString && locationString[0] === 'apiKey') {
            apiKey = locationString[1];
        }

        return apiKey;
    };

    return ApiKeyProvider;
}();

exports.default = ApiKeyProvider;