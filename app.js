(function () {

	// ubaciti back dugme i autofokus

	'use strict';
	angular
		.module("wikiModul", ['ngSanitize'])
		.controller('WikiController', WikiController);


	function WikiController($http) {

		var wiki = this;
		wiki.searchTerm = 'enlightenment';	// default
		wiki.page = null;
		wiki.results = null;
		wiki.error = "";


		/*** PUBLIC METHODS ***/

		wiki.openArticle = function (title) {
			wiki.searchTerm = title;	// update search term
			var params = {
				titles: title,
				redirects: ''
			};
			var paramUrl = createParamUrl(params, title);

			$http.jsonp(paramUrl)
				.success(function (data) {
					var page = data.query.pages[0];
					if (page.extract) {			// if there is content
						wiki.page = page;
						wiki.results = null;	// hide other results
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
					if(data.query) {
						wiki.results = data.query.pages;
						wiki.page = null;
					}
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
