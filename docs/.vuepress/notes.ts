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
    sidebar: ['', '001_ljp_2024_06_08_先导课程', '002_ljp_2024_06_09_基本指令', '003_ljp_2024_06_09_权限管理', '004_ljp_2023_08_04_编辑器', '005_ljp_2023_09_08_编译器', '006_ljp_2023_09_25_调试器', '007_ljp_2023_09_12_构建器', '008_ljp_2023_09_28_软件管理', '009_ljp_2023_09_14_进度条程序', '010_ljp_2024_05_11_脚本编程', '011_ljp_2023_09_09_进程基础', '012_ljp_2023_09_27_环境变量', '013_ljp_2023_09_14_简易外核', '014_ljp_2023_09_14_磁盘内存', '015_ljp_2023_10_02_进程通信', '016_ljp_2023_12_23_线程开发', '017_ljp_2023_12_19_进程信号', '018_ljp_2024_03_30_常驻服务', '019_ljp_2024_01_25_网络基础', '020_ljp_2024_01_23_网络编程', '021_ljp_2024_03_18_应用层', '022_ljp_2024_03_28_传输层', '023_ljp_2024_03_28_网络层', '024_ljp_2024_03_28_链路层', '025_ljp_2024_10_13_物理层', '026_ljp_2024_06_01_其他协议', '027_ljp_2024_04_08_高级IO', '028_ljp_2024_09_20_网络配置', '029_ljp_2024_06_01_URL过程', '030_ljp_2024_11_12_网络应用演变', '031_ljp_2023_08_18_版本管理软件', '032_ljp_2024_09_26_远程连接软件', '033_ljp_2024_08_06_内网穿透软件', '034_ljp_2024_08_06_服务管理软件', '035_ljp_2024_09_18_终端优化软件', '036_ljp_2024_09_05_服务程序软件', '037_ljp_2024_08_06_项目部署软件', '038_ljp_2024_08_06_容器隔离软件', '039_ljp_2024_10_05_集群管理软件', '040_ljp_2024_10_11_现代指令软件', '041_ljp_2024_11_21_面板管理软件'],
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
