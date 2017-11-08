//declare main module and its dependencies


var libApp=angular.module('bookingApp',['customControllers','bookingAppCustomService','bookingAppCustomFilters','bookingAppCustomDirectives']);

/**
 * Route Controller 
 */
libApp.config(['$routeProvider',
               function($routeProvider) {
	$routeProvider.
	when('/main', {
		templateUrl: 'Login',
		controller: 'LoginCtrl'
	}).
	when('/home/user', {
		templateUrl: 'partials/ViewBooking_user.html',
		controller: 'RoomListCtrl_user'
	}).
	when('/home/admin', {
		templateUrl: 'partials/ViewBooking_admin.html',
		controller: 'RoomListCtrl_admin'
	}).
	when('/issue/:roomId', {
		templateUrl: 'partials/IssueRoom.html',
		controller: 'IssueRoomCtrl'
	}).        
	when('/return/:roomId', { 
		templateUrl: 'partials/ReturnRoom.html',
		controller: 'ReturnRoomCtrl'
	}).
	when('/AddNewRoom', { 
		templateUrl: 'partials/AddNewRoom.html',
		controller: 'AddRoomCtrl'
	}).

	otherwise({
		redirectTo: '/main'
	});
}]);

