var $body_var,
	window_height,
	window_width,
	$user_menu_butt,
	$catalog_show,
	$promo_slider,
	$promo_pager,
	$reply_slider,
	$reply_pager,
	$batut_choose_tabs,
	$batut_structure_tabs,
	$product_tabs,
	$price_slider,
	$price_slider_start,
	$price_slider_end,
	$catalog_last_slider,
	$catalog_last_slider_2,
	$qa_acc,
	mouseX,
	mouseY,
	media_point_1 = 1200,
	media_point_2 = 1024,
	media_point_3 = 768,
	media_point_4 = 480,
	media_point_5 = 320,
	parallaxArray = [],
	parallaxRatio;

$(document).ready(function ($) {
	$body_var = $('body');
	window_width = $(window).width();
	window_height = $(window).height();
	$user_menu_butt = $('#user_menu_butt');
	$catalog_show = $('#catalog_show');
	parallaxRatio = window_width/3000;

	addHeaderClass();

	//masks
	$('.maskDate').mask('+7 (000) 000-00-00', {
		placeholder: "+7 (_____) _____-___-___"
	});

	//menu open
	$user_menu_butt.on('click', function () {
		if ($body_var.hasClass('menu_open')) {
			$body_var.removeClass('menu_open');
			$(this).removeClass('active_mod');
		} else {
			$body_var.addClass('menu_open');
			$(this).addClass('active_mod');
		}
	});

	// sliders vars
	$promo_slider = $('#promo_slider');
	$promo_pager = $('#promo_pager');
	$reply_slider = $('#reply_slider');
	$reply_pager = $('#reply_pager');
	$catalog_last_slider = $('#catalog_last_slider');
	$catalog_last_slider_2 = $('#catalog_last_slider_2');

	//ui sliders vars
	$price_slider = $('#price_slider');
	$price_slider_start = $('#price_slider_start');
	$price_slider_end = $('#price_slider_end');

	//tabs vars
	$batut_choose_tabs = $('#batut_choose_tabs');
	$batut_structure_tabs = $('#batut_structure_tabs');
	$product_tabs = $('#product_tabs');

	//accordion vars
	$qa_acc = $('#qa_acc');

	$catalog_show.on('click', function () {
		$body_var.toggleClass('catalog_open_mod');

		return false;
	});

	splitSpan($('.splitSpanTarget'));

	if ($price_slider.length) {
		$price_slider.slider({
			range: true,
			min: 0,
			max: 100000,
			values: [10500, 60080],
			slide: function (event, ui) {
				$price_slider_start.html(ui.values[0]);
				$price_slider_end.html(ui.values[1]);
			}
		});
		$price_slider_start.html($price_slider.slider("values", 0));
		$price_slider_end.html($price_slider.slider("values", 1));
	}

	$('.schema_label_show').on('click', function () {
		$(this).closest('.shema_label_w').toggleClass('open_mod');

		return false;
	});

	$('.chosenTarget').chosen({
		disable_search_threshold: 10,
		width: "100%",
		inherit_select_classes: false
	});

	$('.spinnerTarget').spinner({
		min: 1
	});

	pageWidget(['index', 'dillers', 'catalog', 'news', 'cart', 'structure', 'questions', 'news_single', 'product', 'where_buy', 'choice', 'about', 'account', '404']);
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

function addHeaderClass() {
	if ($(window).scrollTop() > 0) {
		$body_var.addClass('scroll_mod');
	} else {
		$body_var.removeClass('scroll_mod');
	}
}


function resize_f() {
	window_width = $(window).width();
	window_height = $(window).height();
	parallaxRatio = window_width/3000;

	createParallaxArray();

	if ($catalog_last_slider.length) {
		if (window_width >= media_point_1) {
			$catalog_last_slider.reloadSlider({
				pager: false,
				minSlides: 3,
				maxSlides: 3,
				moveSlides: 1,
				slideWidth: 5000,// if slideWidth too large slider becomes responsive
				nextSelector: '#last_slider_next',
				prevSelector: '#last_slider_prev',
				nextText: 'next',
				prevText: 'prev'
			});
		}
		else if (window_width <= media_point_1 && window_width >= media_point_2) {
			$catalog_last_slider.reloadSlider({
				pager: false,
				minSlides: 2,
				maxSlides: 2,
				moveSlides: 1,
				slideWidth: 5000,// if slideWidth too large slider becomes responsive
				nextSelector: '#last_slider_next',
				prevSelector: '#last_slider_prev',
				nextText: 'next',
				prevText: 'prev'
			});
		} else {
			$catalog_last_slider.reloadSlider({
				pager: false,
				minSlides: 1,
				maxSlides: 1,
				moveSlides: 1,
				slideWidth: 5000,// if slideWidth too large slider becomes responsive
				nextSelector: '#last_slider_next',
				prevSelector: '#last_slider_prev',
				nextText: 'next',
				prevText: 'prev'
			});
		}
	}

	if ($catalog_last_slider_2.length) {
		if (window_width >= media_point_1) {
			$catalog_last_slider_2.reloadSlider({
				pager: false,
				minSlides: 4,
				maxSlides: 4,
				moveSlides: 1,
				slideWidth: 5000,// if slideWidth too large slider becomes responsive
				nextSelector: '#last_slider_2_next',
				prevSelector: '#last_slider_2_prev',
				nextText: 'next',
				prevText: 'prev'
			});
		} else if (window_width <= media_point_1 && window_width >= media_point_2) {
			$catalog_last_slider_2.reloadSlider({
				pager: false,
				minSlides: 3,
				maxSlides: 3,
				moveSlides: 1,
				slideWidth: 5000,// if slideWidth too large slider becomes responsive
				nextSelector: '#last_slider_2_next',
				prevSelector: '#last_slider_2_prev',
				nextText: 'next',
				prevText: 'prev'
			});
		} else if (window_width <= media_point_2 && window_width >= media_point_3) {
			$catalog_last_slider_2.reloadSlider({
				pager: false,
				minSlides: 2,
				maxSlides: 2,
				moveSlides: 1,
				slideWidth: 5000,// if slideWidth too large slider becomes responsive
				nextSelector: '#last_slider_2_next',
				prevSelector: '#last_slider_2_prev',
				nextText: 'next',
				prevText: 'prev'
			});
		} else {
			$catalog_last_slider_2.reloadSlider({
				pager: false,
				minSlides: 1,
				maxSlides: 1,
				moveSlides: 1,
				slideWidth: 5000,// if slideWidth too large slider becomes responsive
				nextSelector: '#last_slider_2_next',
				prevSelector: '#last_slider_2_prev',
				nextText: 'next',
				prevText: 'prev'
			});
		}
	}

	if ($promo_slider.length) {
		$promo_slider.reloadSlider();
	}
}
function load_f() {
	createParallaxArray();
	// sliders init
	if ($promo_slider.length) {
		$promo_slider.bxSlider({
			pagerCustom: $promo_pager,
			controls: false,
			infiniteLoop: false
		});
	}

	if ($reply_slider.length) {
		$reply_slider.bxSlider({
			pagerCustom: $reply_pager,
			controls: false,
			infiniteLoop: false,
			mode: 'fade'
		});
	}

	if ($catalog_last_slider.length) {
		if (window_width >= media_point_1) {
			$catalog_last_slider.bxSlider({
				pager: false,
				minSlides: 3,
				maxSlides: 3,
				moveSlides: 1,
				slideWidth: 5000,// if slideWidth too large slider becomes responsive
				nextSelector: '#last_slider_next',
				prevSelector: '#last_slider_prev',
				nextText: 'next',
				prevText: 'prev'
			});
		}
		else if (window_width <= media_point_1 && window_width >= media_point_2) {
			$catalog_last_slider.bxSlider({
				pager: false,
				minSlides: 2,
				maxSlides: 2,
				moveSlides: 1,
				slideWidth: 5000,// if slideWidth too large slider becomes responsive
				nextSelector: '#last_slider_next',
				prevSelector: '#last_slider_prev',
				nextText: 'next',
				prevText: 'prev'
			});
		} else {
			$catalog_last_slider.bxSlider({
				pager: false,
				minSlides: 1,
				maxSlides: 1,
				moveSlides: 1,
				slideWidth: 5000,// if slideWidth too large slider becomes responsive
				nextSelector: '#last_slider_next',
				prevSelector: '#last_slider_prev',
				nextText: 'next',
				prevText: 'prev'
			});
		}
	}

	if ($catalog_last_slider_2.length) {
		if (window_width >= media_point_1) {
			$catalog_last_slider_2.bxSlider({
				pager: false,
				minSlides: 4,
				maxSlides: 4,
				moveSlides: 1,
				slideWidth: 5000,// if slideWidth too large slider becomes responsive
				nextSelector: '#last_slider_2_next',
				prevSelector: '#last_slider_2_prev',
				nextText: 'next',
				prevText: 'prev'
			});
		} else if (window_width <= media_point_1 && window_width >= media_point_2) {
			$catalog_last_slider_2.bxSlider({
				pager: false,
				minSlides: 3,
				maxSlides: 3,
				moveSlides: 1,
				slideWidth: 5000,// if slideWidth too large slider becomes responsive
				nextSelector: '#last_slider_2_next',
				prevSelector: '#last_slider_2_prev',
				nextText: 'next',
				prevText: 'prev'
			});
		} else if (window_width <= media_point_2 && window_width >= media_point_3) {
			$catalog_last_slider_2.bxSlider({
				pager: false,
				minSlides: 2,
				maxSlides: 2,
				moveSlides: 1,
				slideWidth: 5000,// if slideWidth too large slider becomes responsive
				nextSelector: '#last_slider_2_next',
				prevSelector: '#last_slider_2_prev',
				nextText: 'next',
				prevText: 'prev'
			});
		} else {
			$catalog_last_slider_2.bxSlider({
				pager: false,
				minSlides: 1,
				maxSlides: 1,
				moveSlides: 1,
				slideWidth: 5000,// if slideWidth too large slider becomes responsive
				nextSelector: '#last_slider_2_next',
				prevSelector: '#last_slider_2_prev',
				nextText: 'next',
				prevText: 'prev'
			});
		}
	}

	//tabs init
	if ($batut_choose_tabs.length) {
		$batut_choose_tabs.tabs({
			heightStyle: 'content',
			active: 0
		});
	}

	if ($batut_structure_tabs.length) {
		$batut_structure_tabs.tabs({
			heightStyle: 'content',
			active: 0
		});
	}

	if ($product_tabs.length) {
		$product_tabs.tabs({
			heightStyle: 'content',
			active: 0
		});
	}

	//accordion init
	if ($qa_acc.length) {
		$qa_acc.accordion({
			header: ".qa_title",
			heightStyle: 'content',
			collapsible: true
		});
	}
}

function scroll_f() {
	addHeaderClass();
}

function createParallaxArray() {
	$('.parallaxLayer').each(function (index, element) {
		var layer = $(this),
			layerIndex = layer.attr('data-array-index');
		parallaxArray[layerIndex] = {
			layer: layer,
			layerDepth: layer.attr('data-layer-depth'),
			layerOffsetLeft: layer.offset().left,
			layerOffsetTop: layer.offset().top,
			layerWidth: layer.innerWidth(),
			layerHeight: layer.innerHeight()
		};
	});
}

function parallaxMouse(mouseX, mouseY) {
	parallaxArray.forEach(function (item, index) {
		var x = -(mouseX - (item.layerOffsetLeft + item.layerWidth / 2)) * item.layerDepth * parallaxRatio,
			y = -(mouseY - (item.layerOffsetTop + item.layerHeight / 2)) * item.layerDepth * parallaxRatio;
		item.layer.css('transform', 'translate(' + x + 'px,' + y + 'px)');
	});
}

$(window).on('mousemove', function (e) {
	parallaxMouse(e.pageX, e.pageY);
});

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

function pageWidget(pages) {
	var widgetWrap = $('<div class="widget_wrap"><ul class="widget_list"></ul></div>');
	widgetWrap.prependTo("body");
	for (var i = 0; i < pages.length; i++) {
		$('<li class="widget_item"><a class="widget_link" href="' + pages[i] + '.html' + '">' + pages[i] + '</a></li>').appendTo('.widget_list');
	}
	var widgetStilization = $('<style>@-webkit-keyframes appear{0%{opacity:.5}50%{opacity:1}100%{opacity:.5}}@-moz-keyframes appear{0%{opacity:.5}50%{opacity:1}100%{opacity:.5}}@-ms-keyframes appear{0%{opacity:.5}50%{opacity:1}100%{opacity:.5}}@-o-keyframes appear{0%{opacity:.5}50%{opacity:1}100%{opacity:.5}}@keyframes appear{0%{opacity:.5}50%{opacity:1}100%{opacity:.5}}body{position:relative}.widget_wrap{position:absolute;top:0;left:0;z-index:9999;padding:10px 20px;background:#222;border-bottom-right-radius:10px;-webkit-transition:all .3s ease;transition:all .3s ease;-webkit-transform:translate(-100%,0);-ms-transform:translate(-100%,0);transform:translate(-100%,0)}.widget_wrap:hover:after{-webkit-animation:none;-moz-animation:none;-o-animation:none;-ms-animation:none;animation:none}.widget_wrap:after{content:"navigation menu";position:absolute;top:0;left:100%;height:24px;font-size:16px;background:#222;white-space:nowrap;padding:0 15px;line-height:24px;cursor:pointer;animation:appear 1s ease-in infinite;color:#fff}.widget_wrap:hover{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}.widget_item{padding:0 0 10px}.widget_link{color:#fff;text-decoration:none;font-size:15px}.widget_link:hover{text-decoration:underline}</style>');
	widgetStilization.prependTo(".widget_wrap");
}
