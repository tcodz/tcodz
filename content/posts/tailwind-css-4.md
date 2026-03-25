---
title: "Tailwind CSS 4 新特性"
date: "2026-03-23"
excerpt: "探索 Tailwind CSS 4 带来的新特性和改进，包括更快的构建速度和更好的开发体验。"
tags: ["CSS", "Tailwind CSS", "前端"]
---

# Tailwind CSS 4 新特性

Tailwind CSS 4 带来了许多令人兴奋的新特性和改进。

## 主要改进

### 1. 更快的构建速度

Tailwind CSS 4 使用全新的引擎，构建速度提升了 10 倍以上。

### 2. 原生 CSS 变量

现在可以直接在 CSS 中使用 Tailwind 的设计令牌：

```css
@theme inline {
  --color-primary: #3b82f6;
  --font-sans: var(--font-geist-sans);
}
```

### 3. 简化的配置

不再需要 `tailwind.config.js`，直接在 CSS 中配置：

```css
@import "tailwindcss";

@theme inline {
  --color-background: #ffffff;
  --color-foreground: #171717;
}
```

## 新的工具类

- `size-*` - 同时设置宽度和高度
- `rounded-sm` 到 `rounded-full` - 更灵活的圆角
- `bg-gradient-*` - 简化的渐变背景

## 迁移建议

如果你正在使用 Tailwind CSS 3，迁移到 v4 非常简单：

1. 更新依赖版本
2. 将配置移到 CSS 文件
3. 运行构建测试

Tailwind CSS 4 是一次重大更新，值得尝试！