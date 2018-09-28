$(function(){
  var a = $('#aside').offset().top;
  console.log(a)
  $(window).scroll(function() {
    var s = $(window).scrollTop();
    if(s > a){
      $('#aside').addClass('fixed')
      $('#content').addClass('m-220')
    }else{
      $('#aside').removeClass('fixed')
      $('#content').removeClass('m-220')
    }
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
})