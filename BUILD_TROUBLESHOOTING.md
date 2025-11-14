# Penyelesaian Masalah Build APK / APK Build Troubleshooting

## Status Semasa / Current Status

✅ **Web build berfungsi dengan sempurna** / **Web build works perfectly**
✅ **Capacitor sync berfungsi dengan sempurna** / **Capacitor sync works perfectly**  
❌ **Android APK build gagal kerana sekatan rangkaian** / **Android APK build fails due to network restrictions**

## Masalah Yang Dikenal Pasti / Problem Identified

Build APK Android memerlukan akses kepada repositori Maven Google untuk memuat turun plugin dan dependencies:

Android APK build requires access to Google's Maven repository to download plugins and dependencies:

1. **Domain yang diperlukan / Required domain**: `dl.google.com`
   - Repositori rasmi untuk Android Gradle Plugin dan Google Services
   - Official repository for Android Gradle Plugin and Google Services
   
2. **Sebab kegagalan / Reason for failure**:
   ```
   Could not resolve com.android.tools.build:gradle:8.7.2
   Could not GET 'https://dl.google.com/...'
   > dl.google.com: No address associated with hostname
   ```

## Penyelesaian / Solutions

### Penyelesaian 1: Build Secara Lokal (Disyorkan / Recommended)

Jika anda ingin membina APK pada komputer sendiri:

If you want to build the APK on your own computer:

1. **Pastikan prasyarat dipasang** / **Ensure prerequisites are installed**:
   - Node.js (v16+)
   - Android Studio dengan Android SDK
   - JDK 17+
   - Pastikan `ANDROID_HOME` ditetapkan dengan betul / Ensure `ANDROID_HOME` is set correctly

2. **Jalankan skrip semakan / Run environment check**:
   ```bash
   ./check-build-env.sh
   ```

3. **Pasang dependencies**:
   ```bash
   npm install
   ```

4. **Bina APK Debug**:
   ```bash
   npm run android:build
   ```
   
   APK akan dijana di: `android/app/build/outputs/apk/debug/app-debug.apk`

### Penyelesaian 2: Menggunakan GitHub Actions

Cipta fail `.github/workflows/build-apk.yml` untuk build automatik:

Create `.github/workflows/build-apk.yml` for automatic builds:

```yaml
name: Build Android APK

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        
    - name: Setup JDK
      uses: actions/setup-java@v4
      with:
        distribution: 'temurin'
        java-version: '17'
        
    - name: Setup Android SDK
      uses: android-actions/setup-android@v3
      
    - name: Install dependencies
      run: npm install
      
    - name: Build web app
      run: npm run build
      
    - name: Sync Capacitor
      run: npx cap sync
      
    - name: Build APK
      run: cd android && ./gradlew assembleDebug
      
    - name: Upload APK
      uses: actions/upload-artifact@v4
      with:
        name: app-debug
        path: android/app/build/outputs/apk/debug/app-debug.apk
```

Selepas workflow berjaya, muat turun APK dari tab "Actions" di GitHub.

After the workflow succeeds, download the APK from the "Actions" tab in GitHub.

### Penyelesaian 3: Build di Android Studio

1. Pasang dependencies web:
   ```bash
   npm install
   npm run build
   npx cap sync
   ```

2. Buka projek Android di Android Studio:
   ```bash
   npm run cap:open:android
   ```

3. Dalam Android Studio:
   - Pergi ke **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**
   - Tunggu sehingga build selesai
   - Klik "locate" untuk mencari APK

### Penyelesaian 4: Build Release APK (Untuk Pengeluaran)

Untuk APK release yang ditandatangan:

1. **Cipta keystore** (sekali sahaja):
   ```bash
   keytool -genkey -v -keystore android/my-release-key.keystore \
     -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Cipta `android/keystore.properties`**:
   ```properties
   storePassword=your_store_password
   keyPassword=your_key_password
   keyAlias=my-key-alias
   storeFile=my-release-key.keystore
   ```

3. **Kemaskini `android/app/build.gradle`**, tambah sebelum `android {`:
   ```gradle
   def keystorePropertiesFile = rootProject.file("keystore.properties")
   def keystoreProperties = new Properties()
   if (keystorePropertiesFile.exists()) {
       keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
   }
   ```

   Dan dalam blok `android {`, tambah:
   ```gradle
   signingConfigs {
       release {
           if (keystorePropertiesFile.exists()) {
               keyAlias keystoreProperties['keyAlias']
               keyPassword keystoreProperties['keyPassword']
               storeFile file(keystoreProperties['storeFile'])
               storePassword keystoreProperties['storePassword']
           }
       }
   }
   buildTypes {
       release {
           signingConfig signingConfigs.release
           minifyEnabled false
           proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
       }
   }
   ```

4. **Bina release APK**:
   ```bash
   npm run android:build:release
   ```

## Semakan Persekitaran / Environment Check

Jalankan arahan berikut untuk semak persekitaran anda:

Run the following commands to check your environment:

```bash
# Semak Node.js / Check Node.js
node --version  # Perlu v16+ / Need v16+

# Semak Java / Check Java
java --version  # Perlu v17+ / Need v17+

# Semak ANDROID_HOME
echo $ANDROID_HOME  # Perlu ditetapkan / Must be set
ls $ANDROID_HOME/platforms  # Perlu ada platform / Must have platforms

# Semak Gradle
cd android && ./gradlew --version
```

## Maklumat Tambahan / Additional Information

### Lokasi APK Output

- **Debug APK**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **Release APK**: `android/app/build/outputs/apk/release/app-release.apk`

### Saiz APK / APK Size

APK debug dijangka berukuran ~5-10 MB.  
Debug APK is expected to be ~5-10 MB.

### Keperluan Sistem / System Requirements

- **RAM**: Minimum 8GB (disyorkan 16GB untuk Android Studio)
- **Ruang Disk / Disk Space**: Minimum 10GB untuk Android SDK
- **OS**: Windows 10+, macOS 10.14+, atau Linux

### Sumber Bantuan / Help Resources

- [Android Developer - Build Your App](https://developer.android.com/studio/build)
- [Capacitor - Android Documentation](https://capacitorjs.com/docs/android)
- [Gradle User Manual](https://docs.gradle.org/)

## Nota Penting / Important Notes

⚠️ **Jangan commit fail keystore atau keystore.properties ke Git!**  
⚠️ **Do not commit keystore files or keystore.properties to Git!**

Tambah ke `.gitignore`:
```
*.keystore
*.jks
keystore.properties
```

---

Jika anda menghadapi sebarang masalah, sila rujuk [BUILD_APK.md](BUILD_APK.md) atau buka issue di GitHub.

If you encounter any issues, please refer to [BUILD_APK.md](BUILD_APK.md) or open an issue on GitHub.
