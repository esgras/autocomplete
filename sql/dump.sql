DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
INSERT INTO `languages` VALUES (1,'php'),(2,'javascript'),(3,'C++'),(4,'C'),(5,'Assembler'),(6,'Pascal'),(7,'Delphi'),(8,'Python'),(9,'Ruby'),(10,'C#'),(11,'TypeScript'),(12,'Java'),(13,'Ada'),(14,'Cobolt'),(15,'SmalTalk'),(16,'Fortran'),(17,'Object Pascal'),(18,'BrainFuck'),(19,'Prolog'),(20,'Sql'),(21,'ColdFusion'),(22,'Flash'),(23,'Dart'),(24,'Go'),(25,'Haskell');
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;