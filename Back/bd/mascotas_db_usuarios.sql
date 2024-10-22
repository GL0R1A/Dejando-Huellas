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
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `usuario_id` int NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`usuario_id`),
  UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (12,'mychava','mchavarriap@miumg.edu.gtsa','$2a$10$qNa2ad3vML.CWxOHZdkpqO9yBNtm38qz8VLy6WVfsWY/UlxRN94E6','2024-08-06 17:59:41'),(13,'admin','mchavarriap@miumg.edu.gt','$2a$10$XSPa3R3Xc6QiVGfuNKiVsuNy0OZ0DA/TmRDBreY7QQNeKSAYP.gji','2024-08-12 01:16:33'),(14,'Paty','patriciaflandez315@gmail.com','$2a$10$9wS4TSEbzKGU8cZ8D6M36.xzob/uo79OOFJDD6eIcgocju25c0YmK','2024-08-13 02:36:02'),(15,'tefi','stefannieflandez0@gmail.com','$2a$10$WOXxCpR1oCBt4Nvn1kqbc.L4RCcyTOSB/Jw3Jd2p8jXqGJ/epN1GC','2024-08-16 02:35:23'),(16,'mychavas8','mchavarriap@miu','$2a$10$WzPqSkdD1kpffIagekji1.5FfEWGJzTQ.y9kf5e/f4/GahZXyqbDK','2024-08-20 02:34:02'),(17,'Kevito','flandezstefannie@gmail.com','$2a$10$/ROKiueG2m2JhbV7qD8uzuu0goSvpcnXqrGpfbJByHzCP63nySUze','2024-08-22 04:04:21'),(18,'adri','adrianaduarte@gmail.com','$2a$10$2qvE2xuDxk8wgblH23RqjO5t2nkvPzPB3ygnpbbMx0sZv5RxGbDB2','2024-08-28 19:22:43'),(22,'Adolfito','adolfopalacios@gmail.com','$2a$10$qdib41Sjh.6e2E80dKCCsePNiXnKO89EsHYBGgU7uQBT5DDLjZNaG','2024-09-26 21:29:27'),(23,'Estu','mynorechavarriap@gmail.com','$2a$10$Xjol0YfrfPR1VYzfItzOG..TK8lvlntuBBJvnBol8V90pPwJB.Nge','2024-10-08 03:38:51');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
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
