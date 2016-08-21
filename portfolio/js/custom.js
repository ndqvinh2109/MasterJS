
$(document).ready(function() {
	$('.carousel').carousel({
		interval: 2000			
	});

	$('#menuContact').click(function(){

		$('body').animate({
			scrollTop: $('#row3').offset().top - 50
		}, 800);

		return false;
	});

	$('#menuAbout').click(function(){

		$('body').animate({
			scrollTop: $('#row1').offset().top + 65
		}, 800);

		return false;
	});

	$('#menuHome').click(function(){

		$('body').animate({
			scrollTop: 0
		}, 800);

		return false;
	});

});


