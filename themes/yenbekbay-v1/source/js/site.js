(function($) {
  // Menu
  var MQL = 1170;
  if ($(window).width() > MQL) {
    var headerHeight = $('.navbar-custom').height();
    $(window).on('scroll', {previousTop: 0},
      function() {
        var currentTop = $(window).scrollTop();
        // Check if user is scrolling up
        if (currentTop < this.previousTop) {
          // If scrolling up...
          if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
            $('.navbar-custom').addClass('is-visible');
          } else {
            $('.navbar-custom').removeClass('is-visible is-fixed');
          }
        } else {
          // If scrolling down...
          $('.navbar-custom').removeClass('is-visible');
          if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) {
            $('.navbar-custom').addClass('is-fixed');
          }
        }

        this.previousTop = currentTop;
      }
    );
  }

  // Caption
  $('.post').each(function(i) {
    $(this).find('img').each(function() {
      if ($(this).parent().hasClass('fancybox')) return;
      var alt = this.alt;
      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function() {
      $(this).attr('rel', 'article' + i);
    });
  });
  if ($.fancybox) {
    $('.fancybox').fancybox();
  }
})(jQuery);
