# Angular Wiki Search
AngularJS module for searching Wikipedia using MediaWiki API.

http://mudroljub.github.io/angular-wiki-search/

## Start aplication

Just download a directory and open index.html file. You can also do it developer way:

```sh
$ git clone https://github.com/mudroljub/angular-wiki-module.git
$ bower install
$ open index.html
```

If you don't use Bower, you can manually resolve dependencies from bower.json file.

**Enjoy power searching Wikipedia!**

## Documentation

The main WikiController consists of two main public methods:
- wiki.searchWikipedia(term)
- wiki.openArticle(title)

Those methods communicates with the Wikipedia API.

## To-do list:

- $http.jsonp error handling
- maybe to separate services from controllers (but it is still to small)
