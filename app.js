(function() {

    // kad kliknem na neki clanak otvara ga preko cele strane, i pojavljuje se back dugme
    // kad klikne na vec otvoreni glavni, ne upucuje opet ajax poziv, samo ga rasiri
    // ako ima samo glavni rezultat, nema ostalih, mozda rasiriti ga (npr pariguz)
    // ubaciti back dugme i autofokus
    // provera za max number
    // ubaciti ostale wiki projekte
    // ubaciti paramUrl u dokumentaciju

    'use strict';
    angular
        .module("wikiModul", ['ngSanitize'])
        .controller('WikiController', WikiController);


    function WikiController($http, $window) {

        var wiki = this;
        wiki.term = 'zen'; // default
        wiki.searchFilter = "intitle:";
        wiki.apiUrl = 'http://en.wikipedia.org/w/api.php';
        wiki.page = null;
        wiki.results = null;
        wiki.error = "";
		wiki.leadLarge = false;

        // common static params for open and search
        var commonParams = {
            action: 'query',
            prop: 'extracts|pageimages',
            redirects: '', // automatically resolve redirects
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

        wiki.openArticle = function(title) {
            // wiki.term = title; // update search term
            if (wiki.page && (wiki.page.title == title)) {
                wiki.results = removeDupes(title, wiki.results);
                return;
            }
            var paramUrl = createParamUrl({
                titles: title
            }, commonParams);
            $http.jsonp(paramUrl)
                .success(function(data) {
                    if (!data.query) return;
                    var page = data.query.pages[0];
                    wiki.page = page;
                    wiki.results = removeDupes(title, wiki.results, data.query.redirects);
                })
                .error(handleErrors);
        }; // openArticle


        wiki.searchWikipedia = function(term, params) {
            updateSearchTerm();
            var paramUrl = createParamUrl(params, commonParams);

            $http.jsonp(paramUrl)
                .success(function(data) {
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


		wiki.toggleLeadLarge = function() {
			wiki.leadLarge = !wiki.leadLarge;
        };	// toggleLeadLarge


		wiki.selectText = function() {
			var text = $window.getSelection().toString();
			wiki.term = text;
        };	// toggleLeadLarge


        /*** PRIVATE HELPER FUNCTIONS ***/

        function removeDupes(term, results, redirects) {
            for (var x in results) {
                if (results[x].title == capitalizeFirst(term)) {
                    results.splice(x, 1); // remove it from the list
                }
                if (!redirects) return results;
                for (var r in redirects) {
                    if (redirects[r].to == results[x].title) {
                        results.splice(x, 1);
                    }
                }
            } // end for
            return results;
        } // removeDupes

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
            var paramString = Object.keys(params).map(function(key) {
                return key + '=' + params[key];
            }).join('&');
            return paramString;
        } // serialize

        function capitalizeFirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        } // capitalizeFirst

    } // WikiController

})();
