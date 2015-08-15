(function() {

	angular
		.module('NMusicApp')
		.factory('searchService',searchService);

	searchService.$inject = ['$http'];

	function searchService ($http){

		var API_URL = 'http://services.sapo.pt/Music/OnDemand/Provider/apiv3/find';

		function searchRequest (params){

			return $http({
						url: API_URL,
						method: "GET",
						params : params 
					})
					.then(successHandler)
					.catch(errorHandler);

			function successHandler (response) {
            	return response.data;
	        }

	        function errorHandler (error) {
	           //TODO
	        }

		}

		return {
			searchRequest : searchRequest
		};
	}

})();