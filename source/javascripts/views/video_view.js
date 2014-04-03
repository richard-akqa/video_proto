var VIDEO = VIDEO || {}
VIDEO.VIEW = (function(window){

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
		, _isSVG = $("html").hasClass("svg")
		, _fadeInInterval
		, _fadeOutInterval
		, _vol = 0
		, _isFirstPlay = false;

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

	view.audioFadeIn = function(audioPlayer){
		clearInterval(_fadeOutInterval);
		_fadeInInterval = setInterval(function(){
			if(_vol < 8){
				_vol += 1
				audioPlayer.volume = _vol/10;
			} else {
				clearInterval(_fadeInInterval);
			}
		}, 100);
	}

	view.audioFadeOut = function(audioPlayer){
		clearInterval(_fadeInInterval);
		_fadeOutInterval = setInterval(function(){
			if(_vol > 0){
				_vol -= 1
				audioPlayer.volume = _vol/10;
			} else {
				clearInterval(_fadeOutInterval);
			}
		}, 100);
	}

	view.audioTransitionInit = function(vidPlayer){

		var audioPlayer = document.getElementById('audio');

		audioPlayer.play();
		audioPlayer.volume = _vol;

		vidPlayer.on("seeking", function(){
			view.audioFadeIn(audioPlayer);
		})

		vidPlayer.on("canplay", function(){
			view.audioFadeOut(audioPlayer);
		})
	}

	view.onSeekChannel = function(time){
		var vidPlayer = videojs("video"),
			channel = undefined;

		currentTime = vidPlayer.currentTime();
		time = time + currentTime%60;

		function onProgressSeek(){

			vidPlayer.one("progress", function(){
				vidPlayer.currentTime(time);
				_isFirstPlay = true;

				setTimeout(function(){
					$("#svg-wheel").addClass("hide-player");
				}, 3000);
			});
		}

		vidPlayer.volume(0.7);

		if(!_isAnyMobile){
			if(currentTime == 0){
				vidPlayer.play();
				onProgressSeek();
				view.audioTransitionInit(vidPlayer);
			} else {
				onProgressSeek();
			}
		} else {
			vidPlayer.play();
			if(!_isFirstPlay){
				//this is for first play in mobile
				vidPlayer.on("canplay", function(){
					onProgressSeek();
					vidPlayer.play();
					view.audioTransitionInit(vidPlayer);
				});
			} else {
				//this is for 2nd play in mobile
				onProgressSeek();
			}
		}
	}

	view.init = function(){
		view.addMobileClass();
	};

	$(document).ready(
		view.init
	);

	return view;

}(window));