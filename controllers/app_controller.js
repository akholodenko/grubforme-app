gfm_app.controller('AppCtrl', ['$scope', 'suggestionsModel', 'userService',
	function($scope, suggestionsModel, userService) {
		$scope.user = userService;
		$scope.suggestions = suggestionsModel;

		$scope.constructor = function () {
			$scope.user.set_location();
		};

		$scope.$on('user_location_set', function () {
			$scope.suggestions.set();
		});

		$scope.constructor();
	}
]);