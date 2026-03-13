FROM php:7.4-apache

# Configuració del servidor i instal·lació de dependències
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf && \
    apt-get update && \
    apt-get install -y \
        libpq-dev \
        postgresql-client && \
    docker-php-ext-configure pgsql && \
    docker-php-ext-install pdo pdo_pgsql pgsql && \
    a2enmod rewrite && \
    sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf && \
    sed -i 's/Options Indexes FollowSymLinks/Options +Indexes +FollowSymLinks/g' /etc/apache2/apache2.conf && \
    echo "DirectoryIndex index.php index.html" >> /etc/apache2/apache2.conf

# Copiar codi PHP
COPY ./www /var/www/html

# Donar permisos adequats
RUN chmod -R 755 /var/www/html && \
    chown -R www-data:www-data /var/www/html

EXPOSE 80
CMD ["apache2-foreground"]
