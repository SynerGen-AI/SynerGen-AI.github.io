---
layout: projects
title: 我们的项目
subtitle: 探索我们对生成式AI的开源贡献
lang: cn
github_projects:
  - repo: "SynerGen-AI/EasyVideo"
    category: "computer-vision"
    image: "/assets/images/logo.png"
    description: "一个全栈的视频生成平台,包含promt model, video diffusion model等模块"
    tags: ["AIGC", "扩散模型"]
---

<div class="projects-page">
  <div class="projects-filter">
    <h3>按类别筛选</h3>
    <div class="filter-buttons">
      <button class="filter-btn active" data-filter="all">所有项目</button>
      <button class="filter-btn" data-filter="language-models">语言模型</button>
      <button class="filter-btn" data-filter="computer-vision">计算机视觉</button>
      <button class="filter-btn" data-filter="audio">音频与语音</button>
      <button class="filter-btn" data-filter="multimodal">多模态</button>
      <button class="filter-btn" data-filter="tools">工具与框架</button>
    </div>
  </div>

  <div class="projects-grid" id="projects-grid">
    <!-- GitHub项目将通过JavaScript动态加载 -->
  </div>

  <!-- GitHub项目数据 -->
  <script type="application/json" id="github-projects-data">
  {{ page.github_projects | jsonify }}
  </script>
  
  <script src="{{ '/assets/js/cache-manager.js' | relative_url }}"></script>
<script src="{{ '/assets/js/cache-monitor.js' | relative_url }}"></script>
<script src="{{ '/js/projects.js' | relative_url }}"></script>

  <div class="no-projects" style="display: none;">
    <p>所选类别中没有找到项目。</p>
  </div>
</div>


<!-- 引入项目页面专用样式 -->
<link rel="stylesheet" href="{{ '/css/projects.css' | relative_url }}">