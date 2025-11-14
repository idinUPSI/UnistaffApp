# 🚀 Quick Start Guide - Panduan Pantas

## For First-Time Users / Untuk Pengguna Kali Pertama

### Option 1: Build APK Immediately (If you have all tools installed)

```bash
# Step 1: Clone the repository (if not done yet)
git clone https://github.com/idinUPSI/UnistaffApp.git
cd UnistaffApp

# Step 2: Install dependencies
npm install

# Step 3: Build the APK
npm run android:build

# ✅ Done! APK is at: android/app/build/outputs/apk/debug/app-debug.apk
```

### Option 2: Check Your Environment First (Recommended)

```bash
# Step 1: Check if you have the required tools
./check-build-env.sh

# Step 2: If all checks pass ✓, proceed with:
npm install
npm run android:build

# Step 3: If some checks fail ✗, install the missing tools:
# - Node.js: https://nodejs.org/
# - Java JDK: Included with Android Studio
# - Android Studio: https://developer.android.com/studio
```

---

## Build Commands Cheat Sheet / Rujukan Pantas Arahan

| What you want to do | Command | Result |
|---------------------|---------|--------|
| **Check environment** | `./check-build-env.sh` | Shows what's installed |
| **Build for testing** | `npm run android:build` | `app-debug.apk` |
| **Build for release** | `npm run android:build:release` | `app-release.apk` |
| **Open in Android Studio** | `npm run cap:open:android` | Opens IDE |
| **Update app after code changes** | `npm run cap:sync` | Syncs web → Android |

---

## Prerequisites Installation / Pemasangan Prasyarat

### 1️⃣ Node.js (Required / Diperlukan)

**Windows:**
- Download from: https://nodejs.org/
- Run installer, follow prompts
- Verify: `node -v` in command prompt

**Mac:**
```bash
brew install node
```

**Linux:**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2️⃣ Android Studio (Required / Diperlukan)

1. Download from: https://developer.android.com/studio
2. Install Android Studio
3. During setup, ensure these are installed:
   - Android SDK
   - Android SDK Platform
   - Android SDK Build-Tools

4. Set ANDROID_HOME environment variable:

**Windows:**
```cmd
setx ANDROID_HOME "C:\Users\YourUsername\AppData\Local\Android\Sdk"
```

**Mac/Linux:**
Add to `~/.bashrc` or `~/.zshrc`:
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

### 3️⃣ Java JDK (Included with Android Studio)

Android Studio includes JDK. If you need standalone:
- Download from: https://www.oracle.com/java/technologies/downloads/
- Install JDK 17 or higher

---

## Installation Workflow / Aliran Kerja Pemasangan

```
┌─────────────────────────────────────┐
│  1. Install Prerequisites           │
│     - Node.js                       │
│     - Android Studio + SDK          │
│     - Set ANDROID_HOME              │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  2. Verify Installation             │
│     Run: ./check-build-env.sh       │
└──────────────┬──────────────────────┘
               │
               ▼
        All checks pass? ──Yes─┐
               │                │
              No                │
               │                │
               ▼                ▼
     ┌─────────────┐  ┌─────────────────┐
     │Install      │  │ 3. Clone & Setup│
     │missing tools│  │    Repository   │
     └─────────────┘  └────────┬────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ 4. Build APK         │
                    │    npm run           │
                    │    android:build     │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ 5. Install & Test    │
                    │    On Device         │
                    └──────────────────────┘
```

---

## Troubleshooting / Penyelesaian Masalah

### ❌ Error: "ANDROID_HOME is not set"

**Solution:**
```bash
# Find your Android SDK location first
# Mac: ~/Library/Android/sdk
# Windows: C:\Users\YourUsername\AppData\Local\Android\Sdk
# Linux: ~/Android/Sdk

# Then set it (see section 2️⃣ above)
```

### ❌ Error: "Gradle build failed"

**Solutions:**
1. Make sure ANDROID_HOME is set correctly
2. Open project in Android Studio once: `npm run cap:open:android`
3. Let Android Studio download missing components
4. Try building again

### ❌ Error: "Command not found: gradlew"

**Solution:**
```bash
# The Android platform may not be initialized. Run:
npm run cap:sync
```

### ❌ APK installs but crashes immediately

**Solutions:**
1. Check logcat: `adb logcat`
2. Ensure you built the latest version: `npm run cap:sync && npm run android:build`
3. Clear app data on device before reinstalling

---

## Testing Your APK / Menguji APK Anda

### Method 1: Using ADB (Recommended)

```bash
# Connect device via USB and enable USB debugging
# Then:
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Or to update existing installation:
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

### Method 2: Manual Installation

1. Copy `app-debug.apk` to your phone
2. Open the file on your phone
3. Enable "Install from Unknown Sources" if prompted
4. Tap Install

---

## Making Changes to the App / Membuat Perubahan pada Aplikasi

### Changing Web Content

1. Edit React files (`App.tsx`, `index.tsx`, etc.)
2. Test in browser: `npm run dev`
3. Build for Android: `npm run cap:sync`
4. Build APK: `npm run android:build`

### Changing App Icon

1. Replace images in: `android/app/src/main/res/mipmap-*/`
2. Keep the same filenames
3. Rebuild: `npm run android:build`

### Changing App Name

1. Edit: `android/app/src/main/res/values/strings.xml`
2. Change the `app_name` value
3. Rebuild: `npm run android:build`

---

## File Locations / Lokasi Fail

| What | Where |
|------|-------|
| Debug APK | `android/app/build/outputs/apk/debug/app-debug.apk` |
| Release APK | `android/app/build/outputs/apk/release/app-release.apk` |
| App Icon | `android/app/src/main/res/mipmap-*/ic_launcher.png` |
| App Name | `android/app/src/main/res/values/strings.xml` |
| Splash Screen | `android/app/src/main/res/drawable-*/splash.png` |
| Android Manifest | `android/app/src/main/AndroidManifest.xml` |

---

## Need More Help? / Perlukan Bantuan Lagi?

📖 **Detailed Documentation:**
- **BUILD_APK.md** - Complete build guide with signing instructions
- **SUMMARY.md** - Project overview and architecture
- **README.md** - Main project documentation

🔍 **Check Your Setup:**
```bash
./check-build-env.sh
```

📚 **External Resources:**
- Capacitor Docs: https://capacitorjs.com/docs
- Android Developer: https://developer.android.com/

---

## Success Checklist / Senarai Semak Kejayaan

Before you start, ensure:
- [ ] Node.js is installed (`node -v` works)
- [ ] Android Studio is installed
- [ ] ANDROID_HOME is set correctly
- [ ] `./check-build-env.sh` shows all green checks ✓

To build successfully:
- [ ] `npm install` completes without errors
- [ ] `npm run build` works
- [ ] `npm run cap:sync` works
- [ ] `npm run android:build` completes
- [ ] APK file exists at expected location
- [ ] APK installs and runs on device

---

**Ready to go! / Sedia untuk mula!** 🎉

If you get stuck, refer to **BUILD_APK.md** for detailed troubleshooting.
