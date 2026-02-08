// Liquid Glass Previewer - MIT License
// Copyright (c) 2026 Eri Tools
// i18n.js - Bilingual support for Liquid Glass Previewer
const translations = {
    en: {
        'tagline': 'Preview your app icons with real macOS/iOS Liquid Glass effect',
        'upload-title': 'Drop your icon here',
        'upload-subtitle': 'PNG or SVG • 512×512px recommended',
        'browse-btn': 'Browse Files',
        'bg-title': 'Background Color',
        'mode-normal': 'Normal',
        'mode-dark': 'Dark Mode',
        'mode-liquid': 'Liquid Glass',
        'info-title-1': 'What is Liquid Glass?',
        'info-text-1': 'Liquid Glass is a glass-like visual found in macOS Dock and iOS customization. This tool aims to recreate its key characteristics so you can check how icons look on glassy backgrounds.',
        'info-title-2': 'How to use',
        'info-text-2': 'Upload an app icon (512×512px recommended) and switch background colors to preview. The Liquid Glass view is designed to approximate real macOS/iOS behavior in your browser.',
        'info-title-3': 'Privacy & Safety',
        'info-text-3': 'Your images are processed entirely in your browser. Nothing is uploaded to any server. Your files never leave your device.',
        'support-btn': 'Support this tool',
        'footer-note': 'Liquid Glass is not an Apple trademark or product name and refers to visual styles seen in macOS/iOS UI. This tool is an unofficial third-party project.',
        'footer-license': 'License: MIT (Open Source)',
        'footer-source': 'Source: GitHub'
    },
    ja: {
        'tagline': 'macOS/iOS の Liquid Glass エフェクトをリアルタイムでプレビュー',
        'upload-title': 'アイコンをドロップ',
        'upload-subtitle': 'PNG または SVG • 512×512px 推奨',
        'browse-btn': 'ファイルを選択',
        'bg-title': '背景色',
        'mode-normal': 'ノーマル',
        'mode-dark': 'ダークモード',
        'mode-liquid': 'リキッドグラス',
        'info-title-1': 'Liquid Glass とは？',
        'info-text-1': 'Liquid Glass は、macOS の Dock や iOS のカスタマイズモードで見られるガラス調の表現です。本ツールでは、その特徴をできるだけ再現して見え方を確認できます。',
        'info-title-2': '使い方',
        'info-text-2': 'アプリアイコン（512×512px推奨）をアップロードし、背景色を切り替えて見え方を確認します。Liquid Glass プレビューは実際の表示に近い挙動をブラウザ上で再現することを目的にしています。',
        'info-title-3': 'プライバシーと安全性',
        'info-text-3': '画像はすべてブラウザ内で処理されます。サーバーへのアップロードは一切行われず、ファイルはあなたのデバイスから外に出ることはありません。',
        'support-btn': 'このツールを支援',
        'footer-note': 'Liquid Glass は Apple の商標または製品名ではなく、macOS/iOS の UI に見られる視覚表現を指しています。このツールは非公式のサードパーティ製です。',
        'footer-license': 'ライセンス: MIT（オープンソース）',
        'footer-source': 'ソース: GitHub'
    }
};

let currentLang = 'en';

function updateLanguage(lang) {
    currentLang = lang;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });

    // Save preference
    localStorage.setItem('preferredLang', lang);
}

// Initialize language
document.addEventListener('DOMContentLoaded', () => {
    // Check saved preference or browser language
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = navigator.language.toLowerCase();
    const defaultLang = savedLang || (browserLang.startsWith('ja') ? 'ja' : 'en');
    
    updateLanguage(defaultLang);

    // Language toggle buttons
    document.getElementById('lang-en').addEventListener('click', () => updateLanguage('en'));
    document.getElementById('lang-ja').addEventListener('click', () => updateLanguage('ja'));
});
