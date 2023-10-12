const GetLocalSearch = (() => {
	let localSearch = null;
	return () => {
		// @ts-expect-error global LocalSearch
		if (!LocalSearch) {
			return;
		}
		if (!localSearch) {
			const { search, root } = window.ASYNC_CONFIG;
			// @ts-expect-error global LocalSearch
			localSearch = new LocalSearch({
				path: root + search.path,
				top_n_per_article: search.top_n_per_article,
				unescape: search.unescape,
			});
		}
		return localSearch;
	};
})();

function InitSearch() {
	const { search, i18n } = window.ASYNC_CONFIG;
	if (search) {
		if (!search.path) {
			console.warn('`hexo-generator-searchdb` plugin is not installed!');
			return;
		}

		const searchPopup = document.querySelector('.trm-search-popup');
		const searchBtn = document.querySelector('#trm-search-btn');
		const closeBtn = document.querySelector('.trm-search-btn-close');
		const input = <HTMLInputElement>document.querySelector('.trm-search-input');
		const localSearch = GetLocalSearch();

		if (search.preload && !localSearch.isfetched) localSearch.fetchData();

		const inputEventFunction = () => {
			if (!localSearch.isfetched) return;
			const searchText = input.value.trim().toLowerCase();
			const keywords = searchText.split(/[-\s]+/);
			const container = document.querySelector('.trm-search-result-container');
			const stats = document.querySelector('.trm-search-stats');
			let resultItems = [];

			if (searchText.length > 0) {
				resultItems = localSearch.getResultItems(keywords);
			}

			if (resultItems.length > 0) {
				resultItems.sort((left, right) => {
					if (left.includedCount !== right.includedCount) return right.includedCount - left.includedCount;
					else if (left.hitCount !== right.hitCount) return right.hitCount - left.hitCount;

					return right.id - left.id;
				});

				container.innerHTML = `<ul class="search-result-list">${resultItems.map(result => result.item).join('')}</ul>`;
				stats.innerHTML = i18n.hits.replace(/\$\{hits}/, resultItems.length.toString());
			} else {
				const empty = i18n.empty.replace(/\$\{query}/, searchText);
				container.innerHTML = `<div class="trm-search-empty">${empty}</div>`;
				stats.innerHTML = '';
			}
		};

		const openPopup = () => {
			searchPopup.classList.add('show');
			setTimeout(() => input.focus(), 500);
			if (!localSearch.isfetched) localSearch.fetchData();
		};

		const colsePopup = function () {
			searchPopup.classList.remove('show');
		};

		const escClose = function (e: KeyboardEvent) {
			if (e.key === 'Escape') {
				colsePopup();
				e.preventDefault();
				e.stopPropagation();
			}
		};

		const keypressEventFunction = function (e: KeyboardEvent) {
			if (e.key === 'Enter') inputEventFunction();
		};

		if (search.trigger === 'auto') {
			input.addEventListener('input', inputEventFunction);
		} else {
			input.addEventListener('keypress', keypressEventFunction);
		}

		const mask = (e: MouseEvent) => {
			if (<Element>e.target === searchPopup) {
				colsePopup();
			}
		};

		closeBtn.addEventListener('click', colsePopup);
		searchBtn.addEventListener('click', openPopup);
		window.addEventListener('keydown', escClose);
		searchPopup.addEventListener('click', mask);

		document.addEventListener('swup:contentReplaced', () => {
			searchBtn.removeEventListener('click', openPopup);
			closeBtn.removeEventListener('click', colsePopup);
			input.removeEventListener('input', inputEventFunction);
			input.removeEventListener('keypress', keypressEventFunction);
			window.removeEventListener('keydown', escClose);
			searchPopup.removeEventListener('click', mask);
		});
	}
}

InitSearch();

if (window.ASYNC_CONFIG.swup) {
	document.addEventListener('swup:contentReplaced', function () {
		InitSearch();
	});
}
