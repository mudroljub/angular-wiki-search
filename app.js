(function () {
	'use strict';
	angular
		.module("wikiModul", ['ngSanitize'])
		.controller('WikiKontrol', WikiKontrol);


	function WikiKontrol($http) {

		var wiki = this;
		wiki.term = 'Buddha';
		wiki.json = {};	// samo u razvoju, posle obrisati
		wiki.page = {};
		wiki.error = "";

		wiki.findPage = function () {
			var paramUrl = createParamUrl(wiki.term);

			$http.jsonp(paramUrl)
				.success(function (data) {
					wiki.json = data.query;
					var page = wiki.json.pages[0];

					if(page.extract) {
						wiki.page = page;
					} else {
						wiki.page = {};
					}
				})
				.error(function(){
					wiki.error = "Oh no, there is some error.";
				});

		}; // findPage



		// HELPER FUNCTIONS

		function createParamUrl(term) {
			var apiUrl = 'http://en.wikipedia.org/w/api.php';

			var params = {
				action: 'query',
				prop: 'extracts|pageimages|pageterms',
				redirects: '',
				titles: term,
				format: 'json',
				formatversion: 2
			};

			var paramString = serialize(params);
			var fullParamUrl = apiUrl + '?' + paramString + '&callback=JSON_CALLBACK';
			return fullParamUrl;
		} // createParamUrl

		function serialize(params) {
			var paramString = Object.keys(params).map(function (key) {
				return key + '=' + params[key];
			}).join('&');
			return paramString;
		} // serialize

	} // WikiKontrol

})();
