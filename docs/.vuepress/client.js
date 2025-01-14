/**
 * docs/.vuepress/client.js
 * 网站客户配置文件, 主要引入 docs/.vuepress/components/ 的自定义组件和其他框架中的原生组件
 */

import { defineClientConfig } from "vuepress/client";

import TestLayout from "./layouts/TestLayout.vue";

import * as ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import Test from "./components/Test.vue";

export default defineClientConfig({
  // 引入自定义布局
  layouts: {
    TestLayout,
  },

  // 引入 Vue 组件
  enhance({ app, router, siteData }) {
    // 引入自定组件
    app.component("Test", Test);

    // 引入集成组件
    app.component("MdEditor", MdEditor);

    // 引入框架组件
    for (const [key, component] of Object.entries(ElementPlus)) {
      app.component(key, component);
    }

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },

  // 提示客户端配置加载成功
  setup() {
    console.log("客户端组件已加载");
  },
  rootComponents: [],
});
