---
layout: contact
title: 联系我们
subtitle: 与SynerGen-AI团队取得联系
lang: cn
---

## 联系信息

<div class="contact-info-grid">
    <!-- 微信号 -->
    <div class="contact-card wechat-card">
        <div class="contact-icon">
            <i class="fab fa-weixin"></i>
        </div>
        <div class="contact-content">
            <h3>微信号</h3>
            <p class="contact-value">SynerGen-AI</p>
            <p class="contact-description">添加微信获取最新资讯</p>
        </div>
    </div>

    <!-- 微信二维码 -->
    <div class="contact-card qr-card">
        <div class="contact-icon">
            <i class="fas fa-qrcode"></i>
        </div>
        <div class="contact-content">
            <h3>微信二维码</h3>
            <div class="qr-code-container">
                <button class="qr-view-btn" onclick="showQRCode()">
                    <i class="fas fa-eye"></i>
                    查看微信二维码
                </button>
            </div>
        </div>
    </div>

    <!-- 联系电话 -->
    <div class="contact-card phone-card">
        <div class="contact-icon">
            <i class="fas fa-phone"></i>
        </div>
        <div class="contact-content">
            <h3>联系电话</h3>
            <p class="contact-value">
                <a href="tel:+86-400-123-4567">+86-400-123-4567</a>
            </p>
            <p class="contact-description">工作日 9:00-18:00</p>
        </div>
    </div>

    <!-- 联系邮箱 -->
    <div class="contact-card email-card">
        <div class="contact-icon">
            <i class="fas fa-envelope"></i>
        </div>
        <div class="contact-content">
            <h3>联系邮箱</h3>
            <p class="contact-value">
                <a href="mailto:contact@synergen-ai.org">contact@synergen-ai.org</a>
            </p>
            <p class="contact-description">24小时内回复</p>
        </div>
    </div>

    <!-- 办公地点 -->
    <div class="contact-card location-card">
        <div class="contact-icon">
            <i class="fas fa-map-marker-alt"></i>
        </div>
        <div class="contact-content">
            <h3>办公地点</h3>
            <p class="contact-value">北京市海淀区中关村大街1号</p>
            <p class="contact-description">海龙大厦A座15层</p>
        </div>
    </div>
</div>

<!-- ## 联系表单

<form id="contact-form" class="contact-form">
  <div class="form-group">
    <label for="name">姓名 *</label>
    <input type="text" id="name" name="name" required>
  </div>
  
  <div class="form-group">
    <label for="email">邮箱 *</label>
    <input type="email" id="email" name="email" required>
  </div>
  
  <div class="form-group">
    <label for="organization">组织机构</label>
    <input type="text" id="organization" name="organization">
  </div>
  
  <div class="form-group">
    <label for="subject">主题 *</label>
    <select id="subject" name="subject" required>
      <option value="">选择一个主题</option>
      <option value="collaboration">研究合作</option>
      <option value="contribution">项目贡献</option>
      <option value="partnership">合作机会</option>
      <option value="support">技术支持</option>
      <option value="media">媒体咨询</option>
      <option value="other">其他</option>
    </select>
  </div>
  
  <div class="form-group">
    <label for="message">消息 *</label>
    <textarea id="message" name="message" rows="6" required placeholder="告诉我们您的咨询、项目或您想如何参与..."></textarea>
  </div>
  
  <button type="submit" class="btn btn-primary">发送消息</button>
</form>
---
*我们致力于在工作日48小时内回复所有咨询。对于紧急事务，请在邮件主题行中标记"紧急"。*
*我们尊重您的隐私，绝不会与第三方分享您的联系信息。查看我们的[隐私政策](/cn/privacy/)了解更多详情。* -->

<!-- 引入联系页面专用样式和脚本 -->
<link rel="stylesheet" href="{{ '/assets/css/contact.css' | relative_url }}">
<script src="{{ '/assets/js/contact.js' | relative_url }}" defer></script>