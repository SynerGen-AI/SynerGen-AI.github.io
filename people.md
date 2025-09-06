---
layout: people
title: 我们的团队
subtitle: 认识SynerGen-AI背后的研究人员和开发者
lang: cn
github_members:
  core:
    - username: "GoldenKerwin"
      role: "首席技术官"
    - username: "35tang"
      role: "AI研究员"
    - username: "luohj29"
      role: "软件开发者"
---

<div class="people-page">
  <!-- <div class="team-intro">
    <p>SynerGen-AI汇聚了来自世界各地的多元化研究人员、工程师和AI爱好者团队。我们的团队结合了机器学习、软件工程和领域专业知识的深厚专业技能，致力于推进生成式AI领域的发展。</p>
  </div> -->

  <div class="team-sections">
    <section class="team-section">
      <h2>核心团队</h2>
      <div class="team-grid" id="core-team-grid">
        <!-- 核心团队成员将通过JavaScript动态加载 -->
      </div>
    </section>
  </div>
</div>

<!-- GitHub成员数据 -->
<script type="application/json" id="github-members-data">
{{ page.github_members | jsonify }}
</script>

<script>
// 将GitHub成员数据传递给JavaScript
const githubMembersData = {{ page.github_members | jsonify }};
</script>

<script src="{{ '/assets/js/cache-manager.js' | relative_url }}"></script>
<script src="{{ '/assets/js/cache-monitor.js' | relative_url }}"></script>
<script src="{{ '/js/people.js' | relative_url }}"></script>

<div class="join-team">
  <div class="join-team-content">
    <h2>加入我们的团队</h2>
    <p>我们一直在寻找有才华的研究人员、工程师和贡献者加入我们推进生成式AI的使命。无论您对全职职位、研究合作还是开源贡献感兴趣，我们都很乐意听到您的声音。</p>
    <div class="join-actions">
      <a href="/contact/" class="btn btn-primary">联系我们</a>
      <a href="https://github.com/SynerGen-AI" target="_blank" class="btn btn-secondary">查看开放问题</a>
    </div>
  </div>
</div>

<!-- 引入团队成员页面专用样式 -->
<link rel="stylesheet" href="{{ '/css/people.css' | relative_url }}">