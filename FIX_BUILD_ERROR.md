# 🔧 Cara Betulkan Build Error / How to Fix Build Error

## ❌ Error Yang Dihadapi / Error Encountered

```
./gradlew: No such file or directory
```

Error ini bermakna fail `gradlew` (Gradle wrapper) tidak wujud dalam direktori `android/`.

This error means the `gradlew` (Gradle wrapper) file doesn't exist in the `android/` directory.

---

## ✅ Penyelesaian / Solution

### Kaedah 1: Tambah Semula Android Platform / Re-add Android Platform

Ini akan create semula direktori android dengan semua fail yang diperlukan.

This will recreate the android directory with all required files.

```bash
# 1. Pastikan dependencies dipasang / Ensure dependencies are installed
npm install

# 2. Build web app
npm run build

# 3. Tambah platform Android / Add Android platform
npx cap add android

# 4. Sync ke Android / Sync to Android
npx cap sync android

# 5. Semak gradlew wujud / Check gradlew exists
ls -la android/gradlew
```

**Nota:** Jika anda sudah ada fail khusus dalam `android/`, buat backup dahulu!

**Note:** If you already have custom files in `android/`, backup first!

### Kaedah 2: Generate Gradle Wrapper Sahaja / Generate Gradle Wrapper Only

Jika anda hanya perlu gradlew tanpa recreate keseluruhan android folder:

If you only need gradlew without recreating the entire android folder:

```bash
cd android
gradle wrapper
cd ..
```

**Requirement:** Anda perlu ada Gradle installed secara global.

**Requirement:** You need Gradle installed globally.

---

## 🔍 Kenapa Ini Berlaku / Why This Happens

1. **Android directory dihapus dan dicipta semula tanpa Capacitor**
   Android directory was deleted and recreated without Capacitor
   
2. **gradlew tidak di-commit ke git**
   gradlew was not committed to git
   
3. **Capacitor tidak properly sync**
   Capacitor was not properly synced

---

## ✅ Semak Build Berfungsi / Verify Build Works

Selepas fix, cuba build secara lokal:

After fixing, try building locally:

```bash
# Build web
npm run build

# Sync Capacitor
npx cap sync android

# Build APK (jika ada Android SDK)
# Build APK (if you have Android SDK)
cd android
./gradlew assembleDebug
```

Jika berjaya, anda akan dapat APK di:
If successful, you'll get APK at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🚀 Testing di GitHub Actions / Testing in GitHub Actions

Selepas fix dan commit perubahan:

After fixing and committing changes:

1. **Push ke main branch**
   ```bash
   git add android/
   git commit -m "Add complete android platform with gradlew"
   git push
   ```

2. **Trigger workflow**
   - Pergi ke GitHub → Actions tab
   - Go to GitHub → Actions tab
   - Pilih workflow "Build Android APK"
   - Select workflow "Build Android APK"
   - Klik "Run workflow"
   - Click "Run workflow"

3. **Tunggu hasil / Wait for results**
   - Build patut berjaya dalam 5-10 minit
   - Build should succeed in 5-10 minutes
   - Muat turun APK dari Artifacts
   - Download APK from Artifacts

---

## 📋 Checklist

Sebelum commit, pastikan:
Before committing, ensure:

- [ ] `android/gradlew` wujud / exists
- [ ] `android/gradlew` adalah executable (`chmod +x android/gradlew`)
- [ ] `android/gradle/` folder wujud / exists
- [ ] `android/app/build.gradle` wujud / exists
- [ ] `npx cap sync android` berjaya / succeeds

---

## 💡 Tips

### Untuk Prevent Masalah Ini / To Prevent This Issue

1. **Commit gradlew ke git**
   ```bash
   git add android/gradlew
   git add android/gradle/
   git commit -m "Add Gradle wrapper files"
   ```

2. **Jangan delete android directory secara manual**
   Don't manually delete android directory
   
3. **Gunakan Capacitor commands sahaja**
   Use Capacitor commands only:
   - `npx cap add android` - Add platform
   - `npx cap sync android` - Sync changes
   - `npx cap update android` - Update Capacitor

### Struktur Android Directory Yang Betul / Correct Android Directory Structure

```
android/
├── gradle/
│   └── wrapper/
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── gradlew          ← PENTING / IMPORTANT
├── gradlew.bat
├── app/
│   └── build.gradle
├── build.gradle
└── settings.gradle
```

---

## 🔗 Rujukan / References

- [Capacitor Android Documentation](https://capacitorjs.com/docs/android)
- [Gradle Wrapper Documentation](https://docs.gradle.org/current/userguide/gradle_wrapper.html)
- [BUILD_TROUBLESHOOTING.md](BUILD_TROUBLESHOOTING.md) - Troubleshooting lengkap
- [QUICK_BUILD.md](QUICK_BUILD.md) - Panduan build pantas

---

## 📞 Masih Ada Masalah? / Still Having Issues?

Jika masih gagal selepas cuba langkah di atas:

If still failing after trying steps above:

1. Share error message lengkap / Share complete error message
2. Buka issue di GitHub
3. Sertakan output dari:
   ```bash
   npx cap doctor
   npm run build
   ls -la android/
   ```

---

*Dokumen ini dibuat untuk membantu debugging build error.*  
*This document was created to help debug build errors.*
