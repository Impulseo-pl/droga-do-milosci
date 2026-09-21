#!/bin/bash
# Odświeża cache-bustery (?v=md5) przy assets/style.css i assets/app.js we wszystkich stronach.
cd "$(dirname "$0")"
CSS=$(md5 -q assets/style.css | cut -c1-8)
JS=$(md5 -q assets/app.js | cut -c1-8)
for f in *.html; do
  sed -i '' -E "s|assets/style\.css\?v=[a-f0-9]+|assets/style.css?v=$CSS|g; s|assets/app\.js\?v=[a-f0-9]+|assets/app.js?v=$JS|g" "$f"
done
echo "css=$CSS js=$JS"
