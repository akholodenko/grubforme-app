gfm_app.factory('userService', ['$rootScope',
	function ($rootScope) {
		return  {
			location: null,
			travel_distance: 8000,//var radius = (App.user.settings.is_driving) ? '8000' : '1250';
			set_location: function () {
				var that = this;
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(function(position){
						$rootScope.$apply(function(){
							that.location = position.coords;

							$rootScope.$broadcast('user_location_set');
						});
					}, function (error) {
						var error_message = '';
						switch(error.code)
						{
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

						$rootScope.$broadcast('user_location_set_error', {'message' : error_message});
					});
				}
			}
		}
	}
]);