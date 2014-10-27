gfm_app.factory('locationService', ['$rootScope',
	function ($rootScope) {
		return  {
			location_key: 'user_location_data',
			save_location: function (location) {
				if(typeof(Storage) !== "undefined") {
					localStorage.setItem(this.location_key, JSON.stringify({
						created_at: Date.now(),
						location: { latitude: location.latitude, longitude: location.longitude }
					}));

					return true;
				} else {
					console.log('local storage is not supported');
					return false;
				}
			},
			get_location_from_storage: function () {
				if(typeof(Storage) !== "undefined") {
					return JSON.parse(localStorage.getItem(this.location_key));
				} else {
					console.log('local storage is not supported');
					return null;
				}
			},
			get_location_from_gps: function (callback) {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function (position) {
						if(callback !== undefined)
							callback(position);
					}, function (error) {
						var error_message = '';
						switch (error.code) {
							case error.PERMISSION_DENIED:
								error_message = "We were not allowed to identify your location."
								break;
							case error.POSITION_UNAVAILABLE:
								error_message = "We had a problem identifying your location."
								break;
							case error.TIMEOUT:
								error_message = "We had a problem identifying your location."
								break;
							case error.UNKNOWN_ERROR:
								error_message = "We had a problem identifying your location."
								break;
						}

						console.log(error_message);

						$rootScope.$broadcast('user_location_set_error', {'message': error_message});
					});
				}
			}
		}
	}
]);