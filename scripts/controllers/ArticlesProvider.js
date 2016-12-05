require('es6-promise').polyfill();
require('isomorphic-fetch');

const ArticleModel = require('../models/ArticleModel');
const ErrorModel = require('../models/ErrorModel');
const config = require('../config/config.json');

class Loader {
    constructor (apiKey) {
        this.link = config.apiLink;
        this.apiKey = apiKey;
    };

    get requestLink() {
        return `${this.link}&${config.apiKeyParamName}=${this.apiKey}`;
    };

    getArticles() {
        return fetch(new Request(this.requestLink), {
            method: 'GET',
            mode: 'cors'
        })
        .then(response => response.json())
        .then(data => data.articles.map(item => new ArticleModel(item)))
        .catch(error => new ErrorModel(error));
    };
}

module.exports = Loader;
