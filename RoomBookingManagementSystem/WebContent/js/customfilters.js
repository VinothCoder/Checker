//declare custom filter module
var customController=angular.module('bookingAppCustomFilters',[]);



/**
 * custom filter To Filter availability Books
 */ 
customController.filter("filterunissued", function() 
		{
	return function(books,viewbookoption) 
	{

		if(!viewbookoption)
		{
			return books;
		}
		else if (viewbookoption=="available")
		{
			var tempBook=[];
			angular.forEach( books, function(item)
			{ 
				if(item.availability=="Yes")
				{
					tempBook.push(item);
				}
			});
			return tempBook;

		}
	}
		});