(function() {

	angular
		.module('NMusicApp')
		.directive('infiniteScroll',infiniteScroll)

	function infiniteScroll () {
		return {
			restrict: "A",
			scope: {
			    callback: "&infiniteScroll"
			},
            link: function(scope, element, attrs) {
            	var elem = element[0];

               	element.bind('scroll',function () {
               		if (elem.scrollTop + elem.offsetHeight > elem.scrollHeight - 150) {
						 scope.$apply(function () {
						 	scope.callback();
						 });
                	}
               	});
            }
        };

	}

})();