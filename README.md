# Lalila Dijital Showroom (Statik Site)

Netlify'a doğrudan yüklenebilir statik sitedir. Build komutu gerekmez.

## Netlify'a yükleme
**Yöntem 1 (en kolay):** app.netlify.com → Add new site → **Deploy manually** → `public` klasörünü sürükleyip bırakın.
(netlify.toml içindeki yönlendirmeler için tüm klasörü yüklemeniz önerilir.)

**Yöntem 2 (GitHub):** Klasörü GitHub'a yükleyin → Add new site → Import an existing project.
Build command: boş bırakın. Publish directory: `public`.

## Görseller
`public/images/` içine şu dosyaları ekleyin:
hero-1.jpg, hero-2.jpg, hero-3.jpg, category-tul.jpg, category-fon.jpg,
category-stor.jpg, category-zebra.jpg, category-jaluzi.jpg, category-motorlu.jpg

## Admin
`/admin/` adresinde Firebase Authentication ile giriş yapılır.
Firebase konsolunda Authentication > Settings > Authorized domains kısmına Netlify alan adınızı ekleyin.

## Yerel test
`npm run dev`
