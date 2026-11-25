# LamarRapi — Landing Page MVP

LamarRapi adalah konsep **Recruitment Progress Companion** untuk membantu pencari kerja memahami tahapan seleksi, jadwal penting, dan persiapan berikutnya dari beberapa lamaran. Website ini menguji ketertarikan terhadap konsep tersebut. Nilai tambah produk masih berupa hipotesis.

## Cakupan MVP

- Landing page responsif dengan navigasi, manfaat, dan preview menggunakan data fiktif.
- Form minat: email wajib; status pencarian kerja dan feedback opsional; persetujuan wajib.
- Route Handler memvalidasi data, mengecek email duplikat, lalu menyimpan ke Google Sheets. Pesan berhasil hanya muncul setelah API Sheets mengonfirmasi penulisan.
- Belum ada akun, pelacak lamaran yang bisa digunakan, analisis data nyata, integrasi email, maupun pengiriman kabar otomatis.

## Teknologi dan struktur

Next.js App Router, React, TypeScript, Tailwind CSS, Lucide React, dan Google Sheets API melalui service account di server.

```text
app/                 Halaman, style, dan POST /api/interest
components/sections/ Bagian landing page dan formulir
components/ui/       Heading section
lib/                 Data preview terpisah, validasi, integrasi Sheets
tests/               Pengujian validasi dan route
```

Referensi internal (PRD dan mockup) berada di luar folder aplikasi dan tidak termasuk repository publik. Semua data perusahaan, jadwal, dan angka pada preview adalah ilustrasi.

## Menjalankan lokal

Gunakan Node.js versi 20.9 atau lebih baru (disarankan 22 LTS).

```bash
npm install
cp .env.example .env.local
npm run dev
```

Buka `http://localhost:3000`. Tanpa konfigurasi Sheets, halaman dapat dilihat, tetapi pengiriman form akan gagal dengan pesan retry. Jangan menguji pendaftaran nyata sebelum Sheets terkonfigurasi.

Jika shim `npm` pada Windows ini mengarah ke instalasi yang hilang, jalankan CLI npm langsung: `node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" install` (dan ganti `install` dengan `run dev`, `test`, atau perintah lain). Skrip proyek sudah menggunakan path `node` langsung agar folder workspace yang mengandung `&` tidak merusak pemanggilan executable.

## Konfigurasi Google Sheets

1. Buat project Google Cloud dan aktifkan **Google Sheets API**. Buat **service account** beserta JSON key. Batasi siapa yang dapat membaca key dan simpan salinannya di tempat aman.
2. Buat spreadsheet **khusus pendaftaran nyata**, dengan tab misalnya `Interest`. Isi baris pertama persis: `Submission Timestamp | Email | Job Search Status | Feedback | Consent` di kolom A–E. Jangan ubah urutan kolom.
3. Bagikan spreadsheet dengan akses **Editor** ke email service account. Jangan atur spreadsheet sebagai publik.
4. Isi `.env.local`: `GOOGLE_SPREADSHEET_ID` dari URL spreadsheet, `GOOGLE_SHEET_TAB` sesuai nama tab, `GOOGLE_SERVICE_ACCOUNT_EMAIL` dari `client_email`, dan `GOOGLE_PRIVATE_KEY` dari `private_key` JSON. Tempel key dalam satu baris diapit `"..."` dengan `\n` literal, seperti pada JSON. Jangan menaruh JSON key di repository atau variabel `NEXT_PUBLIC_*`.
5. Jalankan ulang server pengembangan. Kirim satu pendaftaran uji ke **spreadsheet terpisah** yang memiliki header sama. Pastikan satu baris tersimpan pada kolom yang benar, periksa duplikat serta kegagalan akses, lalu gunakan spreadsheet pendaftaran nyata untuk eksperimen. Pisahkan sepenuhnya ID spreadsheet uji dan produksi.

Variabel lingkungan yang diperlukan:

| Variabel | Isi |
|---|---|
| `GOOGLE_SPREADSHEET_ID` | ID spreadsheet yang sesuai lingkungan |
| `GOOGLE_SHEET_TAB` | Nama tab (huruf, angka, spasi, titik, garis bawah, atau tanda minus) |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Email service account |
| `GOOGLE_PRIVATE_KEY` | Private key service account, rahasia |

## Pengujian

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Checklist manual sebelum eksperimen:

- [ ] Homepage, navigasi Manfaat/Preview/Daftar Minat, dan kedua CTA berfungsi.
- [ ] Dua contoh tahapan, jadwal, next action, dan grafik 12/8/2 sesuai data ilustrasi.
- [ ] Email kosong/tidak valid serta consent kosong memunculkan error dekat field dan input tetap ada.
- [ ] Status dan feedback boleh kosong. Loading menonaktifkan tombol; submit ganda tertahan.
- [ ] Success muncul hanya setelah baris Sheets terkonfirmasi; email duplikat ditangani.
- [ ] Saat Sheets gagal, muncul pesan gagal dan tombol Coba Lagi; tidak ada success palsu.
- [ ] Desktop serta ponsel (mis. lebar 320, 375, 768, 1440 px): tidak ada scroll horizontal, teks dan form tidak terpotong.
- [ ] Periksa hasil build/browser: tidak ada hydration error atau private key di bundle frontend.
- [ ] Dengan spreadsheet uji, cek kolom A–E, format timestamp UTC ISO 8601, email huruf kecil, dan consent `Ya`.

Pengujian otomatis menggunakan mock hanya memeriksa validasi dan perilaku route. **Penulisan Sheets nyata harus diuji setelah credential tersedia.**

## Eksperimen dan metrik

Target, belum realisasi: **20 pengunjung sasaran unik terverifikasi**, **minimal 5 email unik valid**, konversi **25%**. Sebelum membagikan link, buat catatan undangan pribadi dengan kode acak per orang, tanggal kirim, dan konfirmasi pembukaan link dari calon pengguna (misalnya balasan chat). Jangan mencatat isi chat, alamat IP, atau email pengunjung yang belum mendaftar di website. Hitung satu orang sekali; keluarkan kunjungan tim/pengujian dan buka ulang. Penyebut konversi ialah jumlah orang sasaran unik yang mengonfirmasi telah membuka halaman, pembilang ialah email unik valid di spreadsheet produksi. Catatan konfirmasi dikelola terpisah dari spreadsheet pendaftaran. Metode ini mengandalkan konfirmasi peserta, bukan pengukuran trafik otomatis, sehingga keterbatasannya dicatat dalam laporan.

## Deployment

Setelah disetujui untuk publikasi, buat repository GitHub dari folder ini, pastikan `.env.local` dan dokumen referensi tidak ikut ter-commit, lalu import repository ke Vercel. Tambahkan empat variabel server yang sama pada Vercel (Production dan Preview gunakan spreadsheet **berbeda** bila Preview dipakai untuk pengujian), deploy, dan ulangi checklist manual pada URL hasil deploy. Jangan menganggap deployment atau integrasi berhasil sebelum baris benar-benar tampak di spreadsheet yang dituju.

Git sudah diinisialisasi lokal. Periksa `git status`, lalu setelah menyiapkan identitas Git milikmu jalankan `git add .`, `git commit -m "Build LamarRapi landing page MVP"`, sambungkan remote repository pilihanmu, dan push. Tidak ada repository publik atau deployment yang dibuat oleh proyek ini.

## Penggunaan AI Tools

AI digunakan untuk membantu implementasi komponen, integrasi route, penulisan dokumentasi, dan rancangan pengujian. Pemilik proyek tetap perlu meninjau kesesuaian PRD, menjalankan pengujian pada akun Google sendiri, serta memvalidasi hasil eksperimen.

## Batasan yang diketahui

- Pemeriksaan email duplikat memakai baca-sebelum-tulis di Google Sheets. Dua pengiriman bersamaan dapat melewati pemeriksaan; ini **tidak atomik**. Periksa email unik ketika menghitung hasil eksperimen.
- Tidak ada rate limiting terdistribusi. Untuk eksposur publik yang lebih luas, tambahkan proteksi spam/abuse sebelum skala lalu lintas naik.
- Google Sheets tidak dirancang sebagai basis data transaksi. Jika Google sempat menyimpan baris namun respons gagal diterima, retry dapat menghasilkan respons duplikat; verifikasi sheet sebelum menyimpulkan kegagalan permanen.
- Jadwal ilustrasi bertanggal Januari 2027; perbarui tanggal ketika contoh tersebut tidak lagi relevan.
