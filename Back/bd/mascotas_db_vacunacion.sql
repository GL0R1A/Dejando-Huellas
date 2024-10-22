CREATE DATABASE  IF NOT EXISTS `mascotas_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mascotas_db`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mascotas_db
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `vacunacion`
--

DROP TABLE IF EXISTS `vacunacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacunacion` (
  `id_vacunacion` int NOT NULL AUTO_INCREMENT,
  `medicamento` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `dosis` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `descripcion_adicional` text,
  `fecha_aplicacion` date NOT NULL,
  `proxima_fecha_aplicacion` date DEFAULT NULL,
  `nombre_veterinario` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `id_mascota` int DEFAULT NULL,
  PRIMARY KEY (`id_vacunacion`),
  KEY `id_mascota` (`id_mascota`),
  CONSTRAINT `vacunacion_ibfk_1` FOREIGN KEY (`id_mascota`) REFERENCES `mascotas` (`mascota_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacunacion`
--

LOCK TABLES `vacunacion` WRITE;
/*!40000 ALTER TABLE `vacunacion` DISABLE KEYS */;
INSERT INTO `vacunacion` VALUES (3,'Triple Felina','0.5ml','Para proteger contra panleucopenia, calicivirus y rinotraqueítis.','2024-09-15',NULL,'Dra. Ana Mendoza',68),(4,'Rabia','2ml','Protección contra rabia; dosis de refuerzo en un año.','2024-08-20',NULL,'Dr. Luis García',69),(6,'Leptospirosis','1ml','Protección anual contra leptospirosis, revacunación en un año.','2024-10-02','2024-10-29','Dr. Ricardo Díaz',67),(9,'Amoxicilina','3 ml','Intravenosa','2024-10-06','2024-11-12','Julion Alvarez',69),(10,'Amoxicilinaa','3 ml','asdasd','2024-10-06','2024-10-19','Julion Alvarez',69),(14,'Paracetamol','3 ml','intravenoso','2024-09-29','2024-10-27','Julion Alvarez',67),(16,'Leptospirosis','1ml','Protección anual contra leptospirosis revacunación en un año.','2024-10-02','2025-10-02','Dr. Ricardo Díaz',67);
/*!40000 ALTER TABLE `vacunacion` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-13 13:15:12
