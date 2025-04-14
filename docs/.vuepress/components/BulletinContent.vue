<script setup>
// 编写自定义公告内容交互
</script>

<template>
  <div class="bulletin-content">
    <!-- 自定义公告内容 -->
    <p>本网站正在不断升级中，若有 bug 可以在本开发者的对应项目下提交 <a href="https://github.com/limou3434/work-blog-website/issues" target="_blank">issues</a>。 您在使用中的任何问题也可以加入我们的 QQ 群聊一起讨论。</p>
    <img src="../public/qqtlq.png" alt="讨论群"/>
  </div>
</template>

<style scoped>
:root {
  --vp-bulletin-bg-color: var(--vp-c-bg);
  --vp-bulletin-text-color: var(--vp-c-text-1);
  --vp-bulletin-title-color: var(--vp-c-text-1);
  --vp-bulletin-font-size: 16px;
  --vp-bulletin-title-font-size: 18px;
  --vp-bulletin-line-height: 24px;
  --vp-bulletin-border-width: 2px;
  --vp-bulletin-border: conic-gradient(var(--vp-c-important-3), var(--vp-c-danger-3), var(--vp-c-success-3), var(--vp-c-important-3));
  --vp-bulletin-width: 320px;
}
</style>