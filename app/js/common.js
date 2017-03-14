$(function() {

	// selectize.js - a plugin for applying syles to selects

	$('form select').selectize();

	// Owl carousel plugin

	$(".carousel-eq").owlCarousel({
		loop:true,
		margin:15,
		responsiveClass:true,
		responsive:{
			0:{
				items:1
			},
			480:{
				items:2
			},
			767:{
				items:3
			},
			991:{
				items:4
			},
			1199:{
				items:4
			}
		}
	});

	$(".carousel-part").owlCarousel({
		dots:false,
		nav:true,
		navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		margin:30,
		responsiveClass:true,
		responsive:{
			0:{
				items:1,
				loop:false
			},
			481:{
				items:2,
				loop:false
			},
			767:{
				items:3,
				loop:true
			},
			991:{
				items:4,
				loop:true
			},
			1199:{
				items:5,
				loop:true
			}
		}
	});

	// jQuery Simple Equal Heights

	$('.carousel-content').equalHeights();


	// попытка выровнить ширину ячеек "Адрес" и "Работы"

	// $('.portfolio-item-content').click(function() {

	// 	var greatestWidth = 0;

	// 	$('.td.wsnw').each(function() {

	// 		console.log($(this));

	// 		var theWidth = $(this).width();

	// 		console.log(theWidth);

	// 		if ( theWidth > greatestWidth ) {
	// 			greatestWidth = theWidth;
	// 		}

	// 	});

	// 	console.log(greatestWidth);

	// 	$('.td.wsnw').width(greatestWidth);

	// }); Получилось частично. Не работает со "скрытыми элементами"


	// magnific-popup for .portfolio and forms

	$('.portfolio-item').each(function(e) {

		var th = $(this);

		th.attr('href', '#portfolio-img-' + e)
		.find('.portfolio-popup')
		.attr('id', 'portfolio-img-' + e);

	});

	$('.portfolio-item, a[href="#callback"]').magnificPopup({
		// delegate: 'a', - не надо т.к. выше присвоенны айдишники
		type: 'inline',
		removalDelay: 150, //delay removal by X to allow out-animation
		mainClass: 'mfp-zoom-in',
		midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	});

	$('a[href="#callback"]').click(function () {
		var dataForm = $(this).data('form');
		var dataText = $(this).data('text');
		// console.log(dataForm, '|', dataText);
		$('.form-callback h4').text(dataText);
		$('.form-callback [name=admin-data]').val(dataForm);
	});


	//  magnific-popup

	$('.mfp-gallery').each(function() {  // .each(function(){$(this) ... }); чтобы не повторять код для каждой галереи 
		$(this).magnificPopup({
		delegate: 'a', //
		type: 'image', //
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-zoom-in mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title')/* + '<small>by Marsel Van Oosten</small>'*/;
			}
		}
	});
	});


	// mouse-icon click scroll

	$(".mouse-icon").click(function () {
		$("html, body").animate({
			scrollTop : $(".s-adv").offset().top
		}, 800)
	});

	// waypoint for s-adv

	$('.s-adv').waypoint(function() {

	// jQuery Number Animation with Blur + Number Separator

	// $({blurRadius: 5}).animate({blurRadius: 0}, {
	// 	duration: 1400,
	// 	easing: 'swing',
	// 	step: function() {
	// 		$(".s-adv-item h3 span").css({
	// 			"-webkit-filter": "blur("+this.blurRadius+"px)",
	// 			"filter": "blur("+this.blurRadius+"px)"
	// 		});
	// 	}
	// });

	var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(' ');
	$(".s-adv-item h3 span").each(function() {
		var tcount = $(this).data("count");
		$(this).animateNumber({ number: tcount,
			easing: 'easeInQuad',
			"font-size": "1.8125em",
			numberStep: comma_separator_number_step},
			1400);
	});

		this.destroy(); // чтобы остановить блюринг в при дальнейшем скролинге 

	}, {
		offset: 'bottom-in-view'
	});


	// Toggle Mnu

	$(".toggle-mnu").click(function() {
		$(this).toggleClass("on");
		$(this)
			.parent()
			.siblings(".hidden-mnu-wrap")
			.find(".hidden-mnu")
			.slideToggle(); // выдвижение скрытого меню только рядом с триггером
		return false;
	});

	$(".main-foot .toggle-mnu").click(function() {
		$("html, body").animate({scrollTop: $(document).height() + 80}); // скрол вниз вместе с появившимся меню
	});


	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};


	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			// alert("Thank you!");
			$(".form-callback .success").addClass("active");
			setTimeout(function() {
				// Done Functions
				$(".form-callback .success").removeClass("active");
				th.trigger("reset");
				$.magnificPopup.close();
			}, 3000);
		});
		return false;
	});

	// Inserting go-top-button

	$('body').append('<div class="go-top"><i class="fa fa-angle-double-up">');
	
	$('.go-top').click(function () {
		$('html, body').animate({
			scrollTop : 0			
		}, 800);
		$('.go-top').removeClass('active');
	});

	// сокрытие кнопки "наверх" наверху

	$('.header-content').waypoint(function (direction) {
		var goTopBtn = $('.go-top');
		if (direction === 'down') {
			goTopBtn.addClass('active');
		} else {
			goTopBtn.removeClass('active');
		}
	});

	// //Chrome Smooth Scroll
	// try {
	// 	$.browserSelector();
	// 	if($("html").hasClass("chrome")) {
	// 		$.smoothScroll();
	// 	}
	// } catch(err) {
	// };

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

	/*
	 * Replace all SVG images with inline SVG
	 */
 jQuery('img.img-svg').each(function(){
	var $img = jQuery(this);
	var imgID = $img.attr('id');
	var imgClass = $img.attr('class');
	var imgURL = $img.attr('src');

	jQuery.get(imgURL, function(data) {
				// Get the SVG tag, ignore the rest
				var $svg = jQuery(data).find('svg');

				// Add replaced image's ID to the new SVG
				if(typeof imgID !== 'undefined') {
					$svg = $svg.attr('id', imgID);
				}
				// Add replaced image's classes to the new SVG
				if(typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass+' replaced-svg');
				}

				// Remove any invalid XML tags as per http://validator.w3.org
				$svg = $svg.removeAttr('xmlns:a');

				// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
				if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
					$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
				}

				// Replace image with new SVG
				$img.replaceWith($svg);

			}, 'xml');

 });

});
