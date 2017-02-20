$(function () {
	pageWidget(['index','city','continent','country','dish','event','object'])

	emulPlaceholder();
	$('.kind_select').chosen();
	initSlider('.ctg_slider');
	gallery('#gallery_1', '#gallery_tabs_1');
	gallery('#gallery_2', '#gallery_tabs_2');
	gallery('#y_gallery','#y_gallery_tabs');
	horizontal_slider_v2('#articles_slider_list','#articles_slider_pag');
	horizontal_slider_v3('#church_slider_list','#church_slider_pag');
	gallery('#main_theme_slider_list','#main_theme_tabs');
	horizontal_slider('#last_added_slider','#last_added_slider_prev_butt','#last_added_slider_next_butt');
	$("#tabs").tabs();
	rus_calendar("#datepicker_block");
	//collapsingBlocks();
	if ($('.form_sel_v1').length) {
		//selectStyling('.form_sel_v1', 'mes_select');
	}
	//gallery('.gallery_v1');
	//LazyLoad.css('styles/icons.css');
	if ($('.map_block').length) {
		map_init();
		//map2();
	}
});


function collapsingBlocks() {
	var $ctrl = $('.js_ctg_show');
	$ctrl.on('click', function () {
		if ($(this).hasClass('open')) {
			$(this).removeClass('open');
			$('.search_res_category').stop().slideUp();

		}
		else {
			$(this).addClass('open');
			$('.search_res_category').stop().slideDown();
		}
		return false;
	});
}

function initSlider(slider_class) {
	var $main_slider = $(slider_class);
	if ($main_slider.length) {
		$main_slider.bxSlider({
			pager: true,
			mode: 'fade',
			controls: false
		});
	}
}

function emulPlaceholder() {
	if (!Modernizr.input.placeholder) {

		$('[placeholder]').focus(
			function () {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
					input.val('');
					input.removeClass('placeholder');
				}
			}).blur(
			function () {
				var input = $(this);
				if (input.val() == '' || input.val() == input.attr('placeholder')) {
					input.addClass('placeholder');
					input.val(input.attr('placeholder'));
				}
			}).blur();
		$('[placeholder]').parents('form').submit(function () {
			$(this).find('[placeholder]').each(function () {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
					input.val('');
				}
			})
		});

	}
}
function selectStyling(select_class, myClass) {
	$(select_class).selectOrDie({
		customClass: myClass
	});

}


$(document).on('click', function (event) {
	var cond_1 = $(event.target).closest(".vote_func_hidden").length;
	if (cond_1) {

	}
	else {
		$('.vote_func_hidden').hide(100);
		$('.vote_f_btn').removeClass('active');
		event.stopPropagation();
	}

});


//function gallery(block) {
//	$(block).sliderkit({
//		shownavitems: 5,
//		verticalnav: false,
//		navitemshover: false,
//		auto:false
//		//circular: true
//	});
//}

function gallery(main_block, thumbs) {
	$(main_block).bxSlider({
		pagerCustom: thumbs,
		mode: 'fade',
		prevText: "",
		nextText: ""
	});
}
function horizontal_slider(main_block,prev_butt,next_butt) {
	$(main_block).bxSlider({
		mode:'horizontal',
		nextSelector:$(next_butt),
		prevSelector:$(prev_butt),
		prevText: "",
		nextText: "",
		pager:false
	})
}
function horizontal_slider_v2(main_block, thumbs) {
	$(main_block).bxSlider({
		pagerCustom: thumbs,
		mode: 'horizontal',
		prevText: "",
		nextText: ""
	});
}
function horizontal_slider_v3(main_block, thumbs) {
	$(main_block).bxSlider({
		pagerCustom: thumbs,
		mode: 'horizontal',
		prevText: "",
		nextText: ""
	});
}
function rus_calendar(block) {
	$(block).datepicker({
		dayNames:["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"],
		dayNamesMin: ["ПН","ВТ","СР","ЧТ","ПТ","СБ","ВСК"]
	});
	var dayNames = $(block).datepicker( "option", "dayNames" );
	var dayNamesMin = $(block).datepicker( "option", "dayNamesMin" );
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