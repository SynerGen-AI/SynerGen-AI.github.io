/**
 * 神经网络组件JavaScript
 * 可复用的神经网络动画组件
 */

class NeuralNetworkComponent {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            width: 300,
            height: 300,
            theme: 'default',
            animationSpeed: 1,
            interactive: true,
            ...options
        };
        
        this.isAnimating = true;
        this.init();
    }

    init() {
        this.setupContainer();
        this.setupEventListeners();
        this.updateSize();
        this.applyTheme();
    }

    setupContainer() {
        // 设置容器尺寸
        this.container.style.width = this.options.width + 'px';
        this.container.style.height = this.options.height + 'px';
        
        // 添加主题类
        if (this.options.theme !== 'default') {
            this.container.classList.add(`theme-${this.options.theme}`);
        }
    }

    setupEventListeners() {
        if (!this.options.interactive) return;

        // 节点点击事件
        const nodes = this.container.querySelectorAll('.neural-node');
        nodes.forEach((node, index) => {
            node.addEventListener('click', () => {
                this.activateNode(node, index);
            });
        });

        // 鼠标悬停事件
        nodes.forEach(node => {
            node.addEventListener('mouseenter', () => {
                this.highlightNode(node);
            });
            
            node.addEventListener('mouseleave', () => {
                this.unhighlightNode(node);
            });
        });
    }

    updateSize() {
        this.container.style.width = this.options.width + 'px';
        this.container.style.height = this.options.height + 'px';
        
        // 更新CSS变量
        this.container.style.setProperty('--neural-width', this.options.width + 'px');
        this.container.style.setProperty('--neural-height', this.options.height + 'px');
    }

    applyTheme() {
        // 移除所有主题类
        this.container.classList.remove('theme-blue', 'theme-purple', 'theme-orange');
        
        // 添加新主题类
        if (this.options.theme !== 'default') {
            this.container.classList.add(`theme-${this.options.theme}`);
        }
    }

    setAnimationSpeed(speed) {
        this.options.animationSpeed = speed;
        
        // 更新动画持续时间
        const style = document.createElement('style');
        style.id = `neural-speed-${Date.now()}`;
        style.textContent = `
            .neural-network-component {
                animation-duration: ${4 / speed}s !important;
            }
            .neural-node {
                animation-duration: ${2.5 / speed}s !important;
            }
            .neural-connection {
                animation-duration: ${3.5 / speed}s !important;
            }
        `;
        
        // 移除旧的样式
        const oldStyle = document.getElementById('neural-speed-style');
        if (oldStyle) {
            oldStyle.remove();
        }
        
        style.id = 'neural-speed-style';
        document.head.appendChild(style);
    }

    toggleAnimation() {
        this.isAnimating = !this.isAnimating;
        const elements = this.container.querySelectorAll('.neural-nodes, .neural-node, .neural-connection');
        
        elements.forEach(el => {
            if (this.isAnimating) {
                el.style.animationPlayState = 'running';
            } else {
                el.style.animationPlayState = 'paused';
            }
        });
    }

    activateNode(node, index) {
        // 添加激活效果
        node.style.transform = 'scale(1.3)';
        node.style.boxShadow = '0 0 30px rgba(16, 185, 129, 0.8)';
        
        // 触发连接线高亮
        this.highlightConnections(index);
        
        setTimeout(() => {
            node.style.transform = '';
            node.style.boxShadow = '';
            this.unhighlightConnections();
        }, 1000);
    }

    highlightNode(node) {
        node.style.transform = 'scale(1.15)';
        node.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.6)';
    }

    unhighlightNode(node) {
        node.style.transform = '';
        node.style.boxShadow = '';
    }

    highlightConnections(nodeIndex) {
        const connections = this.container.querySelectorAll('.neural-connection');
        
        // 根据节点索引高亮相关连接
        switch (nodeIndex) {
            case 0: // 节点1
                this.highlightConnection(connections[0]); // 1-2
                this.highlightConnection(connections[3]); // 4-1
                this.highlightConnection(connections[4]); // 1-3
                break;
            case 1: // 节点2
                this.highlightConnection(connections[0]); // 1-2
                this.highlightConnection(connections[1]); // 2-3
                this.highlightConnection(connections[5]); // 2-4
                break;
            case 2: // 节点3
                this.highlightConnection(connections[1]); // 2-3
                this.highlightConnection(connections[2]); // 3-4
                this.highlightConnection(connections[4]); // 1-3
                break;
            case 3: // 节点4
                this.highlightConnection(connections[2]); // 3-4
                this.highlightConnection(connections[3]); // 4-1
                this.highlightConnection(connections[5]); // 2-4
                break;
        }
    }

    highlightConnection(connection) {
        connection.style.background = 'linear-gradient(90deg, transparent, #10b981, transparent)';
        connection.style.opacity = '1';
        connection.style.transform = 'scaleX(1.1)';
    }

    unhighlightConnections() {
        const connections = this.container.querySelectorAll('.neural-connection');
        connections.forEach(conn => {
            conn.style.background = '';
            conn.style.opacity = '';
            conn.style.transform = '';
        });
    }

    // 公共方法
    updateOptions(newOptions) {
        this.options = { ...this.options, ...newOptions };
        this.updateSize();
        this.applyTheme();
        
        if (newOptions.animationSpeed) {
            this.setAnimationSpeed(newOptions.animationSpeed);
        }
    }

    destroy() {
        // 清理事件监听器
        const nodes = this.container.querySelectorAll('.neural-node');
        nodes.forEach(node => {
            node.replaceWith(node.cloneNode(true));
        });
        
        // 移除动态样式
        const style = document.getElementById('neural-speed-style');
        if (style) {
            style.remove();
        }
    }
}

// 自动初始化所有神经网络组件
document.addEventListener('DOMContentLoaded', function() {
    const neuralComponents = document.querySelectorAll('.neural-network-component');
    
    neuralComponents.forEach(container => {
        const width = parseInt(container.dataset.width) || 300;
        const height = parseInt(container.dataset.height) || 300;
        const theme = container.dataset.theme || 'default';
        
        new NeuralNetworkComponent(container, {
            width,
            height,
            theme
        });
    });
});

// 导出类供外部使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NeuralNetworkComponent;
}
