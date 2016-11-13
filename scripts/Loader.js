class Loader {
    constructor (link, apiKey) {
        this.link = link;
        this.apiKey = apiKey;
    };

    get requestLink() {
        return `${this.link}&apiKey=${this.apiKey}`;
    };

    load() {
        return fetch(new Request(this.requestLink))
            .then(response => response.json())
            .then(data => data.articles)
            .catch(error => error);
    };
}
