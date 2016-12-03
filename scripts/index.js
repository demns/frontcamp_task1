const App = require('./App');


const appSingleton = (function () {
    let instance;
 
    function createInstance() {
        return new App();
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

const appInstance = appSingleton.getInstance();
appInstance.app();
