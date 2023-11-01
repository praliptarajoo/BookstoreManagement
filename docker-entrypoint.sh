#!/bin/bash

set -e

#let the container build completely.
sleep 15

cd /var/www/html/ && composer install
chmod -R 777 /var/www/html
chown -R www-data:www-data /var/www/html
mkdir -p /var/www/html/bootstrap/cache
find /var/www/html -type f -exec chmod 644 {} \;
find /var/www/html -type d -exec chmod 755 {} \;
cd /var/www/html/ && chgrp -R www-data storage bootstrap/cache && chmod -R ug+rwx storage bootstrap/cache
# cd /var/www/html/ && php artisan migrate

echo "Laravel API start"
exec "$@"
