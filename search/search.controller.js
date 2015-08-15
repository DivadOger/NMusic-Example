(function() {

	angular
		.module('NMusicApp')
		.controller('SearchCtrl', SearchCtrl);


	SearchCtrl.$inject = ['$scope','searchService'];

	function SearchCtrl ($scope,searchService){

		var CONSTANTS = {
			IMG : {
				URL : 'http://catalogv3.nmusic.sapo.pt/',
				SIZE: 100 
			},
			PER_PAGE : 10
		};
		var currentOffset = 1;

		$scope.searchParam = {
			haveTracks : true,
			haveArtists : true,
			haveAlbums : true,
			text : ""
		}

		$scope.searchData = null;

		$scope.hasData = function () {
			return ($scope.searchData !== null);
		}

		$scope.doSearch = function (isNewSearch) {
			if(isNewSearch){
				$scope.searchData = null;
				currentOffset = 1;
			}

			return searchService.searchRequest({text: $scope.searchParam.text, page : currentOffset, per_page : CONSTANTS.PER_PAGE})
				.then(handleSearchData);

			function handleSearchData (data) {
				if($scope.searchData){
					$scope.searchData.artists.has_more_results = data.artists.has_more_results;
					$scope.searchData.artists.results = $scope.searchData.artists.results.concat(data.artists.results);

					$scope.searchData.albums.has_more_results = data.albums.has_more_results;
					$scope.searchData.albums.results = $scope.searchData.albums.results.concat(data.albums.results);

					$scope.searchData.tracks.has_more_results = data.tracks.has_more_results;
					$scope.searchData.tracks.results = $scope.searchData.tracks.results.concat(data.tracks.results);
				}
				else{
					$scope.searchData = data;
				}
	
			}
		};

		$scope.getElementImg = function (elementType,elementID) {
			return (CONSTANTS.IMG.URL + elementType + '/' + elementID + '/' + CONSTANTS.IMG.SIZE);
		};

		$scope.loadMoreResults = function () {
			if($scope.searchData.artists.has_more_results || $scope.searchData.albums.has_more_results || $scope.searchData.tracks.has_more_results){
				currentOffset += 1;
				$scope.doSearch(false);
			}
		};

	}

})();