require('es6-promise').polyfill();
require('isomorphic-fetch');

class Loader {
    constructor (apiKey) {
        this.link = 'https://newsapi.org/v1/articles?source=bbc-news';
        this.apiKey = apiKey;
    };

    get requestLink() {
        return `${this.link}&apiKey=${this.apiKey}`;
    };

    load() {
        return fetch(new Request(this.requestLink), {
                method: 'GET',
                mode: 'cors'
            })
            .then(response => response.json())
            .then(data => data.articles)
            .catch(error => error);
    };
}

module.exports = Loader;
