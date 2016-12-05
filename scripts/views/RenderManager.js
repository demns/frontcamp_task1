const RenderArticle = require('./RenderArticle');                
const RenderError = require('./RenderError');

const RenderManager = (function () {
	const privateFunctions = new Map();

	function renderArticles(articles) {
		const renderArticles = new RenderArticle(articles);
		renderArticles.render();
	};

	function renderError(error) {
		const renderError = new RenderError(error);
		renderError.render();
	};

  class Renderer {
    constructor(name) {
			privateFunctions.set('renderArticles', renderArticles); 
			privateFunctions.set('renderError', renderError); 
    }

		execute(command) {
			privateFunctions.get(command.requestInfo)(command.data);
		};
  }

  return Renderer;
})();


module.exports = RenderManager;