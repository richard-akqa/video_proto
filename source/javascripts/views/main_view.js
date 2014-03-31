var MAIN = MAIN || {}
MAIN.VIEW = (function(window){

	var view = {};

	var _ua = navigator.userAgent
	, _windowWidth = $(window).innerWidth()
	, _windowHeight = $(window).innerHeight()
	, _isMobile = {
		Android: _ua.match(/Android/i)
		,BlackBerry: _ua.match(/BlackBerry/i)
		,iOS: _ua.match(/iPhone|iPod|iPad/i)
		,Opera: _ua.match(/Opera Mini/i)
		,Windows: _ua.match(/IEMobile/i)
		,Smartphone: _ua.match(/Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile/i)
	}
	, _isAnyMobile = _isMobile.Android || _isMobile.BlackBerry  || _isMobile.iOS  || _isMobile.Opera || _isMobile.Windows
	, _isTouch = $("html").hasClass("touch")
	, _isIE = $("html").hasClass("ie")
	, _isIE8 = $("html").hasClass("ie8")
	, _scrollControll = !(_isAnyMobile || _isIE8);

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

		if (_windowWidth > 985){
			$("html").removeClass("screen-lt-985");
			$("html").addClass("screen-bt-985");
		} else if (_windowWidth <= 985) {
			$("html").removeClass("screen-bt-985");
			$("html").addClass("screen-lt-985");
		}

		if(_scrollControll){
			$("html").addClass("scroll-controll");
		}

		if(!_isMobile.Smartphone && !_isIE8){
			$("html").addClass("svg-pattern");
		}
	}


	// $(document).ready(function(){
	view.init = function(){
		window.location.hash = '';
		
		view.addMobileClass();
	};

	return view;

}(window));