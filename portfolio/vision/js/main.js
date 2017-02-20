var $body_var,
	window_height,
	window_width,
	$user_menu_butt,
	$offer_slider,
	$header_row,
	$crop_cancel,
	upload_steps_array = [],
	$response_textarea,
	media_point_1 = 1024,
	media_point_2 = 768,
	media_point_3 = 480,
	media_point_4 = 320;

$(document).ready(function ($) {
	$body_var = $('body');
	window_width = $(window).width();
	window_height = $(window).height();
	$user_menu_butt = $('#user_menu_butt');
	$header_row = $('#header_row');
	$crop_cancel = $('#crop_cancel');

	pageWidget(['index','details']);

	$response_textarea = $('#response');

	$response_textarea.on('focus',function() {
		$(this).addClass('open_mod');
	});

	$response_textarea.on('blur',function() {
		setTimeout(function() {
			$response_textarea.removeClass('open_mod');
		}, 100);
	});

	//upload
	$('.uploadStep').each(function() {
		upload_steps_array.push($(this));
	});

	showUploadStep(2);

	//sliders
	$offer_slider = $('#offer_slider');

	// tooltips
	$('.tooltip_trigger').on('click',function(){
		var container = $(this).closest('.tooltip_container');
		container.siblings('.tooltip_container').removeClass('active_mod');
		container.toggleClass('active_mod');
	});

	var mouse_in_tooltip = false;

	$('.tooltip_container').hover(function () {
		mouse_in_tooltip = true;
	}, function () {
		mouse_in_tooltip = false;
	});

	$body_var.on('click',function() {
		if (!mouse_in_tooltip) {
			$('.tooltip_container').removeClass('active_mod');
		}
	});

	// popaps
	$('.popap_open_link').magnificPopup({
		type:'inline',
		midClick: true,
		closeBtnInside:false,
		showCloseBtn:false,
		removalDelay: 300,
		mainClass: 'mfp-fade',
		callbacks: {
			open: function() {
				$body_var.addClass('popap_open');
			},
			close: function() {
				$body_var.removeClass('popap_open');
			}
		}
	});

	$crop_cancel.on('click', function () {
		$.magnificPopup.close();
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

}
function load_f() {
	addHeaderClass();

	if ($offer_slider.length) {
		$offer_slider.bxSlider({
			mode:'vertical',
			controls:false,
			pager:false,
			auto:true,
			autoDirection: 'back',
			onSlideBefore: function ($slideElement, oldIndex, newIndex) {
				$slideElement.addClass('active_mod').siblings().removeClass('active_mod');
			}
		});
	}
}

function scroll_f() {
	addHeaderClass();
}

function showUploadStep(num) {
	num = num - 1;
	upload_steps_array[num].addClass('active_mod').siblings('.uploadStep').removeClass('active_mod');
}

function addHeaderClass() {
	if ($(window).scrollTop() > 0) {
		$header_row.addClass('scroll_mod');
	} else {
		$header_row.removeClass('scroll_mod');
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

function pageWidget(pages) {
	var widgetWrap = $('<div class="widget_wrap"><ul class="widget_list"></ul></div>');
	widgetWrap.prependTo("body");
	for (var i = 0; i < pages.length; i++) {
		$('<li class="widget_item"><a class="widget_link" href="' + pages[i] + '.html' + '">' + pages[i] + '</a></li>').appendTo('.widget_list');
	}
	var widgetStilization = $('<style>@-webkit-keyframes appear{0%{opacity:.5}50%{opacity:1}100%{opacity:.5}}@-moz-keyframes appear{0%{opacity:.5}50%{opacity:1}100%{opacity:.5}}@-ms-keyframes appear{0%{opacity:.5}50%{opacity:1}100%{opacity:.5}}@-o-keyframes appear{0%{opacity:.5}50%{opacity:1}100%{opacity:.5}}@keyframes appear{0%{opacity:.5}50%{opacity:1}100%{opacity:.5}}body{position:relative}.widget_wrap{position:absolute;top:0;left:0;z-index:9999;padding:10px 20px;background:#222;border-bottom-right-radius:10px;-webkit-transition:all .3s ease;transition:all .3s ease;-webkit-transform:translate(-100%,0);-ms-transform:translate(-100%,0);transform:translate(-100%,0)}.widget_wrap:hover:after{-webkit-animation:none;-moz-animation:none;-o-animation:none;-ms-animation:none;animation:none}.widget_wrap:after{content:"navigation menu";position:absolute;top:0;left:100%;height:24px;font-size:16px;background:#222;white-space:nowrap;padding:0 15px;line-height:24px;cursor:pointer;animation:appear 1s ease-in infinite;color:#fff}.widget_wrap:hover{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}.widget_item{padding:0 0 10px}.widget_link{color:#fff;text-decoration:none;font-size:15px}.widget_link:hover{text-decoration:underline}</style>');
	widgetStilization.prependTo(".widget_wrap");
}