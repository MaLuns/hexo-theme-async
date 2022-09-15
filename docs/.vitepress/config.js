module.exports = {
    lang: 'zh-CN',
    title: 'Hexo-Theme-Async',
    description: '🎈 A simple, lightweight Hexo theme',
    lastUpdated: true,
    head: [
        ['link', { rel: 'icon', href: '/favicon.svg' }],
    ],
    themeConfig: {
        logo: '/logo.svg',
        editLink: {
            pattern: 'https://github.com/Maluns/hexo-theme-async/edit/master/docs/:path',
            text: '帮助改善此页面！( ￣□￣)/',
        },
        socialLinks: [
            {
                icon: 'github', link: 'https://github.com/MaLuns/hexo-theme-async',
            },
        ],
        nav: [
            { text: '指南', link: '/guide/' },
            { text: '示例', link: '/demo/' },
        ],
        sidebar: [
            {
                text: '指南',
                items: [
                    {
                        text: '使用指南',
                        link: '/guide/',
                    },
                    {
                        text: '主题配置',
                        link: '/guide/config',
                    },
                    {
                        text: '页面配置',
                        link: '/guide/page',
                    },
                    {
                        text: '第三方支持',
                        link: '/guide/third-party-support',
                    },
                    {
                        text: '额外依赖库支持',
                        link: '/guide/additional-package-support',
                    },
                    {
                        text: '更新日志',
                        link: '/guide/change-log',
                    },
                ],
            },
            {
                text: '关于',
                items: [
                    {
                        text: '关于主题',
                        link: '/about/',
                    },
                    {
                        text: '内置图标',
                        link: '/about/icon',
                    },
                ],
            },
        ],
        localeLinks: {
            text: '',
            items: [
                /* { text: 'English', link: '/en/guide/' }, */
                { text: '简体中文', link: '/guide/' },
            ],
        },
        footer: {
            message: 'Released under the SATA | MIT License.',
            copyright: 'Copyright © 2020-PRESENT MaLuns',
        },
    }
}
