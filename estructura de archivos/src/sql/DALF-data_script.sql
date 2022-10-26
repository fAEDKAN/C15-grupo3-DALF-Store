-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: dalf_store_db
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (1,NULL,NULL,NULL,24,'2022-10-23 03:29:30','2022-10-23 03:29:30',NULL);
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `avatars`
--

LOCK TABLES `avatars` WRITE;
/*!40000 ALTER TABLE `avatars` DISABLE KEYS */;
INSERT INTO `avatars` VALUES (1,NULL,'2022-10-22 14:07:05',NULL,NULL),(2,NULL,'2022-10-22 14:07:05',NULL,NULL),(3,NULL,'2022-10-22 14:07:05',NULL,NULL),(4,NULL,'2022-10-22 14:07:05',NULL,NULL),(5,NULL,'2022-10-22 14:07:05',NULL,NULL),(6,NULL,'2022-10-22 14:07:05',NULL,NULL),(7,NULL,'2022-10-22 14:07:05',NULL,NULL),(8,NULL,'2022-10-22 14:07:05',NULL,NULL),(9,NULL,'2022-10-22 14:07:05',NULL,NULL),(10,NULL,'2022-10-22 14:07:05',NULL,NULL),(11,NULL,'2022-10-22 14:07:05',NULL,NULL),(12,NULL,'2022-10-22 14:07:05',NULL,NULL),(13,NULL,'2022-10-22 14:07:05',NULL,NULL),(14,NULL,'2022-10-22 14:07:05',NULL,NULL),(15,NULL,'2022-10-22 14:07:05',NULL,NULL),(16,NULL,'2022-10-22 14:07:05',NULL,NULL),(17,NULL,'2022-10-22 14:07:05',NULL,NULL),(18,NULL,'2022-10-22 14:07:05',NULL,NULL),(19,NULL,'2022-10-22 14:07:05',NULL,NULL),(20,'avatar-1663631442728.png','2022-10-22 14:07:05',NULL,NULL),(21,NULL,'2022-10-22 14:07:05',NULL,NULL),(22,NULL,'2022-10-22 14:07:05',NULL,NULL),(23,'avatar-1665159477529.png','2022-10-22 14:07:05',NULL,NULL);
/*!40000 ALTER TABLE `avatars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'otro','2022-10-22 14:07:04',NULL,NULL),(2,'microsoft','2022-10-22 14:07:04',NULL,NULL),(3,'steam','2022-10-22 14:07:04',NULL,NULL),(4,'psn','2022-10-22 14:07:04',NULL,NULL),(5,'ubisoft','2022-10-22 14:07:04',NULL,NULL),(6,'battle.net','2022-10-22 14:07:04',NULL,NULL),(7,'xbox','2022-10-22 14:07:04',NULL,NULL);
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'otro','2022-10-22 14:07:04',NULL,NULL),(2,'accion','2022-10-22 14:07:04',NULL,NULL),(3,'aventura','2022-10-22 14:07:04',NULL,NULL),(4,'ftp/tps','2022-10-22 14:07:04',NULL,NULL),(5,'rpg','2022-10-22 14:07:04',NULL,NULL),(6,'simulacion','2022-10-22 14:07:04',NULL,NULL),(7,'carreras','2022-10-22 14:07:04',NULL,NULL),(8,'lucha','2022-10-22 14:07:04',NULL,NULL),(9,'mmo','2022-10-22 14:07:04',NULL,NULL),(10,'arcade','2022-10-22 14:07:04',NULL,NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'gift-card-playstation.jpeg',1,'2022-10-22 14:07:05',NULL,NULL),(2,'RE2-card.jpeg',2,'2022-10-22 14:07:05',NULL,NULL),(3,'gtav-card.jpeg',3,'2022-10-22 14:07:05',NULL,NULL),(4,'steam-card.jpeg',4,'2022-10-22 14:07:05',NULL,NULL),(5,'eldenring-card.webp',5,'2022-10-22 14:07:05',NULL,NULL),(6,'minecraftjava-bedrockedition-card.webp',6,'2022-10-22 14:07:05',NULL,NULL),(7,'megaman11-card.jpeg',7,'2022-10-22 14:07:05',NULL,NULL),(8,'re4-card.jpeg',8,'2022-10-22 14:07:05',NULL,NULL),(9,'producto-de-usuario.webp',9,'2022-10-22 14:07:05',NULL,NULL),(10,'producto-de-usuario1.webp',10,'2022-10-22 14:07:05',NULL,NULL),(11,'producto-de-usuario2.webp',11,'2022-10-22 14:07:05',NULL,NULL),(12,'producto-de-usuario3.webp',12,'2022-10-22 14:07:05',NULL,NULL);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `payroles`
--

LOCK TABLES `payroles` WRITE;
/*!40000 ALTER TABLE `payroles` DISABLE KEYS */;
/*!40000 ALTER TABLE `payroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'PlayStation Network Card 75 USD (USA) PSN Key Estados Unidos',11165,15,'Funciona en: PlayStation 3,  PlayStation 4 PlayStation 5',1000,NULL,1,1,4,'2022-10-22 14:07:05',NULL,NULL),(2,'Resident Evil 2 Remake XBOX LIVE Key Argentina',906,5,'Funciona en: Xbox One Xbox Series X',1000,NULL,2,1,7,'2022-10-22 14:07:05',NULL,NULL),(3,'Grand Theft Auto V: Premium Online Edition & Great White Shark Card Bundle XBOX LIVE Key Argentina',1694,5,'Funciona en: Xbox One Xbox Series X',1000,NULL,2,1,7,'2022-10-22 14:07:05',NULL,NULL),(4,'Tarjeta Regalo Steam 1000 ARS Clave Steam Argentina',2577,10,'Este codigo solo es activable por Steam.',1000,NULL,1,1,3,'2022-10-22 14:07:05',NULL,NULL),(5,'Elden Ring Código de XBOX LIVE Argentina',8106,0,'Funciona en: Xbox One Xbox Series X',1000,NULL,2,2,7,'2022-10-22 14:07:05',NULL,NULL),(6,'Minecraft: Java & Bedrock Edition Official website Key Argentina',2530,0,'Sigue la guía de como comprar el producto',1000,NULL,3,2,1,'2022-10-22 14:07:05',NULL,NULL),(7,'Mega Man 11 XBOX LIVE Key Argentina',680,0,'Funciona en: Xbox One Xbox Series X',1000,NULL,1,2,7,'2022-10-22 14:07:05',NULL,NULL),(8,'Resident Evil 4 XBOX LIVE Key Argentina',264,0,'Funciona en: Xbox One Xbox Series X',1000,NULL,2,2,7,'2022-10-22 14:07:05',NULL,NULL),(9,'Oculus Quest 2 Advanced All In One Casco Vr 128gb',209890,0,'EXPLORA EXPERIENCIAS Y JUEGOS ASOMBROSOS CON UNA LIBERTAD INCOMPARABLE.Oculus Quest 2 es nuestro sistema de realidad virtual todo en uno más avanzado hasta el momento. Cada detalle ha sido diseñado para hacer que los mundos virtuales se adapten a sus movimientos, permitiéndole explorar juegos y experiencias impresionantes con una libertad sin igual. No se requiere PC ni consola.',1000,NULL,1,3,1,'2022-10-22 14:07:05',NULL,NULL),(10,'teclado gamer redragon kumara k552 qwerty outemu blue español latinoamérica color blanco con luz rgb',9699,0,'0',1000,NULL,1,3,1,'2022-10-22 14:07:05',NULL,NULL),(11,'Puesto Trabajo Gerencial Mod Argeno Jmi',51373,0,'Puesto de trabajo en L Fabricado en Melamina Faplac, Tapa en 36mm y resto del mueble en 25mm Medidas Finales 1.80x1.80x75 Extensión:90x45cm Escritorio: 180x90cm Hacemos Factura A y B! Hacemos envios!',1000,NULL,1,3,1,'2022-10-22 14:07:05',NULL,NULL),(12,'240v monitor gamer curvo samsung f390 series c24f390fh led 24 black high glossy 100v',45975,0,'Samsung está fielmente comprometida en brindar productos de calidad y que contribuyan a crear un mejor futuro para las personas. Como empresa líder en la industria tecnológica uno de sus objetivos principales es desarrollar avanzadas e innovadoras soluciones. Es por ello que con este monitor tendrás y disfrutarás de una gran experiencia visual en todo momento.',1000,NULL,1,3,1,'2022-10-22 14:07:05',NULL,NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `rols`
--

LOCK TABLES `rols` WRITE;
/*!40000 ALTER TABLE `rols` DISABLE KEYS */;
INSERT INTO `rols` VALUES (1,'admin','2022-10-22 14:07:05',NULL,NULL),(2,'user','2022-10-22 14:07:05',NULL,NULL);
/*!40000 ALTER TABLE `rols` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sections`
--

LOCK TABLES `sections` WRITE;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;
INSERT INTO `sections` VALUES (1,'in-sale','2022-10-22 14:07:05',NULL,NULL),(2,'recommended','2022-10-22 14:07:05',NULL,NULL),(3,'of-users','2022-10-22 14:07:05',NULL,NULL);
/*!40000 ALTER TABLE `sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20221016214429-create-rol.js'),('20221016214447-create-avatar.js'),('20221016214552-create-user.js'),('20221016214634-create-address.js'),('20221016214639-create-state.js'),('20221016214642-create-payrole.js'),('20221016214646-create-order.js'),('20221016214649-create-brand.js'),('20221016214652-create-section.js'),('20221016214655-create-category.js'),('20221016214659-create-product.js'),('20221016214716-create-image.js'),('20221016214719-create-cart.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'fSomma',NULL,NULL,'fsomma94@hotmail.com','$2a$10$eH0q.l03McWUSzr2ayIuQ.PflTm3ipd5yfsDkDEHL1YuUGo7PEJ/G',NULL,NULL,1,NULL,'2022-10-22 14:07:05',NULL,NULL),(2,'diego capo',NULL,NULL,'dmontes2013@gmail.com','$2a$10$xMfpynsMyXGyx5pJLnu8Mu6dSN12fTdgN0P5pgKK7r16hfO1vQMKy',NULL,NULL,1,NULL,'2022-10-22 14:07:05',NULL,NULL),(3,'axel the crack',NULL,NULL,'abustos@outlook.com','$2a$10$VypG3IaTL9.cymnQw0DVO.6IbRH/x27Ewv/yxJk9m1VEKHtyGvZNi',NULL,NULL,1,NULL,'2022-10-22 14:07:05',NULL,NULL),(4,'luca el groso',NULL,NULL,'lkumric@yahoo.com','$2a$10$gk0rKvufwjvN4DLoIPreZ.E1csPRbbgwPSXB3l1xRaYlukVWGGkEC',NULL,NULL,1,NULL,'2022-10-22 14:07:06',NULL,NULL),(5,'aroyson0',NULL,NULL,'aroyson0@alexa.com','$2a$10$XD1/awMIhjGaHHzzCQJ5.uZcwlPUX7CgDciLkXAe2Ncej4nbJFZZO',NULL,NULL,2,NULL,'2022-10-22 14:07:06',NULL,NULL),(6,'ffines1',NULL,NULL,'ffines1@amazon.de','$2a$10$DTQtR0V8SNw3IqdeTXUMuO6E6ixJzeDPGOwfICO7RP8j1O.o.2CUq',NULL,NULL,2,NULL,'2022-10-22 14:07:06',NULL,NULL),(7,'eschustl2',NULL,NULL,'eschustl2@mozilla.org','$2a$10$BZhF65RaIKb42R4Q4v5JUuH1InvWKklZOc0fLAqcROJLz2XYYw/q.',NULL,NULL,2,NULL,'2022-10-22 14:07:06',NULL,NULL),(8,'tpuddan3',NULL,NULL,'tpuddan3@msn.com','$2a$10$pzOPt1RGdigUyf9KC7HQzedYwEOCo/86J7v.FDZq0t8JPopNzw2vO',NULL,NULL,2,NULL,'2022-10-22 14:07:06',NULL,NULL),(9,'shutchens4',NULL,NULL,'shutchens4@blogtalkradio.com','$2a$10$.xxO07xkQNGNRGTQrnTDqed0TSjLoOe/VZ7oBcAiqzN2RZsp35l5W',NULL,NULL,2,NULL,'2022-10-22 14:07:06',NULL,NULL),(10,'dtampion5',NULL,NULL,'dtampion5@slideshare.net','$2a$10$pLtAs104PAJw35D2DpUoTOjJXtXjovIEa9NilnB1avilPm3yojrWi',NULL,NULL,2,NULL,'2022-10-22 14:07:06',NULL,NULL),(11,'ehambers6',NULL,NULL,'ehambers6@icq.com','$2a$10$G.JcJJQ5WEjUN8pYQMQv5O8E1R085OYigIYE0iJ0UNEs3dC66GOWS',NULL,NULL,2,NULL,'2022-10-22 14:07:06',NULL,NULL),(12,'kghidotti7',NULL,NULL,'kghidotti7@columbia.edu','$2a$10$laQIzwkk2F3l9LjWADyov.rj/va/01MdsrIltT/okt4UdBTTXfvQ.',NULL,NULL,2,NULL,'2022-10-22 14:07:06',NULL,NULL),(13,'fchastelain8',NULL,NULL,'fchastelain8@angelfire.com','$2a$10$hmPvnsQAh.6KSIrIa8MU2e1M4VtXuGIsSgx.4SUENYKjtPG0azMca',NULL,NULL,2,NULL,'2022-10-22 14:07:06',NULL,NULL),(14,'icleminson9',NULL,NULL,'icleminson9@miitbeian.gov.cn','$2a$10$qYB8NupIrbyKEs/Qmuoao.Ly8kQOLNSRM4PzojT4wag6kJSMjdiau',NULL,NULL,2,NULL,'2022-10-22 14:07:07',NULL,NULL),(15,'skuhla',NULL,NULL,'skuhla@nature.com','$2a$10$oyXS1okvynyGyaRUFV1kG.FfDWvMuNQWI/5hlLt5RR9SF6c6RQC3K',NULL,NULL,2,NULL,'2022-10-22 14:07:07',NULL,NULL),(16,'sgartellb',NULL,NULL,'sgartellb@rambler.ru','$2a$10$6T9scZ/kJWtUvZCIWvSTOukiRA6UVkPrxsDL8aCjAJU45RkGNrTjq',NULL,NULL,2,NULL,'2022-10-22 14:07:07',NULL,NULL),(17,'aricardonc',NULL,NULL,'aricardonc@squarespace.com','$2a$10$wsUT1xX8vht5/IWRGpb49e2pbiBL8hxV8hNS5ngfQqnYfz5jf5LHa',NULL,NULL,2,NULL,'2022-10-22 14:07:07',NULL,NULL),(18,'kspeared',NULL,NULL,'kspeared@loc.gov','$2a$10$77nObqg2ErrhhczDpPRg3eTjHREWSkAxwCGdQcDbxB0T/.Cx7KSX2',NULL,NULL,2,NULL,'2022-10-22 14:07:07',NULL,NULL),(19,'swaldere',NULL,NULL,'swaldere@cpanel.net','$2a$10$ydgvM5Daj4pKfBSshxwH.umxeMV1lxaPwQ9ztvk0ZMCtlXVJRsZ9O',NULL,NULL,2,NULL,'2022-10-22 14:07:07',NULL,NULL),(20,'Ushio','Diego','Montes','ushiovii@hotmail.com','$2a$10$baTmaUJ8f31uNJlP6uTPmuwJbEjzsorrOa/GzNDN2r1HUT9GYnQNC',NULL,NULL,2,NULL,'2022-10-22 14:07:07',NULL,NULL),(21,'Ushio',NULL,NULL,'ushiovii@hotmail.com','$2a$10$hGLT5pe/7zXEg0JQ44uIru9iSUjKtLnKuGM692vr7svUNSxFpDfb.',NULL,NULL,2,NULL,'2022-10-22 14:07:07',NULL,NULL),(22,'axel',NULL,NULL,'axel@gmail.com','$2a$10$XtP6vNbSjyAzRYd2HaWxlOIzxnZb5VhSZLXZY.lVyhedGBjfH5fva',NULL,NULL,1,NULL,'2022-10-22 14:07:07',NULL,NULL),(23,'useruno','Federico','Somma','user1@gmail.com','$2a$10$05m5mW9v4LgOi1JIIHL95O8yBVTHadCRlcKOJL8nFgUYHH68.o1tS',NULL,'me gusta el arrrrte',2,NULL,'2022-10-22 14:07:07',NULL,NULL),(24,'axel',NULL,NULL,'axell@gmail.com','$2a$10$5pSxizKx7CPy3ACF6D.FEe9TuquajSakwfYFLUF9D89SJUXtOJf4.',NULL,NULL,2,NULL,'2022-10-23 03:29:30','2022-10-23 03:29:30',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-26  9:57:11
