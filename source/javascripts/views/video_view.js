var VIDEO = VIDEO || {}
VIDEO.VIEW = (function(window){

	var view = {};

	var _ua = navigator.userAgent
		, _isMobile = {
			Android: _ua.match(/Android/i)
			,BlackBerry: _ua.match(/BlackBerry/i)
			,iOS: _ua.match(/iPhone|iPod|iPad/i)
			,Opera: _ua.match(/Opera Mini/i)
			,Windows: _ua.match(/IEMobile/i)
			,Smartphone: _ua.match(/Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile/i)
		}
		, _isAnyMobile = _isMobile.Android || _isMobile.BlackBerry  || _isMobile.iOS  || _isMobile.Opera || _isMobile.Windows
		, _fadeInInterval
		, _fadeOutInterval
		, _vol = 0
		, _isFirstPlay = false;

	view.audioFadeIn = function(audioPlayer){
		clearInterval(_fadeOutInterval);
		_fadeInInterval = setInterval(function(){
			if(_vol < 10){
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

		function onProgressSeek(){

			vidPlayer.one("progress", function(){
				vidPlayer.currentTime(time);
				_isFirstPlay = true;
			});
		}

		currentTime = vidPlayer.currentTime();

		if(!_isAnyMobile){
			if(currentTime == 0){
				vidPlayer.play();
				onProgressSeek();
				view.audioTransitionInit(vidPlayer);
			} else {
				vidPlayer.currentTime(time);
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
				console.log("hello2");
				onProgressSeek();
			}
		}
	}

	view.listenChannelClick = function(){

		$("#time").click(function(){
			view.onSeekChannel(50);
		})

		$("#time2").click(function(){
			view.onSeekChannel(70);
		})

		$("#time3").click(function(){
			view.onSeekChannel(100);
		})

		$("#time4").click(function(){
			view.onSeekChannel(110);
		})

		$("#time5").click(function(){
			view.onSeekChannel(130);
		})
	};

	view.init = function(){
		view.listenChannelClick();
	};

	$(document).ready(
		view.init
	);

	return view;

}(window));