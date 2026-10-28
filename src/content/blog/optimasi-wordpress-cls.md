---
title: "Optimasi Layout Shift pada Tema WordPress"
description: "Pengalaman memperbaiki CLS untuk menjaga performa, pengalaman pengguna, dan skor SEO website WordPress."
category: "Web Dev"
pubDate: 2026-02-20
author: "Joni Ilman Pahmi"
tags: ["WordPress", "SEO", "Performance", "Frontend"]
image: "/hero.jpg"
draft: false
---

## Mengapa CLS penting?

Cumulative Layout Shift (CLS) adalah metrik penting dalam Core Web Vitals. Ketika elemen seperti gambar, iklan, atau font berubah ukuran tiba-tiba, pengguna bisa salah klik dan terasa frustrasi.

Pada proyek WordPress, masalah ini sering terjadi karena:

- placeholder gambar belum punya dimensi
- font loading yang mengganti layout
- widget atau banner muncul setelah halaman ter-render
- script third-party dari iklan atau embed media

## Langkah yang saya lakukan

Pertama, saya mengecek elemen yang paling sering memicu layout shift. Biasanya, area seperti hero image, card produk, dan sticky banner adalah penyebab utama.

Saya lalu menambahkan ukuran eksplisit untuk gambar dan video, menetapkan `width` dan `height`, serta menonaktifkan loading yang terlalu agresif untuk elemen penting.

Selain itu, saya menggunakan kombinasi:

- `font-display: swap` pada font yang dipakai
- `loading="lazy"` untuk media non-critical
- `aspect-ratio` untuk elemen dengan ukuran stabil
- membatasi script pihak ketiga agar tidak memaksa reflow

## Hasilnya

Setelah optimasi, halaman terasa lebih stabil. Pengguna tidak lagi mentok saat scroll karena elemen bergeser, dan skor performa halaman ikut meningkat.

Bagi saya, optimasi CLS bukan hanya soal angka. Ini juga soal kenyamanan pengguna dan membangun produk digital yang terasa profesional.
