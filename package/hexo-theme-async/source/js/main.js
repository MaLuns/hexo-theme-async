~(function () {
  "use strict";

  const utils = {
    q: (...arg) => document.querySelector(...arg),
    qa: (...arg) => document.querySelectorAll(...arg),
    debounce(func, wait, immediate) {
      let timeout;
      return function () {
        let context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          timeout = null;
          if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
      };
    },
    wrap(el, wrapper) {
      el.parentNode.insertBefore(wrapper, el);
      el.parentNode.removeChild(el);
      wrapper.appendChild(el);
    },
    InitFancybox() {
      if (window.Fancybox) {
        Fancybox.bind("[data-fancybox]");
        Fancybox.bind('[data-fancybox="gallery"]');
        Fancybox.bind('[data-fancybox="portfolio"]');
        Fancybox.defaults.Hash = false;
      }
    },
    InitSwiper() {
      if (window.Swiper) {
        /* slideshow */
        var swiper = new Swiper('.trm-slideshow', {
          slidesPerView: 1,
          effect: 'fade',
          parallax: true,
          autoplay: true,
          speed: 1400,
        });

        /* testimonials slider */
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
      }
    },
    InitPictures() {
      if (window.Fancybox) {
        utils.qa("article img").forEach((img) => {
          let span = document.createElement("span");
          span.dataset.fancybox = "gallery"
          span.dataset.src = img.src;
          utils.wrap(img, span)
        })
      }
    },
    InitSwup() {
      const options = {
        containers: ['#trm-dynamic-content'],
        animateHistoryBrowsing: true,
        linkSelector: '.trm-menu a:not([data-no-swup]), .trm-anima-link:not([data-no-swup])',
        animationSelector: '[class="trm-swup-animation"]'
      };
      return new Swup(options);
    },
    InitThemeMode(init = false) {
      let swich_input = utils.q('#trm-swich');
      if (!swich_input) return;
      let scroll_container = utils.q("#trm-scroll-container");
      let switch_style = utils.q("#trm-switch-style");
      /* Animated mask layers */
      let mode_swich_animation = utils.q('.trm-mode-swich-animation');
      let mode_swich_animation_frame = utils.q('.trm-mode-swich-animation-frame')

      /* Sets the cache value */
      if (init) {
        let checked = (localStorage.getItem('theme-mode') || THEME.default) == 'style-dark';
        swich_input.checked = checked;
        if (checked) {
          mode_swich_animation.classList.add('trm-active');
          mode_swich_animation_frame.classList.remove('trm-active');
        } else {
          mode_swich_animation.classList.remove('trm-active');
          mode_swich_animation_frame.classList.remove('trm-active');
        }
      }

      swich_input.addEventListener('change', function () {
        new Promise(resolve => {
          mode_swich_animation_frame.classList.add('trm-active');
          scroll_container.style.opacity = 0;
          setTimeout(() => resolve(), 600);
        }).then(() => {
          if (this.checked) {
            setTimeout(function () {
              mode_swich_animation.classList.add('trm-active');
              switch_style.href = switch_style.href.replace('style-light', 'style-dark');
            }, 200);
          } else {
            setTimeout(function () {
              mode_swich_animation.classList.remove('trm-active');
              switch_style.href = switch_style.href.replace('style-dark', 'style-light');
            }, 200);
          }

          setTimeout(function () {
            mode_swich_animation_frame.classList.remove('trm-active');
            scroll_container.style.opacity = 1;
          }, 1000);
        })

        localStorage.setItem('theme-mode', this.checked ? 'style-dark' : 'style-light')
      });

    },
    InitLocomotiveScroll() {
      const container = utils.q('#trm-scroll-container');
      const backtop = utils.q('#trm-back-top')

      const scroll = new LocomotiveScroll({
        el: utils.q('#trm-scroll-container'),
        smooth: true,
        lerp: .1,
        reloadOnContextChange: true,
        class: 'trm-active-el'
      });

      const update = utils.debounce(() => scroll.update(), 150)

      // The height is not updated when handling the dynamic addition of DOM elements
      const ro = new ResizeObserver(entries => {
        scroll.update();
      });
      ro.observe(container);

      window.addEventListener('resize', update)

      scroll.on('scroll', ({ scroll }) => {
        if (scroll.y > 500) {
          backtop.classList.add('active-el')
        } else {
          backtop.classList.remove('active-el')
        }
      });

      const back_fun = function (params) {
        scroll.scrollTo(0);
      }

      backtop.addEventListener('click', back_fun)

      document.addEventListener('swup:contentReplaced', (event) => {
        backtop.removeEventListener('click', back_fun)
        window.removeEventListener('resize', update)
        ro.unobserve(container)
        scroll.destroy()
      });
    },
    InitMenu() {
      utils.q('.trm-menu-btn').addEventListener('click', function () {
        utils.q('.trm-menu-btn,.trm-right-side').classList.toggle('trm-active');
      })
      utils.q('.trm-menu ul li a').addEventListener('click', function () {
        utils.q('.trm-menu-btn,.trm-right-side').classList.remove('trm-active');
      })
    },
    InitCounter(duration = 2000) {
      const numRun = (item, step, count, num) => {
        count += step;
        if (count >= num) {
          item.innerText = num
        } else {
          item.innerText = parseInt(count)
          requestAnimationFrame(() => numRun(item, step, count, num))
        }
      }

      utils.qa('.trm-counter').forEach(item => {
        let num = Number(item.innerText)
        if (!isNaN(num)) {
          let setp = num / (duration / 16)
          numRun(item, setp, 0, num)
        }
      })
    },
    InitKatex(options = {}) {
      if (typeof window.renderMathInElement !== 'undefined') {
        window.renderMathInElement(document.body, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true },
          ],
          ...options,
        })
      }
    },
    InitToc() {
      let tabs = document.getElementById('trm-tabs-nav')
      if (tabs)
        tabs.addEventListener('click', function (e) {
          let to = e.target.dataset.to || e.target.parentElement.dataset.to;
          let isAcive = e.target.classList.contains('active') || e.target.parentElement.classList.contains('active');
          if (to && !isAcive) {
            document.querySelectorAll('.trm-tabs-nav-item').forEach(item => {
              item.classList.toggle('active');
            })
            document.querySelectorAll('.trm-tabs-item').forEach(item => {
              item.classList.toggle('active');
            })
          }
        })
    }
  }

  //#region init
  /* preloader */
  function ready() {
    /* window title */
    if (window.FAVICON && window.FAVICON.visibilitychange) {
      window.originTitle = document.title;
      let titleTime;
      let iconEls = Array.from(utils.qa('[rel="icon"]'));
      let icons = iconEls.map(item => item.href)
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
          iconEls.forEach(item => {
            item.href = window.FAVICON.hidden
          })
          document.title = window.FAVICON.hideText;
          clearTimeout(titleTime);
        }
        else {
          iconEls.forEach((item, index) => {
            item.href = icons[index]
          })
          document.title = window.FAVICON.showText + window.originTitle;
          titleTime = setTimeout(function () {
            document.title = window.originTitle;
          }, 2000);
        }
      });
    }

    /* Work with pictures in articles */
    utils.InitPictures()

    /* loading animate */
    utils.q('html').classList.add('is-animating');
    utils.q(".trm-scroll-container").style.opacity = 0;
    setTimeout(function () {
      utils.q('html').classList.remove('is-animating');
      utils.q(".trm-scroll-container").style.opacity = 1;
    }, 1000);
  }

  document.readyState === 'loading' ?
    document.addEventListener('DOMContentLoaded', ready) : ready();

  /* swup */
  utils.InitSwup()

  /* menu */
  utils.InitMenu()

  /* theme mode switch */
  utils.InitThemeMode(true)

  /* counters */
  utils.InitCounter();

  /* locomotive scroll */
  utils.InitLocomotiveScroll()

  /* swiper */
  utils.InitSwiper()

  /* fancybox */
  utils.InitFancybox()

  /* Katex */
  utils.InitKatex(window.KATEX_OPTIONS)

  /* toc */
  utils.InitToc()
  //#endregion

  //#region  Re/init
  document.addEventListener("swup:contentReplaced", function () {
    /* The blog runs long */
    show_date_time && show_date_time();

    /* Work with pictures in articles */
    utils.InitPictures()

    /* preloader */
    utils.q(".trm-scroll-container").style.opacity = 1;

    /* menu */
    utils.InitMenu()

    /* theme mode switch */
    utils.InitThemeMode()

    /* counters */
    utils.InitCounter();

    /* locomotive scroll */
    utils.InitLocomotiveScroll()

    /* swiper */
    utils.InitSwiper()

    /* fancybox */
    utils.InitFancybox()

    /* Katex */
    utils.InitKatex(window.KATEX_OPTIONS)

    /* toc */
    utils.InitToc()
  });
  //#endregion

}());