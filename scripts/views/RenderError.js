const Render = require('./Render');

class RenderError extends Render {
	constructor(error) {		
		super();
		this.error = error;
	};

	createBlock() {
		const errorBlock = document.createElement('div');
        errorBlock.classList.add('error');
        errorBlock.innerText = `Failed: ${this.error.message}`;

        return errorBlock;
	};

	render(){
		const errorBlock = this.createBlock();
		super.render(errorBlock);
	};
};

module.exports = RenderError;