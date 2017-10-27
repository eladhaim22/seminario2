-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: seminario2
-- ------------------------------------------------------
-- Server version	5.7.19-log


--
-- Table structure for table `course_detail`
--
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0
DROP TABLE IF EXISTS `course_detail`;
CREATE TABLE `course_detail` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `note` int(11) DEFAULT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcbnjs0rgtootjhq83y9m0ch3q` (`student_id`),
  CONSTRAINT `FKcbnjs0rgtootjhq83y9m0ch3q` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
CREATE TABLE `courses` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `databasechangelog`
--

DROP TABLE IF EXISTS `databasechangelog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `databasechangelog` (
  `ID` varchar(255) NOT NULL,
  `AUTHOR` varchar(255) NOT NULL,
  `FILENAME` varchar(255) NOT NULL,
  `DATEEXECUTED` datetime NOT NULL,
  `ORDEREXECUTED` int(11) NOT NULL,
  `EXECTYPE` varchar(10) NOT NULL,
  `MD5SUM` varchar(35) DEFAULT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL,
  `COMMENTS` varchar(255) DEFAULT NULL,
  `TAG` varchar(255) DEFAULT NULL,
  `LIQUIBASE` varchar(20) DEFAULT NULL,
  `CONTEXTS` varchar(255) DEFAULT NULL,
  `LABELS` varchar(255) DEFAULT NULL,
  `DEPLOYMENT_ID` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `databasechangeloglock`
--

DROP TABLE IF EXISTS `databasechangeloglock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `databasechangeloglock` (
  `ID` int(11) NOT NULL,
  `LOCKED` bit(1) NOT NULL,
  `LOCKGRANTED` datetime DEFAULT NULL,
  `LOCKEDBY` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `grades`
--

DROP TABLE IF EXISTS `grades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grades` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `grades_teachers`
--

DROP TABLE IF EXISTS `grades_teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grades_teachers` (
  `teacher_id` bigint(20) NOT NULL,
  `grade_id` bigint(20) NOT NULL,
  KEY `FK7ayxpx4ywb1m9b6y6an6hn8gb` (`grade_id`),
  KEY `FK530mhhqv22esn8smu2yhnc9gq` (`teacher_id`),
  CONSTRAINT `FK530mhhqv22esn8smu2yhnc9gq` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`),
  CONSTRAINT `FK7ayxpx4ywb1m9b6y6an6hn8gb` FOREIGN KEY (`grade_id`) REFERENCES `grades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `jhi_authority`
--

DROP TABLE IF EXISTS `jhi_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jhi_authority` (
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `jhi_persistent_audit_event`
--

DROP TABLE IF EXISTS `jhi_persistent_audit_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jhi_persistent_audit_event` (
  `event_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `event_date` datetime DEFAULT NULL,
  `event_type` varchar(255) DEFAULT NULL,
  `principal` varchar(255) NOT NULL,
  PRIMARY KEY (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `jhi_persistent_audit_evt_data`
--

DROP TABLE IF EXISTS `jhi_persistent_audit_evt_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jhi_persistent_audit_evt_data` (
  `event_id` bigint(20) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`event_id`,`name`),
  CONSTRAINT `FK2ehnyx2si4tjd2nt4q7y40v8m` FOREIGN KEY (`event_id`) REFERENCES `jhi_persistent_audit_event` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `jhi_user`
--

DROP TABLE IF EXISTS `jhi_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jhi_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_by` varchar(50) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_modified_by` varchar(50) DEFAULT NULL,
  `last_modified_date` datetime DEFAULT NULL,
  `activated` bit(1) NOT NULL,
  `activation_key` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `image_url` varchar(256) DEFAULT NULL,
  `lang_key` varchar(5) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `login` varchar(50) NOT NULL,
  `password_hash` varchar(60) NOT NULL,
  `reset_date` datetime DEFAULT NULL,
  `reset_key` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_9y0frpqnmqe7y6mk109vw3246` (`login`),
  UNIQUE KEY `UK_bycanyquvi09q7fh5pgxrqnku` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `jhi_user_authority`
--

DROP TABLE IF EXISTS `jhi_user_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jhi_user_authority` (
  `user_id` bigint(20) NOT NULL,
  `authority_name` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`,`authority_name`),
  KEY `FK4psxl0jtx6nr7rhqbynr6itoc` (`authority_name`),
  CONSTRAINT `FK290okww5jujghp4el5i7mgwu0` FOREIGN KEY (`user_id`) REFERENCES `jhi_user` (`id`),
  CONSTRAINT `FK4psxl0jtx6nr7rhqbynr6itoc` FOREIGN KEY (`authority_name`) REFERENCES `jhi_authority` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `message` varchar(255) NOT NULL,
  `teacher_id` bigint(20) NOT NULL,
  `course_detail_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgfp6ykr7a7bdnqo4c3baqov1q` (`teacher_id`),
  KEY `FK8mfiq5g082da8oplsf42hqsmv` (`course_detail_id`),
  CONSTRAINT `FK8mfiq5g082da8oplsf42hqsmv` FOREIGN KEY (`course_detail_id`) REFERENCES `course_detail` (`id`),
  CONSTRAINT `FKgfp6ykr7a7bdnqo4c3baqov1q` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `messages_childs`
--

DROP TABLE IF EXISTS `messages_childs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages_childs` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `message_id` bigint(20) NOT NULL,
  `child_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `messages_students`
--

DROP TABLE IF EXISTS `messages_students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages_students` (
  `message_id` bigint(20) NOT NULL,
  `student_id` bigint(20) NOT NULL,
  KEY `FKd1p00nabdv01xp65q1s8vafrm` (`student_id`),
  KEY `FK5wlxv43luew59ug06b9tm45qe` (`message_id`),
  CONSTRAINT `FK5wlxv43luew59ug06b9tm45qe` FOREIGN KEY (`message_id`) REFERENCES `messages` (`id`),
  CONSTRAINT `FKd1p00nabdv01xp65q1s8vafrm` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `students` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `birth_date` datetime DEFAULT NULL,
  `grade_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKexo2cgxoe0p8p60y4m6g9hent` (`grade_id`),
  KEY `FKotk90gne2p1uuck53usyxag7k` (`user_id`),
  CONSTRAINT `FKexo2cgxoe0p8p60y4m6g9hent` FOREIGN KEY (`grade_id`) REFERENCES `grades` (`id`),
  CONSTRAINT `FKotk90gne2p1uuck53usyxag7k` FOREIGN KEY (`user_id`) REFERENCES `jhi_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teachers` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `last_name` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsb2nn83s2dhqj64dol0rc3e20` (`user_id`),
  CONSTRAINT `FKsb2nn83s2dhqj64dol0rc3e20` FOREIGN KEY (`user_id`) REFERENCES `jhi_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS

-- Dump completed on 2017-10-27 12:00:36
