
$(document).ready(function(){
	// $('.bg-slider').each(function(){
	// 	var sectionHeight = $(this).parent().outerHeight();
	// 	// $(this).find('.bg-cycle').height(sectionHeight);
	// 	// $(this).find('.bg-cycle img').css('max-height',sectionHeight);
	// });
	$(".fancybox").fancybox({
    	maxWidth	: 800,
		maxHeight	: 600,
		fitToView	: false,
		width		: '70%',
		height		: '70%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'elastic',
		closeEffect	: 'elastic',
		margin: 0 // top, right, bottom, left
	});
	$(".newsletter-pop").fancybox({
  //   	maxWidth	: 800,
		// maxHeight	: 600,
		fitToView	: true,
		width		: '860px',
		height		: '548px',
		autoSize	: false,
		closeClick	: false,
		wrapCSS : 'fancybox-newsletter',
		padding : 0,
		openEffect	: 'elastic',
		closeEffect	: 'elastic'
	});

	$(".popupCard").fancybox({
  		// maxWidth	: 800,
		// maxHeight	: 600,
		// fitToView	: true,
		autoSize	: true,
		closeClick	: false,
		padding : 0,
		openEffect	: 'elastic',
		closeEffect	: 'elastic'
	});

	$('.tab-wrap').animate({height:$('.tab-wrap .active').height()},300);
	$('.tabs a').on('click',function(e){
		var target = $(this).attr('href');
		e.preventDefault();
		$('.tabs .active').removeClass('active');
		$(this).addClass('active');
		$('.tab-wrap .active').removeClass('active pullDown');
		setTimeout(function(){
			$('.tab-wrap .active').removeClass('active pullDown');
			$(target).addClass('active pullDown');
			$('.tab-wrap').animate({height:$('.tab-wrap .active').height()},300);
		},500);
	});
	$(window).load(function() {
   		var maxHeight = -1;
	   	$('[data-equal]').each(function() {
	    	maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
	   	});
	   	$('[data-equal]').each(function() {
	    	$(this).animate({height: maxHeight},500);
	   	});
	   	setTimeout(function(){
	   		$('.bg-slider').animate({opacity:1},1000);
	   	},500);
 	});
	// $('.id_1155 a').attr('href','#').addClass('grayOut');
	// $('.id_1155 a').on('click',function(e){
	// 	e.preventDefault();
	// });
	var fixed = true;
	var initZoom = detectZoom.zoom();
	$(window).resize(function(){
		var zoom = detectZoom.zoom();
		if (zoom > initZoom) {
			 fixed = false;
		}else if (zoom <= initZoom){
			fixed = true;
		}
	});

	$("html").niceScroll({cursorborder:"#11BBEE",zindex:"99999",styler:"fb", cursorcolor:"#000"});
 	$(window).scroll(function() {
 		var topOfWindow = $(window).scrollTop();

		$('.logo-azoty').each(function(){
		var imagePos = $(this).offset().top;
			if (imagePos < topOfWindow+400) {
				$(this).addClass("slideUp");
			}
		});
		if(topOfWindow > 60 && fixed == true)  {
			$('#header').addClass('fixed fadeInDown animated');
			$('#patch').show();
		}
		if(topOfWindow == 0 || fixed == false) {
			$('#header').removeClass('fixed fadeInDown animated');
			$('#patch').hide();
		}
	});
 	$('.chemik-tv div:first').addClass('first');

});

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

   	$('audio').mediaelementplayer({
   		audioWidth: 313,
	});
	$('.radio .initiate .play').on('click',function(e){
		e.preventDefault();
		if ($('.radio .initiate').hasClass('active')){
			$('.radio .initiate').find('.mejs-pause button').trigger('click');
			$('.radio .initiate').removeClass('active');
		}else{
			$(this).parent().addClass('active');
			$(this).parent().find('.mejs-play button').trigger('click');
		}
	});
	setTimeout(function(){
		$('.promo-btn').addClass('slideLeft');
	},2000);

});
