const config = require('../config/config.json');

class ApiKeyProvider {
    getApiKey() {
        const locationString = window.location.search.substring(1).split('=');
        let apiKey = '';

        if (locationString && locationString[0] === config.apiKeyParamName) {
            apiKey = locationString[1];
        }

        return apiKey;
    }
}

module.exports = ApiKeyProvider;
