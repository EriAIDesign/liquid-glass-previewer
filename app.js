// Liquid Glass Previewer - MIT License
// Copyright (c) 2026 Eri Tools
// Main application logic with accurate Liquid Glass rendering

class LiquidGlassPreviewer {
    constructor() {
        this.image = null;
        const activeBtn = document.querySelector('.color-btn.active');
        this.currentBgColor = activeBtn?.getAttribute('data-color') || '#99CFFF';
        const baseActiveBtn = document.querySelector('.base-btn.active');
        this.currentBaseColor = baseActiveBtn?.getAttribute('data-color') || '#0088FF';
        this.canvases = {
            normal: document.getElementById('normalCanvas'),
            dark: document.getElementById('darkCanvas'),
            liquid: document.getElementById('liquidCanvas')
        };
        this.contexts = {
            normal: this.canvases.normal.getContext('2d', { willReadFrequently: true }),
            dark: this.canvases.dark.getContext('2d', { willReadFrequently: true }),
            liquid: this.canvases.liquid.getContext('2d', { willReadFrequently: true })
        };
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const uploadZone = document.getElementById('uploadZone');
        const fileInput = document.getElementById('fileInput');
        const browseBtn = document.getElementById('browseBtn');
        const colorBtns = document.querySelectorAll('.color-btn:not(.color-custom):not(.base-btn):not(.base-custom)');
        const customColorBtn = document.getElementById('customColorBtn');
        const colorPicker = document.getElementById('colorPicker');
        const customSwatch = customColorBtn.querySelector('.custom-swatch');
        const baseBtns = document.querySelectorAll('.base-btn');
        const baseColorBtn = document.getElementById('baseColorBtn');
        const baseColorPicker = document.getElementById('baseColorPicker');
        const baseSwatch = baseColorBtn.querySelector('.base-swatch');

        // File upload
        browseBtn.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => this.handleFileSelect(e));

        // Drag and drop
        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.classList.add('dragover');
        });

        uploadZone.addEventListener('dragleave', () => {
            uploadZone.classList.remove('dragover');
        });

        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.classList.remove('dragover');
            if (e.dataTransfer.files.length > 0) {
                this.loadImage(e.dataTransfer.files[0]);
            }
        });

        // Background color presets
        colorBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const color = btn.getAttribute('data-color');
                this.changeBackgroundColor(color);
                this.updateActiveColorBtn(btn);
            });
        });

        // Custom color picker
        customColorBtn.addEventListener('click', () => colorPicker.click());
        const applyCustomColor = (value) => {
            this.changeBackgroundColor(value);
            customSwatch.style.background = value;
            customColorBtn.dataset.color = value;
            this.updateActiveColorBtn(customColorBtn);
        };

        colorPicker.addEventListener('input', (e) => applyCustomColor(e.target.value));
        colorPicker.addEventListener('change', (e) => applyCustomColor(e.target.value));
        colorPicker.addEventListener('click', (e) => e.stopPropagation());

        // Icon base color presets
        baseBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const color = btn.getAttribute('data-color');
                this.changeBaseColor(color);
                this.updateActiveBaseBtn(btn);
            });
        });

        baseColorBtn.addEventListener('click', () => baseColorPicker.click());
        const applyBaseColor = (value) => {
            this.changeBaseColor(value);
            baseSwatch.style.background = value;
            baseColorBtn.dataset.color = value;
            this.updateActiveBaseBtn(baseColorBtn);
        };

        baseColorPicker.addEventListener('input', (e) => applyBaseColor(e.target.value));
        baseColorPicker.addEventListener('change', (e) => applyBaseColor(e.target.value));
        baseColorPicker.addEventListener('click', (e) => e.stopPropagation());
    }

    handleFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            this.loadImage(file);
        }
    }

    loadImage(file) {
        if (!file.type.match('image.*')) {
            alert('Please upload an image file (PNG, SVG, or JPEG)');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                this.image = img;
                this.showControls();
                this.renderAllModes();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    showControls() {
        document.getElementById('controlsSection').style.display = 'block';
        document.getElementById('previewSection').style.display = 'block';
        this.changeBackgroundColor(this.currentBgColor);
    }

    changeBackgroundColor(color) {
        this.currentBgColor = color;

        // Update outer preview backgrounds
        Object.values(this.contexts).forEach(ctx => {
            ctx.canvas.parentElement.style.background = color;
        });

        if (this.image) {
            this.renderAllModes();
        }
    }

    changeBaseColor(color) {
        this.currentBaseColor = color;
        if (this.image) {
            this.renderAllModes();
        }
    }

    updateActiveColorBtn(activeBtn) {
        document.querySelectorAll('.color-btn:not(.base-btn)').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    updateActiveBaseBtn(activeBtn) {
        document.querySelectorAll('.base-btn, .base-custom').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }

    renderAllModes() {
        this.renderNormal();
        this.renderDarkMode();
        this.renderLiquidGlass();
    }

    renderNormal() {
        const canvas = this.canvases.normal;
        const ctx = this.contexts.normal;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const tile = this.getTileMetrics(canvas);
        this.drawTileBackground(ctx, tile.x, tile.y, tile.size, this.currentBaseColor);
        this.drawIconCentered(ctx, this.image, tile.x, tile.y, tile.size);
    }

    renderDarkMode() {
        const canvas = this.canvases.dark;
        const ctx = this.contexts.dark;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const tile = this.getTileMetrics(canvas);
        const darkBg = '#202020';
        this.drawTileBackground(ctx, tile.x, tile.y, tile.size, darkBg);
        this.drawIconCentered(ctx, this.image, tile.x, tile.y, tile.size);
        
        // Apply dark mode adjustments
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            // Slightly reduce brightness and increase contrast
            const factor = 0.92;
            data[i] = data[i] * factor;     // Red
            data[i + 1] = data[i + 1] * factor; // Green
            data[i + 2] = data[i + 2] * factor; // Blue
        }
        
        ctx.putImageData(imageData, 0, 0);
    }

    renderLiquidGlass() {
        const canvas = this.canvases.liquid;
        const ctx = this.contexts.liquid;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        const tile = this.getTileMetrics(canvas);
        this.drawTileBackground(ctx, tile.x, tile.y, tile.size, 'rgba(255,255,255,0.3)');
        this.drawIconCentered(ctx, this.image, tile.x, tile.y, tile.size);

        // Step 2: Get source image data for processing
        const srcData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const src = srcData.data;
        const data = imageData.data;

        // Step 3: Background color influence
        const bgColor = this.hexToRgb(this.currentBgColor);
        const bgLuma = this.getLuminance(bgColor.r, bgColor.g, bgColor.b);
        const bgLuma01 = bgLuma / 255;
        const isDark = bgLuma <= 140;
        const refractionFactor = isDark ? 0.05 : 0.03;
        const alphaFactor = 1.0;
        const highlightStrength = isDark ? 0.40 : 0.20;
        const whiteBlend = 0.18;
        const highlightBoost = 0.42;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
        const highlightHeight = canvas.height * 0.18;

        // Step 4: Apply Liquid Glass effect per pixel
        for (let py = 0; py < canvas.height; py++) {
            for (let px = 0; px < canvas.width; px++) {
                const idx = (py * canvas.width + px) * 4;
                const a = src[idx + 3];

                if (a === 0) {
                    data[idx] = 0;
                    data[idx + 1] = 0;
                    data[idx + 2] = 0;
                    data[idx + 3] = 0;
                    continue;
                }

                // --- 1) 元のRGB値を取得
                let r = src[idx];
                let g = src[idx + 1];
                let b = src[idx + 2];

                // --- 2) 明度（Luminance）を計算（0〜255）
                const luma = 0.299 * r + 0.587 * g + 0.114 * b;
                const lumaNorm = luma / 255; // 0〜1に正規化

                let newR;
                let newG;
                let newB;
                let newA;

                if (lumaNorm > 0.7) {
                    newR = 255;
                    newG = 255;
                    newB = 255;
                    newA = a;
                } else if (lumaNorm > 0.4) {
                    const whiteFactor = (lumaNorm - 0.4) / 0.3;
                    newR = 255;
                    newG = 255;
                    newB = 255;
                    newA = a * (0.3 + whiteFactor * 0.7);
                } else {
                    const colorKeep = 0.15;
                    newR = r * colorKeep + 255 * (1 - colorKeep);
                    newG = g * colorKeep + 255 * (1 - colorKeep);
                    newB = b * colorKeep + 255 * (1 - colorKeep);
                    newA = a * lumaNorm * 0.5;
                }

                // --- 4) 背景色の影響を少し加える（Vibrancy効果）
                const bgInfluence = 0.08;
                if (lumaNorm < 0.7) {
                    newR = newR * (1 - bgInfluence) + bgColor.r * bgInfluence;
                    newG = newG * (1 - bgInfluence) + bgColor.g * bgInfluence;
                    newB = newB * (1 - bgInfluence) + bgColor.b * bgInfluence;
                }

                // --- 5) 上端ハイライト（ガラスの光の反射）
                if (py < highlightHeight) {
                    const highlight = (highlightHeight - py) / highlightHeight;
                    const h = highlight * 40;
                    newR = Math.min(255, newR + h);
                    newG = Math.min(255, newG + h);
                    newB = Math.min(255, newB + h);
                }

                // --- 6) エッジの厚み（中心は薄く、外側は少し濃く）
                const dx = px - centerX;
                const dy = py - centerY;
                const distRatio = Math.sqrt(dx * dx + dy * dy) / maxDist;
                const edgeFactor = 0.92 + distRatio * 0.08;

                data[idx] = Math.max(0, Math.min(255, Math.round(newR)));
                data[idx + 1] = Math.max(0, Math.min(255, Math.round(newG)));
                data[idx + 2] = Math.max(0, Math.min(255, Math.round(newB)));
                data[idx + 3] = Math.max(0, Math.min(255, Math.round(newA * edgeFactor)));
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 255, g: 255, b: 255 };
    }

    getLuminance(r, g, b) {
        return 0.299 * r + 0.587 * g + 0.114 * b;
    }

    getTileMetrics(canvas) {
        const size = Math.min(canvas.width, canvas.height);
        const tileSize = size * 0.78;
        const x = (canvas.width - tileSize) / 2;
        const y = (canvas.height - tileSize) / 2;
        return { x, y, size: tileSize };
    }

    drawTileBackground(ctx, x, y, size, color) {
        const radius = size * 0.22;
        ctx.save();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(x, y, size, size, radius);
        ctx.fill();
        ctx.restore();
    }

    drawIconCentered(ctx, image, tileX, tileY, tileSize) {
        const iconSize = tileSize * 0.72;
        const x = tileX + (tileSize - iconSize) / 2;
        const y = tileY + (tileSize - iconSize) / 2;
        ctx.drawImage(image, x, y, iconSize, iconSize);
    }

}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LiquidGlassPreviewer();
});
