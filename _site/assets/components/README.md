# 神经网络组件使用指南

## 概述

这是一个可复用的神经网络动画组件，基于videos.html中的team-nodes结构抽取而来，支持多种主题和自定义配置。

## 文件结构

```
assets/
├── components/
│   ├── neural-network.html    # 组件HTML模板
│   └── README.md             # 使用说明
├── css/
│   └── neural-network.css    # 组件样式
└── js/
    └── neural-network.js     # 组件JavaScript
```

## 使用方法

### 1. 基本使用

在Jekyll页面中包含组件：

```html
{% include neural-network.html %}
```

### 2. 自定义参数

```html
{% include neural-network.html width=400 height=300 theme="purple" %}
```

### 3. 在HTML中直接使用

```html
<div class="neural-network-component" data-width="350" data-height="250" data-theme="orange">
    <div class="neural-nodes">
        <div class="neural-node neural-1"></div>
        <div class="neural-node neural-2"></div>
        <div class="neural-node neural-3"></div>
        <div class="neural-node neural-4"></div>
        <div class="neural-connection neural-conn-1"></div>
        <div class="neural-connection neural-conn-2"></div>
        <div class="neural-connection neural-conn-3"></div>
        <div class="neural-connection neural-conn-4"></div>
        <div class="neural-connection neural-conn-5"></div>
        <div class="neural-connection neural-conn-6"></div>
    </div>
</div>
```

## 参数说明

### HTML参数

- `width`: 组件宽度（默认：300px）
- `height`: 组件高度（默认：300px）
- `theme`: 主题颜色（默认：default，可选：blue、purple、orange）

### JavaScript选项

```javascript
const neuralNetwork = new NeuralNetworkComponent(container, {
    width: 400,
    height: 300,
    theme: 'blue',
    animationSpeed: 1.5,
    interactive: true
});
```

## 主题样式

### 默认主题（绿色）
- 节点：绿色渐变
- 连接线：绿色

### 蓝色主题
- 节点：蓝色渐变
- 连接线：蓝色

### 紫色主题
- 节点：紫色渐变
- 连接线：紫色

### 橙色主题
- 节点：橙色渐变
- 连接线：橙色

## 交互功能

1. **节点点击**：点击任意节点会高亮该节点及其相关连接线
2. **悬停效果**：鼠标悬停在节点上会有放大效果
3. **动画控制**：支持暂停/播放动画
4. **速度调节**：支持调整动画速度

## 响应式设计

组件自动适配不同屏幕尺寸：

- 桌面端：300x300px
- 平板端：250x250px
- 手机端：200x200px
- 大屏幕：350x350px

## 在页面中集成

### 1. 引入CSS和JS文件

```html
<link rel="stylesheet" href="{{ '/assets/css/neural-network.css' | relative_url }}">
<script src="{{ '/assets/js/neural-network.js' | relative_url }}"></script>
```

### 2. 使用组件

```html
{% include neural-network.html width=300 height=300 theme="blue" %}
```

## 示例页面

参考 `videos.html` 中的使用示例：

```html
<div class="videos-hero-visual">
    {% include neural-network.html width=300 height=300 theme="blue" %}
</div>
```

## 自定义扩展

### 添加新主题

在 `neural-network.css` 中添加新主题：

```css
.neural-network-component.theme-red .neural-node {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
}

.neural-network-component.theme-red .neural-connection {
    background: linear-gradient(90deg, transparent, #ef4444, transparent);
}
```

### 修改动画效果

在 `neural-network.js` 中调整动画参数：

```javascript
// 修改脉冲动画
@keyframes neuralNodePulse {
    0%, 100% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.2); // 调整缩放比例
        opacity: 0.6; // 调整透明度
    }
}
```

## 注意事项

1. 确保在使用组件的页面中引入了必要的CSS和JS文件
2. 组件会自动初始化，无需手动调用
3. 支持多个组件实例在同一页面中使用
4. 组件具有完整的响应式支持
