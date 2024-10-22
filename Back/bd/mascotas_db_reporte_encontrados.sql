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
-- Table structure for table `reporte_encontrados`
--

DROP TABLE IF EXISTS `reporte_encontrados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reporte_encontrados` (
  `reporte_id` int NOT NULL AUTO_INCREMENT,
  `fecha_reporta` date DEFAULT NULL,
  `nombre_reporta` varchar(150) NOT NULL,
  `correo_reporta` varchar(100) DEFAULT NULL,
  `telefono_reporta` varchar(15) NOT NULL,
  `descripcion_reporta` varchar(255) DEFAULT NULL,
  `ubicacion_id` int DEFAULT NULL,
  `mascota_id` int DEFAULT NULL,
  PRIMARY KEY (`reporte_id`),
  KEY `mascota_id` (`mascota_id`),
  KEY `ubicacion_id` (`ubicacion_id`),
  CONSTRAINT `reporte_encontrados_ibfk_1` FOREIGN KEY (`mascota_id`) REFERENCES `mascotas` (`mascota_id`),
  CONSTRAINT `reporte_encontrados_ibfk_2` FOREIGN KEY (`ubicacion_id`) REFERENCES `ubicaciones` (`ubicacion_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reporte_encontrados`
--

LOCK TABLES `reporte_encontrados` WRITE;
/*!40000 ALTER TABLE `reporte_encontrados` DISABLE KEYS */;
INSERT INTO `reporte_encontrados` VALUES (24,'2024-09-30','Mynor','correo@correo.com','45555554','Encontré a tu perro',90,67),(25,'2024-10-01','Mynor','correo@correo.com','45555554','Aca en la calle',99,67),(26,'2024-10-02','Mynor Chavarria','correo@correo.com','45555554','Cabañas',100,67),(27,'2024-10-02','Mynor','correo@correo.com','45555554','a',101,67),(28,'2024-10-02','Mynor','a','a','a',102,67),(29,'2024-10-02','Mynor Chavarria','correo@correo.com','45555554','Encontré a tu perro cerca del parque de Jalpatagua',103,67),(30,'2024-10-02','Mynor Chavarria','correo@correo.com','48708334','En la CA-8',104,67),(31,'2024-10-02','Mynor Estuardo Chavarria','mychava96@gmail.com','48708334','Hola, vi a tu perrito caminando cerca de la Farmacia Dávila',105,68),(32,'2024-10-02','Mynor Estuardo Chavarria','mychava96@gmail.com','48708334','Hola, vi a tu perrito caminando cerca de la Farmacia Dávila',106,68),(33,'2024-10-02','Mynor','correo@correo.com','45555554','Cerca de la calle de la Despensa Familiar',107,68),(34,'2024-10-02','Mynor','correo@correo.com','45555554','Cerca de la calle de la Despensa Familiar',108,68),(35,'2024-10-02','Mynor Estuardo Chavarria','mychava96@gmail.com','48708334','Cerca de la calle de la Despensa, lo vi que andaba siguiendo a una perrita',109,68),(36,'2024-10-02','Mynor Estuardo Chavarria Perez','mychava96@gmail.com','48708334','Lo vi en la calzada a el cementerio',110,68),(37,'2024-10-02','Mynor estuardo Chavarria Perez','mychava96@gmail.com','48708334','Lo vi camino al Jicaral',111,68),(38,'2024-10-02','Mynor','mychava96@gmail.com','48708334','Lo vi por el super mercado Viga',112,68),(39,'2024-10-02','Mynor','correo@correo.com','45555554','as',113,68),(48,'2024-10-03','Mynor','correo@correo.com','48708334','Jalas',122,67),(49,'2024-10-03','Mynor','correo@correo.com','45555554','asas',123,68),(50,'2024-10-05','Mynor','mychava@gmail.com','45555554','entontre a tu perro',125,72),(51,'2024-10-13','Mynor','correo@correo.com','45555554','asasd',131,69),(52,'2024-10-13','Mynor','correo@correo.com','45555554','cONTACTAME',132,69),(53,'2024-10-13','as','correo@correo.com','45555554','asasdasd',133,69);
/*!40000 ALTER TABLE `reporte_encontrados` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-13 13:15:10
