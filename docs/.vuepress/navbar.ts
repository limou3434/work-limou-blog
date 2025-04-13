import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '博客', link: '/blog/' },
  { text: '标签', link: '/blog/tags/' },
  { text: '归档', link: '/blog/archives/' },
  {
    text: '编码修养',
    items: [
      // { text: '编程语言', link: '/notes/1.编码修养/1.编程语言/README.md' },
      // { text: '数构算法', link: '/notes/1.编码修养/2.数构算法/README.md' },
      { text: '系统网络', link: '/notes/1.编码修养/3.系统网络/README.md' },
      // { text: '存储持久', link: '/notes/1.编码修养/4.持久存储/README.md' },
    ]
  },
  { text: '业务开发', link: '/notes/2.业务开发/README.md' },
  { text: '机器学习', link: '/notes/3.机器学习/README.md' },
])
