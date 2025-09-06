---
layout: projects
title: Our Projects
subtitle: Explore our open-source contributions to generative AI
lang: en
github_projects:
  - repo: "SynerGen-AI/EasyVideo"
    category: "computer-vision"
    image: "/assets/images/logo.png"
    description: "a full pipeline platform for AI video generation, including a designed prompt model, video diffusion models..."
    tags: ["AIGC", "Diffusion-Model"]
---

<div class="projects-page">
  <div class="projects-filter">
    <h3>Filter by Category</h3>
    <div class="filter-buttons">
      <button class="filter-btn active" data-filter="all">All Projects</button>
      <button class="filter-btn" data-filter="language-models">Language Models</button>
      <button class="filter-btn" data-filter="computer-vision">Computer Vision</button>
      <button class="filter-btn" data-filter="audio">Audio & Speech</button>
      <button class="filter-btn" data-filter="multimodal">Multimodal</button>
      <button class="filter-btn" data-filter="tools">Tools & Frameworks</button>
    </div>
  </div>

  <div class="projects-grid" id="projects-grid">
    <!-- GitHub projects will be dynamically loaded via JavaScript -->
  </div>

  <!-- GitHub projects data -->
  <script type="application/json" id="github-projects-data">
  {{ page.github_projects | jsonify }}
  </script>
  
  <script src="{{ '/assets/js/cache-manager.js' | relative_url }}"></script>
<script src="{{ '/assets/js/cache-monitor.js' | relative_url }}"></script>
<script src="{{ '/js/projects.js' | relative_url }}"></script>

  <div class="no-projects" style="display: none;">
    <p>Nothing found, but we are developing!!!</p>
  </div>
</div>

<!-- 引入项目页面专用样式 -->
<link rel="stylesheet" href="{{ '/css/projects.css' | relative_url }}">