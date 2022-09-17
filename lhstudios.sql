/*
 Navicat Premium Data Transfer

 Source Server         : self
 Source Server Type    : MySQL
 Source Server Version : 100410
 Source Host           : 127.0.0.1:3306
 Source Schema         : lhstudios

 Target Server Type    : MySQL
 Target Server Version : 100410
 File Encoding         : 65001

 Date: 17/09/2022 18:54:01
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', '超级管理员', '1333456355', '1333456355@139.com');

-- ----------------------------
-- Table structure for movie_actor
-- ----------------------------
DROP TABLE IF EXISTS `movie_actor`;
CREATE TABLE `movie_actor`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID\r\n',
  `actor_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '演员名称\r\n',
  `actor_avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '演员头像路径',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of movie_actor
-- ----------------------------

-- ----------------------------
-- Table structure for movie_cinema
-- ----------------------------
DROP TABLE IF EXISTS `movie_cinema`;
CREATE TABLE `movie_cinema`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `cinema_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '影院名称',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '影院地址',
  `province` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '省份（北京市，河北省）',
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '影院所在城市名称（北京市、石家庄市）',
  `district` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '区（海淀区、桥西区）',
  `longitude` double NOT NULL COMMENT '经度',
  `latitude` double NOT NULL COMMENT '纬度',
  `tags` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '影院支持的标签（用/分隔，例如：退/改签/小吃/）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of movie_cinema
-- ----------------------------

-- ----------------------------
-- Table structure for movie_cinema_room
-- ----------------------------
DROP TABLE IF EXISTS `movie_cinema_room`;
CREATE TABLE `movie_cinema_room`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `movie_cinema_id` int(11) NULL DEFAULT NULL COMMENT '外键字段，关联movie_cinema表的主键id',
  `room_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '放映厅名称（一号厅、二号厅）',
  `room_size` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '放映厅的大小（1.50人  2.100人 3.150人 4.更多）',
  `room_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '放映厅类型，关联roomtype表',
  `seat_template` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '存储当前放映厅的作为模板字符串',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of movie_cinema_room
-- ----------------------------

-- ----------------------------
-- Table structure for movie_cinema_room_type
-- ----------------------------
DROP TABLE IF EXISTS `movie_cinema_room_type`;
CREATE TABLE `movie_cinema_room_type`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `type_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '影院中放映厅的名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of movie_cinema_room_type
-- ----------------------------
INSERT INTO `movie_cinema_room_type` VALUES (1, '4K厅');
INSERT INTO `movie_cinema_room_type` VALUES (2, 'ALPD Pro高亮厅');
INSERT INTO `movie_cinema_room_type` VALUES (3, '杜比全景声厅');
INSERT INTO `movie_cinema_room_type` VALUES (4, '60帧厅');
INSERT INTO `movie_cinema_room_type` VALUES (5, '巨幕厅');

-- ----------------------------
-- Table structure for movie_cinema_tag
-- ----------------------------
DROP TABLE IF EXISTS `movie_cinema_tag`;
CREATE TABLE `movie_cinema_tag`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `tagname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '影院支持的标签（退、改签、小吃、4K等）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of movie_cinema_tag
-- ----------------------------
INSERT INTO `movie_cinema_tag` VALUES (1, '退');
INSERT INTO `movie_cinema_tag` VALUES (2, '改签');
INSERT INTO `movie_cinema_tag` VALUES (3, '小吃');
INSERT INTO `movie_cinema_tag` VALUES (4, '4K厅');
INSERT INTO `movie_cinema_tag` VALUES (5, '折扣卡');
INSERT INTO `movie_cinema_tag` VALUES (6, '杜比全景声厅');
INSERT INTO `movie_cinema_tag` VALUES (7, '巨幕厅');
INSERT INTO `movie_cinema_tag` VALUES (8, '改签');
INSERT INTO `movie_cinema_tag` VALUES (9, '60帧厅');

-- ----------------------------
-- Table structure for movie_city
-- ----------------------------
DROP TABLE IF EXISTS `movie_city`;
CREATE TABLE `movie_city`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '城市名称',
  `pinyin` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '拼音',
  `sort` int(11) NULL DEFAULT NULL COMMENT '序号',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of movie_city
-- ----------------------------

-- ----------------------------
-- Table structure for movie_director
-- ----------------------------
DROP TABLE IF EXISTS `movie_director`;
CREATE TABLE `movie_director`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID\r\n',
  `director_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '导演名称\r\n',
  `director_avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '导演头像路径',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of movie_director
-- ----------------------------

-- ----------------------------
-- Table structure for movie_info
-- ----------------------------
DROP TABLE IF EXISTS `movie_info`;
CREATE TABLE `movie_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `category_id` int(11) NOT NULL COMMENT '电影分类ID  1.热映  2.待映   3.经典',
  `cover` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电影封面图片路径',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电影标题',
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电影类型（冗余字段）',
  `star_actor` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电影主演明星（冗余字段）',
  `showingon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '上映时间（冗余字段）',
  `score` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电影评分（冗余字段）',
  `description` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '电影描述',
  `duration` int(5) NULL DEFAULT NULL COMMENT '电影时长（单位：分钟）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of movie_info
-- ----------------------------

-- ----------------------------
-- Table structure for movie_info_map_actor
-- ----------------------------
DROP TABLE IF EXISTS `movie_info_map_actor`;
CREATE TABLE `movie_info_map_actor`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_id` int(11) NULL DEFAULT NULL,
  `actor_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of movie_info_map_actor
-- ----------------------------

-- ----------------------------
-- Table structure for movie_info_map_director
-- ----------------------------
DROP TABLE IF EXISTS `movie_info_map_director`;
CREATE TABLE `movie_info_map_director`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movie_id` int(11) NULL DEFAULT NULL,
  `director_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of movie_info_map_director
-- ----------------------------

-- ----------------------------
-- Table structure for movie_thumb
-- ----------------------------
DROP TABLE IF EXISTS `movie_thumb`;
CREATE TABLE `movie_thumb`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '剧照路径',
  `movie_id` int(11) NULL DEFAULT NULL COMMENT '外键字段，关联movie_info表ID字段，表示属于哪个电影',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of movie_thumb
-- ----------------------------

-- ----------------------------
-- Table structure for movie_type
-- ----------------------------
DROP TABLE IF EXISTS `movie_type`;
CREATE TABLE `movie_type`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '电影类型名称（言情、武侠等）',
  `typename` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 88 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of movie_type
-- ----------------------------
INSERT INTO `movie_type` VALUES (1, '爱情');
INSERT INTO `movie_type` VALUES (2, '青春');
INSERT INTO `movie_type` VALUES (3, '奇幻');
INSERT INTO `movie_type` VALUES (5, '古装');
INSERT INTO `movie_type` VALUES (6, '喜剧');
INSERT INTO `movie_type` VALUES (7, '剧情');
INSERT INTO `movie_type` VALUES (8, '动作');
INSERT INTO `movie_type` VALUES (13, '动画');
INSERT INTO `movie_type` VALUES (14, '冒险');
INSERT INTO `movie_type` VALUES (15, '犯罪');
INSERT INTO `movie_type` VALUES (18, '战争');
INSERT INTO `movie_type` VALUES (20, '历史');
INSERT INTO `movie_type` VALUES (24, '科幻');
INSERT INTO `movie_type` VALUES (34, '纪录片');
INSERT INTO `movie_type` VALUES (36, '惊悚');
INSERT INTO `movie_type` VALUES (37, '恐怖');
INSERT INTO `movie_type` VALUES (39, '儿童');
INSERT INTO `movie_type` VALUES (48, '音乐');
INSERT INTO `movie_type` VALUES (51, '家庭');
INSERT INTO `movie_type` VALUES (53, '灾难');
INSERT INTO `movie_type` VALUES (62, '传记');
INSERT INTO `movie_type` VALUES (70, '运动');
INSERT INTO `movie_type` VALUES (87, '悬疑');

-- ----------------------------
-- Table structure for showingon_plan
-- ----------------------------
DROP TABLE IF EXISTS `showingon_plan`;
CREATE TABLE `showingon_plan`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cinema_id` int(11) NULL DEFAULT NULL COMMENT '影院ID',
  `cinema_room_id` int(11) NULL DEFAULT NULL COMMENT '放映厅ID',
  `movie_id` int(11) NULL DEFAULT NULL COMMENT '上映电影ID',
  `showingon_date` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '上映时间（datetime类型）',
  `showingon_time` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '场次，上映时间（HH:mm）',
  `status` int(1) NULL DEFAULT NULL COMMENT '计划发布状态（0.稍后发布  1.立即发布）',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '票价',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of showingon_plan
-- ----------------------------

-- ----------------------------
-- Table structure for ticket_order
-- ----------------------------
DROP TABLE IF EXISTS `ticket_order`;
CREATE TABLE `ticket_order`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `showingon_plan_id` int(11) NULL DEFAULT NULL,
  `seat_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '座位编号（1排23号）',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '票价',
  `showingon_date` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '上映日期（年月日）',
  `showingon_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '开播时间（HH:mm）',
  `movie_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电影名称（冗余字段）',
  `cinema_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '影院名称（冗余字段）',
  `cinema_room_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '影院放映厅名称（一号厅）',
  `cinema_room_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '放映厅类型（4D厅）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ticket_order
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `loginname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录账号',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '昵称',
  `phone` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `validate_code` varchar(6) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '短信验证码',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------

-- ----------------------------
-- Table structure for user_visited_log
-- ----------------------------
DROP TABLE IF EXISTS `user_visited_log`;
CREATE TABLE `user_visited_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户ID',
  `movie_id` int(11) NULL DEFAULT NULL COMMENT '用户想看的电影ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_visited_log
-- ----------------------------

-- ----------------------------
-- Table structure for user_want_log
-- ----------------------------
DROP TABLE IF EXISTS `user_want_log`;
CREATE TABLE `user_want_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL COMMENT '用户ID',
  `movie_id` int(11) NULL DEFAULT NULL COMMENT '用户想看的电影ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_want_log
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
