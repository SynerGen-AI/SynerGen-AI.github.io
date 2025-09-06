/**
 * JSON文件缓存管理器
 * 使用服务器端JSON文件作为缓存，提供稳定的数据访问
 */
class JSONCacheManager {
    constructor() {
        this.membersCache = null;
        this.projectsCache = null;
        this.cacheExpiry = 24 * 60 * 60 * 1000; // 24小时
        this.isLoading = {
            members: false,
            projects: false
        };
    }

    /**
     * 获取GitHub用户信息
     * @param {string} username - GitHub用户名
     * @returns {Promise<Object>} 用户信息
     */
    async getGitHubUser(username) {
        try {
            // 如果正在加载，等待加载完成
            if (this.isLoading.members) {
                await this.waitForLoading('members');
            }

            // 如果缓存为空，加载缓存
            if (!this.membersCache) {
                await this.loadMembersCache();
            }

            // 从缓存中获取用户信息
            if (this.membersCache && this.membersCache.members[username]) {
                return this.membersCache.members[username];
            }

            // 如果缓存中没有，返回默认信息
            return this.createDefaultUserInfo(username);
        } catch (error) {
            console.error(`获取用户 ${username} 信息失败:`, error);
            return this.createDefaultUserInfo(username);
        }
    }

    /**
     * 获取GitHub仓库信息
     * @param {string} repoName - 仓库名称 (owner/repo)
     * @returns {Promise<Object>} 仓库信息
     */
    async getGitHubRepo(repoName) {
        try {
            // 如果正在加载，等待加载完成
            if (this.isLoading.projects) {
                await this.waitForLoading('projects');
            }

            // 如果缓存为空，加载缓存
            if (!this.projectsCache) {
                await this.loadProjectsCache();
            }

            // 从缓存中获取仓库信息
            if (this.projectsCache && this.projectsCache.projects[repoName]) {
                return this.projectsCache.projects[repoName];
            }

            // 如果缓存中没有，返回默认信息
            return this.createDefaultRepoInfo(repoName);
        } catch (error) {
            console.error(`获取仓库 ${repoName} 信息失败:`, error);
            return this.createDefaultRepoInfo(repoName);
        }
    }

    /**
     * 加载成员缓存
     */
    async loadMembersCache() {
        if (this.isLoading.members) return;
        
        this.isLoading.members = true;
        try {
            const response = await fetch('/assets/data/github-members.json');
            if (response.ok) {
                this.membersCache = await response.json();
                console.log('成员缓存加载成功');
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('加载成员缓存失败:', error);
            this.membersCache = { members: {} };
        } finally {
            this.isLoading.members = false;
        }
    }

    /**
     * 加载项目缓存
     */
    async loadProjectsCache() {
        if (this.isLoading.projects) return;
        
        this.isLoading.projects = true;
        try {
            const response = await fetch('/assets/data/github-projects.json');
            if (response.ok) {
                this.projectsCache = await response.json();
                console.log('项目缓存加载成功');
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.error('加载项目缓存失败:', error);
            this.projectsCache = { projects: {} };
        } finally {
            this.isLoading.projects = false;
        }
    }

    /**
     * 等待加载完成
     * @param {string} type - 加载类型 ('members' 或 'projects')
     */
    async waitForLoading(type) {
        return new Promise((resolve) => {
            const checkLoading = () => {
                if (!this.isLoading[type]) {
                    resolve();
                } else {
                    setTimeout(checkLoading, 100);
                }
            };
            checkLoading();
        });
    }

    /**
     * 创建默认用户信息
     * @param {string} username - 用户名
     * @returns {Object} 默认用户信息
     */
    createDefaultUserInfo(username) {
        return {
            login: username,
            id: 0,
            avatar_url: `https://avatars.githubusercontent.com/u/0?v=4`,
            html_url: `https://github.com/${username}`,
            name: username,
            company: null,
            blog: '',
            location: '',
            email: null,
            bio: 'GitHub用户',
            twitter_username: null,
            public_repos: 0,
            public_gists: 0,
            followers: 0,
            following: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
    }

    /**
     * 创建默认仓库信息
     * @param {string} repoName - 仓库名称
     * @returns {Object} 默认仓库信息
     */
    createDefaultRepoInfo(repoName) {
        const [owner, repo] = repoName.split('/');
        return {
            id: 0,
            name: repo,
            full_name: repoName,
            html_url: `https://github.com/${repoName}`,
            description: 'GitHub仓库',
            language: null,
            stargazers_count: 0,
            watchers_count: 0,
            forks_count: 0,
            open_issues_count: 0,
            homepage: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            pushed_at: new Date().toISOString(),
            owner: {
                login: owner,
                html_url: `https://github.com/${owner}`
            }
        };
    }

    /**
     * 检查缓存是否过期
     * @param {string} lastUpdated - 最后更新时间
     * @returns {boolean} 是否过期
     */
    isCacheExpired(lastUpdated) {
        if (!lastUpdated) return true;
        const cacheTime = new Date(lastUpdated).getTime();
        const now = Date.now();
        return (now - cacheTime) > this.cacheExpiry;
    }

    /**
     * 获取缓存状态信息
     * @returns {Object} 缓存状态
     */
    getCacheStatus() {
        return {
            members: {
                loaded: !!this.membersCache,
                lastUpdated: this.membersCache?.lastUpdated,
                expired: this.membersCache ? this.isCacheExpired(this.membersCache.lastUpdated) : true,
                count: this.membersCache ? Object.keys(this.membersCache.members).length : 0
            },
            projects: {
                loaded: !!this.projectsCache,
                lastUpdated: this.projectsCache?.lastUpdated,
                expired: this.projectsCache ? this.isCacheExpired(this.projectsCache.lastUpdated) : true,
                count: this.projectsCache ? Object.keys(this.projectsCache.projects).length : 0
            }
        };
    }

    /**
     * 预加载所有缓存
     */
    async preloadAll() {
        const promises = [];
        
        if (!this.membersCache) {
            promises.push(this.loadMembersCache());
        }
        
        if (!this.projectsCache) {
            promises.push(this.loadProjectsCache());
        }
        
        if (promises.length > 0) {
            await Promise.all(promises);
            console.log('所有缓存预加载完成');
        }
    }

    /**
     * 清除缓存
     */
    clearCache() {
        this.membersCache = null;
        this.projectsCache = null;
        console.log('缓存已清除');
    }
}

// 创建全局实例
window.jsonCache = new JSONCacheManager();

// 页面加载时预加载缓存
document.addEventListener('DOMContentLoaded', function() {
    window.jsonCache.preloadAll();
});
