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
-- Table structure for table `mascotas`
--

DROP TABLE IF EXISTS `mascotas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mascotas` (
  `mascota_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `especie_id` int DEFAULT NULL,
  `raza` varchar(50) DEFAULT NULL,
  `genero_id` int DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `peso` decimal(5,2) DEFAULT NULL,
  `foto` varchar(255) NOT NULL,
  `propietario_id` int DEFAULT NULL,
  `enfermedad_cronica` varchar(255) DEFAULT 'No tiene',
  `activo` tinyint DEFAULT '1',
  `identificador_qr` varchar(255) DEFAULT NULL,
  `desaparecido` tinyint DEFAULT '0',
  `ubicacionId` int DEFAULT NULL,
  PRIMARY KEY (`mascota_id`),
  KEY `propietario_id` (`propietario_id`),
  KEY `especie_id` (`especie_id`),
  KEY `genero_id` (`genero_id`),
  CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`propietario_id`) REFERENCES `propietarios` (`propietario_id`),
  CONSTRAINT `mascotas_ibfk_2` FOREIGN KEY (`especie_id`) REFERENCES `especies` (`especie_id`),
  CONSTRAINT `mascotas_ibfk_3` FOREIGN KEY (`genero_id`) REFERENCES `generos` (`genero_id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mascotas`
--

LOCK TABLES `mascotas` WRITE;
/*!40000 ALTER TABLE `mascotas` DISABLE KEYS */;
INSERT INTO `mascotas` VALUES (67,'Chompiras',1,'Pitbull',1,'2024-07-24','Blanco',55.00,'/uploads/1724908460207-231972864-istockphoto-1284291447-612x612.jpg',5,'Padece de gastritis',1,'4bef3fd90e9441c7a7ebfa72d7ad4b49',1,10),(68,'Maxi',1,'Huski',1,'2021-01-01','negro con Blanco',25.00,'/uploads/1727328868670-24382871-descubren-que-los-humanos-influimos-en-el-color-de-ojos-de-los-perros-1280x720.jpg',5,'No escucha de oido derecho',1,'78a5adb12bb6fc82ad688cdeba773882',1,18),(69,'chubbys',1,'french',1,'2024-09-05','Blanco',15.00,'/uploads/1727331698551-298840681-french-2.webp',5,'No tiene',1,'e59fb2f72ce63fd5f680b749788e0fb2',1,19),(70,'Firulais',1,'LABRADOR',1,'2020-08-28','CAFE OSCURO',14.00,'/uploads/1727387895800-787560248-sitesdefaultfilesstylessquare_medium_440x440public2022-07Chihuahua-Smooth-Coat.jpg',11,'No tiene',1,'8e16063f71c0e8678cae61a323fec59f',0,45),(71,'black',1,'LABRADOR',1,'2023-08-04','negro',14.11,'/uploads/1727388133393-74653384-WhatsApp%20Image%202024-09-26%20at%203.49.29%20PM.jpeg',11,'No tiene',1,'33f2b4ef030c9bb805c2ecc24650a267',0,47),(72,'Tonys',1,'Terrier',1,'2022-10-04','Negro',15.00,'/uploads/1727546005933-331928384-images.avif',5,'No tiene',0,'95168315b92c27e75b05483d6f180208',0,51),(73,'Fufly',1,'Chihuahua',2,'2023-07-17','Blanco',8.00,'/uploads/1727564127293-509036905-1000702506.jpg',9,'No tiene',1,'c6bf33e85a2ed4633546d99f3072d87f',0,66),(74,'chubby',1,'Terrier',1,'2023-02-01','Blanco con Negro',12.00,'/uploads/1728358781645-944589776-images.avif',12,'No tiene',1,'02c835fde891134c2c72bfa3f9de474d',0,126),(75,'Piter',1,'French',1,'2024-10-02','Blanco',0.11,'/uploads/1728362485841-365330674-french-2.webp',12,'No tiene',1,'df8d3efde025c480b915b8412ace40fc',0,127),(76,'B',1,'french',1,'2024-10-01','Blanco',0.41,'/uploads/1728844163121-348583173-img3.jpg',5,'No tiene',1,'0a8a77868b089597e5d9f0ace2927ac7',0,134);
/*!40000 ALTER TABLE `mascotas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-13 13:15:11
