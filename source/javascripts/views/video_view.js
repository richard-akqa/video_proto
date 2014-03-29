var VIDEO = VIDEO || {}
VIDEO.VIEW = (function(window){

	var view = {};

	view.listenChannelClick = function(){

		var vidPlayer = videojs("video"),
			audioPlayer = document.getElementById('audio'),
			vol = 0,
			isFirstPlay = false;

		function seekChannel(time){

			var channel = undefined;

			currentTime = vidPlayer.currentTime();

			if(currentTime == 0){
				vidPlayer.play();

				if(isFirstPlay == false){
					//this is for first play in mobile
					vidPlayer.on("canplay", function(){
						vidPlayer.one("progress", function(){
							vidPlayer.currentTime(time);
						});
					});

					isFirstPlay = true;
				} else {
					//this is for 2nd play in mobile
					vidPlayer.one("progress", function(){
						vidPlayer.currentTime(time);
					});
				}
			} else {
				vidPlayer.currentTime(time);
			}

		}

		// var audioFadeOut = setInterval(function(){
		// 		if(vol > 0){
		// 			vol -= 0.05
		// 			console.log("fading out");
		// 			//audioPlayer.volume = vol;
		// 		} else {
		// 			clearInterval(audioFadeOut);
		// 		}
		// 	}, 200);
		

		// var audioFadeIn = setInterval(function(){
		// 		if(vol < 100){
		// 			vol += 0.05
		// 			console.log("fading in");
		// 			//audioPlayer.volume = vol;
		// 		} else {
		// 			clearInterval(audioFadeIn);
		// 		}
		// 	}, 200);
		

		audioPlayer.play();
		audioPlayer.volume = 0;

		$("#play").click(function(){
			vidPlayer.play();

			isFirstPlay = true;
		});

		$("#time").click(function(){
			seekChannel(50);
		})

		$("#time2").click(function(){
			seekChannel(70);
		})

		$("#time3").click(function(){
			seekChannel(100);
		})

		$("#time4").click(function(){
			seekChannel(110);
		})

		$("#time5").click(function(){
			seekChannel(130);
		})

		vidPlayer.on("seeking", function(){
			console.log("seeking")
			$("#status").html("seeking");
			audioPlayer.volume = 0;
			//clearInterval(audioFadeOut);
			//audioFadeIn(audioPlayer);
		})

		vidPlayer.on("canplay", function(){
			console.log("canplay")
			$("#status").html("starting");
			audioPlayer.volume = 0;
			//clearInterval(audioFadeIn);
			//audioFadeOut(audioPlayer);
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