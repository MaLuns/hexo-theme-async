const arrayify = (list) => Array.prototype.slice.call(list);

class SwupScriptsPlugin {
    name = 'ScriptPlugin';
    isSwupPlugin = true;

    defaultOptions = {
        selectors: 'script[data-swup-reload-script]',
        insertBefore: '#async-script'
    };

    swup: any;
    options: { selectors: string; insertBefore: string; };

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
            let scriptCDN = <Array<HTMLScriptElement>>[]
            let scriptBlock = <Array<string>>[]

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

            const run = async (cdns: Array<HTMLScriptElement>, blocks: Array<string>) => {
                try {
                    for (var i = 0; i < cdns.length; i++) {
                        await this.loadScript(cdns[i]);
                    }
                    blocks.forEach(code => {
                        this.runScriptBlock(code)
                    })
                } catch (e) {
                }
            }

            run(scriptCDN, scriptBlock)
        }
    };

    loadScript(item: HTMLScriptElement) {
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

    runScriptBlock(code: string) {
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

    getNextScriptChildren(): HTMLScriptElement[] {
        const pageContent = this.swup.cache
            .getCurrentPage()
            .originalContent.replace('<body', '<div id="swupBody"')
            .replace('</body>', '</div>');
        let element = document.createElement('div');
        element.innerHTML = pageContent;
        const children = <HTMLScriptElement[]><any>element.querySelector('#swupBody').querySelectorAll(this.options.selectors);

        // cleanup
        element.innerHTML = '';
        element = null;

        return children;
    };

}

export default SwupScriptsPlugin