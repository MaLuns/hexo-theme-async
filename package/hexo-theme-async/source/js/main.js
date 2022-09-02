$(function () {

  "use strict";

  /***************************

  preloader

  ***************************/

  $(document).ready(function () {

    /***************************
    window title
    ***************************/
    if (window.FAVICON && window.FAVICON.visibilitychange) {
      window.originTitle = document.title;
      let titleTime;
      let icons = Array.from($('[rel="icon"]')).map(item => item.href)
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
          $('[rel="icon"]').attr('href', window.FAVICON.hidden);
          document.title = window.FAVICON.hideText;
          clearTimeout(titleTime);
        }
        else {
          Array.from($('[rel="icon"]')).map((item, index) => {
            item.href = icons[index]
          })
          document.title = window.FAVICON.showText + window.originTitle;
          titleTime = setTimeout(function () {
            document.title = window.originTitle;
          }, 2000);
        }
      });
    }

    /***************************
    处理文章中图片
    ***************************/
    $("article img").each(function () {
      var element = document.createElement("span");
      $(element).attr("data-fancybox", "gallery");
      $(element).attr("href", $(this).attr("src"));
      $(this).wrap(element);
    })

    $('html').addClass('is-animating');
    $(".trm-scroll-container").animate({
      opacity: 0,
    });
    setTimeout(function () {
      $('html').removeClass('is-animating');
      $(".trm-scroll-container").animate({
        opacity: 1,
      }, 600);
    }, 1000);
  });

  /***************************

  swup

  ***************************/
  const options = {
    containers: ['#trm-dynamic-content'],
    animateHistoryBrowsing: true,
    linkSelector: '.trm-menu a:not([data-no-swup]), .trm-anima-link:not([data-no-swup])',
    animationSelector: '[class="trm-swup-animation"]'
  };
  const swup = new Swup(options);
  /***************************

  menu

  ***************************/
  $('.trm-menu-btn').on('click', function () {
    $('.trm-menu-btn , .trm-right-side').toggleClass('trm-active');
  })
  $('.trm-menu ul li a').on('click', function () {
    $('.trm-menu-btn , .trm-right-side').removeClass('trm-active');
  })
  /***************************

  mode switch

  ***************************/
  let checked = (localStorage.getItem('theme-mode') || THEME.default) == 'style-dark';
  $('#trm-swich').attr('checked', checked)
  if (checked) {
    $('.trm-mode-swich-animation').addClass('trm-active');
    $('.trm-mode-swich-animation-frame').removeClass('trm-active');
  } else {
    $('.trm-mode-swich-animation').removeClass('trm-active');
    $('.trm-mode-swich-animation-frame').removeClass('trm-active');
  }
  $('.trm-mode-switcher').clone().appendTo('.trm-mode-switcher-place');
  $('#trm-swich').change(function () {
    if (this.checked) {
      $('.trm-hidden-switcher input').prop("checked", true);
      $('.trm-mode-swich-animation-frame').addClass('trm-active');
      $("#trm-scroll-container").animate({
        opacity: 0,
      }, 600, function () {
        setTimeout(function () {
          $('.trm-mode-swich-animation').addClass('trm-active');
          $("#trm-switch-style").attr("href", "/css/style-dark.css?" + window.HTMEM_VERSION);
        }, 200);
        setTimeout(function () {
          $('.trm-mode-swich-animation-frame').removeClass('trm-active');
          $("#trm-scroll-container").animate({
            opacity: 1,
          }, 600);
        }, 1000);
      });
    } else {
      $('.trm-hidden-switcher input').prop("checked", false);
      $('.trm-mode-swich-animation-frame').addClass('trm-active');
      $("#trm-scroll-container").animate({
        opacity: 0,
      }, 600, function () {
        setTimeout(function () {
          $('.trm-mode-swich-animation').removeClass('trm-active');
          $("#trm-switch-style").attr("href", "/css/style-light.css?" + window.HTMEM_VERSION);
        }, 200);
        setTimeout(function () {
          $('.trm-mode-swich-animation-frame').removeClass('trm-active');
          $("#trm-scroll-container").animate({
            opacity: 1,
          }, 600);
        }, 1000);
      });
    }
    localStorage.setItem('theme-mode', this.checked ? 'style-dark' : 'style-light')
  });
  /***************************

  counters

  ***************************/
  $('.trm-counter').each(function () {
    $(this).prop('Counter', 0).animate({
      Counter: $(this).text()
    }, {
      duration: 2000,
      easing: 'linear',
      step: function (now) {
        $(this).text(Math.ceil(now));
      }
    });
  });
  /***************************

  locomotive scroll

  ***************************/
  const scroll = new LocomotiveScroll({
    el: document.querySelector('#trm-scroll-container'),
    smooth: true,
    lerp: .1,
    reloadOnContextChange: true
  });

  const comComment = $('.comment-container')
  if (comComment.length) {
    const ro = new ResizeObserver(entries => {
      scroll.scrollTo(0, {
        callback () {
          scroll.update();
        }
      });
    });
    ro.observe(comComment[0]);
  }

  scroll.on('scroll', ({ scroll }) => {
    if (scroll.y > 500) {
      $('#post-toc').show(300)
    } else {
      $('#post-toc').hide(300)
    }
  });

  document.addEventListener('swup:contentReplaced', (event) => {
    scroll.destroy()
  });

  /***************************

  slideshow

  ***************************/
  var swiper = new Swiper('.trm-slideshow', {
    slidesPerView: 1,
    effect: 'fade',
    parallax: true,
    autoplay: true,
    speed: 1400,
  });
  /***************************

  testimonials slider

  ***************************/
  var swiper = new Swiper('.trm-testimonials-slider', {
    slidesPerView: 1,
    spaceBetween: 40,
    parallax: true,
    autoplay: false,
    speed: 1400,
    pagination: {
      el: '.trm-testimonials-slider-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.trm-testimonials-slider-next',
      prevEl: '.trm-testimonials-slider-prev',
    },

  });
  /***************************

  fancybox

  ***************************/
  $('[data-fancybox]').fancybox({
    animationEffect: "zoom-in-out",
    animationDuration: 600,
    transitionDuration: 1200,
    buttons: [
      "zoom",
      "slideShow",
      "thumbs",
      "close",
    ],
  });
  $('[data-fancybox="gallery"]').fancybox({
    animationEffect: "zoom-in-out",
    animationDuration: 600,
    transitionDuration: 1200,
    buttons: [
      "zoom",
      "slideShow",
      "thumbs",
      "close",
    ],
  });
  $('[data-fancybox="portfolio"]').fancybox({
    animationEffect: "zoom-in-out",
    animationDuration: 600,
    transitionDuration: 1200,
    buttons: [
      "zoom",
      "slideShow",
      "thumbs",
      "close",
    ],
  });
  $.fancybox.defaults.hash = false;

  /*----------------------------------------------------------
  ------------------------------------------------------------

  REINIT

  ------------------------------------------------------------
  ----------------------------------------------------------*/
  document.addEventListener("swup:contentReplaced", function () {
    /***************************

    底部倒计时

    ***************************/

    show_date_time && show_date_time();

    /***************************

    处理文章中图片

    ***************************/
    $("article img").each(function () {
      var element = document.createElement("span");
      $(element).attr("data-fancybox", "gallery");
      $(element).attr("href", $(this).attr("src"));
      $(this).wrap(element);
    })
    /***************************

    preloader

    ***************************/
    $(".trm-scroll-container").animate({
      opacity: 1,
    }, 600);
    /***************************

    menu

    ***************************/
    $('.trm-menu-btn').on('click', function () {
      $('.trm-menu-btn , .trm-right-side').toggleClass('trm-active');
    })
    $('.trm-menu ul li a').on('click', function () {
      $('.trm-menu-btn , .trm-right-side').removeClass('trm-active');
    })
    /***************************

    mode switch

    ***************************/
    $('.trm-mode-switcher').clone().appendTo('.trm-mode-switcher-place');
    $('#trm-swich').change(function () {
      if (this.checked) {
        $('.trm-hidden-switcher input').prop("checked", true);
        $('.trm-mode-swich-animation-frame').addClass('trm-active');
        $("#trm-scroll-container").animate({
          opacity: 0,
        }, 600, function () {
          setTimeout(function () {
            $('.trm-mode-swich-animation').addClass('trm-active');
            $("#trm-switch-style").attr("href", "/css/style-dark.css?" + window.HTMEM_VERSION);
          }, 200);
          setTimeout(function () {
            $('.trm-mode-swich-animation-frame').removeClass('trm-active');
            $("#trm-scroll-container").animate({
              opacity: 1,
            }, 600);
          }, 1000);
        });
      } else {
        $('.trm-hidden-switcher input').prop("checked", false);
        $('.trm-mode-swich-animation-frame').addClass('trm-active');
        $("#trm-scroll-container").animate({
          opacity: 0,
        }, 600, function () {
          setTimeout(function () {
            $('.trm-mode-swich-animation').removeClass('trm-active');
            $("#trm-switch-style").attr("href", "/css/style-light.css?" + window.HTMEM_VERSION);
          }, 200);
          setTimeout(function () {
            $('.trm-mode-swich-animation-frame').removeClass('trm-active');
            $("#trm-scroll-container").animate({
              opacity: 1,
            }, 600);
          }, 1000);
        });
      }
      localStorage.setItem('theme-mode', this.checked ? 'style-dark' : 'style-light')
    });
    /***************************

    counters

    ***************************/
    $('.trm-counter').each(function () {
      $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
      }, {
        duration: 2000,
        easing: 'linear',
        step: function (now) {
          $(this).text(Math.ceil(now));
        }
      });
    });
    /***************************

    locomotive scroll

    ***************************/
    const scroll = new LocomotiveScroll({
      el: document.querySelector('#trm-scroll-container'),
      smooth: true,
      lerp: .1,
      reloadOnContextChange: true
    });

    const comComment = $('.comment-container')
    if (comComment.length) {
      const ro = new ResizeObserver(entries => {
        scroll.scrollTo(0, {
          callback () {
            scroll.update();
          }
        });
      });
      ro.observe(comComment[0]);
    }

    scroll.on('scroll', ({ scroll }) => {
      if (scroll.y > 500) {
        $('#post-toc').show(300)
      } else {
        $('#post-toc').hide(300)
      }
    });

    document.addEventListener('swup:contentReplaced', (event) => {
      scroll.destroy()
    });
    /***************************

    slideshow

    ***************************/
    var swiper = new Swiper('.trm-slideshow', {
      slidesPerView: 1,
      effect: 'fade',
      parallax: true,
      autoplay: true,
      speed: 1400,
    });
    /***************************

    testimonials slider

    ***************************/
    var swiper = new Swiper('.trm-testimonials-slider', {
      slidesPerView: 1,
      spaceBetween: 40,
      parallax: true,
      autoplay: false,
      speed: 1400,
      pagination: {
        el: '.trm-testimonials-slider-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.trm-testimonials-slider-next',
        prevEl: '.trm-testimonials-slider-prev',
      },

    });
    /***************************

    fancybox

    ***************************/
    $('[data-fancybox]').fancybox({
      animationEffect: "zoom-in-out",
      animationDuration: 600,
      transitionDuration: 1200,
      buttons: [
        "zoom",
        "slideShow",
        "thumbs",
        "close",
      ],
    });
    $('[data-fancybox="gallery"]').fancybox({
      animationEffect: "zoom-in-out",
      animationDuration: 600,
      transitionDuration: 1200,
      buttons: [
        "zoom",
        "slideShow",
        "thumbs",
        "close",
      ],
    });
    $('[data-fancybox="portfolio"]').fancybox({
      animationEffect: "zoom-in-out",
      animationDuration: 600,
      transitionDuration: 1200,
      buttons: [
        "zoom",
        "slideShow",
        "thumbs",
        "close",
      ],
    });
    $.fancybox.defaults.hash = false;
  });

});