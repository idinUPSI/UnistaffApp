# 🚀 Cara Mudah Build APK / Easy APK Build Guide

## Kaedah Paling Mudah / Easiest Method: GitHub Actions

### Langkah-langkah / Steps:

1. **Pergi ke tab Actions di GitHub / Go to Actions tab on GitHub**
   - Buka repository: https://github.com/idinUPSI/UnistaffApp
   - Klik tab "Actions" di bahagian atas
   - Click "Actions" tab at the top

2. **Pilih workflow / Select workflow**
   - Klik "Build Android APK" dari senarai workflows
   - Click "Build Android APK" from the workflows list

3. **Jalankan build / Run build**
   - Klik butang "Run workflow" (di sebelah kanan)
   - Click "Run workflow" button (on the right side)
   - Pilih "debug" untuk testing / Choose "debug" for testing
   - Klik butang hijau "Run workflow"
   - Click green "Run workflow" button

4. **Tunggu build selesai / Wait for build to complete**
   - Build mengambil masa ~5-10 minit
   - Build takes ~5-10 minutes
   - Anda boleh lihat progress dalam workflow run
   - You can see progress in the workflow run

5. **Muat turun APK / Download APK**
   - Bila build selesai, scroll ke bawah
   - When build completes, scroll down
   - Cari bahagian "Artifacts"
   - Find "Artifacts" section
   - Klik "app-debug-apk" untuk muat turun
   - Click "app-debug-apk" to download

6. **Install APK**
   - Ekstrak fail ZIP yang dimuat turun
   - Extract the downloaded ZIP file
   - Salin `app-debug.apk` ke telefon Android
   - Copy `app-debug.apk` to Android phone
   - Buka fail untuk install (enable "Unknown Sources" jika perlu)
   - Open file to install (enable "Unknown Sources" if needed)

---

## ✅ Kelebihan GitHub Actions / GitHub Actions Benefits

✅ Tidak perlu install apa-apa software / No need to install any software  
✅ Build dilakukan di cloud / Build done in the cloud  
✅ Tidak guna ruang disk komputer / Doesn't use computer disk space  
✅ Boleh download APK bila-bila masa / Can download APK anytime  
✅ Sempurna untuk testing / Perfect for testing  

---

## 📝 Kaedah Lain / Other Methods

Jika anda nak build sendiri di komputer, rujuk:  
If you want to build on your computer, refer to:

- **[BUILD_APK.md](BUILD_APK.md)** - Panduan lengkap / Complete guide
- **[BUILD_TROUBLESHOOTING.md](BUILD_TROUBLESHOOTING.md)** - Penyelesaian masalah / Troubleshooting

---

## 🔧 Build Untuk Release / Build for Release

Untuk APK release (untuk publish ke Play Store):  
For release APK (to publish to Play Store):

1. Jalankan workflow yang sama tetapi pilih "release"
   Run the same workflow but choose "release"
2. Anda perlukan keystore untuk sign APK
   You need a keystore to sign the APK
3. Rujuk [BUILD_TROUBLESHOOTING.md](BUILD_TROUBLESHOOTING.md) untuk arahan lengkap signing
   Refer to [BUILD_TROUBLESHOOTING.md](BUILD_TROUBLESHOOTING.md) for complete signing instructions

---

## ❓ Soalan Lazim / FAQ

**Q: APK berapa besar? / How big is the APK?**  
A: APK debug adalah ~5-10 MB / Debug APK is ~5-10 MB

**Q: Berapa lama build? / How long does build take?**  
A: Lebih kurang 5-10 minit / Approximately 5-10 minutes

**Q: Boleh build offline? / Can build offline?**  
A: Tidak, GitHub Actions memerlukan internet / No, GitHub Actions requires internet

**Q: APK selamat untuk install? / Is APK safe to install?**  
A: Ya, APK dibuild dari source code yang sama dalam repository ini  
Yes, APK is built from the same source code in this repository

**Q: Perlu Android version berapa? / Which Android version required?**  
A: Minimum Android 6.0 (API 23) / Minimum Android 6.0 (API 23)

---

## 💡 Tips

- Gunakan "debug" build untuk testing
  Use "debug" build for testing
  
- Uninstall versi lama sebelum install versi baru
  Uninstall old version before installing new version
  
- Enable "Install from Unknown Sources" dalam Android settings
  Enable "Install from Unknown Sources" in Android settings
  
- Simpan keystore dengan selamat untuk release builds
  Keep keystore safe for release builds

---

Untuk bantuan lanjut / For further help:
- Buka issue di: https://github.com/idinUPSI/UnistaffApp/issues
- Open issue at: https://github.com/idinUPSI/UnistaffApp/issues
