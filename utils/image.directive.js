(function() {

	angular
		.module('NMusicApp')
		.directive('imageExistence',imageExistence)

	function imageExistence () {
		return {
			restrict: "A",
            link: function(scope, element, attrs) {
            	element.bind('error', function() {
			         attrs.$set('src', attrs.defaultSrc);
		      	});
            }
        };

	}

})();