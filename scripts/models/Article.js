class Article {
	constructor(article) {
		this.author = article.author;
		this.description = article.description;
		this.publishedAt = article.publishedAt;
		this.title = article.title;
		this.url = article.url;
		this.urlToImage = article.urlToImage;
	};
};

module.exports = Article;