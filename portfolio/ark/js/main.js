var $body_var,
	window_height,
	window_width,
	$user_menu_butt,
	$header,
	$header_trigger_row,
	$header_height,
	$homepage_point,
	$homepage_point_offset,
	$brand_slider,
	$port_first_slider_w,
	$port_first_slider,
	$port_first_slider_prev,
	$port_first_slider_next,
	$port_sec_slider,
	port_third_slider,// js var
	$port_third_slider, // jquery var
	$port_third_slider_counter,
	portfolio_popap,
	$portfolio_popap,
	$portfolio_popap_close,
	point_1 = 1024,
	point_2 = 768,
	point_3 = 480;

$(document).ready(function ($) {
	$body_var = $('body');
	$user_menu_butt = $('#user_menu_butt');
	$header = $('#header');
	$header_trigger_row = $('#header_trigger_row');
	$brand_slider = $('#brand_slider');
	$port_first_slider_w = $('.port_first_slider_w');
	$port_first_slider = $('#port_first_slider');
	$port_first_slider_prev = $('.portFirstSliderPrev');
	$port_first_slider_next = $('.portFirstSliderNext');
	$port_sec_slider = $('#port_sec_slider');
	$port_third_slider = $('#port_third_slider');
	$port_third_slider_counter = $('#port_third_slider_counter');
	$portfolio_popap = $('#portfolio_popap');
	$portfolio_popap_close = $('#portfolio_popap_close');

	pageWidget(['index', 'styles', 'portfolio', '404', 'services', 'about','contacts']);
	getAllClasses('html', '.elements_list');

	window_width = $(window).width();
	window_height = $(window).height();
	$header_height = $header_trigger_row.height();
	$homepage_point = $('#homepage_point');

	$('.maskDate').mask('+7 (000) 000-00-00 dollar', {
		placeholder: "+7 (_____) _____-___-___"
	});

	if ($homepage_point.length) {
		$homepage_point_offset = $homepage_point.offset().top - $header_height;
	} else {
		$homepage_point_offset = 0;
	}

	$user_menu_butt.on('click', function () {
		if ($body_var.hasClass('menu_open')) {
			$body_var.removeClass('menu_open');
			$(this).removeClass('active_mod');
		} else {
			$body_var.addClass('menu_open');
			$(this).addClass('active_mod');
		}
	});

	$(".scrollTo").click(function (event) {
		event.preventDefault();

		var defaultAnchorOffset = 0;

		var anchor = $(this).attr('data-attr-scroll');

		var anchorOffset = $('#' + anchor).attr('data-scroll-offset');
		if (!anchorOffset)
			anchorOffset = defaultAnchorOffset;

		$('html,body').animate({
			scrollTop: $('#' + anchor).offset().top - anchorOffset - $header_height
		}, 500);
	});

	$portfolio_popap_close.on('click', function () {
		$.magnificPopup.close();
	});

	$('.portPopapOpen').magnificPopup({
		type:'inline',
		midClick: true ,
		showCloseBtn:false,
		callbacks: {
			open: function() {
				$port_third_slider.reloadSlider();
			}
		}
	});

	$port_first_slider_next.on('click',function() {
		$port_first_slider.goToNextSlide();
		return false;
	});

	$port_first_slider_prev.on('click',function() {
		$port_first_slider.goToPrevSlide();
		return false;
	});
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
	window_width = $(window).width();
	window_height = $(window).height();

	if ($brand_slider.length) {
		if (window_width >= point_1) {
			$brand_slider.reloadSlider({
				pager: false,
				slideMargin:34,
				minSlides:4,
				maxSlides:4,
				moveSlides:1,
				slideWidth:5000// if slideWidth too large our slider becomes responsive
			});
		}
		else if (window_width <= point_1 && window_width >= point_3) {
			$brand_slider.reloadSlider({
				pager: false,
				slideMargin:34,
				minSlides:2,
				maxSlides:2,
				moveSlides:1,
				slideWidth:5000// if slideWidth too large our slider becomes responsive
			});
		} else {
			$brand_slider.reloadSlider({
				pager: false,
				slideMargin:34,
				minSlides:1,
				maxSlides:1,
				moveSlides:1,
				slideWidth:5000// if slideWidth too large our slider becomes responsive
			});
		}
	}

	if ($homepage_point.length) {
		$homepage_point_offset = $homepage_point.offset().top - $header_height;
	} else {
		$homepage_point_offset = 0;
	}
	$header_height = $header_trigger_row.height();

	if ($port_first_slider.length) {
		// on resize reload slider and add active class to current slide
		$port_first_slider.reloadSlider();
		$($port_first_slider.find('.port_first_slider_item')[$port_first_slider.getCurrentSlide()]).addClass('active_slide');
	}
	if ($port_sec_slider.length) {
		// on resize reload slider and add active class to current slide
		$port_sec_slider.reloadSlider();
		$($port_sec_slider.find('.port_sec_slider_item')[$port_sec_slider.getCurrentSlide()]).addClass('active_slide');
	}
	if ($port_third_slider.length) {
		$port_third_slider.reloadSlider();
	}
}
function load_f() {
	window_width = $(window).width();
	window_height = $(window).height();

	if ($homepage_point.length) {
		$homepage_point_offset = $homepage_point.offset().top - $header_height;
	} else {
		$homepage_point_offset = 0;
	}
	$header_height = $header_trigger_row.height();

	if ($(window).scrollTop() >= $homepage_point_offset) {
		$header.addClass('black_mod');
	} else {
		$header.removeClass('black_mod');
	}

	if ($brand_slider.length) {
		if (window_width >= point_1) {
			$brand_slider.bxSlider({
				pager: false,
				slideMargin:34,
				minSlides:4,
				maxSlides:4,
				moveSlides:1,
				slideWidth:5000// if slideWidth too large our slider becomes responsive
			});
		}
		else if (window_width <= point_1 && window_width >= point_3) {
			$brand_slider.bxSlider({
				pager: false,
				slideMargin:34,
				minSlides:2,
				maxSlides:2,
				moveSlides:1,
				slideWidth:5000// if slideWidth too large our slider becomes responsive
			});
		} else {
			$brand_slider.bxSlider({
				pager: false,
				slideMargin:34,
				minSlides:1,
				maxSlides:1,
				moveSlides:1,
				slideWidth:5000// if slideWidth too large our slider becomes responsive
			});
		}
	}

	if ($port_sec_slider.length) {
		$port_sec_slider.bxSlider({
			pager: false,
			controls: false,
			infiniteLoop: false,
			mode: 'fade',
			speed: 1,
			startSlide:0,
			onSliderLoad:function(currentIndex) {

			},
			onSlideAfter: function ($slideElement, oldIndex, newIndex) {
				$slideElement.addClass('active_slide').siblings().removeClass('active_slide');
			}
		});
	}

	if ($port_first_slider.length) {
		$port_first_slider.bxSlider({
			pager: false,
			controls:false,
			infiniteLoop: false,
			mode: 'fade',
			speed: 1,
			onSlideNext: function () {
				$port_sec_slider.goToNextSlide();
			},
			onSlidePrev: function () {
				$port_sec_slider.goToPrevSlide();
			},
			onSlideAfter: function ($slideElement, oldIndex, newIndex) {
				$slideElement.addClass('active_slide').siblings().removeClass('active_slide');
				$port_first_slider_w.removeClass('end_mod');
				$port_first_slider_w.removeClass('start_mod');
				var count = $port_first_slider.getSlideCount(),
					current = newIndex + 1;
				if (current === count) {
					$port_first_slider_w.addClass('end_mod');
				}

				if (current === 1) {
					$port_first_slider_w.addClass('start_mod');
				}
			}
		});
	}

	if ($port_third_slider.length) {
		port_third_slider = $port_third_slider.bxSlider({
			nextSelector: '#port_third_slider_next',
			prevSelector: '#port_third_slider_prev',
			nextText: '',
			prevText: '',
			infiniteLoop: false,
			pager: false,
			onSliderLoad: function (currentIndex) {
				$port_third_slider_counter.find('.currentIndex').text(pad(currentIndex + 1));
			},
			onSlideBefore: function ($slideElement, oldIndex, newIndex) {
				$port_third_slider_counter.find('.currentIndex').text(pad(newIndex + 1));
			}
		});
		$port_third_slider_counter.append('/' + pad(port_third_slider.getSlideCount()));
	}
}

function all_dialog_close_gl() {
	$(".ui-dialog-content").each(function () {
		var $this = $(this);
		if (!$this.parent().hasClass('always_open')) {
			$this.dialog("close");
		}
	});
}

function scroll_f() {
	if ($(window).scrollTop() >= $homepage_point_offset) {
		$header.addClass('black_mod');
	} else {
		$header.removeClass('black_mod');
	}
}

function pad(d) {
	return (d < 10) ? '0' + d.toString() : d.toString();
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
