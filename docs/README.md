---
date: 2024-11-24
home: true
title: 主页
heroImage: https://vuejs.press/images/hero.png

actions:
  - text: 查阅说明
    link: /其他内容/查阅说明/
    type: primary

  - text: 平台详情
    link: /其他内容/平台详情/
    type: secondary

  - text: 使用反馈
    link: /其他内容/使用反馈/
    type: secondary

  - text: 发布文章[欢迎提交您的文章]
    link: /其他内容/发布文章/
    type: secondary

features:
  - title: 项目手册
    details: 这里有科教平台工作室团队的开发流程项目手册文档，通俗易懂，快速上手。

  - title: 编程修养
    details: 这里有科教平台工作室团队精心打磨的编程修养文档，涉猎广泛，颇有深度。

  - title: 开发方向
    details: 这里有科教平台工作室团队工作规范的开发方向文档，扫清迷茫，一览无余。
    
  - title: 软件设计
    details: 这里有科教平台工作室团队工作规范的软件设计文档，敏捷开发，严谨标准。

  - title: 服务集群
    details: 这里有科教平台工作室团队对外公开的服务集群文档，云上服务，接口复用。

  - title: 理论研究
    details: 这里有科教平台工作室团队对外公开的理论研究文档，前沿技术，科学研究。

footer: MIT Licensed | Copyright © 2025-present 科教平台工作室
---

[default-theme-home]: https://vuejs.press/reference/default-theme/frontmatter.html#home-page

<el-carousel indicator-position="outside" height="450px">
    <el-carousel-item v-for="(image, index) in images" :key="index">
        <img :src="image" alt="Carousel Image" class="carousel-image" />
    </el-carousel-item>
</el-carousel>

<script setup>
import { ref } from "vue";

/* 轮播图组件配置 */
const images = ref([
  "/image/20250108-212600.904-1.jpg",
  "/image/20250108-212600.904-2.jpg",
  "/image/20250108-212600.904-3.jpg",
  "/image/20250108-212600.904-4.jpg",
  "/image/20250108-212600.904-5.jpg",
  "/image/20250108-212600.904-6.jpg",
]);

/* 折叠面板组件 */
const activeName = ref('0');
const theme = ref(document.documentElement.getAttribute('data-theme') || 'light');
const updateTheme = () => {
  theme.value = document.documentElement.getAttribute('data-theme') || 'light';
};
</script>

<style>
.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持图片比例并填充整个容器 */
}
</style>
