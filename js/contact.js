	$(document).ready(function() {
	// $(".default").each(function(){
	// 	var defaultVal = $(this).attr('title');
	// 	$(this).focus(function(){
	// 		if ($(this).val() == defaultVal){
	// 			$(this).removeClass('active').val('');
	// 		}
	// 	});
	// 	$(this).blur(function() {
	// 		if ($(this).val() == ''){
	// 			$(this).addClass('active').val(defaultVal).css('color','#B0B0B0');
	// 		}
	// 	})
	// 	.blur().addClass('active');
	// });
	$('.submit-button').click(function(e){
		var $formId = $(this).parents('form');
		var formAction = $formId.attr('action');
		defaulttextRemove();
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		$('li',$formId).removeClass('contact-form-error');
		$('div.contact-form-error').remove();
		$('.required',$formId).each(function(){
			var inputVal = $(this).val();
			var $parentTag = $(this).parent();
			if(inputVal == ''){
				$parentTag.append('<div class="contact-form-error pullDown">Pole jest wymagane</div>');
			}
			if($(this).hasClass('email') == true){
				if(!emailReg.test(inputVal)){
					$parentTag.append('<div class="contact-form-error pullDown">Podaj właściwy adres email.</div>');
				}
			}
		});
		if ($('div.contact-form-error').length == "0") {
			$formId.append($loading.clone());
			$('fieldset',$formId).hide();
			$.post(formAction, $formId.serialize(),function(data){
				$('.loading').remove();
               $formId.append(data).fadeIn();
        	});
		}
		e.preventDefault();
	});
	function defaulttextRemove(){
		$('.default').each(function(){
			var defaultVal = $(this).attr('title');
			if ($(this).val() == defaultVal){
				$(this).val('');
			}
		});
	}

   $('#contact-form').ajaxForm({  
	    target:"#hiddenDIV",
	    clearForm:true,
	    resetForm:true,
	    beforeSubmit:function() {
	       $("#msg").html("Wysyłanie...");
	       $("#msg").addClass("pullDown");
	       $('.submit-button').attr('disabled',true);
	    },
	    success:function(response) {
	    		$("#msg").html('<span class="success">Dziekujemy! Twoja wiadomość została wysłana</span>');
	    		$("#msg").removeClass("error");
	       		$("#msg").addClass("success pullDown");
	       		$('.submit-button').attr('disabled',false);
	        	$("#hiddenDIV").empty();
	    }
  	});

});
