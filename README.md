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

If you don't use [Bower] ([http://bower.io/](http://bower.io/)), you can manually resolve dependencies from bower.json file.

Enjoy power searching Wikipedia!

## Documentation
The main WikiController consists of two main public methods:
- `wiki.searchWikipedia(term)`
- `wiki.openArticle(title)`

Those methods getting data from [Wikipedia API] ([https://www.mediawiki.org/wiki/API:Main_page](https://www.mediawiki.org/wiki/API:Main_page)).

Params for 'wiki.searchWikipedia()' are:

```js
var params = {
    action: 'query',
    prop: 'extracts|pageimages|pageterms',  // page content, images and synonyms
    redirects: '',  // automatically redirect
    titles: title   // search term
};
```

## To-do list
- $http.jsonp error handling
- maybe to separate services from controllers (but it is still to small)
