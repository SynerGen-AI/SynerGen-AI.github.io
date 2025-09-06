#!/usr/bin/env node

/**
 * GitHub缓存更新脚本
 * 用于定期更新JSON缓存文件中的GitHub数据
 */

const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
    githubToken: process.env.GITHUB_TOKEN || '', // 从环境变量获取GitHub token
    membersFile: path.join(__dirname, '../assets/data/github-members.json'),
    projectsFile: path.join(__dirname, '../assets/data/github-projects.json'),
    members: [
        'GoldenKerwin',
        '35tang', 
        'luohj29'
    ],
    projects: [
        'SynerGen-AI/EasyVideo'
    ]
};

/**
 * 获取GitHub用户信息
 */
async function fetchGitHubUser(username) {
    const url = `https://api.github.com/users/${username}`;
    const headers = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'SynerGen-AI-Website'
    };
    
    if (CONFIG.githubToken) {
        headers['Authorization'] = `token ${CONFIG.githubToken}`;
    }
    
    try {
        const response = await fetch(url, { headers });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error(`获取用户 ${username} 信息失败:`, error.message);
        return null;
    }
}

/**
 * 获取GitHub仓库信息
 */
async function fetchGitHubRepo(repoName) {
    const url = `https://api.github.com/repos/${repoName}`;
    const headers = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'SynerGen-AI-Website'
    };
    
    if (CONFIG.githubToken) {
        headers['Authorization'] = `token ${CONFIG.githubToken}`;
    }
    
    try {
        const response = await fetch(url, { headers });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error(`获取仓库 ${repoName} 信息失败:`, error.message);
        return null;
    }
}

/**
 * 更新成员缓存
 */
async function updateMembersCache() {
    console.log('开始更新成员缓存...');
    
    const members = {};
    let successCount = 0;
    
    for (const username of CONFIG.members) {
        console.log(`获取用户 ${username} 信息...`);
        const userData = await fetchGitHubUser(username);
        
        if (userData) {
            members[username] = userData;
            successCount++;
            console.log(`✓ 用户 ${username} 信息获取成功`);
        } else {
            console.log(`✗ 用户 ${username} 信息获取失败`);
        }
        
        // 避免API限制，添加延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    const cacheData = {
        lastUpdated: new Date().toISOString(),
        members: members
    };
    
    try {
        fs.writeFileSync(CONFIG.membersFile, JSON.stringify(cacheData, null, 2));
        console.log(`✓ 成员缓存更新完成，成功获取 ${successCount}/${CONFIG.members.length} 个用户信息`);
    } catch (error) {
        console.error('保存成员缓存失败:', error.message);
    }
}

/**
 * 更新项目缓存
 */
async function updateProjectsCache() {
    console.log('开始更新项目缓存...');
    
    const projects = {};
    let successCount = 0;
    
    for (const repoName of CONFIG.projects) {
        console.log(`获取仓库 ${repoName} 信息...`);
        const repoData = await fetchGitHubRepo(repoName);
        
        if (repoData) {
            projects[repoName] = repoData;
            successCount++;
            console.log(`✓ 仓库 ${repoName} 信息获取成功`);
        } else {
            console.log(`✗ 仓库 ${repoName} 信息获取失败`);
        }
        
        // 避免API限制，添加延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    const cacheData = {
        lastUpdated: new Date().toISOString(),
        projects: projects
    };
    
    try {
        fs.writeFileSync(CONFIG.projectsFile, JSON.stringify(cacheData, null, 2));
        console.log(`✓ 项目缓存更新完成，成功获取 ${successCount}/${CONFIG.projects.length} 个仓库信息`);
    } catch (error) {
        console.error('保存项目缓存失败:', error.message);
    }
}

/**
 * 检查缓存是否需要更新
 */
function shouldUpdateCache(filePath, maxAgeHours = 24) {
    try {
        if (!fs.existsSync(filePath)) {
            return true;
        }
        
        const stats = fs.statSync(filePath);
        const ageHours = (Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60);
        
        return ageHours > maxAgeHours;
    } catch (error) {
        console.error('检查缓存文件失败:', error.message);
        return true;
    }
}

/**
 * 主函数
 */
async function main() {
    console.log('GitHub缓存更新脚本启动...');
    
    // 检查是否需要更新成员缓存
    if (shouldUpdateCache(CONFIG.membersFile)) {
        await updateMembersCache();
    } else {
        console.log('成员缓存仍然有效，跳过更新');
    }
    
    // 检查是否需要更新项目缓存
    if (shouldUpdateCache(CONFIG.projectsFile)) {
        await updateProjectsCache();
    } else {
        console.log('项目缓存仍然有效，跳过更新');
    }
    
    console.log('缓存更新脚本执行完成');
}

// 如果直接运行此脚本
if (require.main === module) {
    main().catch(error => {
        console.error('脚本执行失败:', error);
        process.exit(1);
    });
}

module.exports = {
    updateMembersCache,
    updateProjectsCache,
    shouldUpdateCache
};
