# Maria Mouratidi Portfolio

This is a React-based portfolio website deployed automatically to GitHub Pages using GitHub Actions.

---

## 🚀 Project Overview

- Built with **React**, **Tailwind CSS**, and other modern web tools.  
- Hosted on GitHub Pages: [https://maria-mouratidi.github.io/](https://maria-mouratidi.github.io/)  
- Fully **automated deployment** on every push to the `main` branch via GitHub Actions.

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) and npm installed locally  
- Git installed and configured  
- GitHub account with this repository forked or cloned

---

## 💻 Local Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/maria-mouratidi/maria-mouratidi.github.io.git && cd maria-mouratidi.github.io
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

This runs the app locally at [http://localhost:3000](http://localhost:3000) with hot reload for live changes.

---

## 🔧 Project Configuration

- Make sure the `"homepage"` field in `package.json` is set as follows:

  ```json
  "homepage": "https://maria-mouratidi.github.io/"
  ```

- The `build/` folder is included in `.gitignore` since it is generated automatically.

---

## 📦 Manual Deployment (Optional)

If you want to deploy manually instead of relying on GitHub Actions, run:

```bash
npm run deploy
```

This builds the app and pushes the `build/` folder to the `gh-pages` branch on GitHub.

---

## 📂 GitHub Actions Automatic Deployment

- The workflow file `.github/workflows/deploy.yml` is already included in this repo.  
- On every push to the `main` branch, GitHub Actions:  
  - Installs dependencies  
  - Runs the build script  
  - Deploys the site to GitHub Pages by pushing the `build/` folder to the `gh-pages` branch  
- This means **no manual deploy commands needed** after setup—just push your code!

---

## 🛠 GitHub Pages Settings

Make sure GitHub Pages is configured correctly in your repo:

1. Go to **Settings > Pages**.  
2. Set **Source** to:  
   - Branch: `gh-pages`  
   - Folder: `/ (root)`  
3. Save changes.

Your site will then be live at:  
`https://maria-mouratidi.github.io/`

---

## 📝 Development Notes

- Use Git CLI or GitHub Desktop to commit and push code to the `main` branch.  
- Never commit the `build/` folder manually; it is auto-generated.  
- The deployment workflow runs on every push to `main` and automatically updates your site.

---

## 📜 License

MIT License © 2025 Maria Mouratidi

---

Thank you for visiting my portfolio repository!
