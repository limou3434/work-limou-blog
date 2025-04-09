import { defineThemeConfig } from 'vuepress-theme-plume'
import { navbar } from './navbar'
import { notes } from './notes'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({

  // 网站标志
  logo: 'https://theme-plume.vuejs.press/plume.png',

  // 深色模式
  appearance: true, // 启动深色模式

  // 社交链接
  social: [
    { icon: 'github', link: 'https://github.com/limou3434' },
    { icon: 'twitter', link: 'https://x.com/3434Limou97685' },
    { icon: 'youtube', link: 'https://www.youtube.com/@3434limou' },
    { icon: 'bilibili', link: 'https://space.bilibili.com/356662607?spm_id_from=333.1007.0.0' },
    { icon: 'zhihu', link: 'https://www.zhihu.com/people/limou3434' },
  ],
  navbarSocialInclude: ['github', 'twitter', 'youtube', 'bilibili', 'zhihu'], // 允许显示在导航栏的 social 社交链接

  // 开发卡片
  profile: {
    avatar: 'https://avatars.githubusercontent.com/u/113878415?s=400&u=9f10b63e033c9504615bc475581441478424e04b&v=4',
    name: 'limou3434', // 开发者名称
    description: '是本网站的主要搭建者...', // 开发者描述
    location: '广东省广州市', // 开发者地址
    organization: '工作室', // 开发者组织
    circle: true, // 显示园框头像
    layout: 'left', // 卡片显示左侧
  },

  // 公告板
  bulletin: {
    layout: 'top-right',
    contentType: 'markdown',
    title: '公告',
    content: '本网站正在不断升级中，如有遇到 bug 可以在本开发者的对应项目下提交 issues',
  },

  // aside: true, // 页内侧边栏， 默认显示在右侧
  // outline: [2, 3], // 页内大纲， 默认显示 h2, h3

  // 版权信息
  // copyright: true,

  // prevPage: true,   // 是否启用上一页链接
  // nextPage: true,   // 是否启用下一页链接
  // createTime: true, // 是否显示文章创建时间

  // 站点页脚
  // footer: {
  //   message: 'Power by <a target="_blank" href="https://v2.vuepress.vuejs.org/">VuePress</a> & <a target="_blank" href="https://theme-plume.vuejs.press">vuepress-theme-plume</a>',
  //   copyright: '',
  // },

  navbar,
  notes,

  /* 过渡动画 @see https://theme-plume.vuejs.press/config/basic/#transition */
  // transition: {
  //   page: true,        // 启用 页面间跳转过渡动画
  //   postList: true,    // 启用 博客文章列表过渡动画
  //   appearance: 'fade',  // 启用 深色模式切换过渡动画, 或配置过渡动画类型
  // },

})
