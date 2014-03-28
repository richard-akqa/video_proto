var VIDEO = VIDEO || {}
VIDEO.VIEW = (function(window){

	var view = {};

	view.loadVideo = function(node){
		var videoAttr = 'controls width="640" height="265"',
			vidUrl = $(node).data("vid"),
			videoSrc =  '<source src="' + vidUrl + '.mp4" type="video/mp4"/><source src="' + vidUrl + '.webm" type="video/webm"/>',
			videoTemplate = '<video id="video" class="video-js vjs-default-skin"' + videoAttr+ '> ' + videoSrc+ '</video>';

		
		$("#video-container").html("");
		$("#video-container").html(videoTemplate, function(){
			videojs("#video");
		});

	}

	view.listenChannelClick = function(){

		$(".video-link").click(function(){
			view.loadVideo(this);
		});

		$("#time").click(function(){
			videojs("#video").currentTime(555);
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