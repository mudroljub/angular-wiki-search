(function () {

	// napraviti funkciju koja pretrazuje strane
	// objediniti funkcije da se obe pozivaju iz jedne na svaku promenu
	// ako ima jedan rezultat, prikazuje jedan, ako ima vise lista ih

	// ubaciti back dugme i autofokus

	/*
        svi parametri: https://www.mediawiki.org/w/api.php
        isprobavanje: https://en.wikipedia.org/wiki/Special:ApiSandbox

        pretvara pageId u url: https://en.wikipedia.org/w/api.php?action=query&prop=info&pageids=18630637&inprop=url
        moze i direktno otvaranje: https://en.wikipedia.org/?curid=18630637
    */

	'use strict';
	angular
		.module("wikiModul", ['ngSanitize'])
		.controller('WikiController', WikiController);


	function WikiController($http) {

		var wiki = this;
		wiki.term = 'happiness';	// default
		wiki.json = {}; // samo u razvoju, posle obrisati
		wiki.page = null;
		wiki.results = null;
		wiki.error = "";


		/*** PUBLIC METHODS ***/

		wiki.openArticle = function (title) {

			var params = {
				titles: title,
				redirects: ''
			};
			var paramUrl = createParamUrl(params, title);

			$http.jsonp(paramUrl)
				.success(function (data) {
					wiki.json = data.query;
					var page = wiki.json.pages[0];

					if (page.extract) {
						wiki.page = page;
						wiki.results = null;
					} else {
						wiki.page = {};
					}
				})
				.error(function () {
					wiki.error = "Oh no, there was some error in geting data.";
				});

		}; // openArticle


		wiki.searchWikipedia = function (term) {

			var params = {
				generator: 'search',
				gsrsearch: term,
				pilimit: 'max', // images for all articles, otherwise only for the first
				exlimit: 'max', // extracts for all articles, otherwise only for the first
				exintro: '' // only article's intro
			};
			var paramUrl = createParamUrl(params, term);

			$http.jsonp(paramUrl)
				.success(function (data) {
					wiki.json = data.query;
					wiki.results = data.query.pages;
					wiki.page = null;
				})
				.error(function () {
					wiki.error = "Oh no, there was some error in geting data.";
				});

		}; // searchWikipedia



		/*** HELPER FUNCTIONS ***/

		function createParamUrl(params) {
			var apiUrl = 'http://en.wikipedia.org/w/api.php';
			// default params for all
			params.action = 'query';
			params.prop = 'extracts|pageimages';
			params.format = 'json';
			params.formatversion = 2;
			params.callback = 'JSON_CALLBACK';
			var paramUrl = apiUrl + '?' + serialize(params);
			return paramUrl;
		} // createParamUrl

		function serialize(params) {
			var paramString = Object.keys(params).map(function (key) {
				return key + '=' + params[key];
			}).join('&');
			return paramString;
		} // serialize

	} // WikiController

})();
