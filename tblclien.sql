/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.5.5-10.4.32-MariaDB : Database - opticenter
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`opticenter` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `opticenter`;

/*Table structure for table `tblclientes` */

DROP TABLE IF EXISTS `tblclientes`;

CREATE TABLE `tblclientes` (
  `intClvCliente` int(11) NOT NULL AUTO_INCREMENT,
  `vchNomCliente` varchar(30) NOT NULL,
  `vchAPaterno` varchar(30) NOT NULL,
  `vchAMaterno` varchar(30) NOT NULL,
  `vchCorreo` varchar(50) NOT NULL,
  `chrSexo` char(1) NOT NULL,
  `dtFechaNacimiento` date NOT NULL,
  `vchTelefono` varchar(10) NOT NULL,
  `vchPassword` varchar(200) NOT NULL,
  `Calle` varchar(100) NOT NULL,
  `intIdColonia` int(11) NOT NULL,
  PRIMARY KEY (`intClvCliente`),
  KEY `intIdColonia` (`intIdColonia`),
  CONSTRAINT `tblclientes_ibfk_1` FOREIGN KEY (`intIdColonia`) REFERENCES `tblcolonia` (`intIdColonia`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tblclientes` */

insert  into `tblclientes`(`intClvCliente`,`vchNomCliente`,`vchAPaterno`,`vchAMaterno`,`vchCorreo`,`chrSexo`,`dtFechaNacimiento`,`vchTelefono`,`vchPassword`,`Calle`,`intIdColonia`) values (2,'Irving','Mateo','Hernandez','irving01@hotmail.com','M','2003-01-30','7712036621','irving0101','palmas',1),(3,'juan','Mateo','Francisco','irving01@hotmail.com','M','2003-01-30','7712036621','irving0101','palmas',1),(4,'Irving','Mateo','Hernandez','irving01@hotmail.com','M','2003-01-30','7712036621','irving0101','palmas',1),(5,'Irving','Mateo','Hernandez','irving01@hotmail.com','M','2003-01-30','7712036621','irving0101','palmas',1),(6,'Mario','Mateo','Hernandez','irving01@hotmail.com','M','2003-01-30','7712036621','irving0101','palmas',1),(7,'Julio Cesar','Salazar','Hernandez','julio@hotmail.com','M','2003-05-15','7712036621','12345678','palmas',1),(8,'Ofelia','Avila','Hernandez','ofelia@hotmail.com','M','2003-01-27','7711220544','ofelia0101','balsamo',1),(9,'leidy','Salazar','hernandez','leidy@hotmail.com','F','2005-01-15','7783223432','leidy0101','palmas',1),(10,'Julio Cesar','Salazar','Hernandez','julio@hotmail.com','','2003-05-15','7712036621','julio0101','Brazil',1),(11,'Julio Cesar','Salazar','Hernandez','julio@hotmail.com','M','2003-05-15','7712036621','julio0101','Brazil',1),(12,'Angel wences','Hernandez','Cruz','wences@hotmail.com','M','2003-05-17','7712036622','wencesangel0101','Zapote',1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
