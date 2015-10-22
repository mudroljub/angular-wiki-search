(function () {

	// glavni rezultat uvek na pocetak
	// kad nema rezultata obrisi prethodne
	// ubaciti back dugme i autofokus
	// ubaciti ostale wiki projekte
	// ubaciti pun paramUrl u dokumentaciju

	'use strict';
	angular
		.module("wikiModul", ['ngSanitize'])
		.controller('WikiController', WikiController);


	function WikiController($http) {

		var wiki = this;
		wiki.term = 'form'; // default
		wiki.searchFilter = "intitle:";
		wiki.page = null;
		wiki.results = null;
		wiki.error = "";

		wiki.params = {
			generator: 'search',
			gsrsearch: wiki.term + wiki.searchFilter,
			gsrlimit: 10, // broj rezultata, max 50
			pilimit: 'max', // images for all articles, otherwise only for the first
			exlimit: 'max', // extracts for all articles, otherwise only for the first
			exintro: '' // extracts intro
		};


		/*** PUBLIC METHODS ***/


		wiki.openArticle = function (title) {
			// wiki.term = title; // update search term
			var params = {
				titles: title,
				redirects: ''
			};
			var paramUrl = createParamUrl(params, title);

			$http.jsonp(paramUrl)
				.success(function (data) {
					var page = data.query.pages[0];
					if (page.extract) { // if there is content
						wiki.page = page;
					}
				})
				.error(handleErrors);
		}; // openArticle


		wiki.searchWikipedia = function (term, params) {
			updateSearchTerm();
			var paramUrl = createParamUrl(params, term);

			$http.jsonp(paramUrl)
				.success(function (data) {
					if (data.query) {
						wiki.results = highlightExactMatch(term, data.query.pages);
					}
				})
				.error(handleErrors);
		}; // searchWikipedia



		/*** PRIVATE HELPER FUNCTIONS ***/

		// open exact article, and remove it from the results
		function highlightExactMatch(term, pages) {
			for(var x in pages) {
				if (pages[x].title == capitalizeFirst(term)) {
					wiki.openArticle(term);
					pages.splice(x, 1);
				}
			}
			return pages;
		}	// highlightExactMatch

		function updateSearchTerm() {
			wiki.params.gsrsearch = wiki.searchFilter + wiki.term;
		} // updateSearchTerm

		function handleErrors() {
			wiki.error = "Oh no, there was some error in geting data.";
		} // handleErrors

		function createParamUrl(params) {
			var apiUrl = 'http://en.wikipedia.org/w/api.php';
			// default params for all
			params.action = 'query';
			params.prop = 'extracts|pageimages';
			params.format = 'json';
			params.formatversion = 2;
			params.callback = 'JSON_CALLBACK';
			var paramUrl = apiUrl + '?' + serialize(params);
			console.log(paramUrl);
			return paramUrl;
		} // createParamUrl

		function serialize(params) {
			var paramString = Object.keys(params).map(function (key) {
				return key + '=' + params[key];
			}).join('&');
			return paramString;
		} // serialize

		function capitalizeFirst(string) {
		    return string.charAt(0).toUpperCase() + string.slice(1);
		}	// capitalizeFirst

	} // WikiController

})();
