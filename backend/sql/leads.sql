CREATE DATABASE IF NOT EXISTS `cr-db`;
USE `cr-db`;

CREATE TABLE IF NOT EXISTS `leads` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `source` VARCHAR(120) NOT NULL DEFAULT 'website',
  `page_url` VARCHAR(255) DEFAULT NULL,
  `form_id` VARCHAR(120) DEFAULT NULL,
  `name` VARCHAR(150) DEFAULT NULL,
  `email` VARCHAR(180) DEFAULT NULL,
  `phone` VARCHAR(60) DEFAULT NULL,
  `subject` VARCHAR(220) DEFAULT NULL,
  `message` TEXT,
  `payload` LONGTEXT,
  `is_read` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_is_read_created` (`is_read`, `created_at`),
  INDEX `idx_email` (`email`),
  INDEX `idx_phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

