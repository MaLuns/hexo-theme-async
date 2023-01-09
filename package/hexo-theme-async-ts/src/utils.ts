const utils = {
    q: (selectors) => document.querySelector(selectors),
    qa: (selectors) => document.querySelectorAll(selectors),
    gId: (id: string) => document.getElementById(id),
    debounce(func: Function, wait: number, immediate?: boolean) {
        let timeout: any;
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
    wrap(el: HTMLElement, wrapper: string | HTMLElement, options = {}) {
        if (typeof wrapper === 'string') {
            wrapper = document.createElement(wrapper)
            for (const [key, value] of Object.entries(options)) {
                wrapper.setAttribute(key, value as string)
            }
        }

        el.parentNode.insertBefore(wrapper, el);
        /* el.parentNode.removeChild(el); */
        wrapper.appendChild(el);
    },
    urlFor(path: string) {
        if (/^(#|\/\/|http(s)?:)/.test(path)) return path;
        return (window.ASYNC_CONFIG.root + path).replace(/\/{2,}/g, '/')
    },
    siblings: (ele, selector: string) => {
        return [...ele.parentNode.children].filter((child) => {
            if (selector) {
                return child !== ele && child.matches(selector)
            }
            return child !== ele
        })
    },
    _message: [],
    /**
     * 消息弹窗
     * @param title 
     * @param type 
     */
    message(title: string, type = 'success') {
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
    /**
     * 动态获取脚本
     * @param url 
     * @param condition 是否存在对应实例，判断是否加载脚本
     * @returns 
     */
    loadScript(url: string, condition: boolean) {
        return new Promise<void>((resolve, reject) => {
            if (condition) {
                resolve()
            } else {
                const script = document.createElement('script');
                script.src = url
                script.setAttribute('async', 'false');
                script.onerror = reject;
                script.onload = () => resolve();
                document.head.appendChild(script)
            }
        })
    },
    icons(icon: string, type: 'symbol' | 'font' = 'font') {
        if (type === 'symbol') {
            return `<svg class="symbol-icon " aria-hidden="true"><use xlink:href="#${icon}"></use></svg>`;
        } else {
            return `<i class="iconfont ${icon}"></i>`
        }
    }
}

export default utils