# Droga do Miłości — demo strony biura matrymonialnego

Demo dla klienta, który dostał wcześniej niedokończoną wersję od innej firmy
(dating-website-nu.vercel.app). Nasza wersja odwzorowuje tamten układ i wygląd,
ale zbudowana jest na stacku Impulseo i uzupełniona o poprawki przekazane przez klienta.

## Stack
- jedna strona (`index.html`) z sekcjami kotwiczonymi: `#home`, `#jak`, `#pakiety`, `#oferta`, `#onas`, `#regulamin`, `#rodo`, `#kontakt`
- statyczny HTML bez build-stepu, własny CSS (bez Tailwinda)
- fonty self-hosted: Cormorant Garamond + Jost (`assets/fonts`)
- cache-buster `?v=md5` odświeżany przez `./bust.sh`
- `noindex, nofollow` (demo)

## Poprawki klienta naniesione względem tamtej wersji
- cytat Jana Pawła II („Dotąd dwoje…" / „Odtąd jedno…") jako osobna sekcja pod hero
- 10+ lat doświadczenia i 1 200+ udanych Par (zamiast 18 lat i 4 200)
- publikacja w sześciu grupach i na dwóch stronach na Facebooku
- pakiet 99 zł: czat w grupie (7 tys. Kobiet) + dwie strony (5 tys. obserwujących) = ponad 11 tys.
- trzecia kolumna porównania: „Dostęp do grupy i stron"
- nowe opinie (Andrzej/Kraków, Wojciech/Wrocław, Piotr/Gdańsk)
- „O nas" i „Nasza obietnica" w brzmieniu przekazanym przez klienta
- regulamin §1–§6 klienta, z prawem odstąpienia (art. 38 ust. 1 pkt 1)
- czwarta zgoda w formularzu (żądanie rozpoczęcia usługi przed upływem 14 dni)
- realne dane kontaktowe: tel. 731 535 676 (codziennie 11–18), ukrainki.samotne@o2.pl,
  adres w Kędzierzynie-Koźlu, uwaga o wyjazdach do Ukrainy, profil na Facebooku
- usunięte cookies: brak banera i polityki cookies — strona niczego nie zbiera

## Do wdrożenia przed produkcją
- formularz: obecnie walidacja front-end + symulacja płatności. Docelowo Pages Function + Resend i realna bramka.
- do potwierdzenia u klienta: zasięg pakietu 49 zł (na demie „sześć grup i dwie strony"; w tamtej wersji było „ok. 17 tysięcy Kobiet"),
  nazwy Standard/Premium w § 3 regulaminu, opinia wspominająca „Pakiet Premium" i doradcę.
