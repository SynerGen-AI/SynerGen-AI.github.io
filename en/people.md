---
layout: people
title: Our Team
subtitle: Meet the researchers and developers behind SynerGen-AI
lang: en
github_members:
  core:
    - username: "GoldenKerwin"
      role: "CTO"
    - username: "35tang"
      role: "AI Researcher"
    - username: "luohj29"
      role: "Software Developer"
---

<div class="people-page">
  <div class="team-intro">
    <p>SynerGen-AI brings together a diverse team of researchers, engineers, and AI enthusiasts from around the world. Our team combines deep expertise in machine learning, software engineering, and domain knowledge, committed to advancing the field of generative AI.</p>
  </div>

  <div class="team-sections">
    <section class="team-section">
      <h2>Core Team</h2>
      <div class="team-grid" id="core-team-grid">
        <!-- Core team members will be dynamically loaded via JavaScript -->
      </div>
    </section>
  </div>
</div>

<!-- GitHub members data -->
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
    <h2>Join Our Team</h2>
    <p>We are always looking for talented researchers, engineers, and contributors to join us in advancing the mission of generative AI. Whether you are interested in full-time positions, research collaborations, or open source contributions, we would love to hear from you.</p>
    <div class="join-actions">
      <a href="/contact/" class="btn btn-primary">Contact Us</a>
      <a href="https://github.com/SynerGen-AI" target="_blank" class="btn btn-secondary">View Open Issues</a>
    </div>
  </div>
</div>


<!-- 引入团队成员页面专用样式 -->
<link rel="stylesheet" href="{{ '/css/people.css' | relative_url }}">