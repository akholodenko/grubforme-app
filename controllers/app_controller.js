gfm_app.controller('AppCtrl', ['$scope', 'suggestionsModel', 'userService',
	function($scope, suggestionsModel, userService) {
		$scope.user = userService;
		$scope.suggestions = suggestionsModel;
		$scope.current_suggestion = null;
		$scope.current_suggestion_index = 0;

		$scope.constructor = function () {
			$scope.user.set_location();
		};

		$scope.$on('user_location_set', function () {
			$scope.suggestions.set();
		});

		$scope.$watch('suggestions.data', function(old_value, new_value) {
			if(new_value == old_value) return;

			$scope.current_suggestion = $scope.suggestions.data[0];
		}, true);

		$scope.show_next = function () {
			console.log('show next');

			if($scope.suggestions.data.length <= $scope.current_suggestion_index + 1) {
				$scope.current_suggestion_index = 0;
			}
			else {
				$scope.current_suggestion_index++;
			}

			$scope.current_suggestion = $scope.suggestions.data[$scope.current_suggestion_index];
		}

		$scope.constructor();
	}
]);