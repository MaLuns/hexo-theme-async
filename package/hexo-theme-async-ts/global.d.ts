declare interface Window {
    ASYNC_CONFIG: {
        hostname: string
        author: string
        root: string
        typed_text: Array<string>
        favicon: any
        theme_version: string
        theme: any
        search: any
        i18n: any
        creative_commons: any,
        swup: boolean
        plugin: any
        icons: any
    }

    switchReadMode: any
    clipboardData: any
    originTitle: any

    show_date_time: () => void

    LocalSearch: any
    // 三方插件
    LocomotiveScroll: any
    Fancybox: any
    Swiper: any
    Swup: any
    fjGallery: any
}