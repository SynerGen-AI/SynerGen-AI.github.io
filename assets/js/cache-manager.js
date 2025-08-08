/**
 * GitHub API 缓存管理器
 * 实现每小时获取一次数据，其他时间读取本地缓存
 */
class GitHubCacheManager {
    constructor() {
        this.cachePrefix = 'github_cache_';
        this.cacheExpiry = 60 * 60 * 1000; // 1小时（毫秒）
        this.maxRetries = 3;
        this.retryDelay = 1000; // 1秒
    }

    /**
     * 获取缓存键名
     * @param {string} type - 缓存类型 ('members' 或 'projects')
     * @param {string} identifier - 标识符（用户名或仓库名）
     * @returns {string} 缓存键名
     */
    getCacheKey(type, identifier) {
        return `${this.cachePrefix}${type}_${identifier.replace(/[^a-zA-Z0-9]/g, '_')}`;
    }

    /**
     * 检查缓存是否有效
     * @param {string} cacheKey - 缓存键名
     * @returns {boolean} 缓存是否有效
     */
    isCacheValid(cacheKey) {
        try {
            const cacheData = localStorage.getItem(cacheKey);
            if (!cacheData) return false;

            const { timestamp } = JSON.parse(cacheData);
            const now = Date.now();
            return (now - timestamp) < this.cacheExpiry;
        } catch (error) {
            console.warn('检查缓存有效性失败:', error);
            return false;
        }
    }

    /**
     * 获取缓存数据
     * @param {string} cacheKey - 缓存键名
     * @returns {Object|null} 缓存的数据或null
     */
    getCache(cacheKey) {
        try {
            const cacheData = localStorage.getItem(cacheKey);
            if (!cacheData) return null;

            const { data, timestamp } = JSON.parse(cacheData);
            const now = Date.now();
            
            if ((now - timestamp) >= this.cacheExpiry) {
                this.removeCache(cacheKey);
                return null;
            }

            return data;
        } catch (error) {
            console.warn('获取缓存数据失败:', error);
            this.removeCache(cacheKey);
            return null;
        }
    }

    /**
     * 设置缓存数据
     * @param {string} cacheKey - 缓存键名
     * @param {Object} data - 要缓存的数据
     */
    setCache(cacheKey, data) {
        try {
            const cacheData = {
                data: data,
                timestamp: Date.now()
            };
            localStorage.setItem(cacheKey, JSON.stringify(cacheData));
        } catch (error) {
            console.warn('设置缓存数据失败:', error);
            // 如果localStorage满了，尝试清理旧缓存
            this.cleanOldCache();
            try {
                localStorage.setItem(cacheKey, JSON.stringify(cacheData));
            } catch (retryError) {
                console.error('重试设置缓存失败:', retryError);
            }
        }
    }

    /**
     * 移除缓存
     * @param {string} cacheKey - 缓存键名
     */
    removeCache(cacheKey) {
        try {
            localStorage.removeItem(cacheKey);
        } catch (error) {
            console.warn('移除缓存失败:', error);
        }
    }

    /**
     * 清理过期缓存
     */
    cleanOldCache() {
        try {
            const now = Date.now();
            const keysToRemove = [];

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(this.cachePrefix)) {
                    try {
                        const cacheData = JSON.parse(localStorage.getItem(key));
                        if ((now - cacheData.timestamp) >= this.cacheExpiry) {
                            keysToRemove.push(key);
                        }
                    } catch (error) {
                        keysToRemove.push(key); // 损坏的缓存也要清理
                    }
                }
            }

            keysToRemove.forEach(key => localStorage.removeItem(key));
            console.log(`清理了 ${keysToRemove.length} 个过期缓存`);
        } catch (error) {
            console.warn('清理过期缓存失败:', error);
        }
    }

    /**
     * 带重试的API请求
     * @param {string} url - API URL
     * @param {number} retryCount - 当前重试次数
     * @returns {Promise<Object>} API响应数据
     */
    async fetchWithRetry(url, retryCount = 0) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            if (retryCount < this.maxRetries) {
                console.warn(`API请求失败，${this.retryDelay}ms后重试 (${retryCount + 1}/${this.maxRetries}):`, error.message);
                await this.delay(this.retryDelay * (retryCount + 1)); // 递增延迟
                return this.fetchWithRetry(url, retryCount + 1);
            }
            throw error;
        }
    }

    /**
     * 延迟函数
     * @param {number} ms - 延迟毫秒数
     * @returns {Promise<void>}
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * 获取GitHub用户信息（带缓存）
     * @param {string} username - GitHub用户名
     * @returns {Promise<Object>} 用户信息
     */
    async getGitHubUser(username) {
        const cacheKey = this.getCacheKey('members', username);
        
        // 检查缓存
        const cachedData = this.getCache(cacheKey);
        if (cachedData) {
            console.log(`从缓存获取用户 ${username} 的信息`);
            return cachedData;
        }

        // 从API获取数据
        console.log(`从API获取用户 ${username} 的信息`);
        try {
            const userData = await this.fetchWithRetry(`https://api.github.com/users/${username}`);
            this.setCache(cacheKey, userData);
            return userData;
        } catch (error) {
            console.error(`获取GitHub用户 ${username} 信息失败:`, error);
            throw error;
        }
    }

    /**
     * 获取GitHub仓库信息（带缓存）
     * @param {string} repo - 仓库名（格式：owner/repo）
     * @returns {Promise<Object>} 仓库信息
     */
    async getGitHubRepo(repo) {
        const cacheKey = this.getCacheKey('projects', repo);
        
        // 检查缓存
        const cachedData = this.getCache(cacheKey);
        if (cachedData) {
            console.log(`从缓存获取仓库 ${repo} 的信息`);
            return cachedData;
        }

        // 从API获取数据
        console.log(`从API获取仓库 ${repo} 的信息`);
        try {
            const repoData = await this.fetchWithRetry(`https://api.github.com/repos/${repo}`);
            this.setCache(cacheKey, repoData);
            return repoData;
        } catch (error) {
            console.error(`获取GitHub仓库 ${repo} 信息失败:`, error);
            throw error;
        }
    }

    /**
     * 批量获取GitHub用户信息
     * @param {Array<string>} usernames - 用户名数组
     * @returns {Promise<Array<Object>>} 用户信息数组
     */
    async batchGetGitHubUsers(usernames) {
        const results = [];
        const batchSize = 5; // 限制并发数量
        
        for (let i = 0; i < usernames.length; i += batchSize) {
            const batch = usernames.slice(i, i + batchSize);
            const batchPromises = batch.map(username => 
                this.getGitHubUser(username).catch(error => {
                    console.error(`批量获取用户 ${username} 失败:`, error);
                    return { error: true, username, message: error.message };
                })
            );
            
            const batchResults = await Promise.all(batchPromises);
            results.push(...batchResults);
            
            // 批次间延迟，避免API限制
            if (i + batchSize < usernames.length) {
                await this.delay(200);
            }
        }
        
        return results;
    }

    /**
     * 批量获取GitHub仓库信息
     * @param {Array<string>} repos - 仓库名数组
     * @returns {Promise<Array<Object>>} 仓库信息数组
     */
    async batchGetGitHubRepos(repos) {
        const results = [];
        const batchSize = 5; // 限制并发数量
        
        for (let i = 0; i < repos.length; i += batchSize) {
            const batch = repos.slice(i, i + batchSize);
            const batchPromises = batch.map(repo => 
                this.getGitHubRepo(repo).catch(error => {
                    console.error(`批量获取仓库 ${repo} 失败:`, error);
                    return { error: true, repo, message: error.message };
                })
            );
            
            const batchResults = await Promise.all(batchPromises);
            results.push(...batchResults);
            
            // 批次间延迟，避免API限制
            if (i + batchSize < repos.length) {
                await this.delay(200);
            }
        }
        
        return results;
    }

    /**
     * 获取缓存统计信息
     * @returns {Object} 缓存统计
     */
    getCacheStats() {
        let totalCaches = 0;
        let validCaches = 0;
        let expiredCaches = 0;
        const now = Date.now();

        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.startsWith(this.cachePrefix)) {
                    totalCaches++;
                    try {
                        const cacheData = JSON.parse(localStorage.getItem(key));
                        if ((now - cacheData.timestamp) < this.cacheExpiry) {
                            validCaches++;
                        } else {
                            expiredCaches++;
                        }
                    } catch (error) {
                        expiredCaches++;
                    }
                }
            }
        } catch (error) {
            console.warn('获取缓存统计失败:', error);
        }

        return {
            total: totalCaches,
            valid: validCaches,
            expired: expiredCaches,
            hitRate: totalCaches > 0 ? (validCaches / totalCaches * 100).toFixed(1) + '%' : '0%'
        };
    }
}

// 创建全局缓存管理器实例
window.gitHubCache = new GitHubCacheManager();

// 页面加载时清理过期缓存
document.addEventListener('DOMContentLoaded', function() {
    window.gitHubCache.cleanOldCache();
});

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GitHubCacheManager;
}