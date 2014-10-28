gfm_app.controller('AppCtrl', ['$scope', '$timeout', 'suggestionsModel', 'userService',
	function($scope, $timeout, suggestionsModel, userService) {
		$scope.user = userService;
		$scope.suggestions = suggestionsModel;
		$scope.current_suggestion = null;
		$scope.current_suggestion_index = 0;
		$scope.show_swipe_tip = false;

		$scope.constructor = function () {
			$scope.user.set_location();
		};

		$scope.$on('user_location_set', function () {
			$scope.suggestions.set();
		});

		$scope.$watch('suggestions.data', function(old_value, new_value) {
			if(new_value == old_value) return;

			$scope.current_suggestion = $scope.suggestions.data[0];

			// show / hide-delay swipe tooltip
			$scope.show_swipe_tip = true;
			$timeout(function () {
				$scope.show_swipe_tip = false;
			}, 3000);
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

		$scope.show_prev = function () {
			console.log('show prev');

			if($scope.current_suggestion_index == 0) {
				$scope.current_suggestion_index = $scope.suggestions.data.length - 1;
			}
			else {
				$scope.current_suggestion_index--;
			}

			$scope.current_suggestion = $scope.suggestions.data[$scope.current_suggestion_index];
		}

		$scope.vecinity = function () {
			if($scope.current_suggestion == null) {
				return "";
			}
			else {
				var distance = $scope.current_suggestion.distance;

				if (distance <= 500)
					return 'close by';
				else if (distance <= 1000)
					return 'a stroll away';
				else
					return 'a shlep away';
			}
		}

		$scope.constructor();
	}
]);