const Render = require('./Render');

class RenderError extends Render {
	constructor(error) {		
		super();
		this.error = error;
	};

	createErrorBlock() {
		const errorBlock = document.createElement('div');
        errorBlock.classList.add('error');
        errorBlock.innerText = `Failed: ${this.error.message}`;

        return errorBlock;
	};

	render() {
		const errorBlock = this.createErrorBlock();
		super.render(errorBlock);
	};
};

module.exports = RenderError;