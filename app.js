(function () {

	// kad kliknem na neki clanak otvara ga preko cele strane, i pojavljuje se back dugme

	// kad nema više rezultata obrisi prethodne
	// ako nema ni clanaka ni glavnog clanka, napisati nema rezultata
	// ako ima samo glavni, nema ostalih, rasiriti ga
	// ubaciti back dugme i autofokus
	// ubaciti ostale wiki projekte
	// ubaciti paramUrl u dokumentaciju

	'use strict';
	angular
		.module("wikiModul", ['ngSanitize'])
		.controller('WikiController', WikiController);


	function WikiController($http) {

		var wiki = this;
		wiki.term = 'zen'; // default
		wiki.searchFilter = "intitle:";
		wiki.apiUrl = 'http://en.wikipedia.org/w/api.php';
		wiki.page = null;
		wiki.results = null;
		wiki.error = "";

		// common static params for open and search
		var commonParams = {
			action: 'query',
			prop: 'extracts|pageimages',
			redirects: '',	// automatically resolve redirects
			format: 'json',
			formatversion: 2,
			callback: 'JSON_CALLBACK'
		};

		// public params for search
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
			var paramUrl = createParamUrl({titles: title}, commonParams);

			$http.jsonp(paramUrl)
				.success(function (data) {
					if (!data.query) return;
					var page = data.query.pages[0];
					wiki.page = page;
					wiki.results = removeDupes(title, wiki.results, data.query.redirects);
				})
				.error(handleErrors);
		}; // openArticle


		wiki.searchWikipedia = function (term, params) {
			updateSearchTerm();
			var paramUrl = createParamUrl(params, commonParams);

			$http.jsonp(paramUrl)
				.success(function (data) {
					if (!data.query) {
						wiki.results = [];
						wiki.page = "";
						return;
					}
					wiki.results = data.query.pages;
					wiki.openArticle(term);
				})
				.error(handleErrors);
		}; // searchWikipedia


		/*** PRIVATE HELPER FUNCTIONS ***/

		function removeDupes(term, results, redirects){
			for(var x in results) {
				if (results[x].title == capitalizeFirst(term)) {
					results.splice(x, 1); // remove it from the list
				}
				for(var r in redirects) {
					if(redirects[r].to == results[x].title) {
						results.splice(x, 1);
					}
				}
			}	// end for
			return results;
		}	// removeDupes

		function updateSearchTerm() {
			wiki.params.gsrsearch = wiki.searchFilter + wiki.term;
		} // updateSearchTerm

		function handleErrors() {
			wiki.error = "Oh no, there was some error in geting data.";
		} // handleErrors

		function createParamUrl(params, commonParams) {
			angular.extend(params, commonParams);
			var paramUrl = wiki.apiUrl + '?' + serialize(params);
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
		} // capitalizeFirst

	} // WikiController

})();
