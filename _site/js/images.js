// images.js - 图片页面专用JavaScript

// 动态调整图片尺寸
function adjustImageSize(img) {
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    if (aspectRatio > 1.2) {
        img.style.width = "100%";
        img.style.height = "auto";
    } else {
        img.style.width = "auto";
        img.style.height = "100%";
    }
}

// Modal 功能 + 图片切换
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalImageTitle");
    const modalDesc = document.getElementById("modalImageDescription");
    const modalClose = document.querySelector(".modal-close");
    const prevBtn = document.getElementById("prevImage");
    const nextBtn = document.getElementById("nextImage");

    const galleryImages = Array.from(document.querySelectorAll(".gallery-item img"));
    let currentIndex = 0;

    function openModal(index) {
        currentIndex = index;
        const img = galleryImages[currentIndex];
        modal.style.display = "flex";
        modalImg.src = img.src;
        modalTitle.textContent = img.alt || img.src.split('/').pop();
        modalDesc.textContent = "AI生成图片";
    }

    galleryImages.forEach((img, idx) => {
        img.addEventListener("click", () => openModal(idx));
    });

    modalClose.onclick = () => { modal.style.display = "none"; };
    modal.onclick = (e) => { if(e.target === modal) modal.style.display = "none"; };

    prevBtn.onclick = (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        openModal(currentIndex);
    };

    nextBtn.onclick = (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % galleryImages.length;
        openModal(currentIndex);
    };

    // 支持键盘左右切换
    document.addEventListener("keydown", (e) => {
        if(modal.style.display === "flex") {
            if(e.key === "ArrowLeft") prevBtn.click();
            if(e.key === "ArrowRight") nextBtn.click();
            if(e.key === "Escape") modalClose.click();
        }
    });
});