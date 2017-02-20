(function () {
	var $body,
		$window,
		window_height,
		window_width,
		$user_menu_butt,
		media_point_1 = 1024,
		media_point_2 = 768,
		media_point_3 = 480,
		media_point_4 = 320,
		$logPopapOpenButt,
		$logPopap,
		$qa_accordion,
		$itembuilds_acc,
		$skill_build,
		$dress_section;

	$(document).ready(function ($) {
		$body = $('body');
		$window = $(window);
		$user_menu_butt = $('#user_menu_butt');
		window_width = $(window).width();
		window_height = $(window).height();
		$logPopapOpenButt = $('#lop_popap_open');
		$logPopap = $('#log_popap');
		$qa_accordion = $('#qa_accordion');
		$itembuilds_acc = $('#itembuilds_acc');
		$skill_build = $('#skill_build');
		$dress_section = $('#dress_section');

		$logPopapOpenButt.on('click', function () {
			if (!$logPopap.hasClass('show')) {
				$logPopap.addClass('show');
			}
			return false;
		});

		$logPopap.on('click', function (e) {
			e.stopPropagation();
		});

		$body.on('click', function () {
			$logPopap.removeClass('show');
		});

		//appeared blocks
		$('.js_skillbuild_show').hover(function () {
			$skill_build.addClass('show_mod');
		});

		$('.js_dress_open').on('click',function() {
			$dress_section.addClass('show_mod');
			return false;
		});

		var mouse_inside_dress = false;
		var mouse_inside_skill_build = false;

		$dress_section.hover(function(){
			mouse_inside_dress=true;
		}, function(){
			mouse_inside_dress=false;
		});

		$skill_build.hover(function(){
			mouse_inside_skill_build=true;
		}, function(){
			mouse_inside_skill_build=false;
		});

		$body.on('click',function() {
			if (!mouse_inside_dress) {
				$dress_section.removeClass('show_mod');
			}
			if (!mouse_inside_skill_build) {
				$skill_build.removeClass('show_mod');
			}
		});

		pageWidget(['index', 'heroes_all', 'heroes_home', 'allies_counters', 'create_guide', 'view_guide', 'donate', 'guides', 'workshop']);
		getAllClasses('html', '.elements_list');
	});

	$(window).on('resize', function () {
		resize_f();
	});

	$(window).on('scroll', function () {
		scroll_f();
		setPosition($skill_build);
		setPosition($dress_section);
	});

	$(window).on('load', function () {
		load_f();
	});

	function resize_f() {
		setPosition($skill_build);
		setPosition($dress_section);

	}

	function load_f() {
		setPosition($skill_build);
		setPosition($dress_section);


		$('#head_slider').bxSlider({
			nextText: '',
			prevText: ''
		});

		$('#all_heroes_slider').bxSlider({
			pager: false
		});

		$('#about_hero_slider_1').bxSlider({
			pagerCustom: '#about_hero_thumbs_1',
			mode: 'fade',
			controls: false
		});

		$('#about_hero_slider_2').bxSlider({
			pagerCustom: '#about_hero_thumbs_2',
			mode: 'fade',
			controls: false
		});

		if ($qa_accordion.length) {
			$qa_accordion.accordion({
				header: '.donate_qa_title',
				heightStyle: 'content',
				animate: 0,
				collapsible: true
			});
		}
		if ($itembuilds_acc.length) {
			$itembuilds_acc.accordion({
				header: '.section_title',
				heightStyle: 'content',
				animate: 0,
				collapsible: true
			});
		}
	}

	function scroll_f() {

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

	function setPosition(target) {
		var y = $window.height()/2+$window.scrollTop();
		var x = $window.width()/2;
		target.css({
			top: y,
			left: x
		});
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
})();
