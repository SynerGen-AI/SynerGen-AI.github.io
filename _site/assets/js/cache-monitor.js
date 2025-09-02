/**
 * GitHub API 缓存状态监控组件
 * 提供缓存使用情况的可视化界面
 */
class CacheMonitor {
    constructor() {
        this.isVisible = false;
        this.updateInterval = null;
        this.createMonitorUI();
    }

    /**
     * 创建监控界面
     */
    createMonitorUI() {
        // 创建监控面板
        const monitorPanel = document.createElement('div');
        monitorPanel.id = 'cache-monitor';
        monitorPanel.innerHTML = `
            <div class="cache-monitor-header">
                <h4><i class="fas fa-database"></i> 缓存状态</h4>
                <button class="cache-monitor-close" onclick="cacheMonitor.hide()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="cache-monitor-content">
                <div class="cache-stats">
                    <div class="stat-item">
                        <span class="stat-label">总缓存数:</span>
                        <span class="stat-value" id="total-caches">0</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">有效缓存:</span>
                        <span class="stat-value" id="valid-caches">0</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">过期缓存:</span>
                        <span class="stat-value" id="expired-caches">0</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">命中率:</span>
                        <span class="stat-value" id="hit-rate">0%</span>
                    </div>
                </div>
                <div class="cache-actions">
                    <button class="btn btn-sm btn-secondary" onclick="cacheMonitor.refreshStats()">
                        <i class="fas fa-sync-alt"></i> 刷新
                    </button>
                    <button class="btn btn-sm btn-warning" onclick="cacheMonitor.clearExpiredCache()">
                        <i class="fas fa-trash"></i> 清理过期
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="cacheMonitor.clearAllCache()">
                        <i class="fas fa-trash-alt"></i> 清空所有
                    </button>
                </div>
                <div class="cache-log" id="cache-log">
                    <div class="log-header">操作日志:</div>
                    <div class="log-content" id="log-content"></div>
                </div>
            </div>
        `;

        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            #cache-monitor {
                position: fixed;
                top: 20px;
                right: 20px;
                width: 320px;
                background: white;
                border: 1px solid #ddd;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10000;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                display: none;
            }

            .cache-monitor-header {
                background: #f8f9fa;
                padding: 12px 16px;
                border-bottom: 1px solid #dee2e6;
                border-radius: 8px 8px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .cache-monitor-header h4 {
                margin: 0;
                font-size: 14px;
                font-weight: 600;
                color: #495057;
            }

            .cache-monitor-close {
                background: none;
                border: none;
                color: #6c757d;
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
            }

            .cache-monitor-close:hover {
                background: #e9ecef;
                color: #495057;
            }

            .cache-monitor-content {
                padding: 16px;
            }

            .cache-stats {
                margin-bottom: 16px;
            }

            .stat-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 8px;
                font-size: 13px;
            }

            .stat-label {
                color: #6c757d;
            }

            .stat-value {
                font-weight: 600;
                color: #495057;
            }

            .cache-actions {
                display: flex;
                gap: 8px;
                margin-bottom: 16px;
                flex-wrap: wrap;
            }

            .cache-actions .btn {
                flex: 1;
                min-width: 0;
                font-size: 11px;
                padding: 6px 8px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 4px;
            }

            .btn-sm {
                font-size: 11px;
                padding: 6px 8px;
            }

            .btn-secondary {
                background: #6c757d;
                color: white;
            }

            .btn-warning {
                background: #ffc107;
                color: #212529;
            }

            .btn-danger {
                background: #dc3545;
                color: white;
            }

            .btn:hover {
                opacity: 0.9;
            }

            .cache-log {
                border-top: 1px solid #dee2e6;
                padding-top: 12px;
            }

            .log-header {
                font-size: 12px;
                font-weight: 600;
                color: #495057;
                margin-bottom: 8px;
            }

            .log-content {
                max-height: 120px;
                overflow-y: auto;
                font-size: 11px;
                color: #6c757d;
                line-height: 1.4;
            }

            .log-entry {
                margin-bottom: 4px;
                padding: 2px 0;
            }

            .log-time {
                color: #adb5bd;
                margin-right: 8px;
            }

            /* 监控按钮 */
            #cache-monitor-toggle {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                background: #007bff;
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 2px 8px rgba(0,123,255,0.3);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                transition: all 0.3s ease;
            }

            #cache-monitor-toggle:hover {
                background: #0056b3;
                transform: scale(1.1);
            }

            @media (max-width: 768px) {
                #cache-monitor {
                    width: calc(100vw - 40px);
                    right: 20px;
                    left: 20px;
                }
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(monitorPanel);

        // 创建切换按钮
        const toggleButton = document.createElement('button');
        toggleButton.id = 'cache-monitor-toggle';
        toggleButton.innerHTML = '<i class="fas fa-database"></i>';
        toggleButton.onclick = () => this.toggle();
        toggleButton.title = '缓存监控';
        document.body.appendChild(toggleButton);
    }

    /**
     * 显示监控面板
     */
    show() {
        const panel = document.getElementById('cache-monitor');
        if (panel) {
            panel.style.display = 'block';
            this.isVisible = true;
            this.refreshStats();
            this.startAutoUpdate();
        }
    }

    /**
     * 隐藏监控面板
     */
    hide() {
        const panel = document.getElementById('cache-monitor');
        if (panel) {
            panel.style.display = 'none';
            this.isVisible = false;
            this.stopAutoUpdate();
        }
    }

    /**
     * 切换监控面板显示状态
     */
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    /**
     * 刷新缓存统计
     */
    refreshStats() {
        if (!window.gitHubCache) {
            this.log('缓存管理器未初始化');
            return;
        }

        const stats = window.gitHubCache.getCacheStats();
        
        document.getElementById('total-caches').textContent = stats.total;
        document.getElementById('valid-caches').textContent = stats.valid;
        document.getElementById('expired-caches').textContent = stats.expired;
        document.getElementById('hit-rate').textContent = stats.hitRate;
        
        this.log(`统计已更新: ${stats.valid}/${stats.total} 有效`);
    }

    /**
     * 清理过期缓存
     */
    clearExpiredCache() {
        if (!window.gitHubCache) {
            this.log('缓存管理器未初始化');
            return;
        }

        const beforeStats = window.gitHubCache.getCacheStats();
        window.gitHubCache.cleanOldCache();
        const afterStats = window.gitHubCache.getCacheStats();
        
        const cleared = beforeStats.expired;
        this.log(`清理了 ${cleared} 个过期缓存`);
        this.refreshStats();
    }

    /**
     * 清空所有缓存
     */
    clearAllCache() {
        if (!confirm('确定要清空所有缓存吗？这将删除所有已保存的GitHub数据。')) {
            return;
        }

        if (!window.gitHubCache) {
            this.log('缓存管理器未初始化');
            return;
        }

        try {
            const stats = window.gitHubCache.getCacheStats();
            const totalCleared = stats.total;
            
            // 清空所有GitHub缓存
            for (let i = localStorage.length - 1; i >= 0; i--) {
                const key = localStorage.key(i);
                if (key && key.startsWith(window.gitHubCache.cachePrefix)) {
                    localStorage.removeItem(key);
                }
            }
            
            this.log(`清空了所有缓存 (${totalCleared} 项)`);
            this.refreshStats();
        } catch (error) {
            this.log(`清空缓存失败: ${error.message}`);
        }
    }

    /**
     * 添加日志条目
     * @param {string} message - 日志消息
     */
    log(message) {
        const logContent = document.getElementById('log-content');
        if (!logContent) return;

        const time = new Date().toLocaleTimeString();
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `<span class="log-time">${time}</span>${message}`;
        
        logContent.insertBefore(logEntry, logContent.firstChild);
        
        // 限制日志条目数量
        const entries = logContent.querySelectorAll('.log-entry');
        if (entries.length > 20) {
            entries[entries.length - 1].remove();
        }
    }

    /**
     * 开始自动更新
     */
    startAutoUpdate() {
        this.stopAutoUpdate();
        this.updateInterval = setInterval(() => {
            if (this.isVisible) {
                this.refreshStats();
            }
        }, 5000); // 每5秒更新一次
    }

    /**
     * 停止自动更新
     */
    stopAutoUpdate() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
}

// 创建全局缓存监控实例
window.cacheMonitor = new CacheMonitor();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 监听缓存操作，自动记录日志
    if (window.gitHubCache) {
        const originalGetCache = window.gitHubCache.getCache;
        const originalSetCache = window.gitHubCache.setCache;
        
        window.gitHubCache.getCache = function(cacheKey) {
            const result = originalGetCache.call(this, cacheKey);
            if (result && window.cacheMonitor) {
                const type = cacheKey.includes('members') ? '用户' : '仓库';
                const name = cacheKey.split('_').pop();
                window.cacheMonitor.log(`缓存命中: ${type} ${name}`);
            }
            return result;
        };
        
        window.gitHubCache.setCache = function(cacheKey, data) {
            const result = originalSetCache.call(this, cacheKey, data);
            if (window.cacheMonitor) {
                const type = cacheKey.includes('members') ? '用户' : '仓库';
                const name = cacheKey.split('_').pop();
                window.cacheMonitor.log(`缓存更新: ${type} ${name}`);
            }
            return result;
        };
    }
});

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CacheMonitor;
}