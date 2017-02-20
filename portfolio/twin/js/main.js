var $body_var,
	window_height,
	window_width,
	$user_menu_butt,
	$partners_slider,
	$prize_slider,
	$scroll_menu,
	$reg_popap,
	reg_popap;

$(document).ready(function ($) {
	$body_var = $('body');
	$user_menu_butt = $('#user_menu_butt');
	window_width = $(window).width();
	window_height = $(window).height();

	//sliders
	$prize_slider = $('#prize_slider');
	$partners_slider = $('#parnters_slider');

	$scroll_menu = $('#scroll_menu');
	$reg_popap = $('#reg_popap');
	reg_popap = new dialog($reg_popap, 'no_title_mod', '#reg_popap_open', false, '780', false);
	$body_var.on('click', '.ui-widget-overlay, .dialog_cancel_butt', all_dialog_close_gl);

	$('.partners_item').on('click',function(e) {
		var $this = $(this),
			$container = $(this).closest('.partners_list'),
			container_height,
			$items = $container.find('.partners_item'),
			$sliding_blocks = $container.find('.partners_wide_item'),
			$current_sliding_block = $($this.nextAll('.partners_wide_item')[0]),
			$bx_slider = $container.closest('.bx-viewport');

		if (!$this.hasClass('active_mod')) {
			$sliding_blocks.removeClass('opened_mod');
			$items.removeClass('active_mod');
			$this.addClass('active_mod');
			$container.add($current_sliding_block).addClass('opened_mod');
		} else closeRepost();

		container_height = $container.outerHeight(true);
		$bx_slider.height(container_height);

		return false;
	});
	pageWidget(['index','login_page']);
	getAllClasses('html','.elements_list');
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

function closeRepost() {
	$('.partners_item').removeClass('active_mod');
	$('.partners_list').add('.partners_wide_item').removeClass('opened_mod');
}

function reloadPartnersSlider() {

}
function resize_f() {

}
function load_f() {
	if ($prize_slider.length) {
		$prize_slider.bxSlider({
			mode:'fade',
			infiniteLoop:false,
			pagerCustom:'#prize_thumbs',
			controls:false
		});
	}
	if ($partners_slider.length) {
		$partners_slider.bxSlider({
			infiniteLoop:false
		});
	}
	if($scroll_menu.length) {
		$scroll_menu.smint({
			'scrollSpeed': 1000
		});
	}
	$('.main_menu_link.header_mod').on('click', function () {
		var $block = $($(this).attr('href'));
		var $block_pos = $block.offset();
		$('body,html').animate({
			scrollTop: $block_pos.top
		}, 1000);
		return false;
	})
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

function all_dialog_close_gl() {
	$(".ui-dialog-content").each(function () {
		var $this = $(this);
		if (!$this.parent().hasClass('always_open')) {
			$this.dialog("close");
		}
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
