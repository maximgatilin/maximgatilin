var $body,
	$user_menu_butt,
	$window_width,

	$home_slider_list,
	home_slider,

	brandsSlider,
	$slideTextTarget,
	$brandsSliderCont,
	$brandsSliderList,
	$brandsSliderWidth,
	$brandsSliderItemWidth,
	currentDomIndex,
	activeSlide,
	slideText,

	$gallery,
	defaultGalHeight,
	galleryFirstRowHeight,
	galleryMiddleRowHeight,
	galleryLastRowHeight;


$(function () {
	$body = $('body');
	$user_menu_butt = $('#user_menu_butt');
	$window_width = $(window).width();

	$slideTextTarget = $('#slide_text_target');
	$brandsSliderCont = $('.brands_slider_in');
	$brandsSliderList = $('#brands_slider_list');
	$brandsSliderWidth = $brandsSliderCont.width();
	$brandsSliderItemWidth = Math.round($brandsSliderWidth * .2);

	$home_slider_list = $('#home_slider_list');

	$gallery = $('#gallery_list');
	defaultGalHeight = $gallery.innerHeight();
	galleryFirstRowHeight = getGroupHeight($('.gallery_item.first_mod'));
	galleryMiddleRowHeight = getGroupHeight($('.gallery_item.middle_mod'));
	galleryLastRowHeight = getGroupHeight($('.gallery_item.last_mod'));


	$user_menu_butt.on('click', function () {
		if ($body.hasClass('menu_open')) {
			$body.removeClass('menu_open');
			$(this).removeClass('active_mod');
		} else {
			$body.addClass('menu_open');
			$(this).addClass('active_mod');
		}
	});

	pageWidget(['home', 'services', 'gallery', 'actions', 'news', 'a_class', 'contacts', 'works', 'about_us', 'brands']);

	if ($('.serv_about_list.slide_mod').length) {
		slideAction($('.serv_about_list.slide_mod'), $('.serv_about_more_link'), $('.serv_about_block'), 300);
	}

	if ($gallery.length) {
		setGalHeight();
	}

	if ($('.map_canvas').length) {
		map_init();
	}

	if ($('.works_thumb_list').length) {
		changeSrc('.thumbImage', '.targetImage', '.changeSrcCont');
	}

	if ($('.splitTarget').length) {
		splitSpan($('.splitTarget'));
	}

	if ($home_slider_list.length) {
		init_slider();
	}

	if ($brandsSliderList.length) {
		brandsSlider = $brandsSliderList.bxSlider({
			pager: false,
			slideWidth: $brandsSliderItemWidth,
			infiniteLoop: true,
			onSlideBefore: function ($slideElement, oldIndex, newIndex) {
				currentDomIndex = $slideElement.index();
				activeSlide = $('.brands_slider_item:eq(' + (currentDomIndex + 2) + ')');

				activeSlide.addClass('active_mod').siblings().removeClass('active_mod');
				setSlideText(activeSlide, $slideTextTarget);
			},
			maxSlides: 5,
			minSlides: 5,
			moveSlides: 1,
			onSliderLoad: function (currentIndex) {
				activeSlide = $('.brands_slider_item').not('.bx-clone').eq(currentIndex + 2);
				activeSlide.addClass('active_mod');
				setSlideText(activeSlide, $slideTextTarget);
			}
		});
	}
});

$(window).on('resize', function () {
	resize_f();
});

$(window).on('load',function() {
	load_f();
});

function resize_f() {
	//reload all widths
	$window_width = $(window).width();
	$brandsSliderWidth = $brandsSliderCont.width();
	$brandsSliderItemWidth = Math.round($brandsSliderWidth * .2);

	if ($brandsSliderList.length) {
		brandsSlider.reloadSlider();
	}

	if ($gallery.length) {
		setGalHeight();
	}

	if ($home_slider_list.length) {
		home_slider.destroySlider();
		init_slider();
	}
}

function load_f() {
	setGalHeight();

	if ($brandsSliderList.length) {
		brandsSlider = $brandsSliderList.bxSlider({
			pager: false,
			slideWidth: $brandsSliderItemWidth,
			infiniteLoop: true,
			onSlideBefore: function ($slideElement, oldIndex, newIndex) {
				currentDomIndex = $slideElement.index();
				activeSlide = $('.brands_slider_item:eq(' + (currentDomIndex + 2) + ')');

				activeSlide.addClass('active_mod').siblings().removeClass('active_mod');
				setSlideText(activeSlide, $slideTextTarget);
			},
			maxSlides: 5,
			minSlides: 5,
			moveSlides: 1,
			onSliderLoad: function (currentIndex) {
				activeSlide = $('.brands_slider_item').not('.bx-clone').eq(currentIndex + 2);
				activeSlide.addClass('active_mod');
				setSlideText(activeSlide, $slideTextTarget);
			}
		});
	}

	if ($gallery.length) {
		setGalHeight();
	}
}

function getGroupHeight(elem) {
	var groupHeight = 0,
		elemHeight;

	elem.each(function (indx, element) {
		elemHeight = $(this).innerHeight();
		groupHeight += elemHeight;
	});

	return groupHeight;
}

function setGalHeight() {
	$gallery = $('#gallery_list');
	defaultGalHeight = $gallery.innerHeight();
	galleryFirstRowHeight = getGroupHeight($('.gallery_item.first_mod'));
	galleryMiddleRowHeight = getGroupHeight($('.gallery_item.middle_mod'));
	galleryLastRowHeight = getGroupHeight($('.gallery_item.last_mod'));

	var highestRow = Math.max(galleryFirstRowHeight, galleryMiddleRowHeight, galleryLastRowHeight);

	if ($window_width > 768) {
		$gallery.css('height', (highestRow + 20) +'rem');
	} else {
		$gallery.css('height', 'auto');
	}
}

function setSlideText(elem, target) {
	var slideText = elem.data('slide-text');
	target.html(slideText);
}

function init_slider() {
	if ($window_width > 768) {
		home_slider = $home_slider_list.bxSlider({
			pager: false,
			auto: true
		});
	}
	else {
		home_slider = $home_slider_list.bxSlider({
			pager: true,
			auto: true
		});
	}
}


function slideAction(block, trigger, wrapper, duration) {
	if (duration === undefined) {
		duration = 300
	}
	trigger.on('click', function () {
		var $trigger = $(this),
			$wrapper = $trigger.closest(wrapper),
			$block = $wrapper.find(block);
		if ($block.hasClass('opened')) {
			$block.removeClass('opened');
			$trigger.removeClass('opened');
			$block.slideUp(duration);
		} else {
			$block.addClass('opened');
			$trigger.addClass('opened');
			$block.slideDown(duration);
		}
		return false;
	});
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