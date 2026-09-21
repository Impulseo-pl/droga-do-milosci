# Droga do Miłości — demo strony biura matrymonialnego

Demo dla klienta, który dostał wcześniej niedokończoną wersję od innej firmy
(dating-website-nu.vercel.app). Zbudowane od zera na stacku Impulseo.

- statyczny HTML, bez build-stepu
- fonty self-hosted (Fraunces + Karla) w `assets/fonts`
- `assets/style.css`, `assets/app.js`, cache-buster `?v=md5` odświeżany przez `./bust.sh`
- wszystkie strony mają `noindex, nofollow` (demo)

## Strony
`index.html`, `pakiety.html`, `dodaj-oferte.html`, `o-nas.html`, `regulamin.html`, `rodo.html`, `kontakt.html`

## Do wdrożenia przed produkcją
- formularz: obecnie tylko walidacja front-end + symulacja płatności (modal). Docelowo Pages Function + Resend i realna bramka płatności.
- do potwierdzenia u klienta: zasięg pakietu 49 zł (na demie „ponad 11 tysięcy Kobiet"), nazwy pakietów w regulaminie (Standard/Premium) vs. na stronie.
