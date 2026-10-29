---
title: "Menyiapkan API Sederhana dengan Flask & Python"
description: "Panduan praktis mengembangkan endpoint API ringan dengan Flask untuk kebutuhan aplikasi internal atau dashboard."
category: "Tutorial"
pubDate: 2025-11-15
author: "Joni Ilman Pahmi"
tags: "Python, Flask, API, Backend"
image: "/hero.jpg"
draft: false
---

## Apa yang dibutuhkan?

Untuk mulai membuat API, biasanya kita butuh tiga komponen dasar:

1. endpoint utama
2. validasi input
3. format respons yang konsisten

Dengan Flask, struktur proyek bisa dibuat sangat ringkas. Saya biasanya mulai dengan route dasar, lalu menambahkan model data dan validasi sederhana.

## Struktur minimal

```python
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.get('/api/hello')
def hello():
    return jsonify({"message": "Halo dari Flask"})

@app.post('/api/items')
def create_item():
    payload = request.get_json()
    return jsonify({
        "status": "ok",
        "data": payload,
    })
```

## Tips yang sering saya pakai

- gunakan JSON sebagai format default
- pastikan error response konsisten
- pisahkan logika bisnis dan route
- buat endpoint yang bisa di-test dengan mudah

API yang baik bukan hanya cepat, tapi juga mudah dipahami dan dikembangkan bersama tim.
