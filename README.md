<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# UniStaff UPSI Portal App

This is a Progressive Web App (PWA) wrapper for the UPSI UniStaff Portal, built with React and Capacitor.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the development server:
   `npm run dev`
3. Build the web app:
   `npm run build`

## Android APK Build

This repository is configured to automatically build Android APK files via GitHub Actions when pushing to the `main` branch.

For detailed information about Android APK builds, including how to configure signing keys and download the built APK, please see [ANDROID_BUILD.md](ANDROID_BUILD.md).

### Quick Start for Android Build

1. Push your changes to the `main` branch
2. GitHub Actions will automatically build the APK
3. Download the APK from the **Actions** tab → Select the workflow run → **Artifacts** section

The workflow supports both **signed** (with keystore secrets) and **unsigned** (without secrets) builds.

## Project Structure

- `/src` - Application source code
- `/android` - Android project (Capacitor)
- `/.github/workflows` - GitHub Actions workflows
- `capacitor.config.json` - Capacitor configuration

## Technologies Used

- React 18
- TypeScript
- Vite
- Capacitor 5
- Android (via Capacitor)

---

View original AI Studio app: https://ai.studio/apps/drive/1HG57e0mhh1a-g_Z0vn3noii3WSTK2PLd
