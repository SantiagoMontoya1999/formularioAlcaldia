-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-11-2024 a las 15:30:00
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `nodejs`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE `estudiantes` (
  `id_estudiante` int(11) NOT NULL,
  `nombre_alumno` varchar(100) DEFAULT NULL,
  `email_alumno` varchar(100) DEFAULT NULL,
  `curso_alumno` varchar(100) DEFAULT NULL,
  `num_calificacion` tinyint(1) NOT NULL,
  `num_cedula` varchar(10) NOT NULL,
  `numero_telefono` varchar(15) NOT NULL,
  `descripcion_at` text NOT NULL,
  `edad_pr` enum('0-5 años', '6-12 años', '13-17 años', '18-26 años', '27-59 años', '60-100 años') DEFAULT NULL,
  `genero_pr` enum('Masculino', 'Femenino') DEFAULT NULL,
  `poblacion_pr` enum('Discapacitado', 'Victimas', 'Indigena', 'Afrocolombiano', 'Raizal', 'Rom', 'Mujer de cabeza de familia', 'LGTBI', 'Reinsertados', 'Migrantes', 'Otra', 'Ninguna') DEFAULT NULL,
  `zona_pr` enum('Urbana', 'Rural') DEFAULT NULL,
  `tipo` enum('Reconocimiento', 'Petición', 'Queja', 'Reclamo', 'Sugerencia') NOT NULL,
  `estado` enum('Pendiente', 'Solucionado', 'Rechazado', 'Vencido') NOT NULL DEFAULT 'Pendiente', -- Nuevo campo
  `motivo` text DEFAULT NULL, -- Nuevo campo
  `created_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertar un ejemplo de registro con los nuevos campos

INSERT INTO `estudiantes` (`id_estudiante`, `nombre_alumno`, `email_alumno`, `curso_alumno`, `num_calificacion`, `num_cedula`, `numero_telefono`, `descripcion_at`, `edad_pr`, `genero_pr`, `poblacion_pr`, `zona_pr`, `tipo`, `estado`, `created_at`) 
VALUES
(30, 'Luis11323232', '11232311@gmail.com', 'NodeJS', 5, '1234567890', '3001234567', 'Estudiante de NodeJS', '13-17 años', 'Masculino', 'Ninguna', 'Urbana', 'Petición', 'Pendiente', '2023-05-26');

-- Índices para la tabla `estudiantes`

ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`id_estudiante`);

-- AUTO_INCREMENT para la tabla `estudiantes`
ALTER TABLE `estudiantes`
  MODIFY `id_estudiante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;