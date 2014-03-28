var VIDEO = VIDEO || {}
VIDEO.VIEW = (function(window){

	var view = {};

	view.listenChannelClick = function(){

		var myPlayer = videojs("video")

		$("#play").click(function(){
			myPlayer.play();
		});

		$("#time").click(function(){

			myPlayer.currentTime(100);

			timeRange = myPlayer.buffered();

			console.log(timeRange);

			
		})

		$("#event").click(function(){
			timeRange = myPlayer.buffered();
		})
	};

	view.init = function(){
		var myPlayer = videojs("video");

		view.listenChannelClick();
	};

	$(document).ready(
		view.init
	);

	return view;

}(window));