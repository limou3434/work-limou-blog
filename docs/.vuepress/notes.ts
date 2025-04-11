import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

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
  sidebar: ['', '001_ljp_2024_06_08_先导课程', '002_ljp_2024_06_09_基本指令', '003_ljp_2024_06_09_权限管理'],
})

const cjccNote = defineNoteConfig({
  dir: '1.编码修养/4.持久存储',
  link: '/1.编码修养/4.持久存储',
  sidebar: ['', 'foo', 'bar'],
})

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [bcyyNote, sgsfNote, xtwlNote, cjccNote],
})
