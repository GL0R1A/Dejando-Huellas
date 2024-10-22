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
-- Table structure for table `reporte_desaparecidos`
--

DROP TABLE IF EXISTS `reporte_desaparecidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reporte_desaparecidos` (
  `reporteD_id` int NOT NULL AUTO_INCREMENT,
  `fecha_desaparicion` date NOT NULL,
  `hora_desaparicion` time NOT NULL,
  `descripcion_desaparicion` text,
  `ubicacionid_desaparicion` int NOT NULL,
  `mascotaid_desaparicion` int NOT NULL,
  `activo` tinyint DEFAULT '1',
  PRIMARY KEY (`reporteD_id`),
  KEY `Fk_UbicacionId_Desaparecido_idx` (`ubicacionid_desaparicion`),
  KEY `Fk_MascotaId_Desaparecida_idx` (`mascotaid_desaparicion`),
  CONSTRAINT `Fk_MascotaId_Desaparecida` FOREIGN KEY (`mascotaid_desaparicion`) REFERENCES `mascotas` (`mascota_id`),
  CONSTRAINT `Fk_UbicacionId_Desaparecido` FOREIGN KEY (`ubicacionid_desaparicion`) REFERENCES `ubicaciones` (`ubicacion_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reporte_desaparecidos`
--

LOCK TABLES `reporte_desaparecidos` WRITE;
/*!40000 ALTER TABLE `reporte_desaparecidos` DISABLE KEYS */;
INSERT INTO `reporte_desaparecidos` VALUES (9,'2024-09-04','16:15:00','As',30,69,0),(10,'2024-09-15','10:00:00','1000 quetzales a quien lo entregue',48,71,0),(11,'2024-09-05','20:25:00','no',49,68,0),(12,'2024-09-05','12:49:00','Asa',50,67,0),(13,'2024-09-06','13:45:00','asw',52,72,0),(14,'2024-09-05','20:25:00','15',53,67,0),(15,'2024-09-03','15:23:00','a',57,72,0),(16,'2024-09-03','14:23:00','a',59,69,0),(17,'2024-09-19','15:41:00','a',65,68,0),(18,'2024-09-28','12:04:00','Se dara 500 de gratificacion a quien la devuelva',67,73,0),(19,'2024-09-02','12:00:00','Ofrezco recompensa de Q1000.00 a quien sepa del paradero de mi perro',68,67,0),(20,'2024-10-02','22:07:00','Se dará recompensa a quien brinde informacion',91,72,0),(21,'2024-09-30','21:41:00','No',92,68,0),(22,'2024-10-03','02:11:00','Se dará gratificacion de Q200.00',94,72,0),(23,'2024-09-29','22:21:00','Se dará Q200.00 por informacion',95,67,0),(24,'2024-10-03','23:30:00','Asas',97,68,0),(25,'2024-09-30','20:33:00','Plata',98,67,0),(26,'2024-10-10','18:24:00','abgbadef',124,72,0),(27,'2024-10-06','15:10:00','En el bosque de la china',128,68,1),(28,'2024-02-20','20:24:00','545454',130,69,0);
/*!40000 ALTER TABLE `reporte_desaparecidos` ENABLE KEYS */;
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
