class App {
    static articles;

    static initialize() {
        require('../styles/style.scss')
        document.getElementById('load').addEventListener('click', () => {
            document.getElementById('load').classList.add('hidden');

            require.ensure([], (require) => {
                const ApiKeyProvider = require('./controllers/ApiKeyProvider');
                const apiKeyProvider = new ApiKeyProvider();
                const apiKey = apiKeyProvider.getApiKey();

                const RenderManager = require('./views/RenderManager');
                const renderManager = new RenderManager();                

                if (apiKey) {
                    require('../styles/article.scss');

                    if (App.articles) {
                        App.renderArticles(App.articles);
                        return;
                    }

                    const ArticlesProvider = require('./controllers/ArticlesProvider');
                    const articlesProvider = new ArticlesProvider(apiKey);

                    articlesProvider.getArticles().then(articles => {
                        App.articles = articles; // memoize api call
                        App.renderArticles(renderManager, App.articles);
                    }).catch(error => {
                        App.renderError(renderManager, error);
                    });
                } else {
                    const ErrorModel = require('./models/ErrorModel');
                    const error = new ErrorModel(config.missingApiKey);

                    App.renderError(renderManager, error);
                }
            }, 'app');
        });
    }

    static renderArticles(renderManager, articles) {
        renderManager.execute({
            requestInfo: 'renderArticles', 
            data: articles
        });
    }

    static renderError(renderManager, error) {
        renderManager.execute({ 
            requestInfo: 'renderError', 
            data: error
        });
    }
}

module.exports = App;