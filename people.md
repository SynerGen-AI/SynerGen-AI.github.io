---
layout: people
title: Our Team
subtitle: Meet the researchers and developers behind SynerGen-AI
lang: en
---

<div class="people-page">
  <div class="team-intro">
    <p>SynerGen-AI brings together a diverse group of researchers, engineers, and AI enthusiasts from around the world. Our team combines deep expertise in machine learning, software engineering, and domain-specific knowledge to advance the field of generative AI.</p>
  </div>

  <div class="team-sections">
    <section class="team-section">
      <h2>Core Team</h2>
      <div class="team-grid">
        {% assign core_members = site.people | where: "role", "core" %}
        {% for person in core_members %}
          {% if person.lang == 'en' or person.lang == nil %}
          <div class="team-member">
            <div class="member-card">
              <div class="member-avatar">
                {% if person.avatar %}
                <img src="{{ person.avatar | relative_url }}" alt="{{ person.name }}">
                {% else %}
                <div class="avatar-placeholder">
                  <i class="fas fa-user"></i>
                </div>
                {% endif %}
              </div>
              
              <div class="member-info">
                <h3 class="member-name">
                  <a href="{{ person.url | relative_url }}">{{ person.name }}</a>
                </h3>
                {% if person.position %}
                <p class="member-position">{{ person.position }}</p>
                {% endif %}
                {% if person.affiliation %}
                <p class="member-affiliation">{{ person.affiliation }}</p>
                {% endif %}
                
                {% if person.excerpt %}
                <p class="member-bio">{{ person.excerpt | strip_html | truncate: 120 }}</p>
                {% endif %}
                
                <div class="member-links">
                  {% if person.email %}
                  <a href="mailto:{{ person.email }}" class="member-link" title="Email">
                    <i class="fas fa-envelope"></i>
                  </a>
                  {% endif %}
                  {% if person.github %}
                  <a href="https://github.com/{{ person.github }}" target="_blank" class="member-link" title="GitHub">
                    <i class="fab fa-github"></i>
                  </a>
                  {% endif %}
                  {% if person.linkedin %}
                  <a href="{{ person.linkedin }}" target="_blank" class="member-link" title="LinkedIn">
                    <i class="fab fa-linkedin"></i>
                  </a>
                  {% endif %}
                  {% if person.website %}
                  <a href="{{ person.website }}" target="_blank" class="member-link" title="Website">
                    <i class="fas fa-globe"></i>
                  </a>
                  {% endif %}
                  {% if person.twitter %}
                  <a href="https://twitter.com/{{ person.twitter }}" target="_blank" class="member-link" title="Twitter">
                    <i class="fab fa-twitter"></i>
                  </a>
                  {% endif %}
                </div>
                
                {% if person.expertise %}
                <div class="member-expertise">
                  {% for skill in person.expertise %}
                  <span class="expertise-tag">{{ skill }}</span>
                  {% endfor %}
                </div>
                {% endif %}
              </div>
            </div>
          </div>
          {% endif %}
        {% endfor %}
      </div>
    </section>

    <section class="team-section">
      <h2>Research Fellows</h2>
      <div class="team-grid">
        {% assign research_fellows = site.people | where: "role", "research" %}
        {% for person in research_fellows %}
          {% if person.lang == 'en' or person.lang == nil %}
          <div class="team-member">
            <div class="member-card">
              <div class="member-avatar">
                {% if person.avatar %}
                <img src="{{ person.avatar | relative_url }}" alt="{{ person.name }}">
                {% else %}
                <div class="avatar-placeholder">
                  <i class="fas fa-user"></i>
                </div>
                {% endif %}
              </div>
              
              <div class="member-info">
                <h3 class="member-name">
                  <a href="{{ person.url | relative_url }}">{{ person.name }}</a>
                </h3>
                {% if person.position %}
                <p class="member-position">{{ person.position }}</p>
                {% endif %}
                {% if person.affiliation %}
                <p class="member-affiliation">{{ person.affiliation }}</p>
                {% endif %}
                
                {% if person.excerpt %}
                <p class="member-bio">{{ person.excerpt | strip_html | truncate: 120 }}</p>
                {% endif %}
                
                <div class="member-links">
                  {% if person.email %}
                  <a href="mailto:{{ person.email }}" class="member-link" title="Email">
                    <i class="fas fa-envelope"></i>
                  </a>
                  {% endif %}
                  {% if person.github %}
                  <a href="https://github.com/{{ person.github }}" target="_blank" class="member-link" title="GitHub">
                    <i class="fab fa-github"></i>
                  </a>
                  {% endif %}
                  {% if person.linkedin %}
                  <a href="{{ person.linkedin }}" target="_blank" class="member-link" title="LinkedIn">
                    <i class="fab fa-linkedin"></i>
                  </a>
                  {% endif %}
                  {% if person.website %}
                  <a href="{{ person.website }}" target="_blank" class="member-link" title="Website">
                    <i class="fas fa-globe"></i>
                  </a>
                  {% endif %}
                </div>
                
                {% if person.expertise %}
                <div class="member-expertise">
                  {% for skill in person.expertise %}
                  <span class="expertise-tag">{{ skill }}</span>
                  {% endfor %}
                </div>
                {% endif %}
              </div>
            </div>
          </div>
          {% endif %}
        {% endfor %}
      </div>
    </section>

    <section class="team-section">
      <h2>Contributors</h2>
      <div class="team-grid">
        {% assign contributors = site.people | where: "role", "contributor" %}
        {% for person in contributors %}
          {% if person.lang == 'en' or person.lang == nil %}
          <div class="team-member">
            <div class="member-card">
              <div class="member-avatar">
                {% if person.avatar %}
                <img src="{{ person.avatar | relative_url }}" alt="{{ person.name }}">
                {% else %}
                <div class="avatar-placeholder">
                  <i class="fas fa-user"></i>
                </div>
                {% endif %}
              </div>
              
              <div class="member-info">
                <h3 class="member-name">
                  <a href="{{ person.url | relative_url }}">{{ person.name }}</a>
                </h3>
                {% if person.position %}
                <p class="member-position">{{ person.position }}</p>
                {% endif %}
                {% if person.affiliation %}
                <p class="member-affiliation">{{ person.affiliation }}</p>
                {% endif %}
                
                <div class="member-links">
                  {% if person.github %}
                  <a href="https://github.com/{{ person.github }}" target="_blank" class="member-link" title="GitHub">
                    <i class="fab fa-github"></i>
                  </a>
                  {% endif %}
                  {% if person.linkedin %}
                  <a href="{{ person.linkedin }}" target="_blank" class="member-link" title="LinkedIn">
                    <i class="fab fa-linkedin"></i>
                  </a>
                  {% endif %}
                </div>
              </div>
            </div>
          </div>
          {% endif %}
        {% endfor %}
      </div>
    </section>
  </div>

  <div class="join-team">
    <div class="join-team-content">
      <h2>Join Our Team</h2>
      <p>We're always looking for talented researchers, engineers, and contributors to join our mission of advancing generative AI. Whether you're interested in full-time positions, research collaborations, or open-source contributions, we'd love to hear from you.</p>
      <div class="join-actions">
        <a href="/contact/" class="btn btn-primary">Get in Touch</a>
        <a href="https://github.com/SynerGen-AI" target="_blank" class="btn btn-secondary">View Open Issues</a>
      </div>
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