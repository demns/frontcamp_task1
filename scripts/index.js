require('../styles/style.scss')
document.getElementById('load').addEventListener('click', () => {
    document.getElementById('load').style.display = 'none';

    require.ensure([], (require) => {
        const ApiKeyProvider = require('./utils/ApiKeyProvider');
   	    const apiKeyProvider = new ApiKeyProvider();
    	const apiKey = apiKeyProvider.getApiKey();

    	const Renderer = require('./utils/Renderer');
    	const renderer = new Renderer(apiKey);

    	if (apiKey) {
            require('../styles/article.scss');

            const Loader = require('./utils/Loader');
            const loader = new Loader(apiKey);

            loader.load().then(articles => {
                renderer.renderArticles(articles);
            }).catch(error => {
                renderer.renderErrorMessage(error);
            });
        } else {
            const errorMessage = 'Missing api key in URL';
            renderer.renderErrorMessage(errorMessage);
        }
    }, 'app');
});
