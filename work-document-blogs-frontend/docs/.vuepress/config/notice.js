/**
 * docs/.vuepress/config/notice.js
 * 网站公告配置
 */

// 全站消息通知
const gTitle = "欢迎光临~";
const gMessage = "本次新增加了数据库 Redis 和 Spring boot 的相关内容。";

// 通知路径配置
export default [
  {
    path: "/",
    title: gTitle,
    content: gMessage,
    actions: [
      {
        text: "确认",
        type: "primary",
      },
      { text: "反馈", link: "/其他内容/使用反馈/" },
    ],
    fullscreen: true, // 是否全屏
  },
  // TODO: 貌似无法做到不同路径获取不同公告
];
