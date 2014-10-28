gfm_app.factory('userService', ['$rootScope', 'locationService',
	function ($rootScope, locationService) {
		return  {
			location: null,
			travel_distance: 1250,//var radius = (App.user.settings.is_driving) ? '8000' : '1250';
			set_location: function () {
				var location_from_storage = locationService.get_location_from_storage();

				// if current location was set less than 5 min ago, use it
				if(location_from_storage !== null && (Date.now() - location_from_storage.created_at) <= 300000 &&
					location_from_storage.location.latitude !== undefined) {
					console.log('use location from storage');
					this.location = location_from_storage.location;
					$rootScope.$broadcast('user_location_set');
				}
				else {
					console.log('use location from GPS');
					var that = this;
					locationService.get_location_from_gps(function(position) {
						$rootScope.$apply(function () {
							that.location = position.coords;
							locationService.save_location(that.location);
							$rootScope.$broadcast('user_location_set');
						});
					});
				}
			}
		}
	}
]);