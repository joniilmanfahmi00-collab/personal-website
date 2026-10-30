---
title: >-
  Website WordPress Lambat dan Core Web Vitals Merah? Yuk, Belajar Mendiagnosis
  dan Mengoptimalkannya
description: >-
  Website WordPress terasa lambat, skor PageSpeed Insights merah, atau laporan
  Core Web Vitals bermasalah? Yuk, pelajari cara menemukan akar masalahnya dan
  memperbaikinya secara bertahap.
pubDate: 2026-10-30
author: Joni Ilman Pahmi
category: Tutorial
schemaType: Article
tags: SEO, WordPress, Optimasi, Core Web Vitals, Search Engine
image: >-
  https://media.joniilmanpahmi.online/a_clean_modern_flat_vector_photo_composite_sty.png
draft: false
seo:
  title: Website WordPress Lambat? Cara Optimasi Core Web Vitals
  description: >-
    Pelajari cara mendiagnosis website WordPress yang lambat dan memperbaiki
    LCP, INP, serta CLS dengan langkah optimasi yang praktis dan terukur.
  canonicalUrl: >-
    https://joniilmanpahmi.online/blog/website-word-press-lambat-dan-core-web-vitals-merah-yuk-belajar-mendiagnosis-dan-mengoptimalkannya/
  ogImage: >-
    https://media.joniilmanpahmi.online/a_clean_modern_flat_vector_photo_composite_sty.png
---
## Pendahuluan: Ketika Kantor Menugaskanmu Memperbaiki Website WordPress

Bayangkan kamu seorang web developer yang baru saja mendapatkan tugas dari kantor.

Atasanmu meminta kamu mengevaluasi website perusahaan karena beberapa keluhan mulai bermunculan:

- Website terasa lambat ketika dibuka melalui perangkat mobile.
- Pengunjung harus menunggu cukup lama sebelum konten utama muncul.
- Tombol dan menu terkadang tidak langsung merespons ketika diklik.
- Tampilan halaman tiba-tiba bergeser ketika sedang dimuat.
- Google Search Console menunjukkan laporan Core Web Vitals berwarna merah.

Kebetulan, website perusahaan tersebut dibangun menggunakan WordPress.

Kamu kemudian membuka Google PageSpeed Insights, memasukkan URL website, dan mendapatkan hasil yang kurang menyenangkan. Beberapa indikator performa menunjukkan status merah.

Tenang, kamu tidak sendirian. Masalah seperti ini cukup sering ditemukan pada website WordPress, terutama ketika website sudah berkembang dan mulai menggunakan banyak plugin, page builder, script pihak ketiga, serta berbagai aset visual.

Namun, ada satu hal yang perlu kamu pahami sebelum mulai melakukan optimasi:

**Website WordPress yang lambat tidak selalu disebabkan oleh terlalu banyak plugin. Begitu juga, memasang plugin caching tidak otomatis menyelesaikan semua masalah performa.**

Kita perlu memahami apa yang sebenarnya terjadi di balik proses pemuatan halaman.

Dalam artikel ini, kita akan mempelajari cara mengenali masalah Core Web Vitals, memahami penyebab teknisnya, dan menentukan langkah optimasi yang sesuai dengan kondisi website.

## 1. Mengenal Core Web Vitals Sebelum Melakukan Optimasi

Core Web Vitals (CWV) merupakan sekumpulan metrik yang digunakan Google untuk mengevaluasi pengalaman pengguna berdasarkan tiga aspek utama: kecepatan pemuatan konten, responsivitas interaksi, dan stabilitas visual.

Saat ini, terdapat tiga metrik utama yang perlu diperhatikan:

{% table %}
- Metrik
- Fungsi
- Ambang batas baik
---
- LCP
- Kecepatan menampilkan konten utama
- ≤ 2,5 detik
---
- INP
- Responsivitas interaksi pengguna
- ≤ 200 ms
---
- CLS
- Stabilitas tata letak halaman
- ≤ 0,1
{% /table %}

Google mengevaluasi metrik tersebut berdasarkan persentil ke-75 (75th percentile) dari pengalaman pengguna nyata, dengan segmentasi perangkat mobile dan desktop.

Artinya, hasil pengukuran bukan sekadar satu kali pengujian melalui browser developer atau PageSpeed Insights. Data lapangan menggambarkan pengalaman pengguna selama periode pengumpulan data.

Sumber: [Google Search Central – Understanding Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals).

Mari kita bahas masing-masing metrik.

## 2. LCP (Largest Contentful Paint): Mengapa Konten Utama Terasa Lama Muncul?

LCP mengukur waktu yang dibutuhkan hingga elemen konten terbesar dalam viewport awal selesai dirender.

Elemen tersebut biasanya berupa gambar hero, banner, gambar produk, atau blok teks berukuran besar.

Target LCP yang baik adalah maksimal 2,5 detik.

Jika LCP website WordPress kamu berada di atas angka tersebut, beberapa kemungkinan penyebabnya adalah:

### A. Gambar Hero Terkena Lazy Loading

Lazy loading merupakan teknik untuk menunda pemuatan gambar sampai gambar tersebut mendekati area viewport pengguna.

Teknik ini sangat berguna untuk gambar yang berada jauh di bawah halaman. Namun, penerapannya perlu diperhatikan.

Bayangkan halaman homepage memiliki banner besar di bagian paling atas. Jika gambar tersebut justru diberi atribut `loading="lazy"`, browser akan menunda permintaan gambar yang sebenarnya perlu diprioritaskan.

Untuk gambar yang menjadi elemen LCP, hindari lazy loading.

Sebaliknya, kamu dapat mempertimbangkan atribut berikut:

```
<img
  src="/images/hero.webp"
  width="1440"
  height="720"
  fetchpriority="high"
  alt="Website hero banner"
>
```

Perlu diingat, `fetchpriority="high"` merupakan petunjuk prioritas bagi browser, bukan jaminan bahwa gambar akan langsung selesai dimuat. Gunakan hanya pada resource yang memang penting, bukan seluruh gambar di halaman.

WordPress versi modern juga sudah memiliki mekanisme optimasi gambar dan penentuan prioritas secara otomatis. Jadi, periksa output HTML sebelum menambahkan optimasi manual.

### B. Server Hosting Memiliki Respons Lambat

Pernah membuka website yang membutuhkan beberapa detik hanya untuk mulai menampilkan halaman?

Salah satu hal yang perlu diperiksa adalah Time to First Byte (TTFB).

TTFB mengukur waktu dari permintaan navigasi hingga browser menerima byte pertama dari respons server.

TTFB bukan Core Web Vital, tetapi merupakan indikator diagnostik penting untuk memahami keterlambatan sebelum browser mulai memproses konten.

Beberapa penyebab TTFB tinggi antara lain:

- Server hosting mengalami keterbatasan CPU atau RAM.
- Database MySQL membutuhkan waktu lama untuk memproses query.
- Proses PHP terlalu berat.
- Object cache belum tersedia atau tidak efektif.
- Cache halaman tidak digunakan secara optimal.
- Server origin terlalu jauh dari lokasi pengunjung.

Pada website WordPress, setiap permintaan yang tidak dilayani dari cache dapat melibatkan proses PHP, WordPress bootstrap, pemanggilan plugin, hingga query database.

Karena itu, jangan langsung menyimpulkan bahwa masalahnya adalah hosting murah. Ukur dahulu TTFB, kondisi server, dan waktu pemrosesan aplikasi.

### C. Ukuran Gambar Terlalu Besar

Mengunggah gambar langsung dari kamera atau software desain tanpa memperhatikan ukuran dan dimensinya bisa meningkatkan ukuran halaman secara signifikan.

Misalnya, gambar banner dengan resolusi 4000 × 2500 piksel digunakan pada area yang hanya membutuhkan lebar 1200 piksel.

Browser tetap perlu mengunduh dan mendekode gambar yang jauh lebih besar daripada kebutuhan tampilannya.

Solusinya:

1. Sesuaikan dimensi gambar dengan kebutuhan tampilan.
1. Kompres gambar sebelum diunggah.
1. Gunakan format WebP atau AVIF jika sesuai dengan kebutuhan browser dan workflow website.
1. Manfaatkan responsive images melalui atribut `srcset` dan `sizes`.
1. Terapkan lazy loading pada gambar yang berada di luar viewport awal.

Ingat, format gambar modern tidak otomatis membuat gambar optimal jika resolusi dan ukuran filenya masih terlalu besar.

### D. Render-Blocking CSS dan JavaScript

Browser membutuhkan CSS untuk menentukan bagaimana halaman ditampilkan.

Jika terlalu banyak stylesheet atau script sinkron yang harus diproses sebelum halaman dapat dirender, tampilan utama bisa tertunda.

Pada WordPress, masalah ini sering ditemukan ketika tema dan plugin memuat stylesheet atau JavaScript yang tidak semuanya dibutuhkan pada halaman tersebut.

Beberapa langkah yang dapat dilakukan:

- Identifikasi stylesheet dan script yang benar-benar menghambat rendering.
- Hapus CSS yang tidak digunakan apabila aman dilakukan.
- Terapkan `defer` atau strategi pemuatan script yang sesuai.
- Gunakan Critical CSS jika memang diperlukan.
- Hindari menambahkan preload secara berlebihan.

Jangan asal menggabungkan atau menghapus file CSS dan JavaScript. Optimasi yang salah justru dapat merusak tampilan maupun fungsionalitas website.

## 3. INP (Interaction to Next Paint): Mengapa Website Tidak Responsif Ketika Diklik?

INP mengukur responsivitas halaman terhadap interaksi pengguna selama kunjungan berlangsung.

Contohnya:

- Mengklik tombol Add to Cart.
- Membuka menu navigasi.
- Memilih variasi produk.
- Menggunakan filter pencarian.
- Membuka modal atau popup.

Target INP yang baik adalah maksimal 200 milidetik.

Jika website WordPress terasa lambat ketika pengunjung melakukan interaksi, salah satu penyebab yang perlu diperiksa adalah beban JavaScript.

### A. JavaScript Terlalu Banyak

Tema WordPress multipurpose dan page builder tertentu dapat memuat banyak JavaScript untuk mendukung berbagai komponen visual.

Masalah muncul ketika script tersebut menjalankan pekerjaan berat di main thread browser.

Main thread merupakan tempat browser menjalankan berbagai pekerjaan penting, termasuk JavaScript, perhitungan layout, dan rendering.

Ketika terdapat JavaScript task yang terlalu panjang, browser bisa kesulitan memproses interaksi pengguna dengan cepat.

Contohnya, pengunjung mengklik tombol Add to Cart, tetapi browser sedang sibuk menjalankan proses JavaScript lain.

Akibatnya, respons visual terhadap klik tersebut menjadi tertunda.

Solusinya:

- Kurangi JavaScript yang tidak digunakan.
- Hindari menjalankan script berat pada setiap halaman.
- Pecah long-running tasks menjadi pekerjaan yang lebih kecil.
- Gunakan event handling yang efisien.
- Tinjau penggunaan page builder dan komponen interaktif.

### B. Plugin dan Script Pihak Ketiga Terlalu Banyak

Tidak semua plugin WordPress memberikan beban yang sama.

Ada plugin yang hanya menambahkan sedikit CSS, tetapi ada pula yang memuat beberapa library JavaScript, tracker, dan script eksternal sekaligus.

Contohnya:

- Live chat widget.
- Analytics dan tracking pixels.
- Popup dan marketing automation.
- Social media embeds.
- Advertising scripts.
- Plugin slider dan animasi.

Satu per satu mungkin terlihat ringan. Namun, ketika semuanya dijalankan bersamaan, total beban JavaScript dapat meningkat.

Coba evaluasi setiap plugin dengan pertanyaan berikut:

1. Apakah fitur ini benar-benar dibutuhkan?
1. Apakah script-nya harus dimuat di seluruh halaman?
1. Bisakah script hanya dimuat ketika pengguna membutuhkan fitur tersebut?
1. Apakah tersedia alternatif yang lebih ringan?

Sebagai web developer, kita tidak harus selalu menghapus plugin. Terkadang cukup membatasi pemuatan asetnya pada halaman yang relevan.

## 4. CLS (Cumulative Layout Shift): Mengapa Tampilan Website Sering Bergeser?

Pernah sedang membaca artikel, lalu tiba-tiba teks bergeser karena sebuah gambar baru muncul?

Atau kamu sedang mengklik tombol, tetapi posisi tombol tersebut berpindah karena munculnya banner iklan?

Itulah contoh masalah visual stability yang berkaitan dengan CLS.

Target CLS yang baik adalah maksimal 0,1.

Berikut beberapa penyebab yang sering ditemukan pada website WordPress.

### A. Gambar dan Iframe Tidak Memiliki Dimensi

Browser perlu mengetahui berapa banyak ruang yang harus disediakan sebelum sebuah gambar atau iframe selesai dimuat.

Jika dimensinya tidak diketahui, browser mungkin tidak dapat menyediakan ruang yang tepat.

Ketika gambar selesai dimuat, konten di bawahnya dapat terdorong dan menyebabkan layout shift.

Contoh implementasi yang lebih baik:

```
<img
  src="/images/article.webp"
  width="1200"
  height="800"
  alt="Article illustration"
>
```

Untuk video atau iframe, kamu juga dapat menggunakan CSS aspect ratio:

```
.video-wrapper {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.video-wrapper iframe {
  width: 100%;
  height: 100%;
  border: 0;
}
```

Dengan begitu, browser sudah mengetahui ruang yang harus disediakan sebelum konten selesai dimuat.

### B. Font Eksternal Menyebabkan Perubahan Layout

Penggunaan Google Fonts atau font kustom dapat memengaruhi stabilitas visual halaman.

Ketika font utama belum selesai diunduh, browser mungkin menampilkan fallback font terlebih dahulu.

Setelah font kustom tersedia, karakteristik teks berubah. Perbedaan ukuran huruf, lebar karakter, dan line-height dapat menyebabkan perubahan tata letak.

Beberapa langkah yang dapat dipertimbangkan:

- Gunakan font dengan ukuran file yang efisien.
- Batasi variasi weight yang benar-benar diperlukan.
- Pertimbangkan hosting font secara lokal.
- Gunakan `font-display: swap`.
- Pilih fallback font dengan karakteristik ukuran yang mendekati font utama.

Contoh:

```
@font-face {
  font-family: "MyFont";
  src: url("/fonts/myfont.woff2") format("woff2");
  font-display: swap;
}
```

Namun, `font-display: swap` bukan solusi otomatis untuk semua masalah CLS. Jika perbedaan metrik antara fallback font dan font utama terlalu besar, layout shift masih dapat terjadi.

### C. Elemen Dinamis Tidak Menyediakan Ruang Sejak Awal

Selain gambar dan font, beberapa elemen WordPress juga dapat menyebabkan layout shift:

- Iklan yang dimuat secara asynchronous.
- Banner promosi.
- Cookie consent popup.
- Widget chat.
- Embed media eksternal.

Jika elemen tersebut muncul setelah konten utama dirender tanpa ruang yang sudah disediakan, tata letak halaman bisa berubah secara tiba-tiba.

Solusinya adalah menyediakan ruang yang sesuai atau mengatur cara elemen tersebut muncul agar tidak menggeser konten utama secara tidak terduga.

## 5. Cara Mendiagnosis Masalah Core Web Vitals pada WordPress

Sebelum memasang plugin optimasi, lakukan pemeriksaan terlebih dahulu.

Berikut workflow sederhana yang dapat digunakan ketika kamu mendapatkan tugas memperbaiki website WordPress perusahaan.

### Langkah 1: Periksa Google Search Console

Buka laporan Core Web Vitals di Google Search Console.

Perhatikan:

- URL atau kelompok URL yang mengalami masalah.
- Metrik yang bermasalah.
- Status mobile dan desktop.
- Jumlah URL yang terdampak.
- Perubahan laporan dari waktu ke waktu.

Perlu dipahami bahwa laporan Search Console menggunakan data pengguna nyata (field data) dan tidak selalu langsung berubah setelah website diperbaiki.

Selain itu, URL dalam laporan dapat dikelompokkan berdasarkan pola pengalaman pengguna yang serupa.

### Langkah 2: Jalankan Google PageSpeed Insights

Buka:

[https://pagespeed.web.dev/](https://pagespeed.web.dev/)

Masukkan URL yang ingin diperiksa.

Perhatikan dua jenis data yang tersedia:

**Field Data**

Menggambarkan pengalaman pengguna nyata berdasarkan Chrome User Experience Report (CrUX), jika data tersedia.

**Lab Data**

Menggambarkan hasil simulasi pengujian dalam kondisi tertentu, misalnya menggunakan Lighthouse.

Keduanya memiliki fungsi berbeda.

Field Data membantu mengetahui pengalaman pengguna aktual, sedangkan Lab Data membantu mengidentifikasi kemungkinan masalah teknis yang dapat direproduksi.

Jangan menyamakan skor Lighthouse dengan status Core Web Vitals di Search Console.

### Langkah 3: Periksa Waterfall dan Network

Gunakan Chrome DevTools.

Buka tab Network untuk mengidentifikasi:

- Resource yang membutuhkan waktu lama.
- Ukuran file CSS dan JavaScript.
- Request gambar yang terlalu besar.
- Script pihak ketiga.
- Resource yang dimuat berulang kali.
- Request yang menghambat proses pemuatan.

Gunakan tab Performance untuk menganalisis long tasks, aktivitas main thread, dan masalah rendering.

Untuk LCP, periksa juga elemen mana yang benar-benar menjadi LCP element. Jangan berasumsi bahwa elemen tersebut selalu gambar hero.

### Langkah 4: Periksa Kondisi WordPress

Setelah mendapatkan indikasi masalah dari browser, lanjutkan dengan memeriksa sisi WordPress.

Beberapa hal yang perlu diperiksa:

- Tema yang digunakan.
- Plugin aktif dan fungsinya.
- Plugin yang memuat aset pada setiap halaman.
- Versi PHP dan konfigurasi server.
- Query database yang lambat.
- Page cache dan object cache.
- Ukuran gambar dan media library.
- Script eksternal yang terintegrasi.

Jika memungkinkan, gunakan staging environment agar perubahan dapat diuji tanpa mengganggu website produksi.

## 6. Solusi Optimasi WordPress Berdasarkan Akar Masalah

Setelah diagnosis selesai, barulah kita menentukan tindakan optimasi.

### A. Implementasikan Caching dengan Tepat

Caching membantu mengurangi pekerjaan yang harus dilakukan server ketika melayani permintaan halaman.

Beberapa pilihan yang bisa dipertimbangkan:

- LiteSpeed Cache jika server menggunakan LiteSpeed dan konfigurasi caching-nya sesuai.
- WP Rocket untuk pendekatan optimasi berbasis plugin.
- Page caching pada level server atau reverse proxy.
- Object caching menggunakan Redis atau Memcached jika dibutuhkan.

Gunakan satu mekanisme page caching utama dan pastikan tidak terjadi konflik antarplugin atau dengan cache server.

Jangan mengaktifkan seluruh fitur optimasi sekaligus tanpa pengujian.

### B. Optimalkan Gambar

Gunakan format WebP atau AVIF sesuai kebutuhan.

Selain kompresi, perhatikan dimensi gambar, responsive images, dan prioritas pemuatan.

Gambar hero yang menjadi LCP perlu diprioritaskan, sedangkan gambar di bawah viewport dapat menggunakan lazy loading.

### C. Kelola CSS dan JavaScript

Pertimbangkan penggunaan alat seperti Perfmatters atau fitur asset optimisation pada plugin caching untuk mengatur pemuatan resource.

Namun, lakukan berdasarkan hasil pemeriksaan.

Jangan menonaktifkan script secara sembarangan karena dapat mengganggu:

- WooCommerce cart.
- Checkout.
- Form submission.
- Navigasi mobile.
- Tracking conversion.
- Fitur interaktif lainnya.

Selalu lakukan regression testing setelah perubahan.

### D. Optimalkan Server dan Database

Jika masalah berasal dari backend, optimasi frontend saja tidak akan cukup.

Beberapa tindakan yang dapat dilakukan:

- Periksa kapasitas CPU dan RAM.
- Evaluasi versi dan konfigurasi PHP.
- Periksa slow database queries.
- Optimalkan penggunaan object cache.
- Evaluasi konfigurasi page cache.
- Pertimbangkan CDN untuk distribusi aset statis.
- Evaluasi kualitas hosting berdasarkan kebutuhan website.

Jika website sudah berkembang menjadi toko online dengan transaksi tinggi, evaluasi infrastruktur secara lebih menyeluruh.

### E. Kurangi Beban Script Pihak Ketiga

Periksa apakah live chat, tracking, iklan, atau widget eksternal benar-benar perlu dimuat sejak awal.

Jika memungkinkan, tunda pemuatan script sampai dibutuhkan tanpa mengorbankan fungsi bisnis, pengukuran, maupun kewajiban consent pengguna.

Ingat bahwa optimasi performa bukan berarti menghilangkan seluruh fitur yang dibutuhkan bisnis.

## 7. Jangan Terjebak Mengejar Skor 100 PageSpeed Insights

Ada satu kesalahan yang cukup sering dilakukan ketika mengoptimalkan website.

Developer terlalu fokus mengejar skor 100 pada Google PageSpeed Insights.

Padahal, skor Lighthouse merupakan hasil pengujian lab yang dapat berubah berdasarkan kondisi pengujian. Skor tersebut bukan satu-satunya ukuran kualitas pengalaman pengguna.

Website dengan skor Lighthouse 95 belum tentu memiliki Core Web Vitals yang baik berdasarkan pengalaman pengguna nyata.

Sebaliknya, website dengan skor Lighthouse 85 juga belum tentu memiliki pengalaman pengguna yang buruk.

Fokuslah pada tiga hal:

1. Konten utama dapat ditampilkan dengan cepat.
1. Interaksi pengguna terasa responsif.
1. Tata letak halaman stabil selama proses pemuatan.

Untuk website bisnis, jangan sampai optimasi performa justru menghilangkan fitur penting seperti tracking conversion, fungsi checkout, atau integrasi pemasaran.

**Performance optimisation should improve the user experience without breaking the business experience.**

## 8. Checklist Sebelum Menyatakan Optimasi Selesai

Sebelum menyerahkan hasil pekerjaan kepada atasan atau klien, lakukan pemeriksaan berikut.

- LCP element sudah diidentifikasi.
- Gambar utama tidak terkena lazy loading.
- TTFB dan kondisi server sudah dievaluasi.
- Ukuran gambar dan responsive images sudah diperiksa.
- Render-blocking resources sudah dievaluasi.
- JavaScript long tasks sudah diperiksa.
- Script pihak ketiga sudah dievaluasi.
- Gambar, iframe, dan elemen dinamis memiliki ruang yang sesuai.
- Font loading sudah diperiksa.
- Fungsi penting website tetap berjalan.
- WooCommerce cart dan checkout sudah diuji jika relevan.
- Pengujian mobile dan desktop sudah dilakukan.
- Hasil pengujian sebelum dan sesudah optimasi sudah didokumentasikan.

Setelah itu, pantau kembali laporan field data di Google Search Console.

Perlu diingat, perubahan pada laporan Core Web Vitals membutuhkan waktu karena data tersebut dikumpulkan dari pengalaman pengguna nyata, bukan hanya dari satu kali pengujian.

## Penutup: Jadilah Developer yang Memahami Masalah, Bukan Sekadar Menginstal Plugin

Mengoptimalkan website WordPress bukan sekadar memasang plugin caching, mengaktifkan minification, atau mengubah gambar menjadi WebP.

Ada proses yang perlu dilakukan: mengukur, mendiagnosis, memahami akar masalah, menerapkan solusi, lalu menguji kembali hasilnya.

Sebagai web developer, kemampuan membaca metrik performa dan memahami bagaimana browser memproses halaman merupakan keterampilan yang sangat berguna, bahkan ketika kamu bekerja menggunakan CMS seperti WordPress.

Sebab, pada akhirnya, teknologi yang kita gunakan hanyalah alat. Yang lebih penting adalah kemampuan kita dalam menyelesaikan masalah yang benar-benar dialami pengguna dan bisnis.

Jadi, kalau besok kantor kembali menugaskanmu memperbaiki website WordPress yang Core Web Vitals-nya merah, jangan langsung panik dan menginstal sepuluh plugin optimasi sekaligus.

Buka DevTools, periksa datanya, temukan bottleneck-nya, lalu perbaiki satu per satu.

**Happy debugging, and keep building better web experiences!** 🚀

---

### Referensi dan Bacaan Lanjutan

- [Google Search Central – Understanding Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)
- [web.dev – Web Vitals](https://web.dev/articles/vitals)
- [web.dev – Optimize Largest Contentful Paint](https://web.dev/articles/optimize-lcp)
- [web.dev – The Most Effective Ways to Improve Core Web Vitals](https://web.dev/articles/top-cwv)
- [WordPress Core – Image Performance Enhancements in WordPress 6.3](https://make.wordpress.org/core/2023/07/13/image-performance-enhancements-in-wordpress-6-3/)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
