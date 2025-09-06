// videos.js - 视频页面专用JavaScript
document.addEventListener("DOMContentLoaded", function () {
    const videos = document.querySelectorAll(".gallery-video");
    
    // 初始化视频容器
    videos.forEach(video => {
        const wrapper = video.closest(".video-wrapper");
        
        // 添加加载状态
        wrapper.classList.add("loading");
        
        // 监听视频元数据加载
        video.addEventListener("loadedmetadata", function () {
            // 移除加载状态，让视频保持原始比例
            wrapper.classList.remove("loading");
        });
        
        // 监听视频加载错误
        video.addEventListener("error", function () {
            const wrapper = video.closest(".video-wrapper");
            wrapper.classList.remove("loading");
            wrapper.style.background = "#f0f0f0";
            wrapper.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666;">视频加载失败</div>';
        });
        
        // 添加点击播放功能
        wrapper.addEventListener("click", function (e) {
            e.preventDefault();
            
            // 如果视频暂停，则播放
            if (video.paused) {
                video.play();
                wrapper.classList.add("playing");
            } else {
                video.pause();
                wrapper.classList.remove("playing");
            }
        });
        
        // 监听播放状态变化
        video.addEventListener("play", function () {
            wrapper.classList.add("playing");
        });
        
        video.addEventListener("pause", function () {
            wrapper.classList.remove("playing");
        });
        
        // 监听视频结束
        video.addEventListener("ended", function () {
            wrapper.classList.remove("playing");
        });
    });
    
    // 添加键盘支持
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            // 暂停所有正在播放的视频
            videos.forEach(video => {
                if (!video.paused) {
                    video.pause();
                    const wrapper = video.closest(".video-wrapper");
                    wrapper.classList.remove("playing");
                }
            });
        }
    });
    
    // 添加视频懒加载支持
    if ("IntersectionObserver" in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    if (video.dataset.src && !video.src) {
                        video.src = video.dataset.src;
                        video.load();
                    }
                    videoObserver.unobserve(video);
                }
            });
        }, {
            rootMargin: "50px 0px",
            threshold: 0.1
        });
        
        videos.forEach(video => {
            videoObserver.observe(video);
        });
    }
});