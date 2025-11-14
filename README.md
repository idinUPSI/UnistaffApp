<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1HG57e0mhh1a-g_Z0vn3noii3WSTK2PLd

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Build Android APK

To build this app as an Android APK, see the detailed guides:

📱 **[BUILD_APK.md](BUILD_APK.md)** - Complete build guide in Malay and English  
🔧 **[BUILD_TROUBLESHOOTING.md](BUILD_TROUBLESHOOTING.md)** - Troubleshooting and solutions

### Quick Start (APK)

**Option 1: Build Locally**
```bash
# Install dependencies
npm install

# Build debug APK
npm run android:build
```

The APK will be available at: `android/app/build/outputs/apk/debug/app-debug.apk`

**Option 2: Build with GitHub Actions**

This repository includes a GitHub Actions workflow that automatically builds the APK:

1. Go to the **Actions** tab in GitHub
2. Select **"Build Android APK"** workflow
3. Click **"Run workflow"**
4. Choose build type (debug or release)
5. Download the APK from the workflow artifacts

**Option 3: Build in Android Studio**

```bash
npm install && npm run build && npx cap sync
npm run cap:open:android
```

Then build the APK from Android Studio: **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**

### Troubleshooting

If you encounter build errors, see [BUILD_TROUBLESHOOTING.md](BUILD_TROUBLESHOOTING.md) for:
- Network and dependency issues
- Environment setup verification
- Alternative build methods
- Release APK signing configuration
