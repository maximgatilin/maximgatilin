var active_dialog_trigger = false,
  opened_dialog = false,
	body_var = $('body'),
	global_window_Height = $(window).height();

function dialog(dialog_id, dialog_class, dialog_trigger_id, dialog_active_class, dialog_width, dialog_wrap, modal, modal_height, p_my, p_at, $function) {

  if (modal == undefined) modal = true;
  if (p_my == undefined || !p_my) p_my = "center center";
  if (p_at == undefined || !p_at) p_at = "center center";
  if (dialog_wrap == undefined || dialog_wrap == false) dialog_wrap = 'body';
  var $drag = false;
  if (dialog_id == '#dialog_user_data') $drag = false;
  var dialog_ = $(dialog_id),
    dialog_trigger_;
  if (dialog_trigger_id == false) {
    dialog_trigger_ = dialog_trigger_id;
  } else {
    dialog_trigger_ = dialog_trigger_id;
  }


  if (dialog_active_class != false && dialog_trigger_ != false) {
    dialog_.dialog({
      autoOpen: false,
      modal: modal,
      draggable: false,
      closeOnEscape: true,
      closeText: '',
      position: {
        my: p_my,
        at: p_at,
        of: dialog_trigger_,
        collision: "none"
      },
      dialogClass: dialog_class,
      appendTo: dialog_wrap,
      width: dialog_width,
      create: function(event, ui) {
        var $this = $(this);
        $this.off().parent()
          .on('mouseenter', function() {
            body_var.addClass('dialog_hover');
          })
          .on('mouseleave', function() {
            body_var.removeClass('dialog_hover');
          });

        body_var.on('click', function() {
          if (body_var.hasClass('dialog_open') && !body_var.hasClass('dialog_hover') && $this.dialog("isOpen") && dialog_active_class != 'always_open' || !body_var.hasClass('dialog_regular_open') && !body_var.hasClass('dialog_regular_hover') && active_dialog_trigger && opened_dialog == $this) {

            if (body_var.hasClass('develop_mod')) {
              console.log('click_close', $this);
            }
            $this.dialog('close');
            opened_dialog = false;
            active_dialog_trigger = false;
          }
        });

        body_var.on('click', dialog_trigger_, function() {
          if ($(this).hasClass(dialog_active_class)) {
            if (body_var.hasClass('develop_mod')) {
              console.log('click_close');
            }
            $this.dialog('close');
            active_dialog_trigger = false;
            return false;
          } else if (!body_var.hasClass('disable_open_dialog')) {
            if (body_var.hasClass('develop_mod')) {
              console.log('click', $(dialog_trigger_).length);
            }
            if ($(dialog_trigger_).length > 1) {
              $(dialog_trigger_).removeClass(dialog_active_class);
            }

            $(this)
              .on('mouseenter', function() {
                body_var.addClass('dialog_hover');
              }).on('mouseleave', function() {
                body_var.removeClass('dialog_hover');
              }).addClass(dialog_active_class);
            if ($(dialog_trigger_).length > 1) {
              console.log('position');
              $this.dialog("option", "position", {
                my: p_my,
                at: p_at,
                of: $(this),
                collision: "none"
              });
            }
            active_dialog_trigger = $(this);
            $this.dialog('open');
            return false;
          }
        });

        $(window).on('resize', function() {
          if (body_var.hasClass('dialog_open') && $this.dialog("isOpen") && dialog_active_class != 'always_open' || !body_var.hasClass('dialog_regular_open') && !body_var.hasClass('dialog_regular_hover') && active_dialog_trigger) {

            if (body_var.hasClass('develop_mod')) {
              console.log('resize', active_dialog_trigger, opened_dialog);
            }
            $this.dialog("option", "position", {
              my: p_my,
              at: p_at,
              of: active_dialog_trigger,
              collision: "none"
            });
          }
        });

        if (body_var.hasClass('develop_mod')) {
          console.log('create');
        }
      },
      open: function(event, ui) {
        $(this).parent().addClass(dialog_active_class);

        $(".ui-dialog-content").not(this).dialog('close');

        body_var.addClass('dialog_open');
        opened_dialog = $(this);

        if (body_var.hasClass('develop_mod')) {
          console.log('open', opened_dialog);
        }

        if ($function != undefined) {
          eval($function)();
        }
      },
      close: function(event, ui) {
        $(this).parent().removeClass(dialog_active_class);

        body_var.removeClass('dialog_open ');
        opened_dialog = false;
        $(dialog_trigger_).removeClass(dialog_active_class);
        if (body_var.hasClass('develop_mod')) {
          console.log('close', opened_dialog);
        }
      }
    });

  } else {		
    dialog_.dialog({
      autoOpen: false,
      modal: modal,
      closeOnEscape: true,
      closeText: '',
      show: "fade",
      position: {
        my: p_my,
        at: p_at,
        of: window
      },
      draggable: $drag,
      dialogClass: dialog_class,
      appendTo: dialog_wrap,
      width: dialog_width,
      create: function(event, ui) {
        $(this).parent()
          .on('mouseenter', function() {
            body_var.addClass('dialog_regular_hover');
          })
          .on('mouseleave', function() {
            body_var.removeClass('dialog_regular_hover');
          });

        if (body_var.hasClass('develop_mod')) {
          console.log('create');
        }
      },
      open: function(event, ui) {
        // To enable search in ui-multiselect when used in dialog <- Rajeev Kumar Sharma
        if ($.ui && $.ui.dialog && $.ui.dialog.prototype._allowInteraction) {
          var ui_dialog_interaction = $.ui.dialog.prototype._allowInteraction;
          $.ui.dialog.prototype._allowInteraction = function(e) {
            if ($(e.target).closest('.ui-multiselect-filter input').length) return true;
            return ui_dialog_interaction.apply(this, arguments);
          };
        }
        // end
        body_var.addClass('dialog_regular_open');

        opened_dialog = $(this);
        $(".ui-dialog-content").not(this).dialog('close');

        if (body_var.hasClass('develop_mod')) {
          console.log('open', opened_dialog);
        }

        opened_dialog = $(this);

        if ($function != undefined) {
          eval($function)();
        }
      },
      close: function(event, ui) {
        body_var.removeClass('dialog_regular_open');
        opened_dialog = false;
        if (body_var.hasClass('develop_mod')) {
          console.log('close', opened_dialog);
        }
      }
    });

    if (dialog_trigger_ != false) {
      body_var.on('click', dialog_trigger_, function() {
        dialog_.dialog('open').DialogFixed(modal_height);
        return false;
      });
    }
  }
  this.openDialog = function() {
		if (modal) {
      dialog_.dialog('open').DialogFixed(modal_height);
    } else {
      dialog_.dialog('open');
    }
  };
  this.closeDialog = function() {
    dialog_.dialog('close');
  };
  this.positionDialog = function(my_p, at_p, of_p, collision_p) {
    dialog_.dialog("option", "position", {
      my: my_p,
      at: at_p,
      of: of_p,
      collision: collision_p
    });
  };
  this.getDialog = function() {
    return dialog_;
  }
}
$.fn.DialogFixed = function(height) {
  var element = this.parent();
  element.css('position', 'fixed');


  if (height != null) {
    if (global_window_Height > height) {
      element.css('top', (global_window_Height / 2) - (height / 2));
    } else {
      element.css('top', 0);
    }
    //		console.log(global_window_Height);
    //		console.log(height);
  } else {
    element.css('top', (global_window_Height / 2) - (element.outerHeight() / 2));
    //		console.log((global_window_Height / 2),(element.outerHeight() / 2));
  }
};
