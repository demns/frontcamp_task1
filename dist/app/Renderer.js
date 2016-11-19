'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Loader = require('./Loader');

var _Loader2 = _interopRequireDefault(_Loader);

var _ApiKeyProvider = require('./ApiKeyProvider');

var _ApiKeyProvider2 = _interopRequireDefault(_ApiKeyProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('babel-polyfill');

var Renderer = function () {
    function Renderer() {
        _classCallCheck(this, Renderer);

        this.articleBlock = document.getElementsByClassName('article-block').item(0);
        this.requestLink = 'https://newsapi.org/v1/articles?source=bbc-news';
    }

    Renderer.prototype.render = function render() {
        var _this = this;

        var apiKeyProvider = new _ApiKeyProvider2.default();
        var apiKey = apiKeyProvider.getApiKey();
        if (apiKey) {
            (function () {
                var loader = new _Loader2.default(_this.requestLink, apiKey);
                var articleBlockFragment = document.createDocumentFragment();

                loader.load().then(function (articles) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = articles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var article = _step.value;

                            articleBlockFragment.appendChild(_this.createArticleItemBlock(article));
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    ;

                    _this.articleBlock.appendChild(articleBlockFragment);
                }).catch(function (error) {
                    _this.articleBlock.appendChild(_this.createErrorBlock(error));
                });
            })();
        } else {
            var errorMessage = 'Missing api key in URL';
            this.articleBlock.appendChild(this.createErrorBlock(errorMessage));
        }
    };

    Renderer.prototype.createArticleItemBlock = function createArticleItemBlock(article) {
        var articleItemBlock = document.createElement('div');
        articleItemBlock.classList.add('article-item');

        var articleTitle = document.createElement('h2');
        articleTitle.classList.add('article-title');
        articleTitle.innerText = article.title;

        var articleImg = document.createElement('img');
        articleImg.classList.add('article-image');
        articleImg.setAttribute('src', article.urlToImage.replace('http:', 'https:'));
        articleImg.setAttribute('alt', 'awesome picture');

        var articleDescription = document.createElement('p');
        articleDescription.classList.add('article-description');
        articleDescription.innerText = article.description;

        var articleLink = document.createElement('a');
        articleLink.classList.add('link');
        articleLink.classList.add('article-link');
        articleLink.setAttribute('href', article.url.replace('http:', 'https:'));
        articleLink.setAttribute('target', '_blank');
        articleLink.innerText = 'Read more...';

        var additionalInfBlock = document.createElement('div');
        additionalInfBlock.classList.add('article-additional-inf');

        var articleAuthorBlock = document.createElement('div');
        articleAuthorBlock.classList.add('article-author');
        var authorIcon = document.createElement('i');
        authorIcon.classList.add('icon');
        authorIcon.classList.add('icon-user');
        authorIcon.setAttribute('aria-hidden', true);
        var articleAuthor = document.createElement('span');
        articleAuthor.innerText = article.author;
        articleAuthorBlock.appendChild(authorIcon);
        articleAuthorBlock.appendChild(articleAuthor);

        var articleDateBlock = document.createElement('div');
        articleDateBlock.classList.add('article-date');
        var dateIcon = document.createElement('i');
        dateIcon.classList.add('icon');
        dateIcon.classList.add('icon-clock');
        dateIcon.setAttribute('aria-hidden', true);
        var articleDate = document.createElement('span');
        articleDate.innerText = new Date(article.publishedAt).toLocaleDateString();

        articleDateBlock.appendChild(dateIcon);
        articleDateBlock.appendChild(articleDate);

        additionalInfBlock.appendChild(articleAuthorBlock);
        additionalInfBlock.appendChild(articleDateBlock);

        articleItemBlock.appendChild(articleTitle);
        articleItemBlock.appendChild(articleImg);
        articleItemBlock.appendChild(articleDescription);
        articleItemBlock.appendChild(articleLink);
        articleItemBlock.appendChild(additionalInfBlock);

        return articleItemBlock;
    };

    Renderer.prototype.createErrorBlock = function createErrorBlock(error) {
        var errorBlock = document.createElement('div');
        errorBlock.classList.add('error');
        errorBlock.innerText = 'Failed: ' + error;

        return errorBlock;
    };

    return Renderer;
}();

exports.default = Renderer;