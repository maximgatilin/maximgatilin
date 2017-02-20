var rem = 1,
    $body,
    window_height,
    window_width,
    header,
    header_row,
    header_row_height,
    learn_section,
    headerTriggerPoint,
    $user_menu_butt,
    bulb_array = [],
    main_slider_array = [],
    main_slider_active_el = 0,
    stepAccordion,
    media_point_1 = 1024,
    media_point_2 = 768,
    media_point_3 = 480,
    media_point_4 = 320;


$(document).ready(function ($) {
  $body = $('body');
  header = $('#header');
  header_row = $('#header_row');
  header_row_height = header_row.height();
  $user_menu_butt = $('#user_menu_butt');
  learn_section = $('#learn_section_w');
  stepAccordion = $('.step_program_list');

  pageWidget(['index', 'tracks']);


  $('.scrollTo').on('click', function () {
    var firedEl = $(this);

    docScrollTo($(firedEl.attr("href")).offset().top - header_row_height, 1000);

    return false;
  });

  $user_menu_butt.on('click', function () {
    if ($body.hasClass('menu_open')) {
      $body.removeClass('menu_open');
      $(this).removeClass('active_mod');
    } else {
      $body.addClass('menu_open');
      $(this).addClass('active_mod');
    }
  });

  scroll_function();
});

$(window).on('load', function () {
  window_height = $(window).height();
  window_width = $(window).width();
  header_row_height = header_row.height();
  headerTriggerPoint = $('.headerTriggerPoint').offset().top;

  move_to_block('#tracks_section_w', '#tracks_scroll_link');

  //bulb_animation();

  if (stepAccordion.length) {
    stepAccordion.each(function() {
      $(this).accordion({
        header: '.step_program_trigger',
        active:false,
        collapsible:true,
        heightStyle:'content'
      })
    });
  }
});

$(window).on('orientationchange',function() {
  window_height = $(window).height();
  window_width = $(window).width();
  header_row_height = header_row.height();
  headerTriggerPoint = $('.headerTriggerPoint').offset().top;
});

$(window).on('scroll', function () {
  scroll_function();
});

$(window).on('resize', function () {
  header_row_height = header_row.height();
});
function bulb_animation() {
  $('.head_slider_circle').each(function () {
    var $this = $(this);

    var array_push_var = {
      'element': $this
    };

    bulb_array.push(array_push_var);

    console.log(bulb_array);
  });

  for (var i = 0; i < bulb_array.length; i++) {
    animation(i);
  }

  function animation(i) {
    var $random = Math.floor(Math.random() * 1000);
    console.log($random);
    bulb_array[i].element.snabbt({
      fromPosition: [0, window_height / 2, 0],
      position: [0, -window_height / 5 + 200, 0],
      easing: 'ease',
      duration: 10000,
      delay: 10 * $random
    }).then({
      fromPosition: [0, -window_height / 5 + 200, 0],
      position: [0, -window_height / 5, 0],
      fromScale: [1, 1],
      scale: [0, 0],
      fromOpacity: 1,
      opacity: 0,
      easing: 'easeOut',
      duration: 3000,
      callback: function () {
        animation(i);
      }
    });
  }
}


function scroll_function() {
  window_height = $(window).height();
  window_width = $(window).width();

  if ($(window).scrollTop() > (headerTriggerPoint - header_row_height)) {
    header.addClass('fixed_mod');
  } else {
    header.removeClass('fixed_mod');
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