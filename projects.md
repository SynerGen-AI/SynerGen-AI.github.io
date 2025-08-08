---
layout: page
title: Our Projects
subtitle: Explore our open-source contributions to generative AI
lang: en
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

  <div class="projects-grid">
    {% for project in site.projects %}
      {% if project.lang == 'en' or project.lang == nil %}
      <div class="project-card" data-category="{{ project.category }}">
        {% if project.image %}
        <div class="project-image">
          <img src="{{ project.image | relative_url }}" alt="{{ project.title }}">
        </div>
        {% endif %}
        
        <div class="project-content">
          <div class="project-header">
            <h3 class="project-title">
              <a href="{{ project.url | relative_url }}">{{ project.title }}</a>
            </h3>
            <div class="project-meta">
              {% if project.status %}
              <span class="project-status status-{{ project.status | downcase }}">{{ project.status }}</span>
              {% endif %}
              {% if project.category %}
              <span class="project-category">{{ project.category | replace: '-', ' ' | capitalize }}</span>
              {% endif %}
            </div>
          </div>
          
          <p class="project-description">{{ project.excerpt | strip_html | truncate: 150 }}</p>
          
          <div class="project-links">
            {% if project.github %}
            <a href="{{ project.github }}" target="_blank" class="project-link">
              <i class="fab fa-github"></i> GitHub
            </a>
            {% endif %}
            {% if project.demo %}
            <a href="{{ project.demo }}" target="_blank" class="project-link">
              <i class="fas fa-external-link-alt"></i> Demo
            </a>
            {% endif %}
            {% if project.paper %}
            <a href="{{ project.paper }}" target="_blank" class="project-link">
              <i class="fas fa-file-pdf"></i> Paper
            </a>
            {% endif %}
          </div>
          
          {% if project.tags %}
          <div class="project-tags">
            {% for tag in project.tags %}
            <span class="tag">{{ tag }}</span>
            {% endfor %}
          </div>
          {% endif %}
        </div>
      </div>
      {% endif %}
    {% endfor %}
  </div>
  
  <div class="no-projects" style="display: none;">
    <p>No projects found for the selected category.</p>
  </div>
</div>

<style>
.projects-page {
  max-width: 1200px;
  margin: 0 auto;
}

.projects-filter {
  margin-bottom: 3rem;
  text-align: center;
}

.projects-filter h3 {
  margin-bottom: 1rem;
  color: #1e293b;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #e2e8f0;
  background: white;
  color: #64748b;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.filter-btn:hover,
.filter-btn.active {
  border-color: #2563eb;
  background: #2563eb;
  color: white;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.project-image {
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-content {
  padding: 1.5rem;
}

.project-header {
  margin-bottom: 1rem;
}

.project-title a {
  color: #1e293b;
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: 600;
  transition: color 0.3s ease;
}

.project-title a:hover {
  color: #2563eb;
}

.project-meta {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

.project-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-active {
  background: #dcfce7;
  color: #166534;
}

.status-development {
  background: #fef3c7;
  color: #92400e;
}

.status-completed {
  background: #dbeafe;
  color: #1e40af;
}

.project-category {
  padding: 0.25rem 0.75rem;
  background: #f1f5f9;
  color: #475569;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.project-description {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.project-links {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f8fafc;
  color: #475569;
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.project-link:hover {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.5rem;
  background: #e2e8f0;
  color: #475569;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.no-projects {
  text-align: center;
  padding: 3rem;
  color: #64748b;
  font-style: italic;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .project-links {
    flex-direction: column;
  }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const noProjectsMessage = document.querySelector('.no-projects');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter projects
      let visibleCount = 0;
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });
      
      // Show/hide no projects message
      if (visibleCount === 0) {
        noProjectsMessage.style.display = 'block';
      } else {
        noProjectsMessage.style.display = 'none';
      }
    });
  });
});
</script>