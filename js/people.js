// people.js - 团队成员页面专用JavaScript

// 将GitHub成员数据传递给JavaScript
document.addEventListener("DOMContentLoaded", function() {
    // 初始化GitHub团队成员渲染
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
});
