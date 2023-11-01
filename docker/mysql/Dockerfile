# Use the official MySQL image as the base image
FROM mysql:8.0

# Set the root password for MySQL
ENV MYSQL_ROOT_PASSWORD=secret

# Create a new database for your Laravel application
ENV MYSQL_DATABASE=laravel

# Set the character set and collation for the database
ENV MYSQL_CHARSET=utf8mb4
ENV MYSQL_COLLATION=utf8mb4_unicode_ci

# Copy the custom MySQL configuration file to the container
COPY my.cnf /etc/mysql/conf.d/my.cnf
