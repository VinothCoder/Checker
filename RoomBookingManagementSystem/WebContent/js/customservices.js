//declare custom service module

var customController=angular.module('bookingAppCustomService',[]);

/**
 * custom http service to get the book json data
 */
customController.factory('BookingData', ['$http','$rootScope', function(http,$rootScope){
	return {
		getData: function()
		{
			
			console.log('inside custom service');
			return http.get('data/bookingDetail.json').then(function(result)
					{
				$rootScope.books=result.data;
				return result.data;

					}
			); }
	}; }]);