# Liquid Glass Previewer

macOS / iOS の Liquid Glass（ガラス）エフェクト を、  
アプリアイコンにリアルタイムで適用してプレビューできる Web ツールです。

デモ版: https://eriaidesign.github.io/liquid-glass-previewer/  
Created by [Eri Tools](https://ko-fi.com/eritools)

---

 特徴

- 本物の Liquid Glass を再現
  macOS Dock や iOS のカスタマイズ画面に近い質感を忠実にシミュレーション。
- リアルタイムプレビュー
  アイコンをドロップすると即座にレンダリングされます。
- 3つの表示モード
  Light / Dark / 比較ビュー。
- ブラウザのみで処理  
  画像はアップロードされず、すべてローカルで完結。
- 英語 / 日本語対応

---


Liquid Glass の仕組み

このツールでは、以下の工程を組み合わせて  
Apple のガラス表現を再現しています：

- 彩度の低減  
- 輝度補正  
- 背景色に応じた Vibrancy 表現  
- 複数レイヤーのガウスぼかし  
- 上端のハイライト表現  
- ガラスの厚みを出す非線形アルファ

---

 ファイル構成

liquid-glass-previewer/
├── index.html
├── styles.css
├── app.js
├── i18n.js
├── favicon.png
└── og-image.jpg

---

 サポート（応援）

もしこのツールがお役に立ったら、  
Ko-fi でのサポートを検討していただけると嬉しいです。

 https://ko-fi.com/eritools

開発の励みになります (^^)

---

 ライセンス

MIT License  
商用・個人利用どちらでも無料でお使いいただけます。

---

 免責事項

本ツールは Apple Inc. とは一切関係ありません。  
記載されている名称・商標は各社の所有物です。

---

 Advanced（開発者向け）

ローカル実行

```bash
python -m http.server 8000
# または
npx serve

ブラウザで以下を開く：

http://localhost:8000

GitHub Pages へのデプロイ
    1.    GitHub にリポジトリを作成してファイルをアップロード
    2.    Settings → Pages を開く
    3.    Source: main branch を選択
    4.    数分待つ
    5.    以下の URL で公開されます：

https://YOUR-USERNAME.github.io/liquid-glass-previewer/


⸻

Made with ❤️ by Eri Tools￼

---
