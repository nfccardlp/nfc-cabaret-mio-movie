/* ========================================
   Club Luna - Mio NFC Landing Page
   JavaScript Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initParticles();
    initSparkles();
    initFloatingParticles();
    initGallerySwiper();
    initLightbox();
    initModals();
    initScrollReveal();
    initButtonGlow();
});

/* ========================================
   パーティクル背景
   ======================================== */
function initParticles() {
    const container = document.getElementById('particles-bg');
    if (!container) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 6 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
    }
}

/* ========================================
   スパークル効果（ヒーローセクション）
   ======================================== */
function initSparkles() {
    const container = document.getElementById('sparkles');
    if (!container) return;
    
    const sparkleCount = 20;
    
    for (let i = 0; i < sparkleCount; i++) {
        createSparkle(container);
    }
    
    // 継続的にスパークル追加
    setInterval(() => {
        const sparkle = createSparkle(container);
        setTimeout(() => sparkle.remove(), 2000);
    }, 300);
}

function createSparkle(container) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 2;
    
    sparkle.style.left = `${x}%`;
    sparkle.style.top = `${y}%`;
    sparkle.style.animationDelay = `${delay}s`;
    
    container.appendChild(sparkle);
    return sparkle;
}

/* ========================================
   浮遊パーティクル
   ======================================== */
function initFloatingParticles() {
    const container = document.getElementById('floating');
    if (!container) return;
    
    const colors = ['#ff6b9d', '#c77dff', '#ffd700', '#7b68ee'];
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 6 + 4;
        const duration = Math.random() * 5 + 5;
        const delay = Math.random() * 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = color;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
    }
}

/* ========================================
   ギャラリー Swiper
   ======================================== */
function initGallerySwiper() {
    if (typeof Swiper === 'undefined') return;
    
    const gallerySwiper = new Swiper('.gallery-swiper', {
        slidesPerView: 1.2,
        centeredSlides: true,
        spaceBetween: 15,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            480: {
                slidesPerView: 1.3,
                spaceBetween: 20,
            }
        }
    });
}

/* ========================================
   ライトボックス（画像拡大・スワイプ）
   ======================================== */
function initLightbox() {
    // ライトボックス要素を作成
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close"><i class="fas fa-times"></i></button>
            <button class="lightbox-nav lightbox-prev"><i class="fas fa-chevron-left"></i></button>
            <img class="lightbox-image" src="" alt="">
            <button class="lightbox-nav lightbox-next"><i class="fas fa-chevron-right"></i></button>
            <div class="lightbox-counter"><span class="current">1</span> / <span class="total">5</span></div>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    const currentSpan = lightbox.querySelector('.current');
    const totalSpan = lightbox.querySelector('.total');
    
    // ギャラリー画像取得
    const galleryImages = document.querySelectorAll('.gallery-swiper .swiper-slide img');
    let currentIndex = 0;
    let images = [];
    
    // 重複を除いた画像リストを作成
    galleryImages.forEach(img => {
        if (!images.includes(img.src)) {
            images.push(img.src);
        }
    });
    
    totalSpan.textContent = images.length;
    
    // 画像クリックでライトボックス開く
    galleryImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            // 実際のインデックスを見つける
            const actualIndex = images.indexOf(img.src);
            currentIndex = actualIndex >= 0 ? actualIndex : 0;
            openLightbox();
        });
    });
    
    function openLightbox() {
        lightboxImage.src = images[currentIndex];
        currentSpan.textContent = currentIndex + 1;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    }
    
    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    }
    
    function updateImage() {
        lightboxImage.src = images[currentIndex];
        currentSpan.textContent = currentIndex + 1;
    }
    
    // イベントリスナー
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrev);
    lightboxNext.addEventListener('click', showNext);
    
    // オーバーレイクリックで閉じる
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });
    
    // キーボード操作
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
    
    // スワイプ操作
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightboxImage.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    lightboxImage.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    }, { passive: true });
    
    lightboxImage.addEventListener('touchend', () => {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                showNext();
            } else {
                showPrev();
            }
        }
    });
}

/* ========================================
   モーダル管理
   ======================================== */
function initModals() {
    // アバターモーダル
    const avatarBtn = document.getElementById('avatarBtn');
    const avatarModal = document.getElementById('avatarModal');
    const avatarModalClose = document.getElementById('avatarModalClose');
    
    if (avatarBtn && avatarModal) {
        avatarBtn.addEventListener('click', () => openModal(avatarModal));
        avatarModalClose.addEventListener('click', () => closeModal(avatarModal));
        avatarModal.querySelector('.modal-overlay').addEventListener('click', () => closeModal(avatarModal));
    }
    
    // ブックマークモーダル
    const saveContactBtn = document.getElementById('saveContactBtn');
    const bookmarkModal = document.getElementById('bookmarkModal');
    const bookmarkModalClose = document.getElementById('bookmarkModalClose');
    
    if (saveContactBtn && bookmarkModal) {
        saveContactBtn.addEventListener('click', () => openModal(bookmarkModal));
        bookmarkModalClose.addEventListener('click', () => closeModal(bookmarkModal));
        bookmarkModal.querySelector('.modal-overlay').addEventListener('click', () => closeModal(bookmarkModal));
    }
    
    // ESCキーでモーダルを閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                closeModal(modal);
            });
        }
    });
}

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/* ========================================
   スクロールアニメーション
   ======================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.section-header, .avatar-card, .instagram-placeholder, .notion-placeholder, .cta-content');
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
}

/* ========================================
   ボタングロー効果
   ======================================== */
function initButtonGlow() {
    const buttons = document.querySelectorAll('.cta-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            btn.style.setProperty('--x', `${x}%`);
            btn.style.setProperty('--y', `${y}%`);
        });
    });
}

/* ========================================
   スムーズスクロール
   ======================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
