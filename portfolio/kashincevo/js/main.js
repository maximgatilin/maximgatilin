var $body,
	window_height,
	window_width,
	$user_menu_butt,
	gallerySlider,
	$gallerySlider,
	$gallerySliderPager,
	$gallerySlides,
	$sliderThumbs;

$(document).ready(function ($) {
	$body = $('body');
	$user_menu_butt = $('#user_menu_butt');
	window_width = $(window).width();
	window_height = $(window).height();
	gallerySlider = $('.gallerySlider');

	if (gallerySlider.length) {
		var firedEl = $('.gallerySliderPager');

		$gallerySliderPager = firedEl.find('.slider').bxSlider({
			slideSelector: firedEl.find('.slide'),
			slideWidth: firedEl.find('.slider').data('slide-width'),
			slideMargin: firedEl.find('.slider').data('slide-margin'),
			minSlides: firedEl.find('.slider').data('slide-min'),
			maxSlides: firedEl.find('.slider').data('slide-max'),
			pagerCustom: firedEl.data('slider-paginator'),
			startSlide: 5,
			useCSS: true,
			infiniteLoop: false,
			responsive: false,
			pause: 1000,
			moveSlides: 1,
			pager: false,
			controls: true,
			onSliderLoad: function (currentIndex) {

				$sliderThumbs = $('.slider_thumb');

				$sliderThumbs.on('click', function () {
					setActiveThumb($(this).data('slide-index'));
				});
			}

		});

		var firedEl = $('.gallerySlider');

		var fired_item = $('.gallery_slide', gallerySlider);

		$gallerySlider = firedEl.find('.slider').bxSlider({
			slideSelector: firedEl.find('.slide'),
			slideWidth: 1100,
			slideMargin: 4,
			minSlides: 1,
			maxSlides: 1,
			pagerCustom: firedEl.data('slider-paginator'),
			nextSelector: firedEl.find('#gal_slide_next'),
			prevSelector: firedEl.find('#gal_slide_prev'),
			prevText: '',
			nextText: '',
			useCSS: true,
			startSlide: 5,
			infiniteLoop: true,
			responsive: false,
			moveSlides: 1,
			pager: firedEl.data('slider-pager'),
			controls: true,
			onSliderLoad: function (currentIndex) {

				fired_item.each(function () {
					var $this = $(this);
					var index = $this.index();
					//console.log(currentIndex, index);
					if (index == currentIndex + 1) {
						$this.addClass('active');
					}
					else {
						$this.removeClass('active');
					}

				});

				setActiveThumb(currentIndex);
			},
			onSlideBefore: function ($slideElement, oldIndex, newIndex) {
				fired_item.each(function () {
					var $this = $(this);
					var index = $this.index();
					if (index == newIndex + 1) {
						$this.addClass('active');
					}
					else {
						$this.removeClass('active');
					}

				});

				setActiveThumb(newIndex);

				$gallerySliderPager.goToSlide(newIndex);
			}
		});

		$('#gal_slide_next').on('click',function() {
			$gallerySlider.goToNextSlide();
			return false;
		});
		$('#gal_slide_prev').on('click',function() {
			$gallerySlider.goToPrevSlide();
			return false;
		});
	}

	pageWidget(['index', 'news', 'not_found', 'ipoteka', 'flats', 'about', 'contacts', 'infostructure', 'place','gallery']);
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
	if ($('#place_map_hold').length) {
		place_map.setCenter(mapCenter);
	}

	if ($('#about_map_hold').length) {
		about_map.setCenter(mapCenter);
	}

	if ($('#info_map_hold').length) {
		info_map.setCenter(mapCenter);
	}

	if ($('#cont_map_hold').length) {
		contacts_map.setCenter(mapCenter);
	}

}
function load_f() {
	$('#about_house_tabs_w').tabs({});

	if ($('#place_tabs_w').length) {
		$('#place_tabs_w').tabs({
			heightStyle: "auto"
		});
	}

	if ($('#cont_map_hold').length) {
		contactsMapInit();
	}

	if ($('#about_map_hold').length) {
		aboutMapInit();
	}

	if ($('#info_map_hold').length) {
		infoMapInit();
	}

	if ($('#place_map_hold').length) {
		placeMapInit();
	}
}

function scroll_f() {

}

function setActiveThumb(ind) {

	if ($sliderThumbs != void 0) {
		$sliderThumbs.removeClass('active_thumb').filter('[data-slide-index=' + (ind) + ']').each(function () {
			$(this).addClass('active_thumb');
		});
	} else {
		setTimeout(function () {
			setActiveThumb(ind);
		}, 50)
	}
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

function docScrollTo(pos, speed, callback) {

	$('html,body').animate({'scrollTop': pos}, speed);

	if (typeof(callback) == 'function') {
		callback();
	}
}


//map stuff
var contacts_map,
	contactsMarker,
	about_map,
	aboutMarker,
	pseudoMap,
	place_map,
	info_map,
	pseudoMapBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(55.91184835, 38.10538639),
		new google.maps.LatLng(55.91974321, 38.11891726)
	),
	placeMarker,
	kashincevoPos1 = new google.maps.LatLng(55.92224137, 38.02034497),
	kashincevoPos2 = new google.maps.LatLng(55.91646383, 38.10917437),
	kashincevoPos3 = new google.maps.LatLng(55.91809317, 38.11023116),
	kashincevoPos4 = new google.maps.LatLng(55.91832164, 38.10969472),
	contact_map_center = new google.maps.LatLng(55.9158686, 38.11604619),
	info_map_center = new google.maps.LatLng(55.91626542, 38.11145425),
	place_map_center = new google.maps.LatLng(55.91693882, 38.09290409),
	child_marker_1_pos = new google.maps.LatLng(55.91792483, 38.10036063),
	child_marker_2_pos = new google.maps.LatLng(55.91809317, 38.10588598),
	stop_marker_1_pos = new google.maps.LatLng(55.91614517, 38.10000658),
	stop_marker_2_pos = new google.maps.LatLng(55.91660212, 38.10489893),
	med_marker_1_pos = new google.maps.LatLng(55.91544772, 38.10733438),
	med_marker_2_pos = new google.maps.LatLng(55.91621732, 38.11267734),
	shop_marker_1_pos = new google.maps.LatLng(55.91380023, 38.10220599),
	shop_marker_2_pos = new google.maps.LatLng(55.9142091, 38.10709834),
	ed_marker_1_pos = new google.maps.LatLng(55.91867034, 38.11643243),
	sport_marker_1_pos = new google.maps.LatLng(55.91796091, 38.11935067);

var aboutMapProp = {
		center: kashincevoPos1,
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false,
		disableDefaultUI: true,
		styles: [{
			"featureType": "road",
			"elementType": "labels",
			"stylers": [
				{
					"visibility": "on",
					"color": "#000000"
				}
			]
		},
			{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#aacbd9"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "labels",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "labels.text",
				"stylers": [
					{
						"visibility": "on"
					}
				]
			}]
	},
	contactMapProp = {
		center: contact_map_center,
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false,
		disableDefaultUI: true,
		styles: [{
			"featureType": "road",
			"elementType": "labels",
			"stylers": [
				{
					"visibility": "on",
					"color": "#000000"
				}
			]
		},
			{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#aacbd9"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "labels",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "labels.text",
				"stylers": [
					{
						"visibility": "on"
					}
				]
			}]
	},
	infoMapProp = {
		center: info_map_center,
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false,
		disableDefaultUI: true,
		styles: [{
			"featureType": "road",
			"elementType": "labels",
			"stylers": [
				{
					"visibility": "on",
					"color": "#000000"
				}
			]
		},
			{
				"featureType": "water",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#aacbd9"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "labels",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "transit",
				"elementType": "labels.text",
				"stylers": [
					{
						"visibility": "on"
					}
				]
			}]
	},
	placeMapProp = {
		center: place_map_center,
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.SATELLITE,
		scrollwheel: false,
		disableDefaultUI: true
	};

function contactsMapInit() {
	contacts_map = new google.maps.Map(document.getElementById("cont_map_hold"), contactMapProp);

	contactsMarker = new MarkerWithLabel({
		position: kashincevoPos2,
		draggable: false,
		map: contacts_map,
		icon: 'i/icons/empty.svg',//empty icon because impossible to delete icon in google maps
		labelContent: "Кащинцево",
		labelAnchor: new google.maps.Point(40, 90),
		labelClass: "map_main_label" // the CSS class for the label
	});

	calculateCenter(contacts_map);
}


function aboutMapInit() {
	about_map = new google.maps.Map(document.getElementById("about_map_hold"), aboutMapProp);

	aboutMarker = new MarkerWithLabel({
		position: kashincevoPos1,
		draggable: false,
		map: about_map,
		icon: 'i/icons/empty.svg',//empty icon because impossible to delete icon in google maps
		labelContent: "Кащинцево",
		labelAnchor: new google.maps.Point(40, 90),
		labelClass: "map_main_label" // the CSS class for the label
	});

	calculateCenter(about_map);
}


function placeMapInit() {
	place_map = new google.maps.Map(document.getElementById("place_map_hold"), placeMapProp);

	pseudoMap = new google.maps.GroundOverlay(
		'i/pseudo_map_1.png',
		pseudoMapBounds,
		{
			map: place_map,
			clickable: false
		}
	);

	placeMarker = new MarkerWithLabel({
		position: kashincevoPos4,
		draggable: false,
		map: place_map,
		icon: 'i/icons/empty.svg',//empty icon because impossible to delete icon in google maps
		labelContent: "Кащинцево",
		labelAnchor: new google.maps.Point(40, 90),
		labelClass: "map_main_label" // the CSS class for the label
	});

	calculateCenter(place_map);
}

function infoMapInit() {
	var infoMarker,
		child_marker_1,
		child_marker_2,
		stop_marker_1,
		stop_marker_2,
		med_marker_1,
		med_marker_2,
		shop_marker_1,
		shop_marker_2,
		ed_marker_1,
		sport_marker_1;

	info_map = new google.maps.Map(document.getElementById("info_map_hold"), infoMapProp);

	pseudoMap = new google.maps.GroundOverlay(
		'i/pseudo_map_1.png',
		pseudoMapBounds,
		{
			map: info_map,
			clickable: false
		}
	);

	infoMarker = new MarkerWithLabel({
		position: kashincevoPos3,
		draggable: false,
		map: info_map,
		icon: 'i/icons/empty.svg',//empty icon because impossible to delete icon in google maps
		labelContent: "Кащинцево",
		labelAnchor: new google.maps.Point(40, 90),
		labelClass: "map_main_label" // the CSS class for the label
	});

	child_marker_1 = new MarkerWithLabel({
		position: child_marker_1_pos,
		draggable: false,
		map: info_map,
		icon: 'i/icons/empty.svg',//empty icon because impossible to delete icon in google maps
		labelAnchor: new google.maps.Point(22, 52),
		labelClass: "info_map_marker child_mod" // the CSS class for the label
	});

	child_marker_2 = new MarkerWithLabel({
		position: child_marker_2_pos,
		draggable: false,
		map: info_map,
		icon: 'i/icons/empty.svg',//empty icon because impossible to delete icon in google maps
		labelAnchor: new google.maps.Point(22, 52),
		labelClass: "info_map_marker child_mod" // the CSS class for the label
	});

	stop_marker_1 = new MarkerWithLabel({
		position: stop_marker_1_pos,
		draggable: false,
		map: info_map,
		icon: 'i/icons/empty.svg',//empty icon because impossible to delete icon in google maps
		labelAnchor: new google.maps.Point(22, 52),
		labelClass: "info_map_marker stop_mod" // the CSS class for the label
	});

	stop_marker_2 = new MarkerWithLabel({
		position: stop_marker_2_pos,
		draggable: false,
		map: info_map,
		icon: 'i/icons/empty.svg',//empty icon because impossible to delete icon in google maps
		labelAnchor: new google.maps.Point(22, 52),
		labelClass: "info_map_marker stop_mod" // the CSS class for the label
	});

	med_marker_1 = new MarkerWithLabel({
		position: med_marker_1_pos,
		draggable: false,
		map: info_map,
		icon: 'i/icons/empty.svg',//empty icon because impossible to delete icon in google maps
		labelAnchor: new google.maps.Point(22, 52),
		labelClass: "info_map_marker med_mod" // the CSS class for the label
	});

	med_marker_2 = new MarkerWithLabel({
		position: med_marker_2_pos,
		draggable: false,
		map: info_map,
		icon: 'i/icons/empty.svg',//empty icon because impossible to delete icon in google maps
		labelAnchor: new google.maps.Point(22, 52),
		labelClass: "info_map_marker med_mod" // the CSS class for the label
	});

	shop_marker_1 = new MarkerWithLabel({
		position: shop_marker_1_pos,
		draggable: false,
		map: info_map,
		icon: 'i/icons/empty.svg',//empty icon because impossible to delete icon in google maps
		labelAnchor: new google.maps.Point(22, 52),
		labelClass: "info_map_marker shop_mod" // the CSS class for the label
	});

	shop_marker_2 = new MarkerWithLabel({
		position: shop_marker_2_pos,
		draggable: false,
		map: info_map,
		icon: 'i/icons/empty.svg',//empty icon because impossible to delete icon in google maps
		labelAnchor: new google.maps.Point(22, 52),
		labelClass: "info_map_marker shop_mod" // the CSS class for the label
	});

	ed_marker_1 = new MarkerWithLabel({
		position: ed_marker_1_pos,
		draggable: false,
		map: info_map,
		icon: 'i/icons/empty.svg',//empty icon because impossible to delete icon in google maps
		labelAnchor: new google.maps.Point(22, 52),
		labelClass: "info_map_marker ed_mod" // the CSS class for the label
	});

	sport_marker_1 = new MarkerWithLabel({
		position: sport_marker_1_pos,
		draggable: false,
		map: info_map,
		icon: 'i/icons/empty.svg',//empty icon because impossible to delete icon in google maps
		labelAnchor: new google.maps.Point(22, 52),
		labelClass: "info_map_marker sport_mod" // the CSS class for the label
	});

	calculateCenter(info_map);
}

//centering maps on resize event
var mapCenter;
function calculateCenter(target) {
	mapCenter = target.getCenter();
}

//google.maps.event.addDomListener(map, 'idle', function() {
//	calculateCenter();
//});
//google.maps.event.addDomListener(window, 'resize', function() {
//	map.setCenter(center);
//});

//***map stuff

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