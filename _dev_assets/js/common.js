/*!
 * RETRIEVERPARTY.COM - 26/10/2021
 * Web Desinger & Web Developer: Ferdi Tarakci / ferditarakci.com
 */

jQuery(function( $ ) {

	$('a[rel~=external]').each(function() {
		$(this).attr('target', '_blank');
	});

	lazyOfParent();
	lazy();

	$(document).on('click', 'a[href="#"]', false);

	$('#header .main-nav > ul > li > a[href^="#"]').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();

		var el = $(this);
		var id = el.attr('href') || el.data('href');

		var idpos = $(id).offset().top;
		_scrollTo(idpos, 800);
		return false;
	});

	$(document).on('click', '.logo > a', function(e) {
		if ($(window).scrollTop() > 100) {
			e.preventDefault();
			e.stopPropagation();
			_scrollTo(0, 800);
		}
	});
});


function _scrollTo(a, b, c) {
	$.scrollTo(a, b, {
		axis: 'y',
		offset: {
			top: c
		}
	});
}

function ww(a) {
	return a ? $(window).width() : ($(window).width() + parseInt($('body').attr('data-sw'))) ;
}


function lazy() {
	return new LazyLoad({
		elements_selector: ".lazy",
		callback_loaded: function(el) {
			$(el).parent().addClass('loaded');
			// videoLazyLoad(el);
		}
		// ,callback_enter: callback_enter,
		// callback_exit: callback_exit,
		// callback_cancel: callback_cancel,
		// callback_loading: callback_loading,
		// callback_loaded: callback_loaded,
		// callback_error: callback_error,
		// callback_finish: callback_finish
	});
}

function lazyUpdate() {
	setTimeout(function() {
		lazyOfParent();
		lazy().update();
	}, 200)
}

function lazyOfParent() {
	$('img.lazy').not('.loaded').each(function() {
		var image = $(this);
		var span = image.closest('.image').find('>span');
		if (span.length) {
			if (image.hasClass('lazy')) {
				span.addClass('lazy');
				if (typeof image.data('src') !== 'undefined') span.attr('data-bg', image.attr('data-src')); else image.removeAttr('data-src');
				if (typeof image.data('srcset') !== 'undefined') span.attr('data-bg-hidpi', $.trim(image.attr('data-srcset').split(',').pop().replace(/ 2x| 3x/i, ''))); else image.removeAttr('data-srcset');
			}
			image.addClass('loaded');
			span.parent('.image').addClass('loaded');
		}
	});
}


function _triggerResize() {
	$(window).trigger('resize');
}


jQuery(function( $ ) {
	_triggerResize();
	$(window).on('load', _triggerResize );
});