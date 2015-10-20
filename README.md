# Angular Wiki Search
AngularJS module for searching Wikipedia using MediaWiki API.

[http://mudroljub.github.io/angular-wiki-search/](http://mudroljub.github.io/angular-wiki-search/)

## Start aplication
Just download a directory and open index.html file. You can also do it developer way:

```sh
$ git clone https://github.com/mudroljub/angular-wiki-module.git
$ bower install
$ open index.html
```

If you don't use [Bower](http://bower.io/), you can manually resolve dependencies from bower.json file.

Enjoy power searching Wikipedia!

## Documentation
The main `WikiController` consists of two main public methods:
- `wiki.openArticle(title)`
- `wiki.searchWikipedia(term)`

Those methods getting data from [Wikipedia API](http://en.wikipedia.org/w/api.php) in `JSONP` format (see [API documentation](https://www.mediawiki.org/wiki/API:Main_page)).

Both methods have those common params:
```js
var params = {
    action: 'query',
    prop: 'extracts|pageimages',    // get article content and images
    format: 'json',
    formatversion: 2,  // support utf-8
    callback: 'JSON_CALLBACK'
};
```

Specific params for `openArticle` method are:

```js
var params = {
    titles: title,   // title is a variable
    redirects: ''  // auto-redirecting to an article
};
```

Specific params for `searchWikipedia` method are:

```js
var params = {
    generator: 'search',
    gsrsearch: term,  // term is a variable
    exintro: '',    // get only article's content intro
    pilimit: 'max', // images for all articles, otherwise only for the first
    exlimit: 'max' // content for all articles, otherwise only for the first
};
```

## To-do list
- $http.jsonp error handling
- maybe to separate services from controllers (but it is still to small)
