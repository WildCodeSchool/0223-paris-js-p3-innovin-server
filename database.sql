-- MySQL Script generated by MySQL Workbench
-- Thu Jun 15 15:44:36 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8mb3 ;
USE `mydb` ;


-- -----------------------------------------------------
-- Table `mydb`.`wine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`wine` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `color` VARCHAR(45) NOT NULL,
  `manufacture_year` VARCHAR(45) NOT NULL,
  `domain` VARCHAR(100) NOT NULL,
  `region_id` INT NOT NULL,
  `appellation` VARCHAR(100) NOT NULL,
  `cepage` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `comment` TEXT NULL,
  PRIMARY KEY (`id`),
   CONSTRAINT `fk_region_1`
    FOREIGN KEY (`region_id`)
    REFERENCES `mydb`.`region` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

-- -----------------------------------------------------
-- Table `mydb`.`location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`location` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `place_name` VARCHAR(200) NOT NULL,
  `lat` FLOAT NOT NULL,
  `lng` FLOAT NOT NULL,
  `image` VARCHAR(255) NULL DEFAULT 'http://localhost:8080/workshops/default.png',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;



-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `age` INT NOT NULL,
  `role` enum('ROLE_ADMIN','ROLE_USER') NOT NULL DEFAULT 'ROLE_USER',
  `comment` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

-- -----------------------------------------------------
-- Table `mydb`.`session`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`session` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(100) NOT NULL,
  `date` DATETIME NOT NULL,
  `price` DECIMAL(10,0) NOT NULL,
  `max_participants` INT NOT NULL,
  `location_id` INT NOT NULL,
  PRIMARY KEY (`id`),
   CONSTRAINT `fk_session_location1`
    FOREIGN KEY (`location_id`)
    REFERENCES `mydb`.`location` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;




-- -----------------------------------------------------
-- Table `mydb`.`recipe`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`recipe` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `session_id` INT NOT NULL,
  `won_contest` TINYINT NULL DEFAULT NULL,
  `selected_for_context` TINYINT NULL DEFAULT NULL,
    `image` VARCHAR(255) NULL DEFAULT 'http://localhost:8080/imgwine/creation.png',
  PRIMARY KEY (`id`, `user_id`, `session_id`),
  CONSTRAINT `fk_recipe_session1`
    FOREIGN KEY (`session_id`)
    REFERENCES `mydb`.`session` (`id`),
  CONSTRAINT `fk_recipe_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`mix_wine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`mix_wine` (
  `recipe_id` INT NOT NULL,
  `wine_id` INT NOT NULL,
  `percent_wine` INT NULL DEFAULT NULL,
  PRIMARY KEY (`recipe_id`, `wine_id`),
  CONSTRAINT `fk_mix_recipe_wine2`
    FOREIGN KEY (`wine_id`)
    REFERENCES `mydb`.`wine` (`id`),
  CONSTRAINT `fk_mix_wine_recipe1`
    FOREIGN KEY (`recipe_id`)
    REFERENCES `mydb`.`recipe` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`note`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`note` (
 `id`INT NOT NULL AUTO_INCREMENT,
  `wine_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `session_id` INT NOT NULL,
  `note` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_note_session1`
    FOREIGN KEY (`session_id`)
    REFERENCES `mydb`.`session` (`id`),
  CONSTRAINT `fk_note_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`),
  CONSTRAINT `fk_note_wine`
    FOREIGN KEY (`wine_id`)
    REFERENCES `mydb`.`wine` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`tag` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type_of_tag` VARCHAR(45) NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`note_has_tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`note_has_tag` (
  `note_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`note_id`, `tag_id`),
  CONSTRAINT `fk_note_has_tag_note1`
    FOREIGN KEY (`note_id`)
    REFERENCES `mydb`.`note` (`id`),
  CONSTRAINT `fk_note_has_tag_tag1`
    FOREIGN KEY (`tag_id`)
    REFERENCES `mydb`.`tag` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`session_has_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`session_has_user` (
  `user_id` INT NOT NULL,
  `session_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `session_id`),
  CONSTRAINT `fk_user_has_session_session1`
    FOREIGN KEY (`session_id`)
    REFERENCES `mydb`.`session` (`id`),
  CONSTRAINT `fk_user_has_session_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`session_has_wine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`session_has_wine` (
  `wine_id` INT NOT NULL,
  `session_id` INT NOT NULL,
  PRIMARY KEY (`wine_id`, `session_id`),
  CONSTRAINT `fk_session`
    FOREIGN KEY (`session_id`)
    REFERENCES `mydb`.`session` (`id`),
  CONSTRAINT `fk_session_wine`
    FOREIGN KEY (`wine_id`)
    REFERENCES `mydb`.`wine` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`user_has_tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user_has_tag` (
  `user_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `tag_id`),
  CONSTRAINT `fk_user_has_tag_tag1`
    FOREIGN KEY (`tag_id`)
    REFERENCES `mydb`.`tag` (`id`),
  CONSTRAINT `fk_user_has_tag_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`user_has_favorite`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user_has_favorite` (
  `user_id` INT NOT NULL,
  `wine_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `wine_id`),
  CONSTRAINT `fk_user_has_favorite_wine`
    FOREIGN KEY (`wine_id`)
    REFERENCES `mydb`.`wine` (`id`),
  CONSTRAINT `fk_user_has_favorite_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`region`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`region` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`cepage`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`cepage` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `color` enum('red','white') NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`region_has_cepage`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`region_has_cepage` (
  `region_id` INT NOT NULL,
  `cepage_id` INT NOT NULL,
  PRIMARY KEY (`region_id`, `cepage_id`),
  CONSTRAINT `fk_region_has_cepage_region1`
    FOREIGN KEY (`region_id`)
    REFERENCES `mydb`.`region` (`id`),
  CONSTRAINT `fk_region_has_cepage_cepage1`
    FOREIGN KEY (`cepage_id`)
    REFERENCES `mydb`.`cepage` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;
