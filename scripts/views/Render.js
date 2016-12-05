require('babel-polyfill');
const config = require('../config/config.json');

class Render {
    constructor() {
        this.mainBlock = document.getElementsByClassName(config.articleListClass).item(0);
    };

    render(block) {
        this.mainBlock.appendChild(block);
    };
};

module.exports = Render;
