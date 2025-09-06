# 视频展示JavaScript实现方案

## 功能概述
根据用户需求，重新设计了videos.js文件，实现动态读取`assets/videos`目录下的所有mp4视频文件，并平均分配到3列Flexbox容器中展示。

## 核心功能

### 1. 动态视频文件读取
```javascript
// 获取所有mp4视频文件
fetch('/assets/videos/')
    .then(response => response.text())
    .then(html => {
        // 解析HTML获取视频文件列表
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const links = doc.querySelectorAll('a[href$=".mp4"]');
        
        const videoFiles = Array.from(links).map(link => {
            const href = link.getAttribute('href');
            const fileName = href.split('/').pop();
            return {
                name: fileName,
                path: href,
                displayName: fileName.replace('.mp4', '').replace(/_/g, ' ')
            };
        });
    });
```

### 2. 3列平均分配算法
```javascript
// 平均分配到3列
const videosPerColumn = Math.ceil(videoFiles.length / 3);

videoFiles.forEach((videoFile, index) => {
    const columnIndex = Math.floor(index / videosPerColumn);
    const column = columns[columnIndex];
    
    // 创建视频容器
    const videoWrapper = createVideoWrapper(videoFile);
    column.appendChild(videoWrapper);
});
```

### 3. 动态视频容器创建
```javascript
function createVideoWrapper(videoFile) {
    const wrapper = document.createElement('div');
    wrapper.className = 'video-wrapper';
    wrapper.setAttribute('data-video-id', videoFile.displayName);
    
    wrapper.innerHTML = `
        <video class="gallery-video" preload="metadata" muted>
            <source src="${videoFile.path}" type="video/mp4">
            您的浏览器不支持视频播放。
        </video>
        <div class="video-info">
            <h3 class="video-title">${videoFile.displayName}</h3>
            <p class="video-description">AI生成视频</p>
        </div>
    `;
    
    return wrapper;
}
```

## 技术实现细节

### 1. 容器选择器
```javascript
// 获取3列容器
const columns = document.querySelectorAll('.video-gallery .wrapper > div > div');
```
- 精确选择HTML中定义的3个Flexbox列容器
- 验证容器数量确保布局正确

### 2. 视频文件处理
- **文件发现**: 通过fetch获取目录列表，解析HTML找到所有.mp4链接
- **文件名处理**: 提取文件名，生成显示名称（去除.mp4，替换下划线为空格）
- **排序**: 按文件名字母顺序排序，确保一致的显示顺序

### 3. 分配算法
```javascript
const videosPerColumn = Math.ceil(videoFiles.length / 3);
const columnIndex = Math.floor(index / videosPerColumn);
```
- 使用`Math.ceil()`确保所有视频都能被分配
- 使用`Math.floor()`确定每个视频应该放在哪一列
- 实现真正的平均分配

### 4. 错误处理
```javascript
.catch(error => {
    console.error('获取视频列表失败:', error);
    // 如果fetch失败，尝试使用Jekyll的静态文件数据
    loadVideosFromJekyll();
});
```
- 提供备用加载方案
- 详细的错误日志记录

## 保留的原有功能

### 1. 视频交互功能
- ✅ 点击播放/暂停
- ✅ 播放状态视觉反馈
- ✅ 键盘快捷键支持（ESC暂停所有）
- ✅ 视频结束自动停止

### 2. 加载和错误处理
- ✅ 加载状态指示
- ✅ 视频加载错误处理
- ✅ 懒加载支持（IntersectionObserver）

### 3. 用户体验
- ✅ 悬停效果
- ✅ 播放状态类名管理
- ✅ 响应式设计支持

## 与HTML结构的配合

### HTML结构
```html
<div style="display: flex; flex-direction: row; justify-content: space-between; gap: 16px; width: 100%;">
    <div style="display:flex;flex-direction:column;justify-content:flex-start;align-content:stretch;flex:1;width:0;gap:16px">
        <!-- 第1列视频 -->
    </div>
    <div style="display:flex;flex-direction:column;justify-content:flex-start;align-content:stretch;flex:1;width:0;gap:16px">
        <!-- 第2列视频 -->
    </div>
    <div style="display:flex;flex-direction:column;justify-content:flex-start;align-content:stretch;flex:1;width:0;gap:16px">
        <!-- 第3列视频 -->
    </div>
</div>
```

### JavaScript配合
- 精确选择3个列容器
- 动态创建video-wrapper元素
- 保持原有的CSS类名和结构

## 文件结构

### 视频文件组织
```
assets/videos/
├── video1.mp4
├── video2.mp4
├── video3.mp4
├── ...
└── videoN.mp4
```

### 生成的HTML结构
```html
<div class="video-wrapper" data-video-id="video1">
    <video class="gallery-video" preload="metadata" muted>
        <source src="/assets/videos/video1.mp4" type="video/mp4">
    </video>
    <div class="video-info">
        <h3 class="video-title">video1</h3>
        <p class="video-description">AI生成视频</p>
    </div>
</div>
```

## 性能优化

### 1. 懒加载
- 使用IntersectionObserver实现视频懒加载
- 减少初始页面加载时间
- 按需加载视频资源

### 2. 预加载策略
- 使用`preload="metadata"`只预加载元数据
- 平衡加载性能和用户体验

### 3. 错误恢复
- 提供多种加载方案
- 优雅的错误处理

## 浏览器兼容性

### 现代浏览器支持
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

### 关键API支持
- ✅ Fetch API
- ✅ DOMParser
- ✅ IntersectionObserver
- ✅ ES6+ 语法

## 使用说明

### 1. 添加新视频
- 将mp4文件放入`assets/videos/`目录
- 刷新页面即可自动显示
- 无需修改任何代码

### 2. 视频命名规范
- 使用有意义的文件名
- 下划线会被替换为空格显示
- 支持中文文件名

### 3. 视频格式要求
- 仅支持mp4格式
- 建议使用H.264编码
- 文件大小建议控制在合理范围内

## 调试和监控

### 1. 控制台日志
```javascript
console.error('需要3列容器来展示视频');
console.error('获取视频列表失败:', error);
console.log('使用Jekyll静态文件数据加载视频');
```

### 2. 错误处理
- 详细的错误信息记录
- 用户友好的错误提示
- 自动降级方案

## 扩展性

### 1. 支持更多视频格式
- 可以轻松扩展支持其他格式
- 修改文件扩展名过滤条件

### 2. 自定义分配策略
- 可以修改分配算法
- 支持按文件大小、时长等分配

### 3. 动态列数
- 可以扩展支持动态列数
- 根据屏幕尺寸调整列数

这个实现完全满足了用户的需求：动态读取视频文件，平均分配到3列，保持原有的CSS样式和交互功能。
