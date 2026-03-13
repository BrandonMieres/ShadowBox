FROM php:7.4-apache

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf && \
    apt-get update && \
    apt-get install -y \
        libpq-dev \
        postgresql-client && \
    docker-php-ext-install pdo pdo_pgsql pgsql && \
    a2enmod rewrite && \
    sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf && \
    sed -i 's/Options Indexes FollowSymLinks/Options +Indexes +FollowSymLinks/g' /etc/apache2/apache2.conf && \
    echo "DirectoryIndex index.php index.html" >> /etc/apache2/apache2.conf

EXPOSE 80
CMD ["apache2-foreground"]
