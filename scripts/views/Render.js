require('babel-polyfill');

class Render {
    constructor() {
        this.mainBlock = document.getElementsByClassName('article-list').item(0);
    };

    render(block) {
        this.mainBlock.appendChild(block);
    };
};

module.exports = Render;
