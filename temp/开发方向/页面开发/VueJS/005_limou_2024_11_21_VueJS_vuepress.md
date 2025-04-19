---
title: 005_limou_2024_11_21_VueJS_vuepress
createTime: 2025/04/09 13:05:15
permalink: /article/gg8tsyan/
---
<!-- @include: basic.md#statement -->

# Vuepress

## 1.VuePress 的简单概要

一个 `VuePress` 站点本质上是一个由 [Vue](https://vuejs.org/) 和 [Vue Router](https://router.vuejs.org/) 驱动的单页面应用，页面由 `Markdown` 文档组成。

路由会根据 `Markdown` 文件的相对路径来自动生成。每个 `Markdown` 文件都通过 [markdown-it](https://github.com/markdown-it/markdown-it) 编译为 `HTML`，然后将其作为 `Vue` 组件的模板。因此，你可以在 `Markdown` 文件中直接使用 `Vue` 语法，便于你嵌入一些动态内容。

在开发过程中，我们启动一个常规的开发服务器，并将 `VuePress` 站点作为一个常规的 `SPA`。如果你以前使用过 `Vue` 的话，你在使用时会感受到非常熟悉的开发体验。

在构建过程中，我们会为 `VuePress` 站点创建一个服务端渲染的版本，然后通过虚拟访问每一条路径来渲染对应的 `HTML`，下面使用命令行工具开始建立项目。

> [!IMPORTANT]
>
> 补充：这里我从我搭建我们工作室网站的角度来分析我是如何搭建这个项目的。

::: details

```shell :collapsed-lines
# 使用脚手架来搭建项目
$ npm init vuepress work-blogs
? Select a language to display / 选择显示语言 简体中文
? 选择包管理器 npm
? 你想要使用哪个打包器？ vite
? 你想要创建什么类型的项目？ docs
生成 package.json...
? 设置应用名称 work-blogs
? 设置应用版本号 0.0.1
? 设置应用描述 存放工作室文档和博客
? 设置协议 MIT
? 是否需要一个自动部署文档到 GitHub Pages 的工作流？ Yes
生成模板...
? 选择你想使用的源 当前源
安装依赖...
这可能需要数分钟，请耐心等待.
我们无法正确输出子进程的进度条，所以进程可能会看似未响应

added 239 packages in 14s

75 packages are looking for funding
  run `npm fund` for details
模板已成功生成!
? 是否想要现在启动 Demo 查看? Yes
启动开发服务器...
启动成功后，请在浏览器输入给出的开发服务器地址(默认为 'localhost:8080')

> work-blogs@0.0.1 docs:dev
> vuepress dev docs


  vite v5.4.11 dev server running at:

  ➜  Local:   http://localhost:8080/
  ➜  Network: http://192.168.101.254:8080/

 # 如果打开网站报错就使用 npm install -D sass-embedded 安装依赖...
 
```

:::

- [入门文档](https://vuepress.vuejs.org/zh/guide/configuration.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
- [核心文档](https://vuepress.vuejs.org/zh/reference/node-api.html)

## 2.VuePress 的工作目录

::: details

```shell :collapsed-lines
 # 查看工作目录
 $ tree -L 1
 ./work-blogs
├── .gitignore # git 忽略文件
├── docs/ # 存储 Markdown 文档的地方, 同时也作为 VuePress 的源文件目录
│	├── get-started.md
│	├── README.md # 文档网站主页页面
│	└── .vuepress/ # VuePress 应用的源文件目录
├── node_modules/ # 包管理依赖代码
├── package.json # 包管理依赖文件
└── package-lock.json # 包管理依赖文件

```

:::

上述的工作目录简单查看一下就可以，大概的作用我也标记在旁边的注释里了。其中，由于 `.vuepress` 中，在后续编译项目会有一些临时文件、缓存文件、构建文件的生成，因此建议在项目的根目录内加上以下的 `.gitignore` 文件，避免推送到远端仓库中。

::: details

```shell :collapsed-lines
# .gitignore
# VuePress 默认临时文件目录
.vuepress/.temp
# VuePress 默认缓存目录
.vuepress/.cache
# VuePress 默认构建生成的静态文件目录
.vuepress/dist

```

:::

## 3.VuePress 的约定路由

`VuePress` 采用约定式路由，并且 `.md` 文档会被自动渲染为 `.html` 文件。

::: details

```shell :collapsed-lines
# 目录结构
└─ docs
   ├─ guide
   │  ├─ getting-started.md
   │  └─ README.md
   ├─ contributing.md
   └─ README.md
   
```

:::

将 `docs` 目录作为你的 `sourceDir`，在运行 `vuepress dev docs` 命令时，`Markdown` 文件对应的路由路径为：

| 相对路径                    | 路由路径                      |
| --------------------------- | ----------------------------- |
| `/README.md`                | `/`                           |
| `/index.md`                 | `/`                           |
| `/contributing.md`          | `/contributing.html`          |
| `/guide/README.md`          | `/guide/`                     |
| `/guide/getting-started.md` | `/guide/getting-started.html` |

## 4.VuePress 的配置文件

### 4.1.VuePress 的站点配置

我把站点配置文件中常见的配置列了出来，您可以照着编写一下。

::: details

```js :collapsed-lines
/**
 * docs/.vuepress/config.js
 * 网站主要配置文件, 主要引用 docs/.vuepress/config/ 下的文件
 */

import { viteBundler } from "@vuepress/bundler-vite";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";

// 默认可以从 public 目录下获取文件
// VuePress 默认使用约定路由

export default defineUserConfig({
  // 设置网站基本配置
  lang: "zh-CN", // 设置语言
  title: "工作室文档平台项目", // 设置网站标题
  description: "以人为本，技术为先，服务为重", // 设置网站描述
  // base: "/gzs", // 千万别加, 因为其他地方也需要修改, 也有可能是中文问题(默认)
  // dest: , // 设置网站编译配置(默认)
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
        port: 8085, // 设置端口为 8085
        open: false, // 启动时取消自动打开浏览器
      },
    },
  }),

  // 设置网站主题配置
  theme: defaultTheme({
    // 网章标识
    logo: "https://vuejs.press/images/hero.png",
    // 标题深度
    sidebarDepth: 6,
    // 更新时间
    lastUpdated: true, // 每个文件 git 最后提交的时间
  }),
});

```

:::

> [!IMPORTANT]
>
> 补充：[相关的配置选项也可以看这里](https://vuepress.vuejs.org/zh/reference/config.html)。

### 4.2.VuePress 的页面配置

`Markdown` 文件可以包含一个 `YAML Frontmatter` 配置，`Frontmatter` 必须在 `Markdown` 文件的顶部，并且被包裹在一对三短划线中间。

::: details

```shell :collapsed-lines
# test.md
---
lang: zh-CN
title: 页面的标题
description: 页面的描述
---

```

:::

`Frontmatter` 中的字段和 [配置文件](https://vuepress.vuejs.org/zh/guide/configuration.html#config-file) 中的 [站点配置](https://vuepress.vuejs.org/zh/guide/configuration.html#站点配置) 十分类似。你可以通过 `Frontmatter` 来覆盖当前页面的 `lang`, `title`, `description` 等属性。因此，你可以把 `Frontmatter` 当作页面级作用域的配置（因此可以使用页面配置覆盖某些站点配置）。

> [!IMPORTANt]
>
> 补充：[相关配置选项也可以这里](https://vuepress.vuejs.org/zh/reference/frontmatter.html)。

### 4.3.VuePress 的客户配置

待补充...

### 4.4.VuePress 的导航配置

### 4.5.VuePress 的翻页配置

### 4.6.VuePress 的插件配置

## 5.VuePress 的资源目录

待补充...

## 6.VuePress 的页面组件

页面的主要内容是使用 `Markdown` 书写的。`VuePress` 首先会将 `Markdown` 转换为 `HTML` ，然后将 `HTML` 作为 `Vue` 单文件组件的 `<template>` 。

### 6.1.使用内置组件

- 表格
- 删除线
- 链接
- 避免渲染

### 6.2.使用拓展组件

- 标题锚点语法  [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor)
- `Emoji` 语法 [markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji)
- 目录语法 [markdown.toc](https://vuepress.vuejs.org/zh/reference/config#markdown-toc)
- 代码块语法 [@vuepress/plugin-prismjs](https://ecosystem.vuejs.press/zh/plugins/markdown/prismjs.html) 和 [@vuepress/plugin-shiki](https://ecosystem.vuejs.press/zh/plugins/markdown/shiki.html)

### 6.3.使用外部组件

由于 `Markdown` 中允许使用 `HTML`，所以支持使用 `Vue` 组件，因此一个 `.md` 文件中允许包含一组 `<script>` 和 `<style>`（并且整个 `.md` 文件只能包含一组）。

> [!CAUTION]
>
> 警告：注意应该避免使用非标准的标签。

### 6.4.使用自定组件

如果我们可以自己在 `.md` 中使用自定义的组件也是可以做到的。



甚至，您可以引入 `Elemet UI Pro` 组件导入到您的 `.md` 进行高度自定义！



如果您还需要导入全局使用的布局模板，也是可以的，不过还需要搭配特殊的容器标签，以及 `VuePress` 的页面配置。



## 7.VuePress 的项目部署

待补充...

## 8.VuePress 的接口文档

待补充...

<!-- @include: basic.md#comment -->
