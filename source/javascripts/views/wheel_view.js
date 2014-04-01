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

	view.createNavWheel = function(){

		var width = 300,
			height = 300,
			el = "#svg-wheel",
			outerRadius = width/2,
			innerRadius = 100,
			svg = undefined,
			arcs = undefined,
			countriesNum = 31,
			data = [],
			color = d3.scale.ordinal().domain(["230", "180", "130", "80"])
			.range(["rgb(230,230,230)", "rgb(180,180,180)", "rgb(130,130,130)" , "rgb(80,80,80)" ]);

		for (var i=0; i< countriesNum; i++){
			data.push(1);
		}

		pie = d3.layout.pie(data);

		var arc = d3.svg.arc()
			.outerRadius(outerRadius - 10)
			.innerRadius(innerRadius);

		var arc2 = d3.svg.arc()
			.outerRadius(outerRadius)
			.innerRadius(innerRadius);


		svg = d3.select(el)
				.append("svg")
				.attr("width", width)
				.attr("height", height);

		arcs = svg.selectAll("g.arc")
			.data(pie(data))
			.enter()
			.append("g")
			.attr("class", "arc")
			.attr("transform", "translate("+ outerRadius +"," + outerRadius + ")");

		arcs.append("path")
			.attr("fill", function(d, i){
				return color(i);
			})
			.attr("d", arc);

		arcs.append("path")
			.attr("class", "selector")
			.attr("fill", "transparent")
			.attr("d", arc2)
			.style("stroke", "red");

	}

	view.listenChannelClick = function(){

		if(!_isAnyMobile){

			if(!_isSVG){
				$(".time").click(function(){
					var time = $(this).data("time");
					VIDEO.VIEW.onSeekChannel(time);
					$(".time").removeClass('playing');
					$(this).addClass('playing');
				});

				$(".time").on("mousemove", function(){
					$(".time").removeClass('selected');
					$(this).addClass('selected');
				});
			} else {

				$(".selector").click(function(){
					$(".selector").css("opacity", 0);
					$(this).css("opacity", 1);
				});

				$(".selector").on("mousedown", function(){
					$(".selector").on("mouseenter", function(){
						$(".selector").css("opacity", 0);
						$(this).css("opacity", 1);
					});
				});

				$(".selector").on("mouseup", function(){
					var time = $(this).data("time");
					VIDEO.VIEW.onSeekChannel(time);
					$(".selector").off("mouseenter");
				});
			}

		} else {

			if(!_isSVG){
				$(".time").on("touchend", function(){
					var time = $(this).data("time");
					$(".time").removeClass('playing');
					$(this).addClass('playing');
					VIDEO.VIEW.onSeekChannel(time);
				});
			} else {
				$(".selector").on("touchend", function(){
					var time = $(this).data("time");
					$(".selector").css("opacity", 0);
					$(this).css("opacity", 1);
					VIDEO.VIEW.onSeekChannel(time);
				});
			}
			
		}		
	};

	view.addChannelInit = function(){
		var countriesNum = 31,
			index = 1;
		
		for (var i=0; i< countriesNum; i++){
			var dataTime = 'data-time="' + 60 * (i+1) + '"';
			$("nav ul").append('<li><a href="#" '+ dataTime +' class="time"></a></li>')
		}

		$("#svg-wheel svg .arc").each(function(){
			var dataTime = 60 * index;
			$(this).attr("class", "arc time");
			$(this).children(".selector").attr("data-time", dataTime);
			index++
		});
	}

	view.init = function(){

		if(!_isSVG){
			view.addChannelInit();
		} else {
			view.createNavWheel();
			view.listenChannelClick ();
		}
	};

	$(document).ready(
		view.init
	);

	return view;

}(window));