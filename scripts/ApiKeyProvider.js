class ApiKeyProvider {
    getApiKey() {
        const locationString = window.location.search.substring(1).split('=');
        let apiKey;

        if (locationString && locationString[0] === 'apiKey') {
            apiKey = locationString[1];
        }

        return apiKey;
    }
}
