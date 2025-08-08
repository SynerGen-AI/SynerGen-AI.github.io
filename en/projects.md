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

  <div class="no-projects" style="display: none;">
    <p>Nothing found, but we are developing!!!</p>
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

  <!-- GitHub projects data -->
  <script type="application/json" id="github-projects-data">
  {{ page.github_projects | jsonify }}
  </script>
  
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
  
  // Initialize GitHub projects
   initializeGitHubProjects();
 });
 
 // GitHub projects auto-rendering functionality
 async function initializeGitHubProjects() {
   const projectsDataElement = document.getElementById('github-projects-data');
   if (projectsDataElement) {
     try {
       const projectsData = JSON.parse(projectsDataElement.textContent);
       await renderGitHubProjects(projectsData);
       initializeProjectFilter();
     } catch (error) {
       console.error('Failed to parse GitHub projects data:', error);
       showErrorMessage('Failed to load project data');
     }
   }
 }
 
 async function renderGitHubProjects(projectsData) {
   const projectsGrid = document.getElementById('projects-grid');
   if (!projectsGrid) return;
   
   // Show loading state
   projectsGrid.innerHTML = '<div class="loading-message"><i class="fas fa-spinner fa-spin"></i> Loading GitHub projects...</div>';
   
   try {
     const projectCards = await Promise.all(
       projectsData.map(project => fetchAndRenderProject(project))
     );
     
     projectsGrid.innerHTML = projectCards.join('');
   } catch (error) {
     projectsGrid.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Failed to load GitHub projects</div>';
     console.error('Failed to load GitHub projects:', error);
   }
 }
 
 async function fetchAndRenderProject(projectConfig) {
   try {
     // Use cache manager to get repository data
     const repoData = await window.gitHubCache.getGitHubRepo(projectConfig.repo);
     return createProjectCard(repoData, projectConfig);
     
   } catch (error) {
     console.error(`Failed to get GitHub repository ${projectConfig.repo} info:`, error);
     return createErrorProjectCard(projectConfig);
   }
 }
 
 function createProjectCard(repoData, config) {
   const imageUrl = config.image || 'https://via.placeholder.com/400x200?text=No+Image';
   const description = config.description || repoData.description || 'No description available';
   const tags = config.tags || [];
   
   return `
     <div class="project-card github-project" data-category="${config.category}">
       <div class="project-image">
         <img src="${imageUrl}" alt="${repoData.name}" loading="lazy">
       </div>
       
       <div class="project-content">
         <div class="project-header">
           <h3 class="project-title">
             <a href="${repoData.html_url}" target="_blank">${repoData.name}</a>
           </h3>
           <div class="project-meta">
             <span class="project-category">${getCategoryName(config.category)}</span>
             ${repoData.language ? `<span class="project-language">${repoData.language}</span>` : ''}
           </div>
         </div>
         
         <p class="project-description">${description}</p>
         
         <div class="github-stats">
           <span class="github-stat">
             <i class="fas fa-star"></i> ${formatNumber(repoData.stargazers_count)}
           </span>
           <span class="github-stat">
             <i class="fas fa-code-branch"></i> ${formatNumber(repoData.forks_count)}
           </span>
           <span class="github-stat">
             <i class="fas fa-eye"></i> ${formatNumber(repoData.watchers_count)}
           </span>
           ${repoData.open_issues_count ? `<span class="github-stat"><i class="fas fa-exclamation-circle"></i> ${repoData.open_issues_count}</span>` : ''}
         </div>
         
         <div class="project-links">
           <a href="${repoData.html_url}" target="_blank" class="project-link">
             <i class="fab fa-github"></i> GitHub
           </a>
           ${repoData.homepage ? `<a href="${repoData.homepage}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i> Website</a>` : ''}
         </div>
         
         ${tags.length > 0 ? `
         <div class="project-tags">
           ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
         </div>
         ` : ''}
       </div>
     </div>
   `;
 }
 
 function createErrorProjectCard(config) {
   return `
     <div class="project-card error-card" data-category="${config.category}">
       <div class="project-content">
         <div class="project-header">
           <h3 class="project-title">${config.repo}</h3>
           <div class="project-meta">
             <span class="project-category">${getCategoryName(config.category)}</span>
           </div>
         </div>
         
         <p class="project-description">${config.description || 'Unable to load project information'}</p>
         
         <div class="error-message">
           <i class="fas fa-exclamation-triangle"></i> Unable to fetch project data from GitHub
         </div>
         
         ${config.tags && config.tags.length > 0 ? `
         <div class="project-tags">
           ${config.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
         </div>
         ` : ''}
       </div>
     </div>
   `;
 }
 
 function getCategoryName(category) {
   const categoryNames = {
     'language-models': 'Language Models',
     'computer-vision': 'Computer Vision',
     'audio': 'Audio & Speech',
     'multimodal': 'Multimodal',
     'tools': 'Tools & Frameworks'
   };
   return categoryNames[category] || category;
 }
 
 function formatNumber(num) {
   if (num >= 1000) {
     return (num / 1000).toFixed(1) + 'k';
   }
   return num.toString();
 }
 
 function showErrorMessage(message) {
   const projectsGrid = document.getElementById('projects-grid');
   if (projectsGrid) {
     projectsGrid.innerHTML = `<div class="error-message"><i class="fas fa-exclamation-triangle"></i> ${message}</div>`;
   }
 }
 
 // Project filtering functionality
 function initializeProjectFilter() {
   const filterButtons = document.querySelectorAll('.filter-btn');
   const noProjectsMessage = document.querySelector('.no-projects');
   
   filterButtons.forEach(button => {
     button.addEventListener('click', function() {
       const filter = this.getAttribute('data-filter');
       
       // Update active button
       filterButtons.forEach(btn => btn.classList.remove('active'));
       this.classList.add('active');
       
       // Filter projects
       const projectCards = document.querySelectorAll('.project-card');
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
 }
</script>