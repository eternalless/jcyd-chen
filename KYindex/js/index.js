$(document).ready(function () {
  var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    autoplay:true,

    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  }
  )
  var mySwiper2 = new Swiper ('#s1', {
      direction: 'vertical',
      loop: true,
      autoplay:true,
    }
  )
  var mySwiper3 = new Swiper ('#s2', {
      direction: 'vertical',
      loop: true,
      autoplay:true,
    }
  )
  var mySwiper4 = new Swiper ('#s3', {
      direction: 'vertical',
      loop: true,
      autoplay:true,
    }
  )
  var mySwiper5 = new Swiper ('#s4', {
      direction: 'vertical',
      loop: true,
      autoplay:true,
    }
  )
  var mySwiper6 = new Swiper ('#s5', {
      direction: 'vertical',
      loop: true,
      autoplay:true,
    }
  )
  // 添加产品介绍抖动效果
  $(window).scroll(function () {
    let top = $('.product-intro').offset().top
    let scrollTop = $(window).scrollTop()
    let clentHeight = $(window).height()
    if (top <= scrollTop+clentHeight) {
      $('.product-intro .content-item').addClass('fadeInDown animated')
    } else  if (top > scrollTop+clentHeight) {
      $('.product-intro .content-item').removeClass('fadeInDown animated')
    }
    // console.log(top, scrollTop+clentHeight)
  })
  $('.nav-item').on('click', '>li', function(){
    location.href = $(this).attr('data-target')
  })
})