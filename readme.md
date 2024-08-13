# Face Blurring Application

Aplikasi ini adalah server Node.js sederhana yang menerima upload gambar, mendeteksi wajah menggunakan face-api.js, memblur wajah yang terdeteksi, dan mengembalikan gambar hasil untuk diunduh.

## Persyaratan
Harus Mempunyai:
- Node.js
- npm

## Instalasi dan Penggunaan

1. Clone repositori ini atau buat folder baru untuk proyek. dengan kode di terminal:
```
git clone https://github.com/Editormuda001/AI-Face-Blur
```
Atau
```
wget https://github.com/Editormuda001/AI-Face-Blur
```

2.unzip file dengan perintah:
```
unzip AI-Face-Blur.zip
```

3. Berikan izin eksekusi pada file `run_server.sh`:

```
chmod +x run_server.sh
```

4. Jalankan script dengan perintah:

```
./run_server.sh
```

5. Buka browser dan akses `http://localhost:3000`.

## Catatan

- Pastikan Node.js dan npm sudah terinstall di sistem Anda.
- Script bash akan membuat file `requirements.txt` jika belum ada, dengan isi:
  ```
  express
  multer
  face-api.js
  canvas
  ```
- Jika Anda ingin menambahkan package lain, tambahkan ke dalam file `requirements.txt`.
- Kode ini adalah contoh dasar dan mungkin memerlukan penyesuaian untuk penggunaan dalam produksi.

Readme ini mencakup semua informasi yang diperlukan untuk mengatur dan menjalankan aplikasi, termasuk kode server, HTML, script bash, dan instruksi penggunaan. Pengguna dapat mengikuti langkah-langkah ini untuk mengimplementasikan dan menjalankan aplikasi face blurring.
