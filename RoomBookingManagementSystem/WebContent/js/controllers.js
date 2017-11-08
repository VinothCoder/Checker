//declare controller module
var customController=angular.module('customControllers',[]);


/**
 *   LoginCtrl controller
 *   validate(user): validates entered username and password and alerts appropriate messages
 */
customController.controller('LoginCtrl', function($scope, $location,$rootScope,$http,$timeout) 
		{

	$scope.validate=function () 
	{ 
		
		var validateCre="";
		
		 getLogin($http,$scope);
		 $timeout(function() {
			 computeLogin($scope,$rootScope,$location);
		 },1000);
		
	}
		});

/**
 * Get the login credential
 * @param http
 * @param scope
 */
function getLogin(http,scope)
{
	http.get('data/roles.json').success(function(data) 
			{
		scope.validateCre = data;
			}
	)
	.error(function(data) 
			{ //log.error('Problem with retreving  credintials data');
			});	
}
/**
 * Validate the credential
 * @param scope
 * @param rootScope
 * @param location
 */
function computeLogin(scope,rootScope,location)
{
	var flag=false;
	var userName=scope.userName;
	var password=scope.password;
	if( scope.validateCre && userName && password)
	{
		angular.forEach( scope.validateCre, function(item)
				{ 
			if(item.username.toUpperCase==userName.toUpperCase && item.password==password  )
			{
				flag=true;
				rootScope.username=scope.userName;
				rootScope.role=item.role;
				if('user'==item.role)
					location.path('/home/user');
				else if('admin'==item.role)
					location.path('/home/admin');
				else
					location.path('/main');
			}

				});
	}
	if(flag)
	{
		alert('Login Succesful');
	}
	else
	{
		alert('Please Provide Valid Login credentials');
	}
	
}

/**
 * roomListCtrl controller
 *  store this in a Room model
 */
//Call Ajax Function to get the data dynamically
customController.controller('RoomListCtrl_user', 
		function ($scope, $http, BookingData,$rootScope,$location)
		{

	$scope.viewRoom="Meeting Room Details";
	if(!$rootScope.books)
		$rootScope.books = BookingData.getData();

	$scope.issue=function (roomId)
	{
		$location.path('/issue/:'+roomId);
	}
	$scope.changeView=function() 
	{	// invoke the custom service
		$rootScope.books=$scope.books;
	}
		}


);




/**
 *  RoomListCtrl controller
 *  store this in a Rooms model
 */
customController.controller('RoomListCtrl_admin', 
		function ($scope, $http, BookingData,$rootScope,$location)
		{
	$scope.viewRoom="Meeting Room Details";

	if(!$rootScope.books)
		$rootScope.books = BookingData.getData();

	$scope.issue=function (roomId)
	{
		$location.path('/issue/:'+roomId);
	}
	$scope.returnFun=function (roomId)
	{
		$location.path('/return/:'+roomId);
	}
	$scope.changeView=function() 
	{	// invoke the custom service
		$rootScope.books=$scope.books;
	}

		}

);


/**
 * Controller to Book Meeting
 */
customController.controller('IssueRoomCtrl', 
		function ($scope, $rootScope, $routeParams,$location) 
		{
	$scope.IssueRoom="Book Meeting";


	// Getting the id from $routeParams
	var id = $routeParams.roomId.split(':')[1];


	angular.forEach( $rootScope.books, function(item)
			{ 
		if(id==item.roomId)
		{
			$scope.book = item;
		}
			});


	$scope.issue=function ()
	{
		$scope.book.availability="No";
		alert('Room has been booked');
		if($rootScope.role=='user')
			$location.path('/home/user');
		else
		$location.path('/home/admin');
	}

		}

);



customController.controller('ReturnRoomCtrl', 
		function ($scope, $rootScope, $routeParams,$location) 
		{
	$scope.ReturnRoom="Cancel Meeting";
	// Getting the id from $routeParams

	var id = $routeParams.roomId.split(':')[1];

	angular.forEach( $rootScope.books, function(item)
			{ 
		if(id==item.roomId)
		{
			$scope.book = item;
		}
			});

	$scope.returnFun=function ()
	{
		$scope.book.availability="Yes";
		alert('Room has been cancelled');
		$location.path('/home/admin');
	}
		}
);

/**
 * Login Page Footer Controller
 */
customController.controller('Ctrl', function($scope){

	$scope.footer="Copyright @ Facility-Infosys";});

/**
 * Controller to add New Room
 */

customController.controller('AddRoomCtrl', 
		function ($scope, $rootScope,$location) 
		{
	$scope.AddNewRoom="Add New Meeting Room";
	var book=[];
	$scope.addBook=function()
	{

		book.roomId=$scope.roomId;
		book.location=$scope.location;
		book.floorDetails=$scope.floorDetails;
		book.roomName=$scope.roomName;
		book.imgUrl="imgs/images5.jpg";
		book.availability="Yes";
		$rootScope.books.push(book);
		alert('New Meeting Room Added');
		$location.path('/home/admin');
	}

		}
);


