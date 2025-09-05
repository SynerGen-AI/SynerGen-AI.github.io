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

<style>
.people-page {
  max-width: 1200px;
  margin: 0 auto;
}

.team-intro {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 1.125rem;
  color: #64748b;
  line-height: 1.7;
}

.team-section {
  margin-bottom: 4rem;
}

.team-section h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1e293b;
  text-align: center;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.team-member {
  height: 100%;
}

.member-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.member-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.member-avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #e2e8f0;
}

.member-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
}

.member-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.member-name a {
  color: #1e293b;
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: 600;
  transition: color 0.3s ease;
}

.member-name a:hover {
  color: #2563eb;
}

.member-position {
  color: #2563eb;
  font-weight: 600;
  margin: 0.5rem 0;
}

.member-affiliation {
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.member-bio {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
}

.member-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.member-link {
  width: 40px;
  height: 40px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  text-decoration: none;
  transition: all 0.3s ease;
}

.member-link:hover {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
  transform: translateY(-2px);
}

.member-expertise {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.expertise-tag {
  padding: 0.25rem 0.75rem;
  background: #f1f5f9;
  color: #475569;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

/* 加载和错误状态样式 */
.loading-message, .error-message {
  text-align: center;
  padding: 3rem 2rem;
  color: #64748b;
  font-size: 1.125rem;
}

.loading-message i {
  margin-right: 0.5rem;
  color: #2563eb;
}

.error-message {
  color: #ef4444;
}

.error-message i {
  margin-right: 0.5rem;
}

/* 错误卡片样式 */
.error-card {
  border-color: #fecaca;
  background: #fef2f2;
}

.error-card .avatar-placeholder {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.error-text {
  color: #ef4444;
  font-style: italic;
}

/* 成员统计样式 */
.member-stats {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #64748b;
}

.stat-item i {
  color: #2563eb;
}

/* 成员姓名样式更新 */
.member-name {
  color: #1e293b;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  transition: color 0.3s ease;
}

.member-name:hover {
  color: #2563eb;
}

.join-team {
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border-radius: 12px;
  padding: 3rem;
  text-align: center;
  margin-top: 4rem;
}

.join-team h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1e293b;
}

.join-team p {
  font-size: 1.125rem;
  color: #64748b;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.join-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .team-grid {
    grid-template-columns: 1fr;
  }
  
  .join-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .join-team {
    padding: 2rem;
  }
}
</style>