var MAIN = MAIN || {}
MAIN.VIEW = (function(window){

	var view = {};

	var _ua = navigator.userAgent
		, _windowWidth = $(window).innerWidth()
		, _windowHeight = $(window).innerHeight()
		, _isMobile = {
			Android: _ua.match(/Android/i)
			,BlackBerry: _ua.match(/BlackBerry/i)
			,iPad: _ua.match(/iPad/i)
			,iPhone: _ua.match(/iPhone/i)
			,Opera: _ua.match(/Opera Mini/i)
			,Windows: _ua.match(/IEMobile/i)
			,Smartphone: _ua.match(/Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile/i)
		}
		, _isAnyMobile = _isMobile.Android || _isMobile.BlackBerry  || _isMobile.iPhone  || _isMobile.Opera || _isMobile.Windows
		, _isSVG = $("html").hasClass("svg");

	view.androidVersion = function(){

		var version = undefined;

		if( _isMobile.Android ) {
			version = parseFloat(_ua.slice(_ua.indexOf("Android")+8));
		}
		return version;
	}

	view.addMobileClass = function(windowWidth){

		var androidVersion = view.androidVersion();

		if (androidVersion <= 2.3){
			$("html").addClass("device-mobile");
			$("html").addClass("old-android");

		} else if(androidVersion > 2.3){
			$("html").addClass("device-mobile");
			$("html").addClass("new-android");

		} else if (_isMobile.iOS) {
			$("html").addClass("device-mobile");
			$("html").addClass("ios-mobile");

		} else {
			$("html").addClass("device-desktop");
		}

		if(_isMobile.iPhone){
			$("html").addClass("iPhone");
		}

		if (_windowWidth > 985){
			$("html").removeClass("screen-lt-985");
			$("html").addClass("screen-bt-985");
		} else if (_windowWidth <= 985) {
			$("html").removeClass("screen-bt-985");
			$("html").addClass("screen-lt-985");
		}

	}

	view.flexSliderinit = function(){
		$(window).load(function(){
			$(".flexslider").flexslider({
				animation: "slide",
				controlNav: true,
				directionNav: true
			});
		})
	}

	
	view.init = function(){
		view.addMobileClass();
		view.flexSliderinit();

	};

	$(document).ready(
		view.init
	);

	return view;

}(window));