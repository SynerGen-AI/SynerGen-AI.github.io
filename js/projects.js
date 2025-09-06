// projects.js - 项目页面专用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 初始化GitHub项目渲染
    initializeGitHubProjects();
    
    // GitHub项目自动渲染功能
    async function initializeGitHubProjects() {
        const projectsDataElement = document.getElementById('github-projects-data');
        if (projectsDataElement) {
            try {
                const projectsData = JSON.parse(projectsDataElement.textContent);
                await renderGitHubProjects(projectsData);
                initializeProjectFilter();
            } catch (error) {
                console.error('解析GitHub项目数据失败:', error);
                showErrorMessage('加载项目数据失败');
            }
        }
    }
    
    async function renderGitHubProjects(projectsData) {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;
        
        // 显示加载状态
        projectsGrid.innerHTML = '<div class="loading-message"><i class="fas fa-spinner fa-spin"></i> 正在加载GitHub项目...</div>';
        
        try {
            const projectCards = await Promise.all(
                projectsData.map(project => fetchAndRenderProject(project))
            );
            
            projectsGrid.innerHTML = projectCards.join('');
        } catch (error) {
            projectsGrid.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> 加载GitHub项目失败</div>';
            console.error('加载GitHub项目失败:', error);
        }
    }
    
    async function fetchAndRenderProject(projectConfig) {
        try {
            // 使用缓存管理器获取仓库数据
            const repoData = await window.gitHubCache.getGitHubRepo(projectConfig.repo);
            return createProjectCard(repoData, projectConfig);
            
        } catch (error) {
            console.error(`获取GitHub仓库 ${projectConfig.repo} 信息失败:`, error);
            return createErrorProjectCard(projectConfig);
        }
    }
    
    function createProjectCard(repoData, config) {
        const imageUrl = config.image || 'https://via.placeholder.com/400x200?text=No+Image';
        const description = config.description || repoData.description || '暂无描述';
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
                        ${repoData.homepage ? `<a href="${repoData.homepage}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i> 网站</a>` : ''}
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
                    
                    <p class="project-description">${config.description || '无法加载项目信息'}</p>
                    
                    <div class="error-message">
                        <i class="fas fa-exclamation-triangle"></i> 无法从GitHub获取项目数据
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
            'language-models': '语言模型',
            'computer-vision': '计算机视觉',
            'audio': '音频与语音',
            'multimodal': '多模态',
            'tools': '工具与框架'
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
    
    // 项目筛选功能
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
});
