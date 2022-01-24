/*
 Navicat Premium Data Transfer

 Source Server         : Mysql-Local
 Source Server Type    : MySQL
 Source Server Version : 100316
 Source Host           : localhost:3306
 Source Schema         : meteor_test

 Target Server Type    : MySQL
 Target Server Version : 100316
 File Encoding         : 65001

 Date: 25/01/2022 05:03:31
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, 'admin', '2022-01-18 04:41:29', '2022-01-18 07:18:50');
INSERT INTO `roles` VALUES (2, 'user', '2022-01-18 15:18:26', '2022-01-18 03:51:10');

-- ----------------------------
-- Table structure for routes
-- ----------------------------
DROP TABLE IF EXISTS `routes`;
CREATE TABLE `routes`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `roleId` int NOT NULL,
  `url` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `method` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of routes
-- ----------------------------
INSERT INTO `routes` VALUES (1, 'create-user', 1, 'api/users', 'POST', '2022-01-24 04:06:35', '2022-01-24 04:06:35');
INSERT INTO `routes` VALUES (2, 'view-user', 1, 'api/users', 'GET', '2022-01-24 04:09:33', '2022-01-24 04:09:33');
INSERT INTO `routes` VALUES (3, 'update-user', 1, 'api/users', 'PUT', '2022-01-24 04:10:02', '2022-01-24 04:10:02');
INSERT INTO `routes` VALUES (4, 'delete-user', 1, 'api/users', 'DELETE', '2022-01-24 04:10:16', '2022-01-24 04:10:16');
INSERT INTO `routes` VALUES (5, 'update-profile', 1, 'api/update-me', 'POST', '2022-01-24 04:11:28', '2022-01-24 04:11:28');
INSERT INTO `routes` VALUES (6, 'change-password', 1, 'api/change-password/:id', 'POST', '2022-01-24 04:11:47', '2022-01-24 04:11:47');
INSERT INTO `routes` VALUES (7, 'view-profile', 1, 'api/me', 'GET', '2022-01-24 16:07:39', '2022-01-24 16:07:39');
INSERT INTO `routes` VALUES (8, 'view-profile', 2, 'api/me', 'GET', '2022-01-24 16:07:52', '2022-01-24 16:07:52');
INSERT INTO `routes` VALUES (9, 'change-password', 2, 'api/change-password', 'POST', '2022-01-24 19:05:10', '2022-01-24 19:05:10');
INSERT INTO `routes` VALUES (10, 'change-password', 1, 'api/change-password', 'POST', '2022-01-24 19:05:16', '2022-01-24 19:05:16');
INSERT INTO `routes` VALUES (11, 'reset-password', 1, 'api/reset-password', 'POST', '2022-01-24 19:12:56', '2022-01-24 19:12:56');
INSERT INTO `routes` VALUES (12, 'reset-password', 2, 'api/reset-password', 'POST', '2022-01-24 19:12:59', '2022-01-24 19:12:59');
INSERT INTO `routes` VALUES (13, 'view-list-users', 1, 'api/users', 'GET', '2022-01-24 19:22:38', '2022-01-24 19:22:38');
INSERT INTO `routes` VALUES (14, 'udpate-profile', 2, 'api/update-me', 'POST', '2022-01-24 19:30:40', '2022-01-24 19:30:40');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `refresh_token` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Agus Aza', 'agus@gmail.com', '$2b$10$ZRXKIAJ9VuhLvSVR2xFld.l5IAmPe.GIqaWE1qR/qtVLiuIIeyejS', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJBZ3VzIEF6YSIsImVtYWlsIjoiYWd1c0BnbWFpbC5jb20iLCJpYXQiOjE2NDMwNTg5MDAsImV4cCI6MTY0MzE0NTMwMH0.CyEmj92YR8ZffXlRhpjZAKxB8KC3KUhN3qM61vgHCx4', '2022-01-19 17:35:05', '2022-01-24 21:15:00', 1);
INSERT INTO `users` VALUES (3, 'izza', 'izza@gmail.com', '$2b$10$2020noZMNyWdWzavWx0X6etY9aP0k8g0qqR5keXfZV6eDBQ.UmCAO', NULL, '2022-01-24 15:36:04', '2022-01-24 15:36:04', 2);
INSERT INTO `users` VALUES (4, 'risna', 'risna@gmail.com', '$2b$10$bhTgxnNnbzmOQpgfdAaoY.b5jlc66p5Ll3oUqARdDvzbtzMCdseS.', NULL, '2022-01-24 15:37:04', '2022-01-24 15:37:04', 2);

SET FOREIGN_KEY_CHECKS = 1;
