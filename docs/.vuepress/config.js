/**
 * docs/.vuepress/config.js
 * 网站主要配置文件, 主要引用 docs/.vuepress/config/ 下的文件
 */

import { viteBundler } from "@vuepress/bundler-vite";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";

import navbar from "./config/navbar.js";
import sidebar from "./config/sidebar.js";
import plugins from "./config/plugins.js";

// 默认可以从 public 目录下获取文件
// VuePress 默认使用约定路由

export default defineUserConfig({
  // 设置网站基本配置
  lang: "zh-CN", // 设置语言
  title: "工作室文档平台项目", // 设置网站标题
  description: "以人为本，技术为先，服务为重", // 设置网站描述
  // base: "/gzs", // 千万别加, 因为其他地方也需要修改, 也有可能是中文问题(默认)
  // dest: "", // 设置网站编译配置(默认)
  // temp: , // 设置临时文件目录(默认)
  // cache: , // 设置缓存文件目录(默认)
  // public: , // 设置静态文件目录(默认)
  // head: [ // 在 head 标签中添加子标签(默认)
  //   [
  //     "script",
  //     {
  //       src: "/script/test.js",
  //       defer: "true",
  //     },
  //   ],
  // ],

  // 设置网站部署配置
  bundler: viteBundler({
    viteOptions: {
      server: {
        host: "0.0.0.0", // 设置为 0.0.0.0 以接受来自所有 IP 的请求
        port: 8085, // 设置端口为 8085, TODO: 修改为服务的运行端口
        open: false, // 启动时取消自动打开浏览器
      },
    },
  }),

  // 设置网站主题配置
  theme: defaultTheme({
    // 网章标识
    logo: "https://vuejs.press/images/hero.png", // TODO: 设计工作室自己的 Logo
    // 页头导航
    navbar: navbar,
    // 文档翻页
    sidebar: sidebar,
    // 标题深度
    sidebarDepth: 6,
    // 更新时间
    lastUpdated: true, // 每个文件 git 最后提交的时间
  }),

  // 设置网站插件配置
  plugins: plugins,
});
