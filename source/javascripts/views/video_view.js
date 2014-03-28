var VIDEO = VIDEO || {}
VIDEO.VIEW = (function(window){

	var view = {};

	view.listenChannelClick = function(){

		var vidPlayer = videojs("video");

		$("#play").click(function(){
			vidPlayer.play();
		});

		$("#time").click(function(){

			vidPlayer.currentTime(100);
		})

		vidPlayer.on("seeking", function(){
			console.log("seeking")
			$("#status").html("seeking");
			document.getElementById('audio').play();
		})

		vidPlayer.on("canplay", function(){
			console.log("canplay")
			$("#status").html("starting");
			document.getElementById('audio').pause();
		})

	};

	view.init = function(){
		var vidPlayer = videojs("video");

		view.listenChannelClick();
	};

	$(document).ready(
		view.init
	);

	return view;

}(window));