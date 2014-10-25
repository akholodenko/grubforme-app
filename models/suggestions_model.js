gfm_app.factory('suggestionsModel', ['$rootScope', '$http', 'API_URL', 'userService', 'suggestionsData',
		function ($rootScope, $http, API_URL, userService, suggestionsData) {
		return {
			path: API_URL.appfog,
			data: suggestionsData,
			set: function (callback) {
				var that = this;

				$http.jsonp(this.path + '/yelp/all?radius=' + userService.travel_distance + '&lat=' + userService.location.latitude + '&lon=' + userService.location.longitude + '&callback=JSON_CALLBACK')
					.success(function(data, status, headers, config) {
						that.data = data;

						console.log('got data');

						if(callback !== undefined)
							callback(data);
					}
				);
			}
		};
	}
]);