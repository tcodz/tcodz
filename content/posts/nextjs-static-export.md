---
title: "Next.js 静态导出指南"
date: "2026-03-24"
excerpt: "学习如何使用 Next.js 的静态导出功能，将应用部署到 GitHub Pages。"
tags: ["Next.js", "GitHub Pages", "部署"]
---

# Next.js 静态导出指南

Next.js 支持静态导出，可以将整个应用导出为静态 HTML 文件，非常适合部署到 GitHub Pages。

## 配置静态导出

在 `next.config.ts` 中添加以下配置：

```typescript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
```

## 构建和导出

运行以下命令构建静态文件：

```bash
bun run build
```

构建完成后，静态文件会输出到 `out` 目录。

## 部署到 GitHub Pages

1. 将 `out` 目录的内容推送到 `gh-pages` 分支
2. 在 GitHub 仓库设置中启用 GitHub Pages
3. 选择 `gh-pages` 分支作为源

## 注意事项

- 静态导出不支持 API 路由
- 需要使用 `unoptimized: true` 禁用图片优化
- 动态路由需要在 `generateStaticParams` 中预定义

## 总结

Next.js 的静态导出功能让部署静态网站变得非常简单，配合 GitHub Pages 可以免费托管个人博客。