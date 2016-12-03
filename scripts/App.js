class App {
    constuctor(){};

    app() {
        require('../styles/style.scss')
        document.getElementById('load').addEventListener('click', () => {
            document.getElementById('load').classList.add('hidden');

            require.ensure([], (require) => {
                const Error = require('./models/Error');
                const ApiKeyProvider = require('./controllers/ApiKeyProvider');
                const apiKeyProvider = new ApiKeyProvider();
                const apiKey = apiKeyProvider.getApiKey();

                const RenderManager = require('./views/RenderManager');
                const renderManager = new RenderManager();                

                if (apiKey) {
                    require('../styles/article.scss');

                    const Loader = require('./controllers/Loader');
                    const loader = new Loader(apiKey);

                    loader.load().then(articles => {
                        renderManager.execute({
                            requestInfo: 'renderArticles', 
                            data: articles
                        });
                    }).catch(error => {
                        renderManager.execute({ 
                            requestInfo: 'renderError', 
                            data: error
                        });
                    });
                } else {
                    const error = new Error('Missing api key in URL');
                    renderManager.execute({ 
                        requestInfo: 'renderError', 
                        data: error
                    });
                }
            }, 'app');
        });
    }
};

module.exports = App;