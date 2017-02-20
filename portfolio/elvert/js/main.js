var $body,
	window_height,
	window_width,
	$user_menu_butt,
	media_point_1 = 1024,
	media_point_2 = 768,
	media_point_3 = 480,
	media_point_4 = 320,
	$news_slider_1,
	$actions_slider_1,
	$actions_slider_2,
	$catalog_triggers,
	$product_slider_1,
	$novelty_slider_1,
	$st_map_hold,
	$cont_map_hold,
	$resize_map_hold,
	$resize_map_w,
	$resize_map_container,
	$resize_trigger,
	st_map,
	cont_map,
	resize_map,
	st_map_marker,
	cont_map_marker,
	test_marker_1,
	test_marker_2,
	$left_aside,
	$left_aside_open;

var map_center = new google.maps.LatLng(55.755826, 37.6173),
	map_test_position_1 = new google.maps.LatLng(46.1321166,48.0610115),
	map_test_position_2 = new google.maps.LatLng(55.0083526, 82.9357327),
	map_style = [
		{
			"featureType": "administrative",
			"elementType": "labels.text.fill",
			"stylers": [
				{
					"color": "#444444"
				}
			]
		},
		{
			"featureType": "landscape",
			"elementType": "all",
			"stylers": [
				{
					"color": "#f2f2f2"
				}
			]
		},
		{
			"featureType": "poi",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "road",
			"elementType": "all",
			"stylers": [
				{
					"saturation": -100
				},
				{
					"lightness": 45
				}
			]
		},
		{
			"featureType": "road.highway",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "simplified"
				}
			]
		},
		{
			"featureType": "road.arterial",
			"elementType": "labels.icon",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "transit",
			"elementType": "all",
			"stylers": [
				{
					"visibility": "off"
				}
			]
		},
		{
			"featureType": "water",
			"elementType": "all",
			"stylers": [
				{
					"color": "#46bcec"
				},
				{
					"visibility": "on"
				}
			]
		}
	],
	st_map_props = {
	center: map_center,
	zoom: 4,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	scrollwheel: false,
	disableDefaultUI: true,
	styles:map_style
};

$(document).ready(function ($) {
	$body = $('body');
	$user_menu_butt = $('#user_menu_butt');
	window_width = $(window).width();
	window_height = $(window).height();
	$news_slider_1 = $('#news_slider_1');
	$actions_slider_1 = $('#actions_slider_1');
	$actions_slider_2 = $('#actions_slider_2');
	$catalog_triggers = $('#catalog_triggers');
	$product_slider_1 = $('#product_slider_1');
	$novelty_slider_1 = $('#novelty_slider_1');
	$st_map_hold = $('#st_map_hold');
	$cont_map_hold = $('#cont_map_hold');
	$resize_map_w = $('#resize_map_w');
	$resize_trigger = $('#map_trigger');
	$resize_map_hold = $('#resize_map_hold');
	$resize_map_container = $('#resize_map_container');
	$left_aside = $('#left_aside');
	$left_aside_open = $('#left_aside_open');


	$user_menu_butt.on('click', function () {
		if ($body.hasClass('menu_open')) {
			$body.removeClass('menu_open');
			$(this).removeClass('active_mod');
		} else {
			$body.addClass('menu_open');
			$(this).addClass('active_mod');
		}
	});

	var mouse_is_inside = false;

	$left_aside.hover(function(){
		mouse_is_inside=true;
	}, function(){
		mouse_is_inside=false;
	});

	$left_aside_open.on('click',function() {
		$body.addClass('left_aside_opened');
		return false;
	});

	$body.on('click',function() {
		if (!mouse_is_inside) {
			$body.removeClass('left_aside_opened');
		}
	});

	$resize_trigger.on('click',function() {
		if ($resize_map_w.hasClass('big_mod')) {
			$resize_map_w.removeClass('big_mod');
			$resize_map_container.removeClass('big_mod');
		} else {
			$resize_map_w.addClass('big_mod');
			$resize_map_container.addClass('big_mod');
		}
		return false;
	});

	if (!$body.hasClass('not_found_mod')) {
		pageWidget(['index_elvert', 'elvert_destrib', 'elvert_nku', 'elvert_catalog', 'elvert_catalog_single', 'elvert_catalog_product', 'elvert_private', 'elvert_where_buy','elvert_register','elvert_login','elvert_about','elvert_news_all','elvert_news_single','elvert_text_page','elvert_support','elvert_contacts','elvert_lk','elvert_settings', 'index_aster','aster_about','aster_text_page','aster_news_all','aster_news_single','aster_catalog','aster_catalog_single','aster_catalog_product','aster_support','aster_contacts','index_dinway','dinway_contacts','dinway_about','dinway_services','dinway_cooperation', '404']);
	}
	getAllClasses('html', '.elements_list');
});

$(window).on('resize', function () {
	resize_f();
});

$(window).on('scroll', function () {
	scroll_f();
});

$(window).on('load', function () {
	load_f();
});

function resize_f() {
	if ($news_slider_1.length) {
		$news_slider_1.reloadSlider();
	}
	if ($novelty_slider_1.length) {
		$novelty_slider_1.reloadSlider();
	}
	if ($actions_slider_1.length) {
		$actions_slider_1.reloadSlider();
	}
	if ($product_slider_1.length) {
		$product_slider_1.reloadSlider();
	}
	if ($actions_slider_2.length) {
		$actions_slider_2.reloadSlider();
	}
	if ($st_map_hold.length) {
		st_map.setCenter(map_center);
	}
	if ($cont_map_hold.length) {
		cont_map.setCenter(map_center);
	}
	if ($resize_map_hold.length) {
		resize_map.setCenter(map_center);
	}
}
function load_f() {
	if ($news_slider_1.length) {
		$news_slider_1.bxSlider({
			controls: false
		});
	}
	if ($actions_slider_1.length) {
		$actions_slider_1.bxSlider({
			controls: false
		});
	}
	if ($actions_slider_2.length) {
		$actions_slider_2.bxSlider({
			controls: false
		});
	}
	if ($product_slider_1.length) {
		$product_slider_1.bxSlider({
			controls: false
		});
	}
	if ($novelty_slider_1.length) {
		$novelty_slider_1.bxSlider({
			controls: false
		});
	}
	if ($catalog_triggers.length) {
		$catalog_triggers.accordion({
			collapsible: true,
			heightStyle: 'content'
		});
	}

	changeSrc('.product_gallery_trigger_i_w', '.product_gallery_i', '.product_gallery');

	$(".chosenSelect").each(function () {
		$(this).chosen({
			disable_search_threshold: 10,
			width: "100%",
			inherit_select_classes: true
		});
	});

	//-------------maps
	if ($st_map_hold.length) {
		st_map_init();
	}
	if ($cont_map_hold.length) {
		cont_map_init();
	}
	if ($resize_map_hold.length) {
		resize_map_init();
	}
	//-------------maps###
}



function scroll_f() {

}

function st_map_init() {
	st_map = new google.maps.Map(document.getElementById("st_map_hold"), st_map_props);

	st_map_marker = new MarkerWithLabel({
		position: map_center,
		draggable: false,
		map: st_map,
		icon: 'i/icons/empty.svg',//empty icon because impossible to delete icon in google maps
		labelContent: "",
		labelAnchor: new google.maps.Point(40, 90),
		labelClass: "map_label_v1" // the CSS class for the label
	});
	test_marker_1 = new MarkerWithLabel({
		position: map_test_position_1,
		draggable: false,
		map: st_map,
		icon: 'i/icons/empty.svg',//empty icon because impossible to delete icon in google maps
		labelContent: "",
		labelAnchor: new google.maps.Point(40, 90),
		labelClass: "map_label_v1" // the CSS class for the label
	});
	test_marker_2 = new MarkerWithLabel({
		position: map_test_position_2,
		draggable: false,
		map: st_map,
		icon: 'i/icons/empty.svg',//empty icon because impossible to delete icon in google maps
		labelContent: "",
		labelAnchor: new google.maps.Point(40, 90),
		labelClass: "map_label_v1" // the CSS class for the label
	});
}

function resize_map_init() {
	resize_map = new google.maps.Map(document.getElementById("resize_map_hold"), st_map_props);

	st_map_marker = new MarkerWithLabel({
		position: map_center,
		draggable: false,
		map: resize_map,
		icon: 'i/icons/empty.svg',//empty icon because impossible to delete icon in google maps
		labelContent: "",
		labelAnchor: new google.maps.Point(40, 90),
		labelClass: "map_label_v1" // the CSS class for the label
	});
	test_marker_1 = new MarkerWithLabel({
		position: map_test_position_1,
		draggable: false,
		map: resize_map,
		icon: 'i/icons/empty.svg',//empty icon because impossible to delete icon in google maps
		labelContent: "",
		labelAnchor: new google.maps.Point(40, 90),
		labelClass: "map_label_v1" // the CSS class for the label
	});
	test_marker_2 = new MarkerWithLabel({
		position: map_test_position_2,
		draggable: false,
		map: resize_map,
		icon: 'i/icons/empty.svg',//empty icon because impossible to delete icon in google maps
		labelContent: "",
		labelAnchor: new google.maps.Point(40, 90),
		labelClass: "map_label_v1" // the CSS class for the label
	});
}

function cont_map_init() {
	cont_map = new google.maps.Map(document.getElementById("cont_map_hold"), st_map_props);

	cont_map_marker = new MarkerWithLabel({
		position: map_center,
		draggable: false,
		map: cont_map,
		icon: 'i/icons/empty.svg',//empty icon because impossible to delete icon in google maps
		labelContent: "<div class='tooltip v2_mod'>" +
		"<span class='tooltip_title v2_mod'>Наш офис:</span>" +
		"<span class='address tooltip_mod'>Москва, ул. Строителей, д. 25, оф. 255</span>" +
		"<span class='phone tooltip_mod'>+7(495) 123-45-67</span>" +
		"<a href='#' class='site_link tooltip_mod'>Info@mail.ru</a></div>",
		labelAnchor: new google.maps.Point(40, 90),
		labelClass: "map_label_v1" // the CSS class for the label
	});
}

function move_to_block(block, control) {
	var $block = $(block),
		$control = $(control);
	$control.on('click', function () {
		var $block_pos = $block.offset();
		$('body,html').animate({
			scrollTop: $block_pos.top
		}, 500);
		return false;
	})
}

function changeSrc(thumb, img, container) {
	$(thumb).on('click', function () {
		var $thumb = $(this),
			$container = $thumb.closest(container),
			$img = $container.find(img),
			$src = $thumb.attr('data-thumblink');
		$img.attr('src', $src);
		return false;
	});
}

function docScrollTo(pos, speed, callback) {

	$('html,body').animate({'scrollTop': pos}, speed);

	if (typeof(callback) == 'function') {
		callback();
	}
}


//Functions for development
function getAllClasses(context, output) {
	var finalArray = [],
		mainArray = [],
		allElements = $(context).find($('*'));//get all elements of our page
	//If element has class push this class to mainArray
	for (var i = 0; i < allElements.length; i++) {
		var someElement = allElements[i],
			elementClass = someElement.className;
		if (elementClass.length > 0) {//if element have not empty class
			//If element have multiple classes - separate them
			var elementClassArray = elementClass.split(' '),
				classesAmount = elementClassArray.length;
			if (classesAmount === 1) {
				mainArray.push('.' + elementClassArray[0] + ' {');
			} else {
				var cascad = '.' + elementClassArray[0] + ' {';
				for (var j = 1; j < elementClassArray.length; j++) {
					cascad += ' &.' + elementClassArray[j] + ' { }';
				}
				mainArray.push(cascad);
			}
		}
	}

	//creating finalArray, that don't have repeating elements
	var noRepeatingArray = unique(mainArray);
	noRepeatingArray.forEach(function (item) {
		var has = false;
		var preWords = item.split('&');
		for (var i = 0; i < finalArray.length; ++i) {
			var newWords = finalArray[i].split('&');
			if (newWords[0] == preWords[0]) {
				has = true;
				for (var j = 0; j < preWords.length; ++j) {
					if (newWords.indexOf(preWords[j]) < 0) {
						newWords.push(preWords[j]);
					}
				}
				finalArray[i] = newWords.join('&');
			}
		}
		if (!has) {
			finalArray.push(item);
		}
	});
	for (var i = 0; i < finalArray.length; i++) {
		$('<div>' + finalArray[i] + ' }</div>').appendTo(output);
	}


	//function that delete repeating elements from arrays, for more information visit http://mathhelpplanet.com/static.php?p=javascript-algoritmy-obrabotki-massivov
	function unique(A) {
		var n = A.length, k = 0, B = [];
		for (var i = 0; i < n; i++) {
			var j = 0;
			while (j < k && B[j] !== A[i]) j++;
			if (j == k) B[k++] = A[i];
		}
		return B;
	}
}

function pageWidget(pages) {
	var widgetWrap = $('<div class="widget_wrap"><ul class="widget_list"></ul></div>');
	widgetWrap.prependTo("body");
	for (var i = 0; i < pages.length; i++) {
		$('<li class="widget_item"><a class="widget_link" href="' + pages[i] + '.html' + '">' + pages[i] + '</a></li>').appendTo('.widget_list');
	}
	var widgetStilization = $('<style>@-webkit-keyframes appear{0%{opacity:.5}50%{opacity:1}100%{opacity:.5}}@-moz-keyframes appear{0%{opacity:.5}50%{opacity:1}100%{opacity:.5}}@-ms-keyframes appear{0%{opacity:.5}50%{opacity:1}100%{opacity:.5}}@-o-keyframes appear{0%{opacity:.5}50%{opacity:1}100%{opacity:.5}}@keyframes appear{0%{opacity:.5}50%{opacity:1}100%{opacity:.5}}body{position:relative}.widget_wrap{position:absolute;top:0;left:0;z-index:9999;padding:10px 20px;background:#222;border-bottom-right-radius:10px;-webkit-transition:all .3s ease;transition:all .3s ease;-webkit-transform:translate(-100%,0);-ms-transform:translate(-100%,0);transform:translate(-100%,0)}.widget_wrap:hover:after{-webkit-animation:none;-moz-animation:none;-o-animation:none;-ms-animation:none;animation:none}.widget_wrap:after{content:"navigation menu";position:absolute;top:0;left:100%;height:24px;font-size:16px;background:#222;white-space:nowrap;padding:0 15px;line-height:24px;cursor:pointer;animation:appear 1s ease-in infinite;color:#fff}.widget_wrap:hover{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}.widget_item{padding:0 0 10px}.widget_link{color:#fff;text-decoration:none;font-size:15px}.widget_link:hover{text-decoration:underline}</style>');
	widgetStilization.prependTo(".widget_wrap");
}
