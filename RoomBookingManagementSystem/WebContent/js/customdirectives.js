//declare custom directive module

var customController=angular.module('bookingAppCustomDirectives',[]);


/**
 * Custom Directive for highlight
 */
customController.directive('highlight',function()
		{ 
	return {
		restrict : 'EA',
		link: function($scope,element,attrs)
		{ 
			element.bind("mouseenter", function()
					{
				element.css("font-style", "italic");
				element.css("color", "pink");
					});
			element.bind("mouseleave", function()
					{
				element.css("font-style", "normal");
				element.css("color", "cornflowerblue");
					});
		} }});
