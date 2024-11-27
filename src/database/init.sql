-- Garanta que estamos usando o banco correto
CREATE DATABASE IF NOT EXISTS TaxiDatabase;

USE TaxiDatabase;

SET
  NAMES utf8mb4;

SET
  CHARACTER SET utf8mb4;

-- Crie a tabela drivers
CREATE TABLE IF NOT EXISTS drivers (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(500),
  vehicle VARCHAR(255),
  rating TINYINT,
  rate_per_km DECIMAL(10, 2) NOT NULL,
  min_distance_km FLOAT DEFAULT 0,
  PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- Crie a tabela rides
CREATE TABLE IF NOT EXISTS rides (
  id INT NOT NULL AUTO_INCREMENT,
  customer_id VARCHAR(255) NOT NULL,
  date DATETIME NOT NULL,
  destination VARCHAR(255) NOT NULL,
  origin VARCHAR(255) NOT NULL,
  distance INT NOT NULL,
  duration VARCHAR(255) NOT NULL,
  driver_id INT NOT NULL,
  value DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 0;

-- Limpar a tabela de drivers
TRUNCATE drivers;

SET FOREIGN_KEY_CHECKS = 1;

-- Insira os dados
INSERT INTO
  drivers (
    name,
    description,
    vehicle,
    rating,
    rate_per_km,
    min_distance_km
  )
VALUES
  (
    'Homer Simpson',
    'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
    'Plymouth Valiant 1973 rosa e enferrujado',
    2,
    2.50,
    1
  ),
  (
    'Dominic Toretto',
    'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
    'Dodge Charger R/T 1970 modificado',
    4,
    5.00,
    5
  ),
  (
    'James Bond',
    'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
    'Aston Martin DB5 clássico',
    5,
    10.00,
    10
  );