import { utils } from './utils';
import globalFun from './global';
import SwupHeadPlugin from './swup/head';
import SwupScriptsPlugin from './swup/script';

/**
 * 初始化预览图片
 */
export function InitFancybox() {
	if (window.Fancybox) {
		window.Fancybox.bind('[data-fancybox]');
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
		new window.Swiper('.trm-slideshow', {
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
		utils.qa('#article-container img:not(.no-fancybox)').forEach(img => {
			if (!img.parentNode.dataset.fancybox) {
				let fancybox = 'article';
				if (img.classList.contains('trm-light-icon')) {
					fancybox = 'light';
				} else if (img.classList.contains('trm-dark-icon')) {
					fancybox = 'dark';
				}

				utils.wrap(img, 'div', {
					'data-src': img.dataset.src || img.src,
					'data-fancybox': fancybox,
				});
			}
		});
	}
}

/**
 * 初始化 Swup
 * @returns
 */
export function InitSwup() {
	const plugins = [];

	plugins.push(
		new SwupHeadPlugin({
			specialTags: '#trm-switch-style', // 忽略样式标签 避免重复添加
		}),
	);

	plugins.push(new SwupScriptsPlugin());

	const options = {
		containers: ['#trm-dynamic-content'],
		animateHistoryBrowsing: true,
		linkSelector: '.trm-menu a:not([data-no-swup]), .trm-anima-link:not([data-no-swup])',
		animationSelector: '[class="trm-swup-animation"]',
		plugins,
	};
	return new window.Swup(options);
}

/**
 * 初始化主题切换
 * @param init
 * @returns
 */
export function InitThemeMode(init = false) {
	const swich_input = utils.q<HTMLInputElement>('#trm-swich');

	/* Animated mask layers */
	const mode_swich_animation = utils.q('.trm-mode-swich-animation');
	const mode_swich_animation_frame = utils.q('.trm-mode-swich-animation-frame');

	/* Sets the cache value */
	if (init) {
		const checked = (localStorage.getItem('theme-mode') || window.ASYNC_CONFIG.theme.default) == 'style-dark';
		const type = checked ? 'add' : 'remove';

		mode_swich_animation.classList[type]('trm-active');
		mode_swich_animation_frame.classList.remove('trm-active');

		globalFun.setThemeColor();
		if (swich_input) swich_input.checked = checked;
	}

	swich_input &&
		swich_input.addEventListener('change', function () {
			globalFun.switchThemeMode(this.checked ? 'style-dark' : 'style-light');
		});
}

/**
 * 初始化滚动监听
 * @returns
 */
export function InitScroll() {
	// const scrollBarWidth = utils.scrollBarWidth()
	const banner = utils.q<HTMLElement>('.trm-banner-cover');
	const sidebar = utils.q<HTMLDivElement>('.trm-sidebar');
	const backtop = utils.q<HTMLDivElement>('#trm-back-top');
	const scrollTriger = utils.q<HTMLSpanElement>('#scroll-triger');
	const fixedContainer = utils.q('.trm-fixed-container');

	const intersectionObserver = new IntersectionObserver(
		entries => {
			entries.forEach(({ isIntersecting, target }) => {
				if (isIntersecting) {
					target.classList.add('trm-active-el');
					intersectionObserver.unobserve(target);
				}
			});
		},
		{ threshold: [0, 1], rootMargin: '0px 0px -40px 0px' },
	);

	// 返回顶部
	const backFun = (e?: unknown) => window.scrollTo({ top: 0, behavior: e ? 'smooth' : 'auto' });

	// 滚动事件回调
	const scrollFun = function () {
		const scrollTop = utils.scrollTop();
		const { scrollHeight, clientHeight } = document.documentElement;

		const fun = scrollTop > 500 ? 'add' : 'remove';
		fixedContainer?.classList[fun]('offset');

		const ratio = parseInt(((scrollTop / (scrollHeight - clientHeight)) * 100).toString());
		backtop && (backtop.style.backgroundSize = `100% ${ratio}%`);

		const sidebarFun = scrollTop >= 70 ? 'add' : 'remove';
		if (sidebar) {
			sidebar.classList[sidebarFun]('fixed');
			setSidebarWidth();
		}

		banner && (banner.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${Math.min(scrollTop / 3, 100)}, 0, 1)`);

		globalFun.switchToc(false);
	};

	// 设置侧栏位置
	const setSidebarWidth = function () {
		if (sidebar) {
			if (window.innerWidth > 992 && sidebar.classList.contains('fixed')) {
				sidebar.style.left = sidebar.parentElement.offsetLeft + 20 + 'px';
				sidebar.style.width = `${sidebar.parentElement.clientWidth - 40}px`;
			} else {
				sidebar.style.left = 'unset';
				sidebar.style.width = 'auto';
			}
		}
	};

	const scrollToTriger = function () {
		const container = utils.q<HTMLDivElement>('.trm-banner');
		container && window.scrollTo({ top: container.clientHeight - 20, behavior: 'smooth' });
	};

	const observer = new MutationObserver(() => setSidebarWidth());

	const init = () => {
		utils.qa('.trm-scroll-animation').forEach(element => element && intersectionObserver.observe(element));
		scrollFun();
		setSidebarWidth();
		observer.observe(document.body, { attributeFilter: ['style', 'class'] });
	};

	init();
	backtop?.addEventListener('click', backFun);
	scrollTriger?.addEventListener('click', scrollToTriger);
	window.addEventListener('scroll', scrollFun);
	window.addEventListener('resize', setSidebarWidth);

	document.addEventListener('swup:contentReplaced', () => {
		intersectionObserver.disconnect();
		backtop?.removeEventListener('click', backFun);
		scrollTriger?.removeEventListener('click', scrollToTriger);
		window.removeEventListener('scroll', scrollFun);
		window.removeEventListener('resize', setSidebarWidth);
		backFun();
		observer.disconnect();
	});
}

/**
 * 初始化 counter
 * @param duration
 */
export function InitCounter(duration = 2000) {
	const numRun = (item: HTMLElement, step: number, count: number, num: number) => {
		count += step;
		if (count >= num) {
			item.innerText = num.toString();
		} else {
			item.innerText = parseInt(count.toString()).toString();
			requestAnimationFrame(() => numRun(item, step, count, num));
		}
	};

	utils.qa('.trm-counter').forEach(item => {
		const num = Number(item.innerText);
		if (!isNaN(num)) {
			const setp = num / (duration / 16);
			numRun(item, setp, 0, num);
		}
	});
}

/**
 * 初始化目录
 */
export function InitToc() {
	const { i18n, toc, icons, icontype } = window.ASYNC_CONFIG;
	const postToc = utils.q<HTMLDivElement>('#post-toc');
	const tocBtn = utils.q('.post-toc-btn');
	if (postToc) {
		const tocTopBtn = postToc.querySelector<HTMLSpanElement>('#post-toc-top');
		const tocHeader = postToc.querySelector<HTMLDivElement>('.trm-post-toc-header');

		tocTopBtn.addEventListener('click', function () {
			if (postToc.classList.contains('fixed')) {
				postToc.classList.remove('fixed', 'active');
				tocTopBtn.innerHTML = i18n.sticky;
			} else {
				postToc.classList.add('fixed');
				tocTopBtn.innerHTML = utils.icons(icons.close, icontype);
			}
		});

		postToc.addEventListener('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
			const link = e.target as HTMLElement;
			let url = link.getAttribute('href');
			if (!url) url = link.parentElement.getAttribute('href');
			if (!url) return;
			const scroll = document.querySelector(url);
			if (!scroll) return;
			const elementTop = scroll.getBoundingClientRect().top + utils.scrollTop();
			window.scrollTo({ top: elementTop - 110, behavior: 'smooth' });
			return false;
		});

		tocHeader.addEventListener('mousedown', function (e) {
			if (!postToc.classList.contains('fixed')) {
				return;
			}
			const rect = tocHeader.getBoundingClientRect();
			const x = e.clientX;
			const y = e.clientY;
			let isDown = true;

			document.onmousemove = function (e) {
				if (isDown) {
					const nx = e.clientX;
					const ny = e.clientY;
					postToc.style.left = `${nx - (x - rect.x)}px`;
					postToc.style.top = `${ny - (y - rect.y)}px`;
					postToc.style.right = 'unset';
					postToc.style.bottom = 'unset';
					postToc.style.opacity = '.6';
				}
			};

			document.onmouseup = function () {
				isDown = false;
				document.onmousemove = null;
				document.onmouseup = null;
				postToc.style.removeProperty('opacity');
				// postToc.style.opacity = 'unset';
			};
		});

		if (toc.post_title) {
			postToc.querySelectorAll('.trm-toc-link').forEach(item => {
				const id = item.getAttribute('href');
				const title = utils.q(id);
				if (!title) return;
				const span = document.createElement('span');
				span.className = 'trm-toc-icon';
				span.innerHTML = utils.icons(icons.toc_tag, icontype);
				span.onclick = function (e) {
					globalFun.switchToc(true, e.clientX, e.clientY);
					e.preventDefault();
					e.stopPropagation();
					return false;
				};
				title.appendChild(span);
			});
		}

		const elOut = (e: MouseEvent) => {
			if (postToc.classList.contains('fixed')) {
				return;
			}
			utils.clickoutside(<Element>e.target, [postToc, tocBtn]) ? postToc.classList.remove('active') : globalFun.switchToc();
		};

		window.addEventListener('click', elOut);
		document.addEventListener('swup:contentReplaced', () => {
			window.removeEventListener('click', elOut);
		});
	}
}

/**
 * 初始化版本复制
 */
export function InitCopyright() {
	if (window.ASYNC_CONFIG.creative_commons) {
		let { author } = window.ASYNC_CONFIG;
		const { i18n, creative_commons } = window.ASYNC_CONFIG;
		const copyFn = function (event: ClipboardEvent) {
			const clipboardData = event.clipboardData || window.clipboardData;
			if (!clipboardData) {
				return;
			}
			const text = window.getSelection().toString();
			if (text) {
				event.preventDefault();
				const authorEl = document.getElementById('post-author');
				if (authorEl) {
					author = authorEl.innerText.replace('\n', '');
				}

				let originalLink = location.href;
				const originalLinkEl = document.getElementById('original-link');
				if (originalLinkEl) {
					originalLink = originalLinkEl.innerText.replace('\n', '');
				}
				const copyrightText = `\n\n${i18n.author}${author}\n${i18n.copyright_link}${originalLink}\n${i18n.copyright_license_title}${i18n.copyright_license_content.replace(
					'undefined',
					'CC' + creative_commons.license.toUpperCase() + ' ' + (creative_commons.license == 'zero' ? '1.0' : '4.0'),
				)}`;
				clipboardData.setData('text/plain', text + copyrightText);
			}
		};
		document.addEventListener('copy', copyFn);
	}
}

/**
 * 初始化代码片段-工具栏
 */
export function InitHighlightTool() {
	const { i18n, highlight, icons, icontype } = window.ASYNC_CONFIG;
	// highlight prismjs
	const isHighlightCopy = highlight.copy;
	const isHighlightLang = highlight.lang;
	const isHighlightHeightLimit = highlight.height_limit;
	const isShowTool = isHighlightCopy || isHighlightLang;
	const isPrismjs = highlight.plugin === 'prismjs';
	const isMacTitle = highlight.title === 'mac';

	const selector = isPrismjs ? 'pre[class*="language-"]' : 'figure.highlight';
	const $figureHighlight = utils.qa(selector);

	if (!(isShowTool || isHighlightHeightLimit || $figureHighlight.length)) return;

	const copyCode = function () {
		try {
			const element = this.parentNode.parentNode;
			// highlight
			let code = element.querySelector('.code');
			if (!code) code = element.querySelector('table');
			// prismjs
			if (!code) code = element.querySelector('code');
			if (!code) return;
			navigator.clipboard.writeText(code.innerText);
			utils.message(i18n.copy_success);
		} catch (error) {
			utils.message(i18n.copy_failure, 'warning');
		}
	};

	const expandCode = function () {
		const flag = this.classList.contains('expand-done');
		const scrollTop = utils.scrollTop(); // record the scroll height
		const newHeight = this.parentElement.clientHeight;
		this.classList.toggle('expand-done');
		const oldHeight = this.parentElement.clientHeight;
		if (flag) {
			const expandHeight = newHeight - oldHeight;
			if (expandHeight < utils.viewPortHeight()) return; // the unfolded height is lower than the screen height and does not scroll
			window.scrollTo({ top: scrollTop - expandHeight });
		}
	};

	utils.qa(selector).forEach(element => {
		const fragment = document.createDocumentFragment();
		const tools = document.createElement('div');
		tools.className = `code-tools ${isShowTool && isMacTitle ? 'mac-style' : 'default-style'}`;

		/* Show Lang */
		if (isHighlightLang) {
			let langName = '';
			if (isPrismjs) {
				langName = element.getAttribute('data-language') ? element.getAttribute('data-language') : 'Code';
			} else {
				langName = element.getAttribute('class').split(' ')[1];
				if (langName === 'plain' || langName === undefined) langName = 'Code';
			}

			const span = document.createElement('span');
			span.className = 'code-lang';
			span.innerText = langName;

			tools.append(span);
		}

		/* Copy Button */
		if (isHighlightCopy) {
			const span = document.createElement('span');
			span.className = 'copy-button';
			span.innerHTML = utils.icons(icons.copy, icontype);
			span.addEventListener('click', copyCode);
			tools.append(span);
		}

		/* height limit */
		if (isHighlightHeightLimit && element.offsetHeight > <number>highlight.height_limit + 50) {
			const expand = document.createElement('div');
			expand.innerHTML = utils.icons(icons.double_arrows, icontype);
			expand.className = 'code-expand-btn';
			expand.addEventListener('click', expandCode);
			fragment.append(expand);
		}

		fragment.append(tools);

		if (isPrismjs) {
			utils.wrap(element, 'figure', { class: 'highlight' });
			element.parentNode.insertBefore(fragment, element);
			const caption = element.querySelector('.caption,caption');
			if (caption) element.parentNode.appendChild(caption);
		} else {
			element.insertBefore(fragment, element.querySelector('table'));
		}
	});
}

/**
 * 初始化 Tabs
 */
export function InitTabs() {
	utils.qa('.trm-tabs .trm-tab > button').forEach(function (item) {
		item.addEventListener('click', function () {
			const $tabItem = this.parentNode;

			if (!$tabItem.classList.contains('active')) {
				const $tabContent = $tabItem.parentNode.nextElementSibling;
				const $siblings = utils.siblings($tabItem, '.active')[0];
				$siblings && $siblings.classList.remove('active');
				$tabItem.classList.add('active');
				const tabId = this.getAttribute('data-href').replace('#', '');
				const childList = [...$tabContent.children];
				childList.forEach(item => {
					if (item.id === tabId) item.classList.add('active');
					else item.classList.remove('active');
				});
			}
		});
	});
}

/**
 * 初始化图库排版
 */
export function InitJustifiedGallery() {
	const gallerys = utils.qa('.fj-gallery');
	if (gallerys.length) {
		gallerys.forEach(item => {
			const imgList = item.querySelectorAll('img');
			imgList.forEach((i: HTMLImageElement) => {
				i.loading = 'eager';
				utils.wrap(i, 'div', {
					class: 'fj-gallery-item',
					'data-src': i.dataset.src || i.src,
					'data-fancybox': 'gallery',
				});
			});
		});

		utils.loadScript(window.ASYNC_CONFIG.plugin.flickr_justified_gallery, window.fjGallery).then(() => {
			gallerys.forEach(selector => {
				window.fjGallery(selector, {
					itemSelector: '.fj-gallery-item',
					rowHeight: 220,
					gutter: 4,
					onJustify: function () {
						this.$container.style.opacity = '1';
					},
				});
			});
		});
	}
}

/**
 * 初始化 window title
 */
export function InitChangeTitle() {
	if (window.ASYNC_CONFIG && window.ASYNC_CONFIG.favicon.visibilitychange) {
		window.originTitle = document.title;
		let titleTime: string | number | NodeJS.Timeout;
		const iconEls = Array.from(utils.qa('[rel="icon"]'));
		const icons = iconEls.map(item => item.href);
		document.addEventListener('visibilitychange', function () {
			if (document.hidden) {
				iconEls.forEach(item => {
					item.href = utils.urlFor(window.ASYNC_CONFIG.favicon.hidden);
				});
				document.title = window.ASYNC_CONFIG.favicon.hideText;
				clearTimeout(titleTime);
			} else {
				iconEls.forEach((item, index) => {
					item.href = icons[index];
				});
				document.title = window.ASYNC_CONFIG.favicon.showText + window.originTitle;
				titleTime = setTimeout(function () {
					document.title = window.originTitle;
				}, 2000);
			}
		});
	}
}

/**
 * 添加过期提醒
 */
export function AddPostOutdateNotice() {
	const { notice_outdate: data, i18n } = window.ASYNC_CONFIG;
	if (data) {
		const diffDay = <number>utils.diffDate(window.PAGE_CONFIG.postUpdate);
		if (diffDay >= data.limit_day) {
			const ele = document.createElement('div');
			ele.className = `post-outdate-notice ${data.position}`;
			ele.textContent = i18n.notice_outdate_message.replace('undefined', diffDay.toString());
			const $targetEle = document.getElementById('article-container');
			if (data.position === 'top') {
				$targetEle.insertBefore(ele, $targetEle.firstChild);
			} else {
				$targetEle.appendChild(ele);
			}
		}
	}
}

/**
 * 随机设置文章封面
 */
export function InitRandomCovers() {
	if (window.ASYNC_CONFIG.covers && window.PAGE_CONFIG.isHome) {
		const convers = window.ASYNC_CONFIG.covers;
		const divs = utils.qa('div[data-random-img]');
		divs.forEach(item => {
			let src = utils.getRandomItem<string>(convers);
			src += src.includes('?') ? `&v=${Math.random()}` : `?v=${Math.random()}`;
			src && (item.style.backgroundImage = `url(${src})`);
		});
	}
}

/**
 * 初始化 Menu 切换
 */
export function InitMenu() {
	utils.q('.trm-menu-btn').addEventListener('click', function () {
		utils.q('.trm-menu-btn,.trm-right-side').classList.toggle('trm-active');
	});
}

/**
 * 显示版权
 */
export function PrintCopyright() {
	const log = (str: string) =>
		console.log(
			str,
			'color: white; background: #0078E7; padding:5px 0;margin: 0 0 2px 0;border-radius: 4px 0 0 4px;',
			'padding: 4px;border:1px solid #0078E7;border-radius: 0 4px 4px 0; background: linear-gradient(70deg, #e3f9eb, #d1dbff);',
		);
	log(`%c 🚀 Hexo-Theme-Async ${window.ASYNC_CONFIG.theme_version == '0.0.0' ? 'Github' : window.ASYNC_CONFIG.theme_version} %c https://github.com/MaLuns/hexo-theme-async `);
	log(`%c 📑 Hexo-Theme-Async Docs %c https://hexo-theme-async.imalun.com `);
}

/**
 * 计算博客时长
 */
export function ShowDateTime() {
	const live_time = window.ASYNC_CONFIG.live_time;
	if (live_time?.start_time) {
		const birthDay = new Date(live_time.start_time);
		const today = new Date();
		const timeold = today.getTime() - birthDay.getTime();
		const msPerDay = 24 * 60 * 60 * 1000;
		const day = Math.floor(timeold / msPerDay);
		const blogRunLongEl = document.querySelector('.blog-run-long');
		if (blogRunLongEl) {
			blogRunLongEl.innerHTML = live_time?.prefix?.replace('undefined', `<span class="trm-accent-color"> ${day} </span>`);
		}
	}
}

/**
 * 初始化
 */
export function ready() {
	window.asyncFun = globalFun;

	PrintCopyright();

	/* loading animate */
	globalFun.pageLoading();

	/* window title */
	InitChangeTitle();

	if (window.PAGE_CONFIG.isPost) {
		AddPostOutdateNotice();
	}

	/* Initialize album */
	InitJustifiedGallery();

	/* Initialize with pictures in articles */
	InitPictures();

	/* Initialize with code blocks in articles */
	InitHighlightTool();

	/* Initialize the tabs in the article */
	InitTabs();

	/* swup */
	window.ASYNC_CONFIG.swup && InitSwup();

	/* menu */
	InitMenu();

	/* theme mode switch */
	InitThemeMode(true);

	/* counters */
	InitCounter();

	/* Initialize scroll */
	InitScroll();

	/* swiper */
	InitSwiper();

	/* fancybox */
	InitFancybox();

	/* toc */
	InitToc();

	/* copyright */
	InitCopyright();

	/* random covers */
	InitRandomCovers();

	/* The blog runs long */
	ShowDateTime();

	if (window.ASYNC_CONFIG.swup) {
		document.addEventListener('swup:contentReplaced', function () {
			/* Update page configuration */
			const site = <HTMLScriptElement>utils.gId('async-page-config');
			site && utils.runScriptBlock(site);

			if (window.PAGE_CONFIG.isPost) {
				AddPostOutdateNotice();
			}

			/* menu */
			InitMenu();

			/* Launch reading mode */
			document.body.classList.remove('trm-read-mode');

			/* The blog runs long */
			ShowDateTime();

			/* Initialize album */
			InitJustifiedGallery();

			/* Initialize with pictures in articles */
			InitPictures();

			/* Initialize with code blocks in articles */
			InitHighlightTool();

			/* Initialize with tabs in articles */
			InitTabs();

			/* preloader */
			utils.q<HTMLDivElement>('.trm-scroll-container').style.opacity = '1';

			/* theme mode switch */
			InitThemeMode(true);

			/* counters */
			InitCounter();

			/* Initialize scroll */
			InitScroll();

			/* swiper */
			InitSwiper();

			/* fancybox */
			InitFancybox();

			/* toc */
			InitToc();

			/* random covers */
			InitRandomCovers();
		});
	}
}
