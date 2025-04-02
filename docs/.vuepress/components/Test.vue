<template>
  <div>
    <h3>{{ msg }}</h3>
    <RedDiv>
      <p>这是一个红色测试的段落。</p>
    </RedDiv>
  </div>
</template>

<script setup>
import { h, ref } from "vue";

const RedDiv = (_, ctx) =>
  h(
    "div",
    {
      class: "red-div",
    },
    ctx.slots.default(),
  );
const msg = "Markdown 中的 Vue";
</script>

<style>
.red-div {
  color: red;
}
</style>
