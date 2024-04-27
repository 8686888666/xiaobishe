# Host: localhost  (Version: 5.5.29)
# Date: 2024-03-29 14:22:46
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "admin"
#

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `adminid` int(11) NOT NULL AUTO_INCREMENT COMMENT '管理员ID',
  `adminaccount` varchar(20) DEFAULT NULL COMMENT '管理员账号',
  `adminpassword` varchar(50) DEFAULT NULL COMMENT '管理员密码',
  `adminrole` varchar(50) DEFAULT NULL COMMENT '身份',
  PRIMARY KEY (`adminid`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

#
# Data for table "admin"
#

/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (4,'admin','1','1');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

#
# Structure for table "board"
#

DROP TABLE IF EXISTS `board`;
CREATE TABLE `board` (
  `boardid` int(11) NOT NULL AUTO_INCREMENT COMMENT '留言ID',
  `bdetail` text COMMENT '留言内容',
  `mid` int(11) DEFAULT NULL COMMENT '用户id',
  `addtime` datetime DEFAULT NULL COMMENT '留言时间',
  `answer` text COMMENT '管理员回复',
  PRIMARY KEY (`boardid`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

#
# Data for table "board"
#

/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (10,'菜品卫生不卫生菜品卫生不卫生菜品卫生不卫生菜品卫生不卫生',9,'2024-03-29 00:28:45','保证卫生请放心购买');
/*!40000 ALTER TABLE `board` ENABLE KEYS */;

#
# Structure for table "category"
#

DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `cid` int(11) NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `cname` varchar(50) DEFAULT NULL COMMENT '分类名称',
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

#
# Data for table "category"
#

/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (8,'热菜'),(9,'凉菜'),(10,'汤类'),(11,'主食'),(12,'甜点');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

#
# Structure for table "collects"
#

DROP TABLE IF EXISTS `collects`;
CREATE TABLE `collects` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `pid` int(11) DEFAULT NULL COMMENT '菜品id',
  `mid` int(11) DEFAULT NULL COMMENT '用户id',
  `cdate` datetime DEFAULT NULL COMMENT '收藏时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

#
# Data for table "collects"
#

/*!40000 ALTER TABLE `collects` DISABLE KEYS */;
INSERT INTO `collects` VALUES (12,11,4,'2024-03-28 23:56:28'),(13,15,4,'2024-03-28 23:56:56'),(15,11,9,'2024-03-29 00:13:06'),(16,12,9,'2024-03-29 00:28:13');
/*!40000 ALTER TABLE `collects` ENABLE KEYS */;

#
# Structure for table "members"
#

DROP TABLE IF EXISTS `members`;
CREATE TABLE `members` (
  `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `unickname` varchar(50) DEFAULT NULL COMMENT '微信昵称',
  `uavatar` varchar(200) DEFAULT NULL COMMENT '微信头像',
  `uname` varchar(20) DEFAULT NULL COMMENT '姓名',
  `usex` varchar(10) DEFAULT NULL COMMENT '性别',
  `age` int(11) DEFAULT NULL COMMENT '年龄',
  `uphone` varchar(20) DEFAULT NULL COMMENT '手机号码',
  `uaddress` varchar(100) DEFAULT NULL COMMENT '收货地址',
  `uregtime` datetime DEFAULT NULL COMMENT '注册时间',
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

#
# Data for table "members"
#

/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (9,'古道西风','https://thirdwx.qlogo.cn/mmopen/vi_32/lAyoU2ibJxRLLXtDEwRAu0Wweq52K2KibVEeMiaTcQHVtEBCa0ia8bU0libqbWy5nicFhvFgqOPOYJE9U8RUl3Pqa2JA/132','赵玉田','男',25,'13323233700','工人路69号203','2024-03-28 23:49:03');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;

#
# Structure for table "notice"
#

DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice` (
  `nid` int(11) NOT NULL AUTO_INCREMENT COMMENT '公告ID',
  `ntitle` varchar(50) DEFAULT NULL COMMENT '公告标题',
  `ncontent` text COMMENT '公告内容',
  `npubtime` datetime DEFAULT NULL COMMENT '发布时间',
  PRIMARY KEY (`nid`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

#
# Data for table "notice"
#

/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` VALUES (8,'外卖点餐小程序上线了欢迎使用','<p style=\"text-indent:2em;\">\r\n\t外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外\r\n</p>\r\n<p style=\"text-indent:2em;\">\r\n\t卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用外卖点餐小程序上线了欢迎使用\r\n</p>','2024-03-29 00:22:51'),(9,'各种美食欢迎点餐','<p style=\"text-indent:2em;\">\r\n\t各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食\r\n</p>\r\n<p style=\"text-indent:2em;\">\r\n\t欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐各种美食欢迎点餐\r\n</p>','2024-03-29 00:23:20'),(10,'如有疑问可通过留言反馈与我们沟通','<p style=\"text-indent:2em;\">\r\n\t如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言\r\n</p>\r\n<p style=\"text-indent:2em;\">\r\n\t反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通如有疑问可通过留言反馈与我们沟通\r\n</p>','2024-03-29 00:23:29');
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;

#
# Structure for table "orderproduct"
#

DROP TABLE IF EXISTS `orderproduct`;
CREATE TABLE `orderproduct` (
  `opid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `oid` varchar(20) DEFAULT NULL COMMENT '订单编号',
  `pid` int(11) DEFAULT NULL COMMENT '菜品ID',
  `opnum` int(11) DEFAULT NULL COMMENT '数量',
  `opprice` double DEFAULT '0' COMMENT '单价',
  PRIMARY KEY (`opid`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

#
# Data for table "orderproduct"
#

/*!40000 ALTER TABLE `orderproduct` DISABLE KEYS */;
INSERT INTO `orderproduct` VALUES (14,'240329001614053',15,1,58),(15,'240329001614053',10,1,38.5),(16,'240329001614053',13,1,2),(17,'240329002831326',12,1,18),(18,'240329002831326',15,1,58);
/*!40000 ALTER TABLE `orderproduct` ENABLE KEYS */;

#
# Structure for table "orders"
#

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `oid` varchar(20) NOT NULL COMMENT '订单编号',
  `mid` int(11) DEFAULT NULL COMMENT '用户id',
  `uname` varchar(10) DEFAULT NULL COMMENT '收货人',
  `uphone` varchar(11) DEFAULT NULL COMMENT '手机号码',
  `uaddress` varchar(100) DEFAULT NULL COMMENT '收货地址',
  `oremark` varchar(100) DEFAULT NULL COMMENT '备注说明',
  `oamount` double DEFAULT '0' COMMENT '订单金额',
  `ostatus` varchar(10) DEFAULT NULL COMMENT '订单状态',
  `osubtime` datetime DEFAULT NULL COMMENT '提交时间',
  PRIMARY KEY (`oid`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

#
# Data for table "orders"
#

/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('240329001614053',9,'赵玉田','13323233700','工人路69号203','请尽快配送',98.5,'已完成','2024-03-28 00:16:14'),('240329002831326',9,'赵玉田','13323233700','工人路69号203','少放辣椒',76,'已完成','2024-03-29 00:28:31');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;

#
# Structure for table "product"
#

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `pid` int(11) NOT NULL AUTO_INCREMENT COMMENT '菜品ID',
  `pname` varchar(50) DEFAULT NULL COMMENT '菜品名称',
  `cid` int(11) DEFAULT NULL COMMENT '菜品分类',
  `pimage` varchar(100) DEFAULT NULL COMMENT '菜品图片',
  `pprice` double DEFAULT '0' COMMENT '价格',
  `pstock` int(11) DEFAULT NULL COMMENT '库存数量',
  `pintro` text COMMENT '菜品简介',
  `pstatus` varchar(10) DEFAULT NULL COMMENT '菜品状态',
  `ppubtime` datetime DEFAULT NULL COMMENT '发布时间',
  PRIMARY KEY (`pid`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

#
# Data for table "product"
#

/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (10,'红烧肉',8,'/upload/1711640317492.jpg',38.5,99,'肥瘦相间，香味扑鼻','上架','2024-03-28 12:00:00'),(11,'凉拌黄瓜',9,'/upload/1711640381217.jpg',12.8,80,'清爽爽口，开胃下饭','上架','2024-03-28 12:30:00'),(12,'番茄鸡蛋汤',10,'/upload/1711640406496.jpg',18,49,'酸酸甜甜，暖心满足','上架','2024-03-28 13:00:00'),(13,'米饭',11,'/upload/1711640456535.jpg',2,199,'香喷喷的白米饭','上架','2024-03-28 13:30:00'),(14,'芒果冰沙',12,'/upload/1711640484351.jpg',15.5,30,'清凉解渴，甜而不腻','上架','2024-03-28 14:00:00'),(15,'水煮鱼',8,'/upload/1711640512757.jpg',58,38,'麻辣鲜香，回味无穷','上架','2024-03-28 14:30:00');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
