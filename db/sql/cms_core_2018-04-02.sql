# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 47.93.207.245 (MySQL 5.6.35-log)
# Database: cms_core
# Generation Time: 2018-04-02 07:54:47 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table c_dbconfig
# ------------------------------------------------------------

DROP TABLE IF EXISTS `c_dbconfig`;

CREATE TABLE `c_dbconfig` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `host` varchar(50) DEFAULT NULL COMMENT '主机名',
  `port` varchar(10) DEFAULT NULL COMMENT '端口',
  `user` varchar(50) DEFAULT NULL COMMENT '用户名',
  `password` varchar(50) DEFAULT NULL COMMENT '密码',
  `database` varchar(50) DEFAULT NULL COMMENT '数据库',
  `disabled` int(11) DEFAULT '0' COMMENT '禁用',
  `remark` varchar(256) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数据库配置';



# Dump of table c_navconfig
# ------------------------------------------------------------

DROP TABLE IF EXISTS `c_navconfig`;

CREATE TABLE `c_navconfig` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0' COMMENT '父节点',
  `role_id` int(11) DEFAULT '1' COMMENT '角色id',
  `text` varchar(50) DEFAULT NULL COMMENT '菜单名称',
  `path` varchar(100) DEFAULT NULL COMMENT '路径',
  `icon` varchar(50) DEFAULT NULL COMMENT '图标',
  `disabled` tinyint(1) DEFAULT '0' COMMENT '禁用',
  `deleted` tinyint(1) DEFAULT '0' COMMENT '删除',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `remark` int(11) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table c_tableconfig
# ------------------------------------------------------------

DROP TABLE IF EXISTS `c_tableconfig`;

CREATE TABLE `c_tableconfig` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `database` varchar(50) DEFAULT NULL COMMENT '数据库',
  `table_name` varchar(50) DEFAULT NULL COMMENT '表名',
  `title` varchar(20) DEFAULT NULL COMMENT '表名称',
  `table_edit` tinyint(1) DEFAULT '1' COMMENT '是否展示编辑',
  `table_del` tinyint(1) DEFAULT '1' COMMENT '是否展示编辑',
  `remark` int(11) DEFAULT NULL COMMENT '备注',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table c_tablefieldconfig
# ------------------------------------------------------------

DROP TABLE IF EXISTS `c_tablefieldconfig`;

CREATE TABLE `c_tablefieldconfig` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `table_id` int(11) NOT NULL COMMENT '所属表字段',
  `table_name` varchar(50) NOT NULL DEFAULT '' COMMENT '表名',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '字段名',
  `fieldname` varchar(50) DEFAULT NULL COMMENT '物理字段名，正常和name一致，如果取别名，则name会不一样点',
  `title` varchar(50) DEFAULT '' COMMENT '字段名称',
  `data_type` int(11) DEFAULT NULL COMMENT '数据类型',
  `col_show` tinyint(1) unsigned DEFAULT '1' COMMENT '字段-显示',
  `col_width` int(11) DEFAULT NULL COMMENT '字段-宽度',
  `col_lock` varchar(11) DEFAULT 'false' COMMENT '字段-锁定',
  `col_unit` varchar(20) DEFAULT NULL COMMENT '字段-单位',
  `col_sort` int(11) DEFAULT NULL COMMENT '字段-顺序',
  `col_sortable` tinyint(1) DEFAULT NULL COMMENT '字段-排序',
  `col_align` varchar(20) DEFAULT 'center' COMMENT '字段-对齐',
  `form_show` tinyint(1) DEFAULT '1' COMMENT '表单-是否展示',
  `form_type` int(11) DEFAULT '1' COMMENT '表单-类型',
  `form_disabled` int(11) DEFAULT '0' COMMENT '表单-禁用',
  `form_sort` int(11) DEFAULT NULL COMMENT '表单-顺序',
  `form_format` varchar(100) DEFAULT NULL COMMENT '表单-格式',
  `form_required` int(11) DEFAULT '0' COMMENT '表单-必填',
  `form_validate_msg` varchar(11) DEFAULT NULL COMMENT '表单-验证提示信息',
  `form_rules` varchar(512) DEFAULT NULL COMMENT '表单-验证',
  `remark` varchar(256) DEFAULT NULL COMMENT '备注',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='表字段配置\n配置表的字段，在表格中如何展示，在表单里面如何展示';




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
