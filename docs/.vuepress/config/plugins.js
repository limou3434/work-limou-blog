/**
 * docs/.vuepress/config/plugins.js
 * 网站插件配置
 */

import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { markdownMathPlugin } from "@vuepress/plugin-markdown-math";
import { shikiPlugin } from "@vuepress/plugin-shiki";
import { markdownHintPlugin } from "@vuepress/plugin-markdown-hint";
import { photoSwipePlugin } from "@vuepress/plugin-photo-swipe";
import { searchPlugin } from "@vuepress/plugin-search";
import { markdownTabPlugin } from "@vuepress/plugin-markdown-tab";
import { revealJsPlugin } from "@vuepress/plugin-revealjs";
import { oml2dPlugin } from "vuepress-plugin-oh-my-live2d";
import { markdownImagePlugin } from "@vuepress/plugin-markdown-image";
import { readingTimePlugin } from "@vuepress/plugin-reading-time";
import { noticePlugin } from "@vuepress/plugin-notice";
import { commentPlugin } from "@vuepress/plugin-comment";
import markdownDefine2 from "vuepress-plugin-markdown-define2";
import constValue from "./const.js";
import notice from "./notice.js";
import { watermarkPlugin } from "@vuepress/plugin-watermark";
import { copyrightPlugin } from "@vuepress/plugin-copyright";
import { appendDatePlugin } from "@vuepress/plugin-append-date";
import { removeHtmlExtensionPlugin } from "vuepress-plugin-remove-html-extension";

export default [
  // 启用增强插件
  mdEnhancePlugin({
    spoiler: true, // 启用剧透开关
    tasklist: true, // 任务列表支持
    mark: true, // 行内高亮支持
    mermaid: true, // 启用流程图表
    sub: true, // 启用下角标功能
    sup: true, // 启用上角标功能
    echarts: true, // 启用图表绘制
    include: true, // 启用文件引入语法
  }),
  // 启用提示容器
  markdownHintPlugin({
    // 启用提示容器，默认启用
    hint: true,
    // 启用 GFM 警告
    alert: true,
  }),
  // 启用数学解析
  markdownMathPlugin(),
  // 启用代码高亮
  shikiPlugin({
    langs: [
      "cpp",
      "py",
      "java",
      "js",
      "ts",
      "jsx",
      "tsx",
      "json",
      "xml",
      "md",
      "shell",
      "html",
      "css",
      "scss",
      "vue",
      "yaml",
      "go",
      "php",
      "rust",
      "c",
      "csharp",
      "kotlin",
      "sql",
      "markdown",
      "ini",
      "dockerfile",
    ],
  }),
  // 启用图片预览
  photoSwipePlugin({}),
  // 启用全文搜索
  searchPlugin({
    // TODO: 可以尝试更换这个搜索插件
    // 多语言支持
    locales: {
      "/": {
        placeholder: "ctrl+/",
      },
    },
    // 设置快捷键
    hotKeys: [
      { key: "/", ctrl: true }, // ctrl + k
    ],
    // 限制搜索结果最多显示 15 条
    maxSuggestions: 15,
    // 排除首页不参与搜索
    isSearchable: (page) => page.path !== "/",
    // 允许搜索 Frontmatter 中的 `tags` 和 `categories`(不支持正文的原因是防止性能低下)
    getExtraFields: (page) => [
      ...(page.frontmatter.tags ?? []),
      ...(page.frontmatter.categories ?? []),
    ],
  }),
  // 启用选项卡片
  markdownTabPlugin({
    // 启用代码选项卡
    codeTabs: true,
    // 启用选项卡
    tabs: true,
  }),
  // 启用幻灯卡片
  revealJsPlugin({}),
  // 启用看板小猫
  oml2dPlugin({
    models: [
      {
        path: [
          "https://model.oml2d.com/cat-black/model.json",
          "https://model.oml2d.com/cat-white/model.json",
        ],
        scale: 0.05,
        position: [0, 0],
        stageStyle: {
          width: 350,
        },
      },
    ],
  }),
  // 启用图片增强
  markdownImagePlugin({
    // 启用 figure
    figure: true,
    // 启用图片懒加载
    lazyload: true,
    // 启用图片标记
    mark: true,
    // 启用图片大小
    size: true,
  }),
  // 启用阅读时间
  readingTimePlugin({
    // TODO: 还没配置完毕
  }),
  // 启用网站公告
  noticePlugin({
    config: notice,
  }),
  // 启用常量定义
  markdownDefine2(constValue),
  // 启用评论功能
  commentPlugin({
    provider: "Giscus", // 评论服务提供者
    comment: true, // 启用评论功能
    repo: "xiaogithubooo/nfu-work-blog-commit", // 远程仓库
    repoId: "R_kgDONW4Qng", // 远程仓库 ID
    category: "Announcements", // 分类
    categoryId: "DIC_kwDONW4Qns4Ckv8p", // 分类 ID
    lightTheme: "dark_protanopia", // 主题
  }),
  // 启用页面水印
  watermarkPlugin({
    enabled: true, // 全局启用水印，也可以设置为函数，根据页面条件启用
    watermarkOptions: {
      parent: "body", // 将水印插入到 body 元素中
      width: 300,
      height: 300,
      content: "科教平台工作室文档", // 水印内容
      opacity: 0.5, // 水印透明度
    },
    delay: 500, // 延时 500 毫秒添加水印
  }),
  // 启用复制拦截
  copyrightPlugin({
    author: "科教平台工作室", // 作者名称
    license: "MIT", // 版权声明
    triggerLength: 1500, // 触发版权的最小内容长度
    maxLength: "1500", // 允许复制的最大长度
    global: true, // 全局使用复制拦截器
  }),
  // 启用日期插件
  appendDatePlugin(),
  // 启用后缀清洁
  removeHtmlExtensionPlugin(),
];
