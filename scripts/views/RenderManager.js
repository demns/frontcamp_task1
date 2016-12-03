const RenderArticle = require('./RenderArticle');                
const RenderError = require('./RenderError');

let RenderManager = (function () {
	let privateFunctions = new WeakMap();

    function renderArticles(articles) {
		const renderArticles = new RenderArticle(articles);
	    renderArticles.render();
	};

	function renderError(error) {
		const renderError = new RenderError(error);
	    renderError.render();
	};

  class RenderManager {
    constructor(name) {
      privateFunctions.set(this, {renderArticles: renderArticles, renderError: renderError}); // this is private
    }
	execute(command) {
		privateFunctions.get(this)[command.requestInfo](command.data);
	};
  }

  return RenderManager;
})();


module.exports = RenderManager;