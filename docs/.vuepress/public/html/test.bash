#!/bin/bash

# 遍历当前目录下的所有文件
for file in *; do
  # 检查文件是否是普通文件
  if [ -f "$file" ]; then
    # 使用 sed 替换文件名前面的多个下划线（___）为一个下划线 (_)
    new_name=$(echo "$file" | sed 's/^___/_/')

    # 如果文件名发生变化，进行重命名
    if [ "$file" != "$new_name" ]; then
      echo "原文件名: $file"
      echo "新文件名: $new_name"
      mv "$file" "$new_name"
    fi
  fi
done
