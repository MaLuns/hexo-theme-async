import utils from "./utils";
import SwupHeadPlugin from "./swup/head";
import SwupScriptsPlugin from "./swup/script";

/**
 * 初始化预览图片
 */
export function InitFancybox() {
	if (window.Fancybox) {
		window.Fancybox.bind("[data-fancybox]");
		window.Fancybox.bind('[data-fancybox="light"],[data-fancybox="article"]', {
			groupAll: true,
		});
		window.Fancybox.bind('[data-fancybox="dark"],[data-fancybox="article"]', {
			groupAll: true,
		});
		window.Fancybox.defaults.Hash = false;
	}
}

/**
 * 初始化轮播图
 */
export function InitSwiper() {
	if (window.Swiper) {
		/* slideshow */
		var swiper = new window.Swiper('.trm-slideshow', {
			slidesPerView: 1,
			effect: 'fade',
			parallax: true,
			autoplay: true,
			speed: 1400,
		});
	}
}

/**
 * 处理文章图片
 */
export function InitPictures() {
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
}

/**
 * 初始化 Swup
 * @returns 
 */
export function InitSwup() {
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
	return new window.Swup(options);
}

/**
 * 初始化主题切换
 * @param init 
 * @returns 
 */
export function InitThemeMode(init = false) {
	let swich_input = utils.q('#trm-swich');
	if (!swich_input) return;
	let scroll_container = utils.q("#trm-scroll-container");
	/* let switch_style = utils.q("#trm-switch-style"); */
	/* Animated mask layers */
	let mode_swich_animation = utils.q('.trm-mode-swich-animation');
	let mode_swich_animation_frame = utils.q('.trm-mode-swich-animation-frame')

	const setThemeColor = function () {
		let themeColor = getComputedStyle(document.documentElement).getPropertyValue('--theme-bg-color')
		let themeColorDom = utils.q('meta[name="theme-color"]')
		if (themeColor && themeColorDom) {
			themeColorDom.content = themeColor
		}
	}

	/* Sets the cache value */
	if (init) {
		let checked = (localStorage.getItem('theme-mode') || window.ASYNC_CONFIG.theme.default) == 'style-dark';
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
		new Promise<void>(resolve => {
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

}

/**
 * 初始化滚动插件 LocomotiveScroll
 * @returns 
 */
export function InitLocomotiveScroll() {
	const container = utils.q('#trm-scroll-container');
	const backtop = utils.q('#trm-back-top')
	const fixedContainer = utils.q('.trm-fixed-container')

	const scroll = new window.LocomotiveScroll({
		el: utils.q('#trm-scroll-container'),
		smooth: true,
		lerp: .1,
		reloadOnContextChange: true,
		class: 'trm-active-el'
	});

	const update = utils.debounce(() => scroll.update(), 150)

	// The height is not updated when handling the dynamic addition of DOM elements
	const ro = new ResizeObserver(() => {
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

	const back_fun = function () {
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
}

/**
 * 初始化 Toc、User 切换
 */
export function InitMenu() {
	utils.q('.trm-menu-btn').addEventListener('click', function () {
		utils.q('.trm-menu-btn,.trm-right-side').classList.toggle('trm-active');
	})
	utils.q('.trm-menu ul li a').addEventListener('click', function () {
		utils.q('.trm-menu-btn,.trm-right-side').classList.remove('trm-active');
	})
}

/**
 * 初始化 counter
 * @param duration 
 */
export function InitCounter(duration = 2000) {
	const numRun = (item: HTMLElement, step: number, count: number, num: number) => {
		count += step;
		if (count >= num) {
			item.innerText = num.toString()
		} else {
			item.innerText = parseInt(count.toString()).toString()
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
}

/**
 * 初始化目录
 */
export function InitToc() {
	let tabs = document.getElementById('trm-tabs-nav')
	if (tabs) {
		tabs.addEventListener('click', function (e) {
			var element = e.target as HTMLElement
			let to = element.dataset.to || element.parentElement.dataset.to;
			let isAcive = element.classList.contains('active') || element.parentElement.classList.contains('active');
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
			const sections = links.map((item: HTMLLinkElement) => utils.gId(decodeURI(item.getAttribute('href').replace('#', ''))))
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

			function findIndex(entries: IntersectionObserverEntry[]) {
				let index = 0
				let entry = entries[index]
				if (entry.intersectionRatio <= 0) {
					index = sections.indexOf(entry.target as HTMLElement)
					return index === 0 ? 0 : index - 1
				}
				for (; index < entries.length; index++) {
					// 存在相交区域,表示进入该 标题-段落
					if (entries[index].intersectionRatio > 0)
						entry = entries[index]
					else
						return sections.indexOf(entry.target as HTMLElement)
				}
				return sections.indexOf(entry.target as HTMLElement)
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
}

/**
 * 初始化版本复制
 */
export function InitCopyright() {
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
}

/**
 * 初始化代码片段-工具栏
 */
export function InitHighlightTool() {
	const { i18n, highlight } = window.ASYNC_CONFIG
	// highlight prismjs
	const isHighlightCopy = highlight.copy
	const isHighlightLang = highlight.lang
	const isShowTool = isHighlightCopy || isHighlightLang
	const isPrismjs = highlight.plugin === 'prismjs'
	const isMacTitle = highlight.title === 'mac'

	const selector = isPrismjs ? 'pre[class*="language-"]' : 'figure.highlight'
	const $figureHighlight = utils.qa(selector)

	if (!(isShowTool || $figureHighlight.length)) return;

	utils.qa(selector).forEach(element => {
		const div = document.createElement("div");
		div.className = `code-tools ${isShowTool && isMacTitle ? 'mac-style' : 'default-style'}`

		/* Show Lang */
		if (isHighlightLang) {
			let langName = ''
			if (isPrismjs) {
				langName = element.getAttribute('data-language') ? element.getAttribute('data-language') : 'Code'
			} else {
				langName = element.getAttribute('class').split(' ')[1]
				if (langName === 'plain' || langName === undefined) langName = 'Code'
			}

			const span = document.createElement('span')
			span.className = 'code-lang'
			span.innerText = langName

			div.append(span)
		}

		/* Copy Button */
		if (isHighlightCopy) {
			const span = document.createElement('span')
			span.className = 'copy-button'
			span.innerText = i18n.copy_button
			span.addEventListener('click', function (e) {
				try {
					// highlight
					let code = element.querySelector('.code')
					if (!code) code = element.querySelector('table')
					// prismjs
					if (!code) code = element.querySelector('code')
					if (!code) return;
					navigator.clipboard.writeText(code.innerText);
					utils.message(i18n.copy_success)
				} catch (error) {
					utils.message(i18n.copy_failure, 'warning')
				}
			})
			div.append(span)
		}

		element.append(div)
	});
}

/**
 * 初始化 Tabs
 */
export function InitTabs() {
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
}

/**
 * 初始化图库排版
 */
export function InitJustifiedGallery() {
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

		utils.loadScript(
			window.ASYNC_CONFIG.plugin.flickr_justified_gallery,
			window.fjGallery
		).then(() => {
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
}

/**
 * 阅读模式切换
 */
export function SwitchReadMode() {
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

/**
 * 初始化 window title
 */
export function InitChangeTitle() {
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
}

/**
 * 显示版权
 */
export function PrintCopyright() {
	const log = (str: string) => console.log(str,
		'color: white; background: #0078E7; padding:5px 0;margin: 0 0 2px 0;border-radius: 4px 0 0 4px;',
		'padding: 4px;border:1px solid #0078E7;border-radius: 0 4px 4px 0; background: linear-gradient(70deg, #e3f9eb, #d1dbff);',
	)
	log(`%c 🚀 Hexo-Theme-Async ${window.ASYNC_CONFIG.theme_version == '0.0.0' ? 'Github' : window.ASYNC_CONFIG.theme_version} %c https://github.com/MaLuns/hexo-theme-async `)
	log(`%c 📑 Hexo-Theme-Async Docs %c https://hexo-theme-async.imalun.com `)
}

/**
 * 加载动画
 */
export function Loading() {
	utils.q('html').classList.add('is-animating');
	utils.q(".trm-scroll-container").style.opacity = 0;
	setTimeout(function () {
		utils.q('html').classList.remove('is-animating');
		utils.q(".trm-scroll-container").style.opacity = 1;
	}, 600);
}

/**
 * 初始化
 */
export function ready() {
	window.switchReadMode = SwitchReadMode

	PrintCopyright();

	/* loading animate */
	Loading()

	/* window title */
	InitChangeTitle()

	/* Initialize album */
	InitJustifiedGallery()

	/* Initialize with pictures in articles */
	InitPictures()

	/* Initialize with code blocks in articles */
	InitHighlightTool()

	/* Initialize the tabs in the article */
	InitTabs()

	/* swup */
	window.ASYNC_CONFIG.swup && InitSwup();

	/* menu */
	InitMenu()

	/* theme mode switch */
	InitThemeMode(true)

	/* counters */
	InitCounter();

	/* locomotive scroll */
	InitLocomotiveScroll()

	/* swiper */
	InitSwiper()

	/* fancybox */
	InitFancybox()

	/* toc */
	InitToc()

	/* copyright */
	InitCopyright()

	if (window.ASYNC_CONFIG.swup) {
		document.addEventListener("swup:contentReplaced", function () {
			document.body.classList.remove('trm-read-mode')

			/* The blog runs long */
			window.show_date_time && window.show_date_time();

			/* Initialize album */
			InitJustifiedGallery()

			/* Initialize with pictures in articles */
			InitPictures()

			/* Initialize with code blocks in articles */
			InitHighlightTool()

			/* Initialize with tabs in articles */
			InitTabs()

			/* preloader */
			utils.q(".trm-scroll-container").style.opacity = 1;

			/* menu */
			InitMenu()

			/* theme mode switch */
			InitThemeMode(true)

			/* counters */
			InitCounter();

			/* locomotive scroll */
			InitLocomotiveScroll()

			/* swiper */
			InitSwiper()

			/* fancybox */
			InitFancybox()

			/* toc */
			InitToc()

		});
	}
}

