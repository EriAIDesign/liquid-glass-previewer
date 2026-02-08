# Liquid Glass Previewer

A web tool for previewing app icons with the real macOS/iOS Liquid Glass effect.

**Created by [Eri Tools](https://ko-fi.com/eritools)**

## ✨ Features

- **Accurate Liquid Glass Simulation**: Replicates the real macOS Dock and iOS customization mode glass effect
- **Real-time Preview**: See how your icon looks with different background colors instantly
- **3 Modes**: Normal, Dark Mode, and Liquid Glass side-by-side comparison
- **Privacy First**: All processing happens in your browser - no uploads, no servers
- **Bilingual**: Full support for English and Japanese (日本語)
- **Responsive**: Works on desktop, tablet, and mobile

## 🚀 Quick Start

### Local Development

1. Clone or download this repository
2. Open `index.html` in your browser
3. That's it! No build step required.

### Testing Locally

```bash
# If you have Python installed:
python -m http.server 8000

# Or with Node.js:
npx serve
```

Then open `http://localhost:8000` in your browser.

## 📦 Deployment to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `liquidglass-previewer` (or any name you prefer)
3. Make it **Public**
4. Don't initialize with README (we already have files)

### Step 2: Upload Files

**Option A: Via GitHub Web Interface (Easiest)**

1. Go to your new repository
2. Click "uploading an existing file"
3. Drag and drop these files:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `i18n.js`
   - `README.md`
4. Commit the changes

**Option B: Via Git Command Line**

```bash
# Navigate to the folder containing your files
cd /path/to/liquidglass-previewer

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Liquid Glass Previewer"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/liquidglass-previewer.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. In the left sidebar, click **Pages**
4. Under "Source", select **main** branch
5. Click **Save**
6. Wait 1-2 minutes for deployment

Your site will be live at:
```
https://YOUR-USERNAME.github.io/liquidglass-previewer/
```

### Step 4: (Optional) Custom Domain

If you want `eritools.github.io` instead of `username.github.io/liquidglass-previewer`:

1. Rename your repository to `eritools.github.io`
2. The site will be available at `https://eritools.github.io/`

## 🎨 How It Works

### The Liquid Glass Effect

The tool accurately simulates Apple's Liquid Glass effect through:

1. **Desaturation**: Reduces color saturation by 40-50%
2. **Brightness Adjustment**: Slightly increases brightness (10-15%)
3. **Vibrancy Tint**: Applies background color influence based on luminance
4. **Multi-layer Blur**: Simulates depth with graduated blur
5. **Specular Highlight**: Adds subtle light reflection on top edge
6. **Non-linear Alpha**: Creates glass thickness effect with transparency gradient

### Background Color Presets

- **White** (`#ffffff`): Standard light background
- **Light Gray** (`#f2f2f7`): macOS light mode background
- **Dark Gray** (`#1c1c1e`): macOS dark mode background
- **Black** (`#000000`): Pure black background
- **iOS Blue** (`#007AFF`): Apple's signature blue
- **Custom**: Choose any color with the color picker

## 🛠 Technical Stack

- Pure HTML/CSS/JavaScript (no frameworks)
- Canvas API for image processing
- CSS Grid for responsive layout
- LocalStorage for language preference
- No external dependencies except Google Fonts

## 📝 Files Structure

```
liquidglass-previewer/
├── index.html      # Main HTML structure
├── styles.css      # Refined minimal design
├── app.js          # Liquid Glass rendering engine
├── i18n.js         # Bilingual support (EN/JP)
└── README.md       # This file
```

## 💰 Support This Project

If you find this tool useful, consider supporting:

☕ **[Buy me a coffee on Ko-fi](https://ko-fi.com/eritools)**

Your support helps keep this tool free and ad-free for everyone!

## 🤝 Contributing

Issues and pull requests are welcome! Feel free to:

- Report bugs
- Suggest new features
- Improve the Liquid Glass algorithm
- Add new language translations

## 📄 License

MIT License - feel free to use this tool for personal or commercial projects.

## ⚠️ Disclaimer

This is an independent tool and is not affiliated with, endorsed by, or sponsored by Apple Inc. All trademarks are property of their respective owners.

---

**Made with ❤️ by [Eri Tools](https://ko-fi.com/eritools)**
