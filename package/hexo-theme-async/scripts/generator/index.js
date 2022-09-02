// 首页置顶

'use strict';

var pagination = require('hexo-pagination');

hexo.config.index_generator = Object.assign({
    per_page: typeof hexo.config.per_page === 'undefined' ? 10 : hexo.config.per_page,
    order_by: '-date'
}, hexo.config.index_generator);

hexo.extend.generator.register('index', function (locals) {
    var config = this.config;
    var posts = locals.posts;
    posts.data = posts.data.sort(function (a, b) {
        if (a.top && b.top) { // 两篇文章top都有定义
            if (a.top == b.top) return b.date - a.date; // 若top值一样则按照文章日期降序排
            else return b.top - a.top; // 否则按照top值降序排
        }
        else if (a.top && !b.top) { // 以下是只有一篇文章top有定义，那么将有top的排在前面
            return -1;
        }
        else if (!a.top && b.top) {
            return 1;
        }
        else return b.date - a.date; // 都没定义按照文章日期降序排
    });
    var paginationDir = config.pagination_dir || 'page';
    return pagination('', posts, {
        perPage: config.index_generator.per_page,
        layout: ['index', 'archive'],
        format: paginationDir + '/%d/',
        data: {
            __index: true
        }
    });
});