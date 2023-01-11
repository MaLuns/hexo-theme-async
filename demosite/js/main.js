~(function () {
  "use strict";

  const arrayify = (list) => Array.prototype.slice.call(list);

  class SwupScriptsPlugin {
    name = 'ScriptPlugin';
    isSwupPlugin = true;

    defaultOptions = {
      selectors: 'script[data-swup-reload-script]',
      insertBefore: '#async-script'
    };

    constructor(options = {}) {
      this.options = {
        ...this.defaultOptions,
        ...options
      };
    }

    mount() {
      this.swup.on('contentReplaced', this.getScriptAndInsert);
    }

    unmount() {
      this.swup.off('contentReplaced', this.getScriptAndInsert);
    }

    // 动态插件脚本
    getScriptAndInsert = () => {
      let nextHeadChildren = this.getNextScriptChildren();
      if (nextHeadChildren.length) {
        let scripts = Array.from(document.scripts)
        let scriptCDN = []
        let scriptBlock = []

        nextHeadChildren.forEach(item => {
          if (item.src)
            scripts.findIndex(s => {
              if (s.src === item.src) {
                if (!s.dataset.reset) {
                  return true
                }
                s.remove()
              }
            }) < 0 && scriptCDN.push(item);
          else
            scriptBlock.push(item.innerText)
        })

        const run = async (cdns, blocks) => {
          try {
            for (var i = 0; i < cdns.length; i++) {
              await this.loadScript(cdns[i]);
            }
            blocks.forEach(code => {
              this.runScriptBlock(code)
            })
          } catch (e) {
            console.log(e);
          }
        }
        
        run(scriptCDN, scriptBlock)
      }
    };


    loadScript(item) {
      return new Promise((resolve, reject) => {
        const element = document.createElement('script');
        for (const { name, value } of arrayify(item.attributes)) {
          element.setAttribute(name, value);
        }
        element.textContent = item.textContent;
        element.setAttribute('async', 'false');
        element.onload = resolve
        element.onerror = reject
        this.insertScript(element)
      })
    }

    runScriptBlock(code) {
      try {
        const func = new Function(code);
        func()
      } catch (error) {
        try {
          window.eval(code)
        } catch (error) {
        }
      }
    }

    insertScript(el) {
      const body = document.body;
      const asyncScript = document.querySelector(this.options.insertBefore)
      body.insertBefore(el, asyncScript)
    }

    getNextScriptChildren() {
      const pageContent = this.swup.cache
        .getCurrentPage()
        .originalContent.replace('<body', '<div id="swupBody"')
        .replace('</body>', '</div>');
      let element = document.createElement('div');
      element.innerHTML = pageContent;
      const children = element.querySelector('#swupBody').querySelectorAll(this.options.selectors);

      // cleanup
      element.innerHTML = '';
      element = null;

      return children;
    };

  }

  class SwupHeadPlugin {
    name = 'HeadPlugin';
    isSwupPlugin = true;

    defaultOptions = {
      persistTags: false,
      persistAssets: false,
      specialTags: false
    };

    constructor(options) {
      this.options = {
        ...this.defaultOptions,
        ...options
      };

      // options.persistAssets is a shortcut to:
      // options.persistTags with a default asset selector for scripts & styles
      if (this.options.persistAssets && !this.options.persistTags) {
        this.options.persistTags = 'link[rel=stylesheet], script[src], style';
      }
    }

    mount() {
      this.swup.on('contentReplaced', this.getHeadAndReplace);
      this.swup.on('contentReplaced', this.updateHtmlLangAttribute);
    }

    unmount() {
      this.swup.off('contentReplaced', this.getHeadAndReplace);
      this.swup.off('contentReplaced', this.updateHtmlLangAttribute);
    }

    getHeadAndReplace = () => {
      const headChildren = this.getHeadChildren();
      const nextHeadChildren = this.getNextHeadChildren();

      this.replaceTags(headChildren, nextHeadChildren);
    };

    getHeadChildren = () => {
      return document.head.children;
    };

    getNextHeadChildren = () => {
      const pageContent = this.swup.cache
        .getCurrentPage()
        .originalContent.replace('<head', '<div id="swupHead"')
        .replace('</head>', '</div>');
      let element = document.createElement('div');
      element.innerHTML = pageContent;
      const children = element.querySelector('#swupHead').children;

      // cleanup
      element.innerHTML = '';
      element = null;

      return children;
    };

    replaceTags = (oldTags, newTags) => {
      const head = document.head;
      const themeActive = Boolean(document.querySelector('[data-swup-theme]'));
      const addTags = this.getTagsToAdd(oldTags, newTags, themeActive);
      const removeTags = this.getTagsToRemove(oldTags, newTags, themeActive);

      removeTags.reverse().forEach((item) => {
        head.removeChild(item.tag);
      });

      addTags.forEach((item) => {
        // Insert tag *after* previous version of itself to preserve JS variable scope and CSS cascaade
        head.insertBefore(item.tag, head.children[item.index + 1] || null);
      });

      this.swup.log(`Removed ${removeTags.length} / added ${addTags.length} tags in head`);
    };

    compareTags = (oldTag, newTag) => {
      const oldTagContent = oldTag.outerHTML;
      const newTagContent = newTag.outerHTML;
      return oldTagContent === newTagContent;
    };

    getTagsToRemove = (oldTags, newTags) => {
      const removeTags = [];

      for (let i = 0; i < oldTags.length; i++) {
        let foundAt = null;

        for (let j = 0; j < newTags.length; j++) {
          if (this.compareTags(oldTags[i], newTags[j])) {
            foundAt = j;
            break;
          }
        }

        if (foundAt == null && oldTags[i].getAttribute('data-async-theme') === null && !this.isMatchesTag(oldTags[i], this.options.persistTags)) {
          removeTags.push({ tag: oldTags[i] });
        }
      }

      return removeTags;
    };

    getTagsToAdd = (oldTags, newTags, themeActive) => {
      const addTags = [];

      for (let i = 0; i < newTags.length; i++) {
        let foundAt = null;

        for (let j = 0; j < oldTags.length; j++) {
          if (this.compareTags(oldTags[j], newTags[i])) {
            foundAt = j;
            break;
          }
        }

        if (foundAt == null && !this.isMatchesTag(newTags[i], this.options.specialTags)) {
          addTags.push({ index: themeActive ? i + 1 : i, tag: newTags[i] });
        }
      }

      return addTags;
    };

    isMatchesTag = (item, matchesTag = this.options.persistTags) => {
      if (typeof matchesTag === 'function') {
        return matchesTag(item);
      }
      if (typeof matchesTag === 'string') {
        return item.matches(matchesTag);
      }
      return Boolean(matchesTag);
    };

    updateHtmlLangAttribute = () => {
      const html = document.documentElement;

      const newPage = new DOMParser().parseFromString(
        this.swup.cache.getCurrentPage().originalContent,
        'text/html'
      );
      const newLang = newPage.documentElement.lang;

      if (html.lang !== newLang) {
        this.swup.log(`Updated lang attribute: ${html.lang} > ${newLang}`);
        html.lang = newLang;
      }
    };
  }

  const utils = {
    q: (...arg) => document.querySelector(...arg),
    qa: (...arg) => document.querySelectorAll(...arg),
    gId: (...arg) => document.getElementById(...arg),
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
    wrap(el, wrapper, options = {}) {
      if (typeof wrapper === 'string') {
        wrapper = document.createElement(wrapper)
        for (const [key, value] of Object.entries(options)) {
          wrapper.setAttribute(key, value)
        }
      }

      el.parentNode.insertBefore(wrapper, el);
      /* el.parentNode.removeChild(el); */
      wrapper.appendChild(el);
    },
    urlFor(path) {
      if (/^(#|\/\/|http(s)?:)/.test(path)) return path;
      return (window.ASYNC_CONFIG.root + path).replace(/\/{2,}/g, '/')
    },
    siblings: (ele, selector) => {
      return [...ele.parentNode.children].filter((child) => {
        if (selector) {
          return child !== ele && child.matches(selector)
        }
        return child !== ele
      })
    },
    _message: [],
    message(title, type = 'success') {
      let message = document.createElement('div')
      message.className = `trm-message ${type}`
      message.style.top = `${30 + utils._message.length * 60}px`
      message.innerText = title
      document.body.append(message)
      utils._message.push(message)
      setTimeout(() => {
        utils._message = utils._message.filter(item => item !== message)
        document.body.removeChild(message)
        utils._message.forEach((item, index) => {
          item.style.top = `${30 + index * 60}px`
        })
      }, 2000)
    },
    loadScript(url) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url
        script.setAttribute('async', 'false');
        script.onerror = reject
        script.onload = script.onreadystatechange = function () {
          const loadState = this.readyState
          if (loadState && loadState !== 'loaded' && loadState !== 'complete') return
          script.onload = script.onreadystatechange = null
          resolve()
        }
        document.head.appendChild(script)
      })
    },
    isLoaded(key, url) {
      return new Promise((resolve, reject) => {
        if (window[key]) {
          resolve();
          return;
        }
        utils.loadScript(url).then(() => {
          resolve()
        })
      })
    },
  }

  const initFn = {
    InitFancybox() {
      if (window.Fancybox) {
        Fancybox.bind("[data-fancybox]");
        Fancybox.bind('[data-fancybox="light"],[data-fancybox="article"]', {
          groupAll: true,
        });
        Fancybox.bind('[data-fancybox="dark"],[data-fancybox="article"]', {
          groupAll: true,
        });
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
        // 仅查找文章内图片
        utils.qa("#article-container img:not(.no-fancybox)").forEach((img) => {
          if (!img.parentNode.dataset.fancybox) {
            let fancybox = "article"
            if (img.classList.contains('trm-light-icon')) {
              fancybox = "light"
            } else if (img.classList.contains('trm-dark-icon')) {
              fancybox = "dark"
            }

            utils.wrap(img, 'div', {
              'data-src': img.dataset.src || img.src,
              'data-fancybox': fancybox
            })
          }
        })
      }
    },
    InitSwup() {
      let plugins = [];

      plugins.push(new SwupHeadPlugin({
        specialTags: '#trm-switch-style' // 忽略样式标签 避免重复添加
      }))

      plugins.push(new SwupScriptsPlugin())

      const options = {
        containers: ['#trm-dynamic-content'],
        animateHistoryBrowsing: true,
        linkSelector: '.trm-menu a:not([data-no-swup]), .trm-anima-link:not([data-no-swup])',
        animationSelector: '[class="trm-swup-animation"]',
        plugins
      };
      return new Swup(options);
    },
    InitThemeMode(init = false) {
      let swich_input = utils.q('#trm-swich');
      if (!swich_input) return;
      let scroll_container = utils.q("#trm-scroll-container");
      /* let switch_style = utils.q("#trm-switch-style"); */
      /* Animated mask layers */
      let mode_swich_animation = utils.q('.trm-mode-swich-animation');
      let mode_swich_animation_frame = utils.q('.trm-mode-swich-animation-frame')

      const setThemeColor = function () {
        let themeColor = getComputedStyle(document.documentElement).getPropertyValue('--theme-color')
        let themeColorDom = utils.q('meta[name="theme-color"]')
        if (themeColor && themeColorDom) {
          themeColorDom.content = themeColor
        }
      }

      /* Sets the cache value */
      if (init) {
        let checked = (localStorage.getItem('theme-mode') || ASYNC_CONFIG.theme.default) == 'style-dark';
        swich_input.checked = checked;
        if (checked) {
          mode_swich_animation.classList.add('trm-active');
          mode_swich_animation_frame.classList.remove('trm-active');
        } else {
          mode_swich_animation.classList.remove('trm-active');
          mode_swich_animation_frame.classList.remove('trm-active');
        }

        setThemeColor()
      }

      swich_input.addEventListener('change', function () {
        new Promise(resolve => {
          mode_swich_animation_frame.classList.add('trm-active');
          scroll_container.style.opacity = 0;
          setTimeout(() => resolve(), 600);
        }).then(() => {
          setTimeout(() => {
            let type = this.checked ? 'add' : 'remove'
            mode_swich_animation.classList[type]('trm-active');
            document.documentElement.classList[type]('dark')
          }, 200);

          setTimeout(function () {
            mode_swich_animation_frame.classList.remove('trm-active');
            scroll_container.style.opacity = 1;
            setThemeColor()
          }, 600);
        })

        localStorage.setItem('theme-mode', this.checked ? 'style-dark' : 'style-light')
      });

    },
    InitLocomotiveScroll() {
      const container = utils.q('#trm-scroll-container');
      const backtop = utils.q('#trm-back-top')
      const fixedContainer = utils.q('.trm-fixed-container')

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
          fixedContainer.classList.add('offset')
        } else {
          backtop.classList.remove('active-el')
          fixedContainer.classList.remove('offset')
        }
      });

      const back_fun = function (params) {
        scroll.scrollTo(0);
      }
      backtop.addEventListener('click', back_fun)

      const desktop = window.matchMedia('screen and (min-width: 768px)');
      const mobile = window.matchMedia('screen and (max-width: 767px)');

      const reload = function (e) {
        if (e.matches) {
          location.reload();
        }
      }

      desktop.addListener(reload);
      mobile.addListener(reload);

      document.addEventListener('swup:contentReplaced', (event) => {
        backtop.removeEventListener('click', back_fun)
        window.removeEventListener('resize', update)
        ro.unobserve(container)
        desktop.removeListener(reload);
        mobile.removeListener(reload);
        scroll.destroy()
      });
      return scroll
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
    InitToc() {
      let tabs = document.getElementById('trm-tabs-nav')
      if (tabs) {
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

        const listenSidebarTOC = () => {
          const toc = utils.q('.post-toc')
          const links = Array.from(toc.querySelectorAll('a.toc-link'))
          if (!links.length) return;
          const sections = links.map(item => utils.gId(decodeURI(item.getAttribute('href').replace('#', ''))))
          const appFrame = document.querySelector('.trm-app-frame')
          if (!appFrame) return;
          const topBar = document.querySelector('.trm-top-bar')
          let { bottom } = topBar.getBoundingClientRect()

          function activateNavByIndex(target) {
            target = target.parentNode
            if (target.classList.contains('active-current'))
              return

            utils.qa('.post-toc .active').forEach((element) => {
              element.classList.remove('active', 'active-current')
            })
            target.classList.add('active', 'active-current')
            let parent = target.parentNode
            while (!parent.matches('.post-toc')) {
              if (parent.matches('li')) parent.classList.add('active');
              parent = parent.parentNode
            }
          }

          function findIndex(entries) {
            let index = 0
            let entry = entries[index]
            if (entry.intersectionRatio <= 0) {
              index = sections.indexOf(entry.target)
              return index === 0 ? 0 : index - 1
            }
            for (; index < entries.length; index++) {
              // 存在相交区域,表示进入该 标题-段落
              if (entries[index].intersectionRatio > 0)
                entry = entries[index]
              else
                return sections.indexOf(entry.target)
            }
            return sections.indexOf(entry.target)
          }

          function createIntersectionObserver(marginTop) {
            // 扩大上面区域 避免图片懒加载等导致高度超出
            marginTop = Math.floor(marginTop + 10000)
            const intersectionObserver = new IntersectionObserver(
              (entries, observe) => {
                const scrollHeight = document.documentElement.scrollHeight + 100
                if (scrollHeight > marginTop) { // 内容高度超出后监听区域后，重新添加监听
                  observe.disconnect()
                  createIntersectionObserver(scrollHeight)
                  return
                }
                const index = findIndex(entries)
                activateNavByIndex(links[index])
              },
              {
                root: appFrame,
                rootMargin: `${marginTop}px 0px -${appFrame.clientHeight - bottom - 20}px 0px`,
                threshold: [0, 1],
              },
            )
            sections.forEach((element) => {
              element && intersectionObserver.observe(element)
            })
          }

          createIntersectionObserver(document.documentElement.scrollHeight)
        }

        listenSidebarTOC()
      }
    },
    InitCopyright() {
      if (window.ASYNC_CONFIG.creative_commons.clipboard) {
        let { author, i18n, creative_commons } = window.ASYNC_CONFIG
        document.addEventListener('copy', function (event) {
          const clipboardData = event.clipboardData || window.clipboardData;
          if (!clipboardData) { return; }
          const text = window.getSelection().toString();
          if (text) {
            event.preventDefault();
            const authorEl = document.getElementById('post-author')
            if (authorEl) {
              author = authorEl.innerText.replace('\n', '')
            }

            let originalLink = location.href
            const originalLinkEl = document.getElementById('original-link')
            if (originalLinkEl) {
              originalLink = originalLinkEl.innerText.replace('\n', '')
            }
            let copyrightText = `\n\n${i18n.author}${author}\n${i18n.copyright_link}${originalLink}\n${i18n.copyright_license_title}${i18n.copyright_license_content.replace('undefined', 'CC' + creative_commons.license.toUpperCase() + ' ' + (creative_commons.license == 'zero' ? '1.0' : '4.0'))}`
            clipboardData.setData('text/plain', text + copyrightText);
          }
        });
      }
    },
    InitCodeBtn() {
      const { i18n } = window.ASYNC_CONFIG
      utils.qa('.highlight').forEach(element => {
        const div = document.createElement("div");
        div.className = 'code-btn'
        const span = document.createElement('span')
        span.innerText = i18n.copy_button
        span.addEventListener('click', function (e) {
          try {
            let code = element.querySelector('.code')
            if (!code) code = element.querySelector('table')
            navigator.clipboard.writeText(code.innerText);
            utils.message(i18n.copy_success)
          } catch (error) {
            utils.message(i18n.copy_failure, 'warning')
          }
        })
        div.append(span)
        element.append(div)
      });
    },
    InitTabs() {
      utils.qa('.trm-tabs .trm-tab > button').forEach(function (item) {
        item.addEventListener('click', function (e) {
          const $this = this
          const $tabItem = $this.parentNode

          if (!$tabItem.classList.contains('active')) {
            const $tabContent = $tabItem.parentNode.nextElementSibling
            const $siblings = utils.siblings($tabItem, '.active')[0]
            $siblings && $siblings.classList.remove('active')
            $tabItem.classList.add('active')
            const tabId = $this.getAttribute('data-href').replace('#', '')
            const childList = [...$tabContent.children]
            childList.forEach(item => {
              if (item.id === tabId) item.classList.add('active')
              else item.classList.remove('active')
            })
          }
        })
      })
    },
    InitJustifiedGallery() {
      const gallerys = utils.qa('.fj-gallery')
      if (gallerys.length) {
        gallerys.forEach(item => {
          const imgList = item.querySelectorAll('img')
          imgList.forEach(i => {
            i.loading = "auto"
            utils.wrap(i, 'div', {
              class: 'fj-gallery-item',
              'data-src': i.dataset.src || i.src,
              'data-fancybox': 'gallery',
            })
          })
        })

        utils
          .isLoaded('fjGallery', window.ASYNC_CONFIG.plugin.flickr_justified_gallery.js)
          .then(() => {
            gallerys.forEach((selector) => {
              window.fjGallery(selector, {
                itemSelector: '.fj-gallery-item',
                rowHeight: 220,
                gutter: 4,
                onJustify: function () {
                  this.$container.style.opacity = '1'
                }
              })
            })
          })
      }
    },
    switchReadMode() {
      const $body = document.body
      $body.classList.add('trm-read-mode')
      const newEle = document.createElement('button')
      newEle.type = 'button'
      newEle.title = window.ASYNC_CONFIG.i18n.exit_read_mode
      newEle.className = `${window.ASYNC_CONFIG.icons.close} trm-exit-readmode trm-glow`
      $body.appendChild(newEle)

      function clickFn() {
        $body.classList.remove('trm-read-mode')
        newEle.remove()
        newEle.removeEventListener('click', clickFn)
      }

      newEle.addEventListener('click', clickFn)
    }
  }

  //#region init
  /* preloader */
  function ready() {
    window.switchReadMode = initFn.switchReadMode

    /* window title */
    if (window.ASYNC_CONFIG && window.ASYNC_CONFIG.favicon.visibilitychange) {
      window.originTitle = document.title;
      let titleTime;
      let iconEls = Array.from(utils.qa('[rel="icon"]'));
      let icons = iconEls.map(item => item.href)
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
          iconEls.forEach(item => {
            item.href = utils.urlFor(window.ASYNC_CONFIG.favicon.hidden)
          })
          document.title = window.ASYNC_CONFIG.favicon.hideText;
          clearTimeout(titleTime);
        }
        else {
          iconEls.forEach((item, index) => {
            item.href = icons[index]
          })
          document.title = window.ASYNC_CONFIG.favicon.showText + window.originTitle;
          titleTime = setTimeout(function () {
            document.title = window.originTitle;
          }, 2000);
        }
      });
    }

    /* Initialize album */
    initFn.InitJustifiedGallery()

    /* Initialize with pictures in articles */
    initFn.InitPictures()

    /* Initialize with code blocks in articles */
    initFn.InitCodeBtn()

    /* Initialize the tabs in the article */
    initFn.InitTabs()

    /* loading animate */
    utils.q('html').classList.add('is-animating');
    utils.q(".trm-scroll-container").style.opacity = 0;
    setTimeout(function () {
      utils.q('html').classList.remove('is-animating');
      utils.q(".trm-scroll-container").style.opacity = 1;
    }, 600);
  }

  document.readyState === 'loading' ?
    document.addEventListener('DOMContentLoaded', ready) : ready();

  /* swup */
  window.ASYNC_CONFIG.swup && initFn.InitSwup();

  /* menu */
  initFn.InitMenu()

  /* theme mode switch */
  initFn.InitThemeMode(true)

  /* counters */
  initFn.InitCounter();

  /* locomotive scroll */
  initFn.InitLocomotiveScroll()

  /* swiper */
  initFn.InitSwiper()

  /* fancybox */
  initFn.InitFancybox()

  /* toc */
  initFn.InitToc()

  /* copyright */
  initFn.InitCopyright()
  //#endregion

  //#region  Re/init
  document.addEventListener("swup:contentReplaced", function () {
    document.body.classList.remove('trm-read-mode')

    /* The blog runs long */
    window.show_date_time && window.show_date_time();

    /* Initialize album */
    initFn.InitJustifiedGallery()

    /* Initialize with pictures in articles */
    initFn.InitPictures()

    /* Initialize with code blocks in articles */
    initFn.InitCodeBtn()

    /* Initialize with tabs in articles */
    initFn.InitTabs()

    /* preloader */
    utils.q(".trm-scroll-container").style.opacity = 1;

    /* menu */
    initFn.InitMenu()

    /* theme mode switch */
    initFn.InitThemeMode(true)

    /* counters */
    initFn.InitCounter();

    /* locomotive scroll */
    initFn.InitLocomotiveScroll()

    /* swiper */
    initFn.InitSwiper()

    /* fancybox */
    initFn.InitFancybox()

    /* toc */
    initFn.InitToc()

  });
  //#endregion

}());