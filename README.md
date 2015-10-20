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
The main WikiController consists of two main public methods:
- `wiki.openArticle(title)`
- `wiki.searchWikipedia(term)`

Those methods getting data from [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page).

Params for `wiki.openArticle(title)` are:

```js
var params = {
    action: 'query',
    prop: 'extracts|pageimages|pageterms',  // page content, images and synonyms
    redirects: '',  // automatically redirect
    titles: title   // search term
};
```

Params for `wiki.searchWikipedia(term)` are:

```js
var params = {
    action: 'query',
    generator: 'search',
    gsrsearch: term,
    prop: 'pageimages|extracts',
    exintro: '',    // only article's intro
    pilimit: 'max', // images for all articles, otherwise only for the first
    exlimit: 'max' // extracts for all articles, otherwise only for the first
};
```

Both methods also have common params:

```js
params.format = 'json';
params.formatversion = 2;
params.callback = 'JSON_CALLBACK';
```

## To-do list
- $http.jsonp error handling
- maybe to separate services from controllers (but it is still to small)
