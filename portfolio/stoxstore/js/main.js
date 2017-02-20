var $body_var,
	window_height,
	window_width,
	$user_menu_butt,
	$catalog_menu_butt,
	$product_slider,
	$product_slider_2,
	product_popap,
	$product_popap,
	$product_popap_close,
	contacts_map,
	contacts_map_marker_1,
	contacts_map_marker_2,
	$page_aside,
	$catalog_aside,
	$delivery_tabs;

$(document).ready(function ($) {
	$body_var = $('body');
	$user_menu_butt = $('#user_menu_butt');
	$catalog_menu_butt = $('#catalog_open_butt');
	window_width = $(window).width();
	window_height = $(window).height();
	$product_slider = $('#product_slider');
	$product_slider_2 = $('#product_slider_2');
	$product_popap = $('#product_popap');
	$product_popap_close = $('#product_popap_close');
	$page_aside = $('#page_aside');
	$catalog_aside = $('#catalog_aside');
	$delivery_tabs = $('#delivery_tabs');

	var mouse_in_aside = false;
	var mouse_in_catalog = false;

	$page_aside.hover(function () {
		mouse_in_aside = true;
	}, function () {
		mouse_in_aside = false;
	});

	$catalog_aside.hover(function () {
		mouse_in_catalog = true;
	}, function () {
		mouse_in_catalog = false;
	});

	$body_var.on('click', function () {
		if (!mouse_in_aside) {
			$body_var.removeClass('aside_opened');
		}
		if (!mouse_in_catalog) {
			$body_var.removeClass('catalog_opened');
		}
	});

	$user_menu_butt.on('click', function () {
		$body_var.toggleClass('aside_opened');
		return false;
	});

	$catalog_menu_butt.on('click', function () {
		$body_var.toggleClass('catalog_opened');
		return false;
	});

	$product_popap_close.on('click', function () {
		product_popap.closeDialog();
	});

	product_popap = new dialog($product_popap, 'no_title_mod', '#product_popap_open_butt', false, '870', false);

	$body_var.on('click', '.ui-widget-overlay, .dialog_cancel_butt', all_dialog_close_gl);

	//openProductDialog(); this function opens dialog

	splitSpan($('.js-split_span'));

	changeSrc('.popap_gal_thumb_i_w', '.popap_gal_i', '.popap_gal_w');

	$('.js-chosen_target').chosen({
		disable_search_threshold: 10,
		width: "100%",
		inherit_select_classes: true
	});

	$('.js-accordion').accordion({
		collapsible: true,
		animate: 200,
		active: false,
		heightStyle:'content'
	});

	$('.js-spinner_target').spinner({
		min: 0
	});

	$('.js-fancy_open').fancybox();

	$('.js-mask_date').mask('+7 (000) 000-00-00', {
		placeholder: "+7 (_____) _____-___-___"
	});

	$('.repeat_btn.v1_mod').on('click', function (e) {
		e.stopPropagation();
	});

	pageWidget(['index', 'about', 'cart', 'profile', 'history', 'catalog', 'sub_catalog', 'contacts', 'sign_up', 'checkout', 'delivery', '404']);
	getAllClasses('html', '.elements_list');
});

function openProductDialog() {
	product_popap.openDialog();
}
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
	if ($('#cont_map').length) {
		contacts_map.setCenter(new google.maps.LatLng(55.755826, 37.6173));
	}
	if ($product_slider.length) {
		$product_slider.reloadSlider();
	}
	if ($product_slider_2.length) {
		$product_slider_2.reloadSlider();
	}
}
function load_f() {
	if($delivery_tabs.length) {
		$delivery_tabs.tabs({

		});
	}

	if ($product_slider.length) {
		$product_slider.bxSlider({
			pager: false
		})
	}
	if ($product_slider_2.length) {
		$product_slider_2.bxSlider({
			controls: false
		})
	}

	if ($('#cont_map').length) {
		contacts_map = new google.maps.Map(document.getElementById("cont_map"), {
			center: new google.maps.LatLng(55.755826, 37.6173),
			zoom: 10,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			scrollwheel: false,
			disableDefaultUI: true
		});

		contacts_map_marker_1 = new MarkerWithLabel({
			position: new google.maps.LatLng(55.71628171, 37.80292511),
			draggable: false,
			map: contacts_map,
			icon: 'i/icons/empty.svg', //empty icon because impossible to delete icon in google maps
			labelContent: "<span class='place map_mod'>Склад</span><span class='phone map_mod'>+7 (495) 123-45-67</span><span class='adress map_mod'>ул. Северная, д. 54, оф. 213</span>",
			labelAnchor: new google.maps.Point(22, 52),
			labelClass: "map_marker v1_mod" // the CSS class for the label
		});
		contacts_map_marker_2 = new MarkerWithLabel({
			position: new google.maps.LatLng(55.74025479, 37.34184265),
			draggable: false,
			map: contacts_map,
			icon: 'i/icons/empty.svg', //empty icon because impossible to delete icon in google maps
			labelContent: "<span class='place map_mod'>Центральный офис</span><span class='phone map_mod'>+7 (495) 123-45-67</span><span class='adress map_mod'>ул. Северная, д. 54, оф. 213</span>",
			labelAnchor: new google.maps.Point(22, 52),
			labelClass: "map_marker v1_mod" // the CSS class for the label
		});
	}
}

function scroll_f() {

}
function all_dialog_close_gl() {
	$(".ui-dialog-content").each(function () {
		var $this = $(this);
		if (!$this.parent().hasClass('always_open')) {
			$this.dialog("close");
		}
	});
}
function changeSrc(thumb, img, container) {
	$(thumb).on('click', function () {
		var $thumb = $(this),
			$container = $thumb.closest(container),
			$img = $container.find(img),
			$src = $thumb.attr('data-thumblink'),
			$fancy_link = $container.find('.js-fancy_open');
		$img.attr('src', $src);
		$fancy_link.attr('href', $src);
		return false;
	});
}

function splitSpan(target) {
	target.each(function () {
		var text = $.trim($(this).text()),
			word = text.split(' '),
			str = "";
		$.each(word, function (key, value) {
			if (key != 0) {
				str += " ";
			}
			str += "<span>" + value + "</span>";
		});
		$(this).html(str);
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
