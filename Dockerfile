# Base image
FROM php:8.1-apache

# Set the working directory
WORKDIR /var/www/html

# Install dependencies
RUN apt-get update && apt-get install -y \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    curl \
    git \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libwebp-dev \
    libjpeg62-turbo-dev

# Enable Apache modules
RUN a2enmod rewrite
RUN a2enmod headers

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy the source code to the container
COPY . .

# Set permissions for Laravel directories
RUN chown -R www-data:www-data \
    storage \
    bootstrap/cache

# Copy Apache virtual host configuration
COPY docker/apache/vhost.conf /etc/apache2/sites-available/000-default.conf

# Enable Apache site
RUN a2ensite 000-default.conf

# Remove default index.html
# RUN rm /var/www/html/index.html

# Set up MySQL
RUN apt-get update && apt-get install -y \
    default-mysql-client

# Copy MySQL configuration
COPY docker/mysql/my.cnf /etc/mysql/conf.d/my.cnf

# Expose port 80
EXPOSE 80

# Start Apache server
CMD ["apache2-foreground"]

COPY  docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]