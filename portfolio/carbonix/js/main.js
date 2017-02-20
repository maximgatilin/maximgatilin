var $body,
	$user_menu_butt,
	$head_acc,
	animation_array = [],
	window_height,
	window_width,
	scrollWidth,
	windowFullWidth,
	footer_offset,

	$about_slider,
	about_slider,
	$sliderHeight,
	$sliderItem,

	media_point_1 = 1200,
	media_point_2 = 768,
	media_point_3 = 480,
	media_point_4 = 320;

$(function () {
	$body = $('body');
	window_height = $(window).height();
	window_width = $(window).width();
	$user_menu_butt = $('#user_menu_butt');
	footer_offset = $('#page_footer').offset().top;
	$about_slider = $('#about_us_slider');
	scrollWidth = (scrollbarWidth());
	windowFullWidth = window_width + scrollWidth;
	$head_acc = $('#head_cat_list');

	$user_menu_butt.on('click', function () {
		if ($body.hasClass('menu_open')) {
			$body.removeClass('menu_open');
			$(this).removeClass('active_mod');
		} else {
			$body.addClass('menu_open');
			$(this).addClass('active_mod');
		}
	});


	headerAccordion(window_width);

	move_to_block('#blog_all_block', '#scroll_blog_link');
	move_to_block('#offers_block', '#home_head_scroll_link');
	move_to_block('#custom_list', '#custom_scroll_link');


	$('.archive_years_list').accordion({
		header: '.archive_years_trigger',
		heightStyle: "content",
		collapsible: true
	});
	$('.archive_month_list').accordion({
		header: '.archive_month_trigger',
		heightStyle: "content",
		collapsible: true
	});


	if ($body.hasClass('map_page')) {
		map_init();
	}


	$('.offer_more_link').add('.offer_item_in').on('click', function () {
		var $this = $(this),
			$main_container = $this.closest('.offer_list'),
			$sub_container = $this.closest('.offer_item'),
			$currentSlideBlock = $sub_container.find('.offer_sub_list'),
			$currentMoreLink = $sub_container.find('.offer_more_link'),
			$slideBlocks = $main_container.find('.offer_sub_list');

		if (windowFullWidth > 768) {
			$slideBlocks.slideDown(300);
			$main_container.addClass('opened');
		} else {
			$currentMoreLink.slideUp(100);
			$currentSlideBlock.slideDown(300);
		}

		if ($this.hasClass('offer_more_link')) {
			return false;
		}
	});
	$(".offer_item").on({
		mouseenter: function () {
			$(this).addClass('active').siblings('.offer_item').removeClass('active');
		}
	});

	$('.project_i_link').click(function () {
		var $this = $(this),
			$container = $this.closest('.project_block'),
			$gallery = $container.find('.fotorama').fotorama({loop: true}),
			fotorama = $gallery.data('fotorama');
		fotorama.requestFullScreen();
		if ($container.hasClass('closed')) {
			$container.removeClass('closed').addClass('opened');
		} else {
			$container.removeClass('opened').addClass('closed');
		}
		$gallery.on('fotorama:fullscreenexit', function (e, fotorama) {
			fotorama.destroy();
		});
	});


	$(".butt").on({
		mouseenter: function () {
			$(this).one("webkitTransitionEnd otransitionend oTransitionEnd MSTransitionEnd transitionend", function (event) {
				$(this).addClass('hovered');
			});
		}, mouseleave: function () {
			$(this).one("webkitTransitionEnd otransitionend oTransitionEnd MSTransitionEnd transitionend", function (event) {
				$(this).removeClass('hovered');
			});
		}
	});
	if ($('html').hasClass('no-smil')) {
		$(".butt").on({
			mouseenter: function () {
				$(this).addClass('hovered');
			}, mouseleave: function () {
				$(this).removeClass('hovered');
			}
		});
	}


	pageWidget(['index', 'about_us', 'blog_home', 'blog_single', 'partners', 'carreer_open', 'carreer_fill', 'product', 'contacts', 'past_projects', 'media', 'custom']);
});
$(window).on('load', function () {
	//creating array with our animated blocks
	$('.animation_target').each(function (indx, element) {
		var sub_animation_array = {
			'offset': $(element).offset().top,
			'data_attr': $(element).attr('data-animation_name'),
			'animation_state': false
		};
		animation_array.push(sub_animation_array);
	});

	footer_offset = $('#page_footer').offset().top;
	window_height = $(window).height();
	scroll(window_height, 0);
	scroll($(window).scrollTop(), 1);

	if ($about_slider.length && windowFullWidth > media_point_2) {
		about_slider = $('.about_us_slider').bxSlider({
			pagerCustom: '#about_thumbs',
			mode: 'fade',
			controls: false,
			speed: 1,
			auto: true,
			onSlideAfter: function ($slideElement, oldIndex, newIndex) {
				$slideElement.addClass('active_slide').siblings().removeClass('active_slide');
			}
		});

		$sliderHeight = $('.bx-viewport').height();
		$sliderItem = $('.slide_item');
		$sliderItem.css('height', $sliderHeight + 'px');
	}
});

function headerAccordion(pageWidth) {
	if (pageWidth <= media_point_1) {
		$head_acc.accordion({
			header:'.head_cat_title',
			heightStyle: "content",
			collapsible: true,
			active:false
		});
	} else if(pageWidth > media_point_1 && $head_acc.hasClass('ui-accordion')) {
		$head_acc.accordion("destroy");
	}
}

function scroll(position, version) {
	for (var i = 0; i < animation_array.length; i++) {
		if (position > (animation_array[i].offset - ((window_height / 2) - 100) * version ) && animation_array[i].animation_state == false) {
			animation_array[i].animation_state = true;
			var container = $('.animation_target[data-animation_name="' + animation_array[i].data_attr + '"]'),
				solution_block = $('.solution_list', container),
				solution_last_block = $('.solution_item:last', solution_block).find('.solution_block');

			//-------------solution block animation

			solution_block.addClass('anim_step_1');
			$('.anim_step_1').one("webkitTransitionEnd otransitionend oTransitionEnd MSTransitionEnd transitionend", function (event) {
				$(this).addClass('anim_step_2');
			});
			$(solution_last_block, '.anim_step_2').one("webkitTransitionEnd otransitionend oTransitionEnd MSTransitionEnd transitionend", function (event) {
				solution_block.addClass('anim_step_3');
			});
			$(solution_last_block, '.anim_step_3').one("webkitTransitionEnd otransitionend oTransitionEnd MSTransitionEnd transitionend", function (event) {
				solution_block.addClass('anim_step_4');
			});
			$(solution_last_block, '.anim_step_4').one("webkitTransitionEnd otransitionend oTransitionEnd MSTransitionEnd transitionend", function (event) {
				solution_block.addClass('anim_step_5');
			});

			//-----------------advantages block animation

			$('.adv_item_in', container).addClass('show');
			$('.adv_title', container).addClass('show');
			$('.adv_cont_butt', container).addClass('show');

			//----------------------------round animation

			$('.section_title.assets_mod', container).addClass('show');
			$('.assets_circle_list', container).addClass('round_start');

		}
	}
}
$(window).on('resize', function () {
	window_height = $(window).height();
	window_width = $(window).width();
	scrollWidth = (scrollbarWidth());
	windowFullWidth = window_width + scrollWidth;

	headerAccordion(window_width);

	if ($about_slider.length && windowFullWidth > media_point_2) {
		if (about_slider) {
			about_slider.reloadSlider();
			$sliderHeight = $('.bx-viewport').height();
			$sliderItem.css('height', $sliderHeight + 'px');
		} else {
			about_slider = $('.about_us_slider').bxSlider({
				pagerCustom: '#about_thumbs',
				mode: 'fade',
				controls: false,
				speed: 1,
				auto: true,
				onSlideAfter: function ($slideElement, oldIndex, newIndex) {
					$slideElement.addClass('active_slide').siblings().removeClass('active_slide');
				}
			});

			$sliderHeight = $('.bx-viewport').height();
			$sliderItem = $('.slide_item');
			$sliderItem.css('height', $sliderHeight + 'px');
		}

	} else if ($about_slider.length && about_slider && windowFullWidth <= 768) {
		about_slider.destroySlider();
	}
	scroll(window_height, 0);
});

$(window).on('scroll', function (e) {
	scroll($(window).scrollTop(), 1);
});


function move_to_block(block, control) {
	var $block = $(block),
		$control = $(control);
	$control.on('click', function () {
		var $block_pos = $block.offset();
		$('body,html').animate({
			scrollTop: $block_pos.top - 100
		}, 500);
		return false;
	})
}

function scrollbarWidth() {
	var block = $('<div>').css({'height': '50px', 'width': '50px'}),
		indicator = $('<div>').css({'height': '200px'});

	$('body').append(block.append(indicator));
	var w1 = $('div', block).innerWidth();
	block.css('overflow-y', 'scroll');
	var w2 = $('div', block).innerWidth();
	$(block).remove();
	return (w1 - w2);
}
//developer functions

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