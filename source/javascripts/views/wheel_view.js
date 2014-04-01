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
		, _wheelMotionInterval;

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
			.style({"stroke": "white", "stroke-width": 2});

	}

	view.onSelectorUpdate = function(node){

		var time = $(node).data("time");

		$(".selector").attr("class", "selector");
		$(node).attr("class", "selector selected");
		$("#country").html(time);
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

				$(".selector").on("mousedown", function(){
					clearInterval(_wheelMotionInterval);
					$(".selector").on("mouseenter", function(){
						view.onSelectorUpdate(this);
					});
				});

				$(".selector").on("mouseup", function(){
					var time = $(this).data("time");
					VIDEO.VIEW.onSeekChannel(time);
					view.onSelectorUpdate(this);
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
					clearInterval(_wheelMotionInterval);

					var time = $(this).data("time");

					VIDEO.VIEW.onSeekChannel(time);
					view.onSelectorUpdate(this);
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

	view.wheelMotionInit = function(){
		
    	var randomPicker = Math.floor(Math.random() * (30 - 0 + 1)) + 0,
    		el = $(".arc").eq(randomPicker).children(".selector");

		view.onSelectorUpdate(el);

		_fadeInInterval = setInterval(function(){

			$nextEl = $(".selected").parents(".arc").next(".arc").children(".selector");
			
			$(".selector").attr("class", "selector");
			$nextEl.attr("class", "selector selected");

			view.onSelectorUpdate($nextEl);

		}, 2000);

		setTimeout(function(){
			clearInterval(_wheelMotionInterval);
		}, 30000);

	}


	view.init = function(){

		if(!_isSVG){
			view.addChannelInit();
			view.listenChannelClick();
		} else {
			view.createNavWheel();
			view.addChannelInit();
			view.listenChannelClick ();
			view.wheelMotionInit();
		}
	};

	$(document).ready(
		view.init
	);

	return view;

}(window));