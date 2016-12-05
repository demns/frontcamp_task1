const Render = require('./Render');

class RenderArticle extends Render {
	constructor(articles) {		
		super();
		this.articles = articles;
	};

    createArticleTitle(title) {
        const articleTitle = document.createElement('h2');
        articleTitle.classList.add('article-list__item__title');
        articleTitle.innerText = title;
        
        return articleTitle;
    }

    createArticleImage(url) {
        const articleImg = document.createElement('img');
        articleImg.classList.add('article-list__item__image');
        articleImg.setAttribute('src', url);
        articleImg.setAttribute('alt', 'awesome picture');
        
        return articleImg;
    }

	createBlock(article) {
		const articleItemBlock = document.createElement('div');
        articleItemBlock.classList.add('article-list__item');

        const articleTitle = this.createArticleTitle(article.title);

        const articleImg = this.createArticleImage(article.urlToImage.replace('http:', 'https:'));

        // and so on
        const articleDescription = document.createElement('p');
        articleDescription.classList.add('article-list__item__description');
        articleDescription.innerText = article.description;

        const articleLink = document.createElement('a');
        articleLink.classList.add('link');
        articleLink.classList.add('article-list__item__link');
        articleLink.setAttribute('href', article.url.replace('http:', 'https:'));
        articleLink.setAttribute('target', '_blank');
        articleLink.innerText = 'Read more...';

        const additionalInfBlock = document.createElement('div');
        additionalInfBlock.classList.add('article-list__item__additional-information');

        const articleAuthorBlock = document.createElement('div');
        articleAuthorBlock.classList.add('article-list__item__additional-information__author');
        const authorIcon = document.createElement('i');
        authorIcon.classList.add('icon');
        authorIcon.classList.add('icon-user');
        authorIcon.setAttribute('aria-hidden', true);
        const articleAuthor = document.createElement('span');
        articleAuthor.innerText = article.author;
        articleAuthorBlock.appendChild(authorIcon);
        articleAuthorBlock.appendChild(articleAuthor);

        const articleDateBlock = document.createElement('div');
        articleDateBlock.classList.add('article-list__item__additional-information__date');
        const dateIcon = document.createElement('i');
        dateIcon.classList.add('icon');
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

	render() {
		const articleBlockFragment = document.createDocumentFragment();
        for (const article of this.articles) {
            articleBlockFragment.appendChild(this.createBlock(article));
        };

        super.render(articleBlockFragment);
	};
};

module.exports = RenderArticle;