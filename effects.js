/* ========================================
   Club Luna - Mio Evolution
   インタラクティブエフェクト & オープニングアニメーション
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    initOpeningAnimation();
    initInteractiveEffects();
});

/* ========================================
   オープニングアニメーション
   A3: ボケ光 + B6: マスクreveal
   ======================================== */
function initOpeningAnimation() {
    const openingScreen = document.getElementById('opening-screen');
    if (!openingScreen) return;
    
    // ボケ光（Bokeh）を生成
    const bokehContainer = openingScreen.querySelector('.opening-bokeh');
    if (bokehContainer) {
        createBokehLights(bokehContainer);
    }
    
    // 名前周りのキラキラ装飾を生成
    const sparkleRing = openingScreen.querySelector('.opening-sparkle-ring');
    if (sparkleRing) {
        createSparkleRing(sparkleRing);
    }
    
    // ヒーロー動画の参照を取得
    const heroVideo = document.getElementById('heroVideo');
    
    // 2.5秒後に動画を再生開始（オープニング終了直前）
    setTimeout(() => {
        if (heroVideo) {
            heroVideo.play();
        }
    }, 2500);
    
    // 3.5秒後にオープニングをフェードアウト
    setTimeout(() => {
        openingScreen.classList.add('fade-out');
        
        // アニメーション完了後に要素を削除
        setTimeout(() => {
            openingScreen.remove();
            document.body.style.overflow = '';
        }, 1000);
    }, 3500);
    
    // オープニング中はスクロール無効
    document.body.style.overflow = 'hidden';
}

/* ボケ光（Bokeh）エフェクト生成 */
function createBokehLights(container) {
    const colors = [
        'rgba(255, 182, 193, 0.6)',  // ライトピンク
        'rgba(255, 105, 180, 0.5)',  // ホットピンク
        'rgba(255, 192, 203, 0.5)',  // ピンク
        'rgba(255, 215, 0, 0.4)',    // ゴールド
        'rgba(255, 228, 225, 0.6)',  // ミスティローズ
        'rgba(255, 240, 245, 0.7)',  // ラベンダーブラッシュ
        'rgba(255, 160, 200, 0.5)',  // ミディアムピンク
    ];
    
    // 大きなボケ光（背景用）
    for (let i = 0; i < 15; i++) {
        const circle = document.createElement('div');
        circle.className = 'bokeh-circle';
        
        const size = 80 + Math.random() * 200;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const duration = 4 + Math.random() * 4;
        const delay = Math.random() * 3;
        
        circle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            background: radial-gradient(circle, ${color} 0%, transparent 70%);
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        
        container.appendChild(circle);
    }
    
    // 小さなキラキラ光
    for (let i = 0; i < 25; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'bokeh-circle';
        
        const size = 10 + Math.random() * 30;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = 2 + Math.random() * 3;
        const delay = Math.random() * 2;
        
        sparkle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 215, 0, 0.4) 40%, transparent 70%);
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            filter: blur(0.5px);
        `;
        
        container.appendChild(sparkle);
    }
}

/* 名前周りのキラキラリング */
function createSparkleRing(container) {
    const sparkleSymbols = ['✦', '✧', '·', '✵'];
    const radius = 120;
    const count = 8;
    
    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'ring-sparkle';
        sparkle.textContent = sparkleSymbols[i % sparkleSymbols.length];
        
        // 円形に配置
        const angle = (Math.PI * 2 * i) / count;
        const x = Math.cos(angle) * radius + 100;
        const y = Math.sin(angle) * radius + 100;
        
        sparkle.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            animation-delay: ${i * 0.2}s;
            font-size: ${12 + Math.random() * 8}px;
        `;
        
        container.appendChild(sparkle);
    }
}

/* ========================================
   インタラクティブエフェクト
   タップ/クリックで星きらめき、花びらひらひら
   ======================================== */
function initInteractiveEffects() {
    // エフェクト用コンテナを作成
    const effectsContainer = document.createElement('div');
    effectsContainer.id = 'interactive-effects';
    effectsContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    `;
    document.body.appendChild(effectsContainer);
    
    // エフェクトのタイプ（ランダムで切り替え）
    const effectTypes = ['stars', 'petals', 'hearts', 'sparkles'];
    let currentEffectIndex = 0;
    
    // タップ/クリックイベント
    document.addEventListener('click', (e) => {
        // モーダルやライトボックスの閉じるボタン等は除外
        if (e.target.closest('.modal-close') || e.target.closest('.lightbox-close')) {
            return;
        }
        
        const x = e.clientX;
        const y = e.clientY;
        
        // 現在のエフェクトタイプを取得
        const effectType = effectTypes[currentEffectIndex];
        
        // エフェクトを生成
        createEffect(effectsContainer, x, y, effectType);
        
        // 次のクリックで別のエフェクト
        currentEffectIndex = (currentEffectIndex + 1) % effectTypes.length;
    });
    
    // タッチイベント（モバイル用）
    document.addEventListener('touchstart', (e) => {
        if (e.target.closest('.modal-close') || e.target.closest('.lightbox-close')) {
            return;
        }
        
        const touch = e.touches[0];
        const x = touch.clientX;
        const y = touch.clientY;
        
        const effectType = effectTypes[currentEffectIndex];
        createEffect(effectsContainer, x, y, effectType);
        currentEffectIndex = (currentEffectIndex + 1) % effectTypes.length;
    }, { passive: true });
    
    // ボタンホバー時（PC）の特別エフェクト
    const buttons = document.querySelectorAll('.cta-btn, .avatar-btn, .instagram-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', (e) => {
            createButtonGlowEffect(btn);
        });
    });
}

/* ========================================
   エフェクト生成関数
   ======================================== */
function createEffect(container, x, y, type) {
    const particleCount = 8 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = `effect-particle effect-${type}`;
        
        // ランダムな方向に飛ばす
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
        const velocity = 50 + Math.random() * 80;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            --tx: ${tx}px;
            --ty: ${ty}px;
        `;
        
        // タイプ別のコンテンツ
        switch(type) {
            case 'stars':
                particle.innerHTML = getRandomStar();
                break;
            case 'petals':
                particle.innerHTML = getRandomPetal();
                break;
            case 'hearts':
                particle.innerHTML = getRandomHeart();
                break;
            case 'sparkles':
                particle.innerHTML = getRandomSparkle();
                break;
        }
        
        container.appendChild(particle);
        
        // アニメーション完了後に削除
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

function getRandomStar() {
    const stars = ['⭐', '✨', '🌟', '💫', '⋆'];
    return stars[Math.floor(Math.random() * stars.length)];
}

function getRandomPetal() {
    const petals = ['🌸', '🏵️', '💮', '✿', '❀', '🌷'];
    return petals[Math.floor(Math.random() * petals.length)];
}

function getRandomHeart() {
    const hearts = ['💕', '💗', '💖', '💝', '♡', '♥'];
    return hearts[Math.floor(Math.random() * hearts.length)];
}

function getRandomSparkle() {
    const sparkles = ['✧', '✦', '❋', '❊', '✵', '✯'];
    return sparkles[Math.floor(Math.random() * sparkles.length)];
}

/* ========================================
   ボタンホバー時のグローエフェクト
   ======================================== */
function createButtonGlowEffect(btn) {
    const rect = btn.getBoundingClientRect();
    const container = document.getElementById('interactive-effects');
    
    // ボタン周りに小さなキラキラを生成
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'btn-hover-sparkle';
        
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;
        
        sparkle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            font-size: ${12 + Math.random() * 10}px;
        `;
        sparkle.innerHTML = getRandomSparkle();
        
        container.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 600);
    }
}
