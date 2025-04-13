import {defineNoteConfig, defineNotesConfig} from 'vuepress-theme-plume'

const bcyyNote = defineNoteConfig({
    dir: '1.编码修养/1.编程语言',
    link: '/1.编码修养/1.编程语言',
    sidebar: ['', 'foo', 'bar'],
})

const sgsfNote = defineNoteConfig({
    dir: '1.编码修养/2.数构算法',
    link: '/1.编码修养/2.数构算法',
    sidebar: ['', 'foo', 'bar'],
})

const xtwlNote = defineNoteConfig({
    dir: '1.编码修养/3.系统网络',
    link: '/1.编码修养/3.系统网络',
    sidebar: ['', '001_ljp_2024_06_08_先导课程', '002_ljp_2024_06_09_基本指令', '003_ljp_2024_06_09_权限管理', '004_ljp_2023_08_04_编辑器', '005_ljp_2023_09_08_编译器', '006_ljp_2023_09_25_调试器', '007_ljp_2023_09_12_构建器', '008_ljp_2023_09_28_软件管理', '009_ljp_2023_09_14_进度条程序'],
})

const cjccNote = defineNoteConfig({
    dir: '1.编码修养/4.持久存储',
    link: '/1.编码修养/4.持久存储',
    sidebar: ['', 'foo', 'bar'],
})

const ywkfNote = defineNoteConfig({
    dir: '2.业务开发',
    link: '/2.业务开发',
    sidebar: ['', '001_ljp_2024_10_16_java_web', '002_ljp_2024_10_16_maven', '003_ljp_2024_10_16_mybatis_plus', '004_ljp_2024_10_16_spring_framework', '005_ljp_2024_10_16_spring_mvc', '006_ljp_2024_10_16_spring_boot', '007_ljp_2025_02_09_spring_cloud'],
})

const jqxxNote = defineNoteConfig({
  dir: '3.机器学习',
  link: '/3.机器学习',
  sidebar: ['', '001_ljp_2025_03_30_快速入门', '002_ljp_2025_03_31_基础内容', '003_ljp_2025_03_31_进阶内容', '004_ljp_2025_03_31_语言处理'],
})

export const notes = defineNotesConfig({
    dir: 'notes',
    link: '/',
    notes: [bcyyNote, sgsfNote, xtwlNote, cjccNote, ywkfNote, jqxxNote],
})
