/**
 * docs/.vuepress/config/sidebar.js
 * 网站侧边配置
 */

// NOTE: 最低配置需要两级目录, 顶级目录为父项, 子级目录为子项(子项必须和一个 README.md 文件同级)

import fs from "fs";
import path from "path";

// 自动生成 VuePress 路径数组
function generateVuePressPaths(userPath) {
  // 获取项目根目录的绝对路径
  const docsDir = path.resolve(__dirname, ".."); // 向上一级指向项目 docs 目录

  // 根据用户提供的路径拼接文件系统中的实际路径
  const dirPath = path.resolve(docsDir, `..${userPath}`); // 拼接真实目录路径
  const files = fs.readdirSync(dirPath, { withFileTypes: true });

  // 遍历文件, 生成符合 VuePress 格式的路径数组(可以筛选文件)
  return files
    .filter(
      (file) =>
        file.isFile() &&
        file.name.endsWith(".md") && // 只留下 .md 文件
        !file.name.startsWith("basic.md") && // 去除 basic.md 文件
        !file.name.startsWith("README.md"), // 去除 README.md 文件
    )
    .map((file) => `${userPath}/${file.name.replace(/\.md$/, "")}`); // 拼接为 VuePress 格式
}

export default {
  // 内部文档系列 - 侧边
  "/内部文档/组织管理": [
    {
      text: "本文目录",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: ["/内部文档/组织管理/README.md"],
    },
  ],
  "/内部文档/集群架构": [
    {
      text: "本文目录",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: ["/内部文档/集群架构/README.md"],
    },
  ],
  "/内部文档/学习路线": [
    {
      text: "本文目录",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: ["/内部文档/学习路线/README.md"],
    },
  ],
  "/内部文档/标准规格": [
    {
      text: "本文目录",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: ["/内部文档/标准规格/README.md"],
    },
  ],

  // 其他内容系列 - 侧边
  "/其他内容/查阅说明": [
    {
      text: "本文目录",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: ["/其他内容/查阅说明/README.md"],
    },
  ],
  "/其他内容/平台详情": [
    {
      text: "本文目录",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: ["/其他内容/平台详情/README.md"],
    },
  ],
  "/其他内容/发布文章": [
    {
      text: "本文目录",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: ["/其他内容/发布文章/README.md"],
    },
  ],
  "/其他内容/使用反馈": [
    {
      text: "本文目录",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: ["/其他内容/使用反馈/README.md"],
    },
  ],
  "/其他内容/本站测试": [
    {
      text: "本文目录",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: ["/其他内容/本站测试/README.md"],
    },
  ],
  "/其他内容/站长计划": [
    {
      text: "本文目录",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: ["/其他内容/站长计划/README.md"],
    },
  ],

  // NOTE: 上面的内容特殊一些, 所以配置结构和下面不太一样

  // 项目手册系列 - 侧边
  "/项目手册/工作室文档平台系统/": [
    {
      text: "使用手册",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/项目手册/工作室文档平台系统/使用手册"),
    },
    {
      text: "其他手册",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/项目手册/工作室文档平台系统/其他手册"),
    },
  ],
  "/项目手册/工作室毕业选题系统/": [
    {
      text: "使用手册",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/项目手册/工作室毕业选题系统/使用手册"),
    },
    {
      text: "其他手册",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/项目手册/工作室毕业选题系统/其他手册"),
    },
  ],
  "/项目手册/工作室综合评测系统/": [
    {
      text: "使用手册",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/项目手册/工作室综合评测系统/使用手册"),
    },
    {
      text: "其他手册",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/项目手册/工作室综合评测系统/其他手册"),
    },
  ],
  "/项目手册/工作室考勤报销系统/": [
    {
      text: "使用手册",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/项目手册/工作室考勤报销系统/使用手册"),
    },
    {
      text: "其他手册",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/项目手册/工作室考勤报销系统/其他手册"),
    },
  ],

  // 编程修养系列 - 侧边
  "/编程修养/编程语言/": [
    {
      text: "语法入门 C",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/C/入门"),
    },
    {
      text: "语法进阶 C",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/C/进阶"),
    },
    {
      text: "第三组件 C",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/C/组件"),
    },
    {
      text: "语法入门 C++",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/Cpp/入门"),
    },
    {
      text: "语法进阶 C++",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/Cpp/进阶"),
    },
    {
      text: "第三组件 C++",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/Cpp/组件"),
    },
    {
      text: "语法入门 C#",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/CSharp/入门"),
    },
    {
      text: "语法进阶 C#",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/CSharp/进阶"),
    },
    {
      text: "第三组件 C#",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/CSharp/组件"),
    },
    {
      text: "语法入门 Java",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/Java/入门"),
    },
    {
      text: "语法进阶 Java",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/Java/进阶"),
    },
    {
      text: "第三组件 Java",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/Java/组件"),
    },
    {
      text: "语法入门 Python",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/Python/入门"),
    },
    {
      text: "语法进阶 Python",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/Python/进阶"),
    },
    {
      text: "第三组件 Python",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/Python/组件"),
    },
    {
      text: "语法入门 Go",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/Go/入门"),
    },
    {
      text: "语法进阶 Go",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/Go/进阶"),
    },
    {
      text: "第三组件 Go",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/Go/组件"),
    },
    {
      text: "语法入门 Kotlin",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/Kotlin/入门"),
    },
    {
      text: "语法进阶 Kotlin",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/Kotlin/进阶"),
    },
    {
      text: "第三组件 Kotlin",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/Kotlin/组件"),
    },
    {
      text: "语法入门 HTML",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/HTML/入门"),
    },
    {
      text: "语法进阶 HTML",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/HTML/进阶"),
    },
    {
      text: "第三组件 HTML",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/HTML/组件"),
    },
    {
      text: "语法入门 CSS",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/CSS/入门"),
    },
    {
      text: "语法进阶 CSS",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/CSS/进阶"),
    },
    {
      text: "第三组件 CSS",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/CSS/组件"),
    },
    {
      text: "语法入门 JS",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/JS/入门"),
    },
    {
      text: "语法进阶 JS",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/JS/进阶"),
    },
    {
      text: "第三组件 JS",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/编程语言/JS/组件"),
    },
  ],
  "/编程修养/数构算法/": [
    {
      text: "数据结构",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/数构算法/数据结构"),
    },
    {
      text: "排序算法",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/数构算法/排序算法"),
    },
    {
      text: "基本算法",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/数构算法/基本算法"),
    },
  ],
  "/编程修养/系统网络/": [
    {
      text: "操作系统基础",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/系统网络/操作系统基础"),
    },
    {
      text: "操作系统原理",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/系统网络/操作系统原理"),
    },
    {
      text: "操作系统网络",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/系统网络/操作系统网络"),
    },
    {
      text: "操作系统软件",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/系统网络/操作系统软件"),
    },
  ],
  "/编程修养/数据存储/": [
    {
      text: "MySQL",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/数据存储/MySQL"),
    },
    {
      text: "Mongodb",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/数据存储/Mongodb"),
    },
    {
      text: "Redis",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/编程修养/数据存储/Redis"),
    },
  ],

  // 开发方向系列 - 侧边
  "/开发方向/业务开发/": [
    {
      text: "原生框架 Spring",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/开发方向/业务开发/spring"),
    },
    {
      text: "原生框架 Flask",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/开发方向/业务开发/flask"),
    },
    {
      text: "原生框架 Django",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/开发方向/业务开发/django"),
    },
    {
      text: "开发框架 Work Generator",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/开发方向/业务开发/work_generator"),
    },
  ],
  "/开发方向/系统开发/": [
    {
      text: "系统开发",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/开发方向/系统开发"),
    },
  ],
  "/开发方向/嵌入开发/": [
    {
      text: "嵌入开发",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/开发方向/嵌入开发"),
    },
  ],
  "/开发方向/页面开发/": [
    {
      text: "Vue",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/开发方向/页面开发/Vue"),
    },
    {
      text: "React",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/开发方向/页面开发/React"),
    },
  ],
  "/开发方向/桌面开发/": [
    {
      text: "QtCpp",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/开发方向/桌面开发/Qt/QtCpp"),
    },
    {
      text: "QML",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/开发方向/桌面开发/Qt/QML"),
    },
  ],
  "/开发方向/移动开发/": [
    {
      text: "移动开发",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状
      children: generateVuePressPaths("/开发方向/移动开发"),
    },
  ],
  "/开发方向/组件开发/": [
    {
      text: "组件开发",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状
      children: generateVuePressPaths("/开发方向/组件开发"),
    },
  ],

  // 软件设计系列 - 侧边
  "/软件设计/软件工程/": [
    {
      text: "软件工程",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/软件设计/软件工程"),
    },
  ],
  "/软件设计/系统架构/": [
    {
      text: "系统架构",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/软件设计/系统架构"),
    },
  ],
  "/软件设计/设计模式/": [
    {
      text: "设计模式",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/软件设计/设计模式"),
    },
  ],
  "/软件设计/编码规范/": [
    {
      text: "编码规范",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/软件设计/编码规范"),
    },
  ],

  // 服务集群系列 - 侧边
  "/服务集群/服务搭建/": [
    {
      text: "服务搭建",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/服务集群/服务搭建"),
    },
  ],
  "/服务集群/分布架构/": [
    {
      text: "分布架构",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/服务集群/分布架构"),
    },
  ],
  "/服务集群/云微服务/": [
    {
      text: "云微服务",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/服务集群/云微服务"),
    },
  ],
  "/服务集群/集群部署/": [
    {
      text: "集群部署",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/服务集群/集群部署"),
    },
  ],

  // 理论研究系列 - 侧边
  "/理论研究/图像视觉": [
    {
      text: "基础理论",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/理论研究/图像视觉/基础理论"),
    },
    {
      text: "实践应用",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/理论研究/图像视觉/实践应用"),
    },
  ],
  "/理论研究/机器学习": [
    {
      text: "基础理论",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/理论研究/机器学习/基础理论"),
    },
    {
      text: "实践应用",
      collapsible: true, // 可折叠
      collapsed: true, // 默认折叠状态
      children: generateVuePressPaths("/理论研究/机器学习/实践应用"),
    },
  ],
};
