#[Angular Wiki Search](http://mudroljub.github.io/angular-wiki-search/)
AngularJS module for consuming Wikipedia API.

See it in action: [mudroljub.github.io/angular-wiki-search/](http://mudroljub.github.io/angular-wiki-search/)

You can find an advanced version here: [github.com/mudroljub/power-wiki-search](https://github.com/mudroljub/power-wiki-search)

## Install
Just download the directory and open index.html file:

```sh
$ git clone https://github.com/mudroljub/angular-wiki-search.git
$ bower install
$ open index.html
```

If you don't use [Bower](http://bower.io/), you can manually resolve dependencies from bower.json file.

## Documentation
The main `WikiController` consists of two main public methods:
- `wiki.openArticle(title)`
- `wiki.searchWikipedia(term)`

Those methods getting data from [Wikipedia API](http://en.wikipedia.org/w/api.php) in JSONP format (see [API documentation](https://www.mediawiki.org/wiki/API:Main_page)).

Both methods have those common URL params:
```js
var params = {
    action: 'query',
    prop: 'extracts|pageimages',    // get article's content and images
    format: 'json',
    formatversion: 2,  // support utf-8
    callback: 'JSON_CALLBACK'
}
```

Specific params for `openArticle` method are:

```js
{
    titles: title,   // title is a variable
    redirects: ''  // auto-redirecting to an article
}
```

Specific params for `searchWikipedia` method are:

```js
{
    generator: 'search',
    gsrsearch: term,  // term is a variable
    pilimit: 'max', // enable images for all results
    exlimit: 'max', // enable content for all results
    exintro: ''    // get only article's intro
}
```

## To-do list
- error handling
