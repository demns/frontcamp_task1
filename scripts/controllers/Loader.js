require('es6-promise').polyfill();
require('isomorphic-fetch');

const Article = require('../models/Article');
const Error = require('../models/Error');

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
            .then(data => {
                const articles = [];
                data.articles.forEach(item => {
                    articles.push(new Article(item));
                });

                return articles;
            })
            .catch(error => {
                return new Error(error);
            });
    };
}

module.exports = Loader;
