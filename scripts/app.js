{
    class Loader {
        constructor (link) {
            this.link = link;
            this.apiKey = '';
        };
        load() {
            this.getApiKey();
            return fetch(new Request(`${this.link}&apiKey=${this.apiKey}`))
                .then(response => response.json())
                .then(data => data.articles)
                .catch(error => error);
        };

        getApiKey() {
            const locationString = window.location.search.substring(1).split('=');
            if (locationString && locationString[0] === 'apiKey') {
                this.apiKey = locationString[1];
            }
        };
    }

    class Renderer {
        render() {
            const articleBlock = document.getElementsByClassName('article-block').item(0);
            const articleBlockFragment = document.createDocumentFragment();
            const requestLink = 'https://newsapi.org/v1/articles?source=bbc-news';

            const loader = new Loader(requestLink);

            loader.load().then(articles => {
                for (const article of articles) {
                    articleBlockFragment.appendChild(this.createArticleItemBlock(article));
                };

                articleBlock.appendChild(articleBlockFragment);
            }).catch(error => {
                articleBlock.appendChild(this.createErrorBlock(error));
            })
        };

        createArticleItemBlock(article) {
            const articleItemBlock = document.createElement('div');
            articleItemBlock.classList.add('article-item');

            const articleTitle = document.createElement('h2');
            articleTitle.classList.add('article-title');
            articleTitle.innerText = article.title;

            const articleImg = document.createElement('img');
            articleImg.classList.add('article-image');
            articleImg.setAttribute('src', article.urlToImage);
            articleImg.setAttribute('alt', 'awesome picture');

            const articleDescription = document.createElement('p');
            articleDescription.classList.add('article-description');
            articleDescription.innerText = article.description;

            const articleLink = document.createElement('a');
            articleLink.classList.add('article-link');
            articleLink.setAttribute('href', article.url);
            articleLink.setAttribute('target', '_blank');
            articleLink.innerText = 'Read more...';

            const additionalInfBlock = document.createElement('div');
            additionalInfBlock.classList.add('article-additional-inf');

            const articleAuthorBlock = document.createElement('div');
            articleAuthorBlock.classList.add('article-author');
            const authorIcon = document.createElement('i');
            authorIcon.classList.add('icon-user');
            authorIcon.setAttribute('aria-hidden', true);
            const articleAuthor = document.createElement('span');
            articleAuthor.innerText = article.author;
            articleAuthorBlock.appendChild(authorIcon);
            articleAuthorBlock.appendChild(articleAuthor);

            const articleDateBlock = document.createElement('div');
            articleDateBlock.classList.add('article-date');
            const dateIcon = document.createElement('i');
            dateIcon.classList.add('icon-clock');
            dateIcon.setAttribute('aria-hidden', true);
            const articleDate = document.createElement('span');
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

        createErrorBlock(error) {
            const errorBlock = document.createElement('div');
            errorBlock.classList.add('error');
            errorBlock.innerText = `Failed: ${error}`;

            return errorBlock;
        };
    }

    const renderer = new Renderer();
    renderer.render();
};
