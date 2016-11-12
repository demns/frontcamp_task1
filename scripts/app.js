{
    const req = new Request('https://newsapi.org/v1/articles?source=bbc-news&apiKey=7a81c3436d174f13975ddaeac8184f54');


    fetch(req)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText)
            }
        })
        .then(data => data.articles)
        .then(articles => {
            for (const article of articles) {
                const div = document.createElement('div');
                div.classList.add('article-item');
                div.innerHTML = `
                    <h2 class="article-title">${article.title}</h2>
                    <img class="article-image" src="${article.urlToImage}" alt="awesome picture"/>
                    <p class="article-description">${article.description}</p>
                    <a class="article-link" href="${article.url}" target="_blank">Read more...</a>
                    <div class="article-additional-inf">
                        <div class="article-author">
                            <i class="fa fa-user-o" aria-hidden="true"></i>
                            <span>${article.author}</span>
                        </div>
                        <div class="article-date">
                            <i class="fa fa-clock-o" aria-hidden="true"></i>
                            <span>${new Date(article.publishedAt).toLocaleDateString()}</span>
                        </div>
                    </div>`;
                document.getElementsByClassName('article-block').item(0).appendChild(div);
            }
        })
        .catch(error => {
                const div = document.createElement('div');
                div.classList.add('error');
                div.innerHTML = `Failed: ${error}`;
                document.getElementsByClassName('article-block').item(0).appendChild(div);
            }
        );
};