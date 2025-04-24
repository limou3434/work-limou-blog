import {defineNoteConfig, defineNotesConfig} from 'vuepress-theme-plume'

import path from "path";
import fs from "fs";

// 快速生成侧边对象
export function generateNoteConfig(link) {
    const dir = link.replace(/^\//, '') // 去除开头斜杠
    const fullPath = path.resolve(process.cwd(), 'docs/notes', dir)
    const files = fs.existsSync(fullPath) ? fs.readdirSync(fullPath) : []
    const sidebar = [''].concat(
        files
            .filter(f => f.endsWith('.md') && f !== 'README.md')
            .map(f => f.slice(0, -3))
            .sort()
    )
    return { dir, link, sidebar }
}

export const notes = defineNotesConfig({
    dir: 'notes',
    link: '/',
    notes: [
        defineNoteConfig(generateNoteConfig('/1.编码修养/1.编程语言')),
        defineNoteConfig(generateNoteConfig('/1.编码修养/2.数构算法')),
        defineNoteConfig(generateNoteConfig('/1.编码修养/3.系统网络')),
        defineNoteConfig(generateNoteConfig('/1.编码修养/4.持久存储')),
        defineNoteConfig(generateNoteConfig('/2.业务开发')),
        defineNoteConfig(generateNoteConfig('/3.机器学习')),
    ],
})
