/**
 * Contact Page JavaScript
 * 联系页面相关功能
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化联系页面功能
    initContactPage();
    
    // 初始化联系表单
    initContactForm();
    
    // 初始化复制功能
    initCopyToClipboard();
    
    // 初始化二维码功能
    initQRCodeFeatures();
});

/**
 * 初始化联系页面功能
 */
function initContactPage() {
    // 添加联系卡片的悬停效果
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // 添加点击效果
    contactCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-4px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }, 150);
        });
    });
}

/**
 * 初始化联系表单
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // 表单验证
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    
    // 表单提交
    form.addEventListener('submit', handleFormSubmit);
    
    // 实时字符计数
    const messageTextarea = form.querySelector('textarea[name="message"]');
    if (messageTextarea) {
        addCharacterCounter(messageTextarea);
    }
}

/**
 * 验证单个字段
 */
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    const fieldName = field.name;
    
    // 清除之前的错误状态
    clearFieldError(event);
    
    let isValid = true;
    let errorMessage = '';
    
    // 必填字段验证
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = '此字段为必填项';
    }
    
    // 邮箱验证
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = '请输入有效的邮箱地址';
        }
    }
    
    // 姓名验证
    if (fieldName === 'name' && value) {
        if (value.length < 2) {
            isValid = false;
            errorMessage = '姓名至少需要2个字符';
        }
    }
    
    // 消息长度验证
    if (fieldName === 'message' && value) {
        if (value.length < 10) {
            isValid = false;
            errorMessage = '消息至少需要10个字符';
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

/**
 * 显示字段错误
 */
function showFieldError(field, message) {
    field.classList.add('error');
    
    // 移除已存在的错误消息
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // 添加错误消息
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#dc2626';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
}

/**
 * 清除字段错误
 */
function clearFieldError(event) {
    const field = event.target;
    field.classList.remove('error');
    
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

/**
 * 处理表单提交
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // 验证所有字段
    const inputs = form.querySelectorAll('input, select, textarea');
    let isFormValid = true;
    
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        showNotification('请检查表单中的错误', 'error');
        return;
    }
    
    // 显示提交状态
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '发送中...';
    submitBtn.disabled = true;
    
    // 模拟表单提交（实际项目中应该发送到服务器）
    setTimeout(() => {
        showNotification('消息发送成功！我们会尽快回复您。', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

/**
 * 添加字符计数器
 */
function addCharacterCounter(textarea) {
    const maxLength = 1000;
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.style.textAlign = 'right';
    counter.style.fontSize = '0.875rem';
    counter.style.color = '#64748b';
    counter.style.marginTop = '0.25rem';
    
    textarea.parentNode.appendChild(counter);
    
    function updateCounter() {
        const length = textarea.value.length;
        counter.textContent = `${length}/${maxLength}`;
        
        if (length > maxLength * 0.9) {
            counter.style.color = '#dc2626';
        } else if (length > maxLength * 0.7) {
            counter.style.color = '#f59e0b';
        } else {
            counter.style.color = '#64748b';
        }
    }
    
    textarea.addEventListener('input', updateCounter);
    updateCounter();
}

/**
 * 初始化复制到剪贴板功能
 */
function initCopyToClipboard() {
    // 为联系信息添加复制按钮
    const contactValues = document.querySelectorAll('.contact-value');
    
    contactValues.forEach(container => {
        const text = container.textContent.trim();
        if (text && !container.querySelector('a')) {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
            copyBtn.title = '复制到剪贴板';
            
            copyBtn.addEventListener('click', function(e) {
                e.preventDefault();
                copyToClipboard(text, this);
            });
            
            container.appendChild(copyBtn);
        }
    });
}

/**
 * 复制文本到剪贴板
 */
function copyToClipboard(text, button) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showCopySuccess(button);
        }).catch(() => {
            fallbackCopyToClipboard(text, button);
        });
    } else {
        fallbackCopyToClipboard(text, button);
    }
}

/**
 * 降级复制方法
 */
function fallbackCopyToClipboard(text, button) {
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
        showCopySuccess(button);
    } catch (err) {
        showNotification('复制失败，请手动复制', 'error');
    }
    
    document.body.removeChild(textArea);
}

/**
 * 显示复制成功状态
 */
function showCopySuccess(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i>';
    button.classList.add('copied');
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.classList.remove('copied');
    }, 2000);
    
    showNotification('已复制到剪贴板', 'success');
}

/**
 * 初始化二维码功能
 */
function initQRCodeFeatures() {
    const qrCode = document.querySelector('.qr-code');
    if (!qrCode) return;
    
    // 添加二维码点击放大功能
    qrCode.addEventListener('click', function() {
        openQRModal(this.src, this.alt);
    });
    
    // 添加悬停效果
    qrCode.style.cursor = 'pointer';
    qrCode.style.transition = 'transform 0.3s ease';
    
    qrCode.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    qrCode.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

/**
 * 显示二维码（全局函数）
 */
function showQRCode() {
    const qrImageSrc = '/img/wechat.png';
    const qrImageAlt = '微信二维码';
    openQRModal(qrImageSrc, qrImageAlt);
}

/**
 * 打开二维码模态框
 */
function openQRModal(src, alt) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'qr-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 12px;
        text-align: center;
        max-width: 90%;
        animation: slideIn 0.3s ease;
    `;
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
        max-width: 300px;
        max-height: 300px;
        border-radius: 8px;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #666;
    `;
    
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(img);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // 关闭模态框
    function closeModal() {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

/**
 * 显示通知消息
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1001;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    // 根据类型设置背景色
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
    
    // 自动移除通知
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 添加必要的CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideIn {
        from { transform: translateY(-50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .field-error {
        color: #dc2626;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
    
    input.error,
    select.error,
    textarea.error {
        border-color: #dc2626;
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
    }
`;
document.head.appendChild(style);
