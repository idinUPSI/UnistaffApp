# Panduan Membina APK / APK Build Guide

## Bahasa Melayu

### Prasyarat

**💡 Tip:** Jalankan skrip berikut untuk memeriksa persekitaran anda:
```bash
./check-build-env.sh
```

Sebelum membina APK, pastikan anda telah memasang:

1. **Node.js** (versi 16 atau lebih tinggi)
   - Muat turun dari: https://nodejs.org/
   
2. **Android Studio**
   - Muat turun dari: https://developer.android.com/studio
   - Pasang Android SDK (minimum API level 22)
   - Pasang Android SDK Build-Tools
   - Konfigurasi ANDROID_HOME environment variable

3. **Java Development Kit (JDK)** (versi 17 atau lebih tinggi)
   - Android Studio biasanya sudah menyertakan JDK
   - Atau muat turun dari: https://www.oracle.com/java/technologies/downloads/

### Langkah-langkah Membina APK

#### 1. Memasang Dependencies

```bash
npm install
```

#### 2. Membina APK Debug (untuk Ujian)

Untuk membina APK debug yang boleh dipasang pada peranti untuk ujian:

```bash
npm run android:build
```

APK debug akan dijana di:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

#### 3. Membina APK Release (untuk Pengeluaran)

Untuk membina APK release yang ditandatangan:

```bash
npm run android:build:release
```

**Nota:** APK release memerlukan keystore untuk ditandatangan. Sila lihat bahagian "Menandatangan APK" di bawah.

APK release akan dijana di:
```
android/app/build/outputs/apk/release/app-release-unsigned.apk
```

#### 4. Membuka Projek Android di Android Studio (Pilihan)

Jika anda ingin membuka projek Android dalam Android Studio untuk penyesuaian lanjut:

```bash
npm run cap:open:android
```

### Menandatangan APK Release

Untuk mengeluarkan APK ke Google Play Store atau untuk pemasangan awam, anda perlu menandatangani APK:

1. **Mencipta Keystore** (hanya sekali):

```bash
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. **Konfigurasi Signing dalam Android**:

Cipta fail `android/keystore.properties`:

```properties
storePassword=your_store_password
keyPassword=your_key_password
keyAlias=my-key-alias
storeFile=../my-release-key.keystore
```

3. **Edit `android/app/build.gradle`**:

Tambah selepas `android {`:

```gradle
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    ...
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
            ...
        }
    }
}
```

4. **Bina APK yang Ditandatangan**:

```bash
npm run android:build:release
```

### Pemasangan APK

Untuk memasang APK pada peranti Android:

1. **Menggunakan ADB** (Android Debug Bridge):

```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

2. **Manual**: Salin fail APK ke peranti dan buka untuk memasang (perlu enable "Unknown Sources" dalam tetapan)

### Arahan Tambahan

- **Sinkronkan perubahan web ke projek Android**:
  ```bash
  npm run cap:sync
  ```

- **Build web sahaja**:
  ```bash
  npm run build
  ```

### Penyelesaian Masalah

1. **Build gagal dengan ralat Gradle**: Pastikan ANDROID_HOME ditetapkan dengan betul
2. **APK tidak boleh dipasang**: Nyahpasang versi lama terlebih dahulu
3. **Ralat signing**: Pastikan keystore.properties konfigurasi dengan betul

---

## English

### Prerequisites

**💡 Tip:** Run the following script to check your environment:
```bash
./check-build-env.sh
```

Before building the APK, ensure you have installed:

1. **Node.js** (version 16 or higher)
   - Download from: https://nodejs.org/
   
2. **Android Studio**
   - Download from: https://developer.android.com/studio
   - Install Android SDK (minimum API level 22)
   - Install Android SDK Build-Tools
   - Configure ANDROID_HOME environment variable

3. **Java Development Kit (JDK)** (version 17 or higher)
   - Android Studio usually includes JDK
   - Or download from: https://www.oracle.com/java/technologies/downloads/

### Steps to Build APK

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Build Debug APK (for Testing)

To build a debug APK that can be installed on devices for testing:

```bash
npm run android:build
```

The debug APK will be generated at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

#### 3. Build Release APK (for Production)

To build a signed release APK:

```bash
npm run android:build:release
```

**Note:** Release APK requires a keystore for signing. See "Signing APK" section below.

The release APK will be generated at:
```
android/app/build/outputs/apk/release/app-release-unsigned.apk
```

#### 4. Open Android Project in Android Studio (Optional)

If you want to open the Android project in Android Studio for advanced customization:

```bash
npm run cap:open:android
```

### Signing Release APK

To release APK to Google Play Store or for public installation, you need to sign the APK:

1. **Create Keystore** (one time only):

```bash
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

2. **Configure Signing in Android**:

Create file `android/keystore.properties`:

```properties
storePassword=your_store_password
keyPassword=your_key_password
keyAlias=my-key-alias
storeFile=../my-release-key.keystore
```

3. **Edit `android/app/build.gradle`**:

Add after `android {`:

```gradle
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    ...
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
            ...
        }
    }
}
```

4. **Build Signed APK**:

```bash
npm run android:build:release
```

### Installing APK

To install APK on Android device:

1. **Using ADB** (Android Debug Bridge):

```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

2. **Manual**: Copy the APK file to device and open to install (requires "Unknown Sources" enabled in settings)

### Additional Commands

- **Sync web changes to Android project**:
  ```bash
  npm run cap:sync
  ```

- **Build web only**:
  ```bash
  npm run build
  ```

### Troubleshooting

1. **Build fails with Gradle error**: Ensure ANDROID_HOME is set correctly
2. **APK cannot be installed**: Uninstall old version first
3. **Signing error**: Ensure keystore.properties is configured correctly

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run build` | Build web app |
| `npm run cap:sync` | Sync web to native |
| `npm run android:build` | Build debug APK |
| `npm run android:build:release` | Build release APK |
| `npm run cap:open:android` | Open in Android Studio |
