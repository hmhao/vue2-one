# vue2-one

> vue2 + vue-router + vue-resource + vue-scroller + express + cheerio 实时抓取http://m.wufazhuce.com/内容的练手项目

借鉴了[imitate-One](https://github.com/eidonlon/imitate-One)，实现其没有完成的功能并进行多处优化<br>
例如：

- 新增
    - 下拉更新和滚动到底部自动加载更多(实时抓取)
    - keep-alive路由组件切换时还原滚动位置
    - 双击头部返回顶部
- 优化
    - 侧边栏呼出后不能点击底部内容
    - 路由切换时隐藏侧边栏

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
