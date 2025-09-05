// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (mobileMenuToggle && navbarMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Initialize GitHub team rendering
    initializeGitHubTeam();

    // GitHub团队成员自动渲染功能
    function initializeGitHubTeam() {
        const membersDataElement = document.getElementById('github-members-data');
        if (membersDataElement) {
            try {
                const membersData = JSON.parse(membersDataElement.textContent);
                renderTeamMembers(membersData);
            } catch (error) {
                console.error('解析GitHub成员数据失败:', error);
            }
        }
    }

    async function renderTeamMembers(membersData) {
        for (const [teamType, members] of Object.entries(membersData)) {
            const gridElement = document.getElementById(`${teamType}-team-grid`);
            if (gridElement && members) {
                // 显示加载状态
                gridElement.innerHTML = '<div class="loading-message"><i class="fas fa-spinner fa-spin"></i> 正在加载团队成员...</div>';
                
                try {
                    const memberCards = await Promise.all(
                        members.map(member => fetchAndRenderMember(member))
                    );
                    
                    gridElement.innerHTML = memberCards.join('');
                } catch (error) {
                    gridElement.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> 加载团队成员失败</div>';
                    console.error(`加载${teamType}团队成员失败:`, error);
                }
            }
        }
    }

    async function fetchAndRenderMember(memberConfig) {
        try {
            // 使用缓存管理器获取用户数据
            const userData = await window.gitHubCache.getGitHubUser(memberConfig.username);
            return createMemberCard(userData, memberConfig.role);
            
        } catch (error) {
            console.error(`获取GitHub用户 ${memberConfig.username} 信息失败:`, error);
            return createErrorCard(memberConfig.username, memberConfig.role);
        }
    }

    function createMemberCard(userData, role) {
        return `
            <div class="team-member">
                <div class="member-card">
                    <div class="member-avatar">
                        <img src="${userData.avatar_url}" alt="${userData.name || userData.login}" loading="lazy">
                    </div>
                    <div class="member-info">
                        <h3 class="member-name">${userData.name || userData.login}</h3>
                        <p class="member-position">${role}</p>
                        ${userData.company ? `<p class="member-affiliation">${userData.company}</p>` : ''}
                        ${userData.bio ? `<p class="member-bio">${userData.bio}</p>` : ''}
                        
                        <div class="member-links">
                            <a href="${userData.html_url}" target="_blank" class="member-link" title="GitHub">
                                <i class="fab fa-github"></i>
                            </a>
                            ${userData.email ? `<a href="mailto:${userData.email}" class="member-link" title="邮箱"><i class="fas fa-envelope"></i></a>` : ''}
                            ${userData.blog ? `<a href="${userData.blog}" target="_blank" class="member-link" title="个人网站"><i class="fas fa-globe"></i></a>` : ''}
                            ${userData.twitter_username ? `<a href="https://twitter.com/${userData.twitter_username}" target="_blank" class="member-link" title="Twitter"><i class="fab fa-twitter"></i></a>` : ''}
                        </div>
                        
                        <div class="member-stats">
                            <span class="stat-item"><i class="fas fa-code-branch"></i> ${userData.public_repos} 仓库</span>
                            <span class="stat-item"><i class="fas fa-users"></i> ${userData.followers} 关注者</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function createErrorCard(username, role) {
        return `
            <div class="team-member">
                <div class="member-card error-card">
                    <div class="member-avatar">
                        <div class="avatar-placeholder">
                            <i class="fas fa-user-slash"></i>
                        </div>
                    </div>
                    <div class="member-info">
                        <h3 class="member-name">@${username}</h3>
                        <p class="member-position">${role}</p>
                        <p class="member-bio error-text">无法获取用户信息</p>
                        <div class="member-links">
                            <a href="https://github.com/${username}" target="_blank" class="member-link" title="GitHub">
                                <i class="fab fa-github"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        // Add shadow when scrolled
        if (scrollTop > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .project-card, .team-member');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Form handling
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            this.reset();
        });
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        // Set background color based on type
        switch (type) {
            case 'success':
                notification.style.background = '#10b981';
                break;
            case 'error':
                notification.style.background = '#ef4444';
                break;
            case 'warning':
                notification.style.background = '#f59e0b';
                break;
            default:
                notification.style.background = '#3b82f6';
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
        
        // Click to dismiss
        notification.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }
    
    // Copy to clipboard functionality
    const copyButtons = document.querySelectorAll('[data-copy]');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showNotification('Copied to clipboard!', 'success');
                }).catch(() => {
                    fallbackCopyTextToClipboard(textToCopy);
                });
            } else {
                fallbackCopyTextToClipboard(textToCopy);
            }
        });
    });
    
    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showNotification('Copied to clipboard!', 'success');
        } catch (err) {
            showNotification('Failed to copy to clipboard.', 'error');
        }
        
        document.body.removeChild(textArea);
    }
    
    // Search functionality
    const searchInput = document.querySelector('#search-input');
    const searchResults = document.querySelector('#search-results');
    
    if (searchInput && searchResults) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length < 2) {
                searchResults.innerHTML = '';
                searchResults.style.display = 'none';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });
        
        function performSearch(query) {
            // This is a simple client-side search
            // In a real implementation, you might want to use a search service
            const searchableElements = document.querySelectorAll('[data-searchable]');
            const results = [];
            
            searchableElements.forEach(element => {
                const text = element.textContent.toLowerCase();
                const title = element.getAttribute('data-search-title') || '';
                const url = element.getAttribute('data-search-url') || '#';
                
                if (text.includes(query.toLowerCase()) || title.toLowerCase().includes(query.toLowerCase())) {
                    results.push({
                        title: title || element.textContent.substring(0, 50) + '...',
                        url: url,
                        snippet: getSearchSnippet(text, query)
                    });
                }
            });
            
            displaySearchResults(results, query);
        }
        
        function getSearchSnippet(text, query) {
            const index = text.toLowerCase().indexOf(query.toLowerCase());
            if (index === -1) return text.substring(0, 100) + '...';
            
            const start = Math.max(0, index - 50);
            const end = Math.min(text.length, index + query.length + 50);
            
            return (start > 0 ? '...' : '') + text.substring(start, end) + (end < text.length ? '...' : '');
        }
        
        function displaySearchResults(results, query) {
            if (results.length === 0) {
                searchResults.innerHTML = `<div class="search-no-results">No results found for "${query}"</div>`;
            } else {
                const resultsHTML = results.map(result => `
                    <div class="search-result">
                        <h4><a href="${result.url}">${result.title}</a></h4>
                        <p>${result.snippet}</p>
                    </div>
                `).join('');
                
                searchResults.innerHTML = resultsHTML;
            }
            
            searchResults.style.display = 'block';
        }
        
        // Close search results when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }
    
    // Video matrix: lazy load + hover preview
    const matrix = document.querySelector('.video-masonry');
    if (matrix) {
        const tiles = matrix.querySelectorAll('.tile-video');
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const v = entry.target;
                    if (v.dataset.src && !v.src) {
                        v.src = v.dataset.src;
                    }
                    // Autoplay muted preview
                    v.play().catch(() => {});
                    io.unobserve(v);
                }
            });
        }, { rootMargin: '200px 0px' });

        tiles.forEach(v => io.observe(v));

        matrix.addEventListener('mouseenter', (e) => {
            const v = e.target.closest('.video-tile')?.querySelector('.tile-video');
            if (v) v.play().catch(() => {});
        }, true);

        matrix.addEventListener('mouseleave', (e) => {
            const v = e.target.closest('.video-tile')?.querySelector('.tile-video');
            if (v) v.pause();
        }, true);
    }
});

// Add CSS for additional animations and mobile menu
const additionalCSS = `
.site-header.scrolled {
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.mobile-menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-toggle.active span:nth-child(2) {
    opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}

@media (max-width: 768px) {
    .navbar-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 1rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        border-top: 1px solid #e2e8f0;
    }
    
    .navbar-nav {
        flex-direction: column;
        gap: 1rem;
    }
    
    .language-switcher {
        margin-top: 1rem;
    }
}

.animate-in {
    animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.search-results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    max-height: 400px;
    overflow-y: auto;
    z-index: 1000;
}

.search-result {
    padding: 1rem;
    border-bottom: 1px solid #f1f5f9;
}

.search-result:last-child {
    border-bottom: none;
}

.search-result h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
}

.search-result h4 a {
    color: #2563eb;
    text-decoration: none;
}

.search-result h4 a:hover {
    text-decoration: underline;
}

.search-result p {
    margin: 0;
    color: #64748b;
    font-size: 0.875rem;
    line-height: 1.4;
}

.search-no-results {
    padding: 1rem;
    text-align: center;
    color: #64748b;
    font-style: italic;
}
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);