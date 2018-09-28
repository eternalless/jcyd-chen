$(function(){
    var a = $('#aside').offset().top - 70;
    function scrolls(){
      var footerHeight = $('footer').offset().top - $(window).scrollTop()- 70 - 24;
      var height = $('#aside').outerHeight()
      var s = $(window).scrollTop();
      if(s > a && footerHeight >= height){
        $('#aside').removeClass('filed-bottom')
        $('#aside').addClass('fixed')
        $('#content').addClass('m-220')
      } else if (footerHeight <= height) {
        $('#aside').removeClass('fixed')
        $('#content').removeClass('m-220')
        $('#aside').addClass('filed-bottom')
      } else {
        $('#aside').removeClass('fixed')
        $('#aside').removeClass('filed-bottom')
        $('#content').removeClass('m-220')
      }
    }
    $(window).scroll(function() {
      scrolls();
    });

  $(".aside-li").click(function () {
    if($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    }else {
      $(this).siblings('li').removeClass('selected');
      $(this).addClass('selected');
    }
  });
  $(".connect-li").click(function () {
    if($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    }else {
      $(this).siblings('li').removeClass('selected');
      $(this).addClass('selected');
    }
  });

  $(".aside-sub-li").click(function (event) {
    event.stopPropagation()
        $('.aside-sub-li').not(this).removeClass('active');
        $(this).addClass('active');
  }
  );
  $('.nav-item').on('click', '>li', function(){
    location.href = $(this).attr('data-target')
  })

  $('.connect-li').hover(function () {
    $(this).children('.connect-code').stop().fadeIn()
  }, function () {
    $(this).children('.connect-code').stop().fadeOut()
  })
})