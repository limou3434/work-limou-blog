import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'

/**
 * vuepress 配置文件
 */
export default defineUserConfig({
  // 网站元数
  base: '/work-blog-website/',
  lang: 'zh-CN',
  title: '缡墨',
  description: '工作室成员长期实践形成的公用博客平台——缡墨',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: 'https://theme-plume.vuejs.press/favicon-32x32.png' }], // 配置站点图标
  ],

  // 打包工具
  bundler: viteBundler(),

  // 预先加载
  shouldPrefetch: false, // 站点较大, 页面数量较多时, 不建议启用

  // 主题配置
  theme: plumeTheme({
    // 博客配置
    blog: {
      postList: true, // 是否启用文章列表页
      tags: true, // 是否启用标签页
      archives: true, // 是否启用归档页
      categories: true, // 是否启用分类页
      postCover: 'right', // 文章封面位置
      pagination: 15, // 每页显示文章数量
    },
    article: '/article/', // 博客文档前缀

    // 页面水印
    watermark: true,

    // 编译缓存
    cache: 'filesystem', // 加快编译速度

    // 自动添加
    autoFrontmatter: {
      permalink: true, // 是否给 frontmatter 生成永久链接
      createTime: true, // 是否 frontmatter 生成创建时间
      title: false, // 是否 frontmatter 生成标题
    },

    // 本地搜索
    search: { provider: 'local' },

    // 评论功能
    comment: {
      provider: 'Giscus', // "Artalk" | "Giscus" | "Twikoo" | "Waline"
      comment: true,
      repo: 'limou3434/work-blog-website-comment',
      repoId: 'R_kgDOOZVKTA',
      category: 'Q&A',
      categoryId: 'DIC_kwDOOZVKTM4CpFNb',
      mapping: 'pathname',
      reactionsEnabled: true,
      inputPosition: 'top',
    },

    // 页内信息
    editLink: true,
    contributors: true,
    changelog: false,
    // lastUpdated: true,
    plugins: {
      git: true, // 如果您在此处直接声明为 true, 则表示开发环境和生产环境都启用该功能
    },

    // 部署域名
    hostname: 'https://limou3434.github.io/work-blog-website/', // 有助于 SEO, 生成 sitemap

    // 文档仓库
    docsRepo: 'https://github.com/limou3434/work-blog-website',
    docsDir: 'docs',
    docsBranch: 'main',

    // 拓展语法
    markdown: {
      mermaid: true,      // 启用 mermaid
      bilibili: true,     // 启用嵌入 bilibili视频 语法 @[bilibili](bid)
      youtube: true,      // 启用嵌入 youtube视频 语法 @[youtube](video_id)
      pdf: true,          // 启用 PDF 嵌入 @[pdf](/xxx.pdf)
      audioReader: true,  // 启用嵌入音频朗读功能 语法 @[audioReader](url)
      plot: true,         // 启用隐秘文本语法 !!xxxx!!
      annotation: true,   // 启用 annotation 语法  [+label]: content
      timeline: true,     // 启用 timeline 语法  ::: timeline
      collapse: true,     // 折叠面板语法 ::: collapse
      caniuse: true,      // 启用 caniuse 语法  @[caniuse](feature_name)
      chat: true,         // 启用 chat 语法 ::: chat
      math: {             // 启用数学公式
        type: 'katex',
      },
      image: {
        figure: true,     // 启用 figure
        lazyload: true,   // 启用图片懒加载
        mark: true,       // 启用图片标记
        size: true,       // 启用图片大小
      },
      fileTree: {
        icon: 'colored',
      },
      //   abbr: true,         // 启用 abbr 语法  *[label]: content
      //   artPlayer: true,    // 启用嵌入 artPlayer 本地视频 语法 @[artPlayer](url)
      //   icons: true,        // 启用内置图标语法  :[icon-name]:
      //   codepen: true,      // 启用嵌入 codepen 语法 @[codepen](user/slash)
      //   replit: true,       // 启用嵌入 replit 语法 @[replit](user/repl-name)
      //   codeSandbox: true,  // 启用嵌入 codeSandbox 语法 @[codeSandbox](id)
      //   jsfiddle: true,     // 启用嵌入 jsfiddle 语法 @[jsfiddle](user/id)
      //   npmTo: true,        // 启用 npm-to 容器  ::: npm-to
      //   demo: true,         // 启用 demo 容器  ::: demo
      //   repl: {             // 启用 代码演示容器
      //     go: true,         // ::: go-repl
      //     rust: true,       // ::: rust-repl
      //     kotlin: true,     // ::: kotlin-repl
      //   },
      //   chartjs: true,      // 启用 chart.js
      //   echarts: true,      // 启用 ECharts
      //   flowchart: true,    // 启用 flowchart
      //   include: true,      // 在 Markdown 文件中导入其他 markdown 文件内容
      //   imageSize: 'local', // 启用 自动填充 图片宽高属性，避免页面抖动
    },

    // 搜索服务
    // search: { // 启用此搜索需要将 本地搜索 search 设置为 false
    //   provider: 'algolia',
    //   appId: '',
    //   apiKey: '',
    //   indexName: '',
    // },

    // 资源链替
    // replaceAssets: 'https://cdn.example.com',

    // 加密功能
    // encrypt: {},
  }),
})
