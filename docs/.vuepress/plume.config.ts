import { defineThemeConfig } from 'vuepress-theme-plume'
import { navbar } from './navbar'
import { notes } from './notes'
import * as path from "node:path";

/**
 * Theme 配置文件
 */
export default defineThemeConfig({
  // 网站标志
  logo: './logo.svg',

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

  // 全站公告
  bulletin: {
    // id: '1',
    layout: 'top-right',
    border: true,
    lifetime: 'session',
    title: '本站公告',
  },

  // 过渡动画
  transition: {
    page: true, // 启用页面间跳转过渡动画
    postList: true, // 启用博客文章列表过渡动画
    appearance: 'circle-clip', // 启用深色模式切换过渡动画(并且可以选择多种模式)
  },

  // 版权信息
  copyright: true,

  // 页面链接
  prevPage: true, // 是否启用上一页链接
  nextPage: true, // 是否启用下一页链接

  // 创建时间
  createTime: true, // 是否显示文章创建时间

  // 显示大纲
  outline: [2, 5], // 页内大纲， 默认显示 h2, h3

  // 站点导航
  navbar,

  // 站点侧边
  aside: true, // 页内侧边栏， 默认显示在右侧

  // 站点页脚
  footer: {
    message: 'Make by <a target="_blank" href="https://github.com/limou3434">Work</a><br>粤ICP备2025406450号-1',
    copyright: 'MIT',
  },

  // 站点笔记
  notes,

})
