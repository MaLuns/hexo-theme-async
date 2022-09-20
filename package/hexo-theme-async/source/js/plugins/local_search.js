const GetLocalSearch = (() => {
    let localSearch = null;
    return () => {
        if (!LocalSearch) {
            return;
        }
        if (!localSearch) {
            const { search, root } = window.ASYNC_CONFIG;
            localSearch = new LocalSearch({
                path: root + search.path,
                top_n_per_article: search.top_n_per_article,
                unescape: search.unescape,
            })
        }
        return localSearch
    }
})()

function InitSearch() {
    const { search, i18n } = ASYNC_CONFIG;
    if (search.enable && search.type === 'local') {
        if (!search.path) {
            console.warn('`hexo-generator-searchdb` plugin is not installed!')
            return;
        }

        const searchBtn = document.querySelector('#trm-search-btn')
        const closeBtn = document.querySelector('.trm-search-popup-btn-close')
        const input = document.querySelector('.trm-search-input')
        const localSearch = GetLocalSearch()

        if (search.preload && !localSearch.isfetched)
            localSearch.fetchData()

        const inputEventFunction = () => {
            if (!localSearch.isfetched)
                return
            const searchText = input.value.trim().toLowerCase()
            const keywords = searchText.split(/[-\s]+/)
            const container = document.querySelector('.trm-search-result-container')
            let resultItems = []

            if (searchText.length > 0) {
                resultItems = localSearch.getResultItems(keywords)
            }

            if (resultItems.length > 0) {
                resultItems.sort((left, right) => {
                    if (left.includedCount !== right.includedCount)
                        return right.includedCount - left.includedCount

                    else if (left.hitCount !== right.hitCount)
                        return right.hitCount - left.hitCount

                    return right.id - left.id
                })
                const stats = i18n.hits.replace(/\$\{hits}/, resultItems.length)

                container.innerHTML = `
            <div class="search-stats">${stats}</div>
            <ul class="search-result-list">${resultItems.map(result => result.item).join('')}</ul>`
            } else {
                const stats = i18n.empty.replace(/\$\{query}/, searchText)
                container.innerHTML = `<div class="search-stats">${stats}</div>`
            }

        }

        const openPopup = () => {
            document.querySelector('.trm-search-popup').classList.toggle('show')
            setTimeout(() => input.focus(), 500)
            if (!localSearch.isfetched)
                localSearch.fetchData()
        }

        const colsePopup = function (e) {
            document.querySelector('.trm-search-popup').classList.toggle('show')
        }

        const keypressEventFunction = function (e) {
            if (e.key === 'Enter')
                inputEventFunction()
        }

        if (search.trigger === 'auto') {
            input.addEventListener('input', inputEventFunction)
        }
        else {
            input.addEventListener('keypress', keypressEventFunction)
        }

        closeBtn.addEventListener('click', colsePopup)
        searchBtn.addEventListener('click', openPopup)
        document.addEventListener('swup:contentReplaced', (event) => {
            searchBtn.removeEventListener('click', openPopup)
            closeBtn.removeEventListener('click', colsePopup)
            input.removeEventListener('input', inputEventFunction)
            input.removeEventListener('keypress', keypressEventFunction)
        });

    }

}

InitSearch()

document.addEventListener("swup:contentReplaced", function () {
    InitSearch();
});
