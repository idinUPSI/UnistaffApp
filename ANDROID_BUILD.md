# Android APK Build Configuration

Repositori ini dikonfigurasikan untuk membina fail APK Android secara automatik melalui GitHub Actions.

## Cara Kerja

Workflow GitHub Actions akan dijalankan secara automatik apabila ada push ke branch `main`. Workflow ini akan:

1. Checkout kod dari repositori
2. Setup persekitaran Node.js dan Java
3. Install dependencies
4. Build aplikasi web (React)
5. Sync aset web ke projek Android menggunakan Capacitor
6. Build APK Android (signed atau unsigned)
7. Upload APK sebagai artifact

## Build Jenis

### Unsigned APK (Tanpa Tandatangan)

Jika secrets tidak dikonfigurasikan, workflow akan membina **unsigned APK**. APK ini sesuai untuk testing tetapi tidak boleh diedarkan di Play Store.

### Signed APK (Dengan Tandatangan)

Untuk membina signed APK yang boleh diedarkan, anda perlu mengkonfigurasikan GitHub Secrets berikut:

## Konfigurasi GitHub Secrets

Untuk mengaktifkan signed APK, tambahkan secrets berikut di repositori GitHub:

1. Pergi ke **Settings** → **Secrets and variables** → **Actions**
2. Tambahkan secrets berikut:

### Required Secrets:

| Secret Name | Penerangan | Cara Mendapatkan |
|------------|------------|------------------|
| `KEYSTORE_BASE64` | Keystore file yang di-encode dalam base64 | `base64 -i your-keystore.keystore` atau `openssl base64 -in your-keystore.keystore` |
| `KEY_ALIAS` | Alias kunci dalam keystore | Alias yang anda gunakan semasa membuat keystore |
| `KEY_PASSWORD` | Password untuk kunci | Password yang anda set untuk kunci |
| `KEYSTORE_PASSWORD` | Password untuk keystore | Password yang anda set untuk keystore |

### Cara Membuat Keystore Baru

Jika anda belum ada keystore, anda boleh membuatnya menggunakan keytool:

```bash
keytool -genkey -v -keystore unistaff-release-key.keystore -alias unistaff -keyalg RSA -keysize 2048 -validity 10000
```

Kemudian encode ke base64:

```bash
# Linux/Mac
base64 -i unistaff-release-key.keystore

# Windows (PowerShell)
[Convert]::ToBase64String([IO.File]::ReadAllBytes("unistaff-release-key.keystore"))
```

**PENTING:** Jangan commit keystore file ke repositori! File ini sudah ditambah dalam `.gitignore`.

## Mendapatkan APK yang Telah Dibina

Selepas workflow berjaya, anda boleh muat turun APK dari:

1. Pergi ke tab **Actions** dalam repositori
2. Klik pada workflow run yang berjaya
3. Scroll ke bawah ke bahagian **Artifacts**
4. Muat turun `unistaff-upsi-apk`

## Troubleshooting

### Build Gagal di Step "Decode Keystore"
- Pastikan `KEYSTORE_BASE64` secret mengandungi base64 encoding yang betul
- Pastikan tiada whitespace atau newline tambahan dalam secret

### Build Gagal di Step "Build Release APK"
- Pastikan semua secrets (KEY_ALIAS, KEY_PASSWORD, KEYSTORE_PASSWORD) telah dikonfigurasikan dengan betul
- Pastikan password yang digunakan betul

### APK tidak signed walaupun secrets telah dikonfigurasikan
- Pastikan `KEYSTORE_BASE64` tidak kosong
- Semak logs workflow untuk error messages

## Struktur Projek

```
UnistaffApp/
├── .github/
│   └── workflows/
│       └── android-build.yml    # GitHub Actions workflow
├── android/                     # Projek Android (Capacitor)
│   ├── app/
│   │   ├── build.gradle        # Build configuration dengan signing support
│   │   └── .gitignore          # Menghalang commit keystore files
│   └── ...
├── src/                        # Source code aplikasi
├── package.json
└── capacitor.config.json
```

## Nota Keselamatan

- ⚠️ **JANGAN SEKALI-KALI** commit keystore file ke Git
- ⚠️ Simpan keystore dan password dengan selamat
- ⚠️ Jika keystore hilang, anda tidak akan dapat mengemaskini app di Play Store
- ⚠️ Backup keystore di lokasi yang selamat
