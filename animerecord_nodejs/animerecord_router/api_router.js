const config = require("../config");
const { verifyJWT } = require("../utils");
const express = require("express");
const router = express.Router();

// 导入mysql模块
const db = require("../animerecord_mysql/database");

// 格式化时间
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

router.post("/*", (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(403).send({
      status: 403,
      msg: "未进行权限验证",
      data: "未进行权限验证"
    });
  } else if (token && verifyJWT(token)) {
    next();
  } else {
    res.status(400).send({
      status: 400,
      msg: "权限验证失败",
      data: "权限验证失败"
    });
  }
});

// 获取所有的追番日期
router.get("/getAnimeDate", (req, res) => {
  // let sql = `select date_id, date_name from anime_date order by STR_TO_DATE(date_name, '%Y.%m') ASC`;
  let sql = `select date_id, date_name from anime_date`;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(400).send({
        status: 400,
        msg: "获取所有的追番日期失败",
        data: err.message
      });
    } else {
      res.status(200).send({
        status: 200,
        msg: "success",
        data: results
      });
    }
  });
});

// 根据追番日期的id来得到相应的追番记录
router.get("/getAnimeRecordByDateId", (req, res) => {
  let date_id = req.query.date_id;
  let sql = `select record_id, date_id, anime_name, watch_status 
              from anime_record
              where date_id=${date_id}`;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(400).send({
        status: 400,
        msg: "获取对应的追番记录失败",
        data: err.message
      });
    } else {
      res.status(200).send({
        status: 200,
        msg: "success",
        data: results
      });
    }
  });
});

// 新增新的追番记录到相应的追番日期中
// 如果追番记录存在则更新，否则插入
router.post("/updateNewAnimeRecord", (req, res) => {
  let { record_id, date_id, anime_name, watch_status } = req.body;
  let sql = `insert into anime_record(record_id, date_id, anime_name, watch_status)
              values('${record_id}', '${date_id}', '${anime_name}', '${watch_status}')
              on duplicate key update
              anime_name='${anime_name}'`;
  // let sql = `replace into anime_record(record_id, date_id, anime_name) values('${record_id}', '${date_id}', '${anime_name}');`;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(400).send({
        status: 400,
        msg: "更新追番记录失败",
        data: err.message
      });
    } else {
      res.status(200).send({
        status: 200,
        msg: "success",
        data: results
      });
    }
  });
});

// 修改追番记录的观看状态
router.post("/updateNewAnimeWatchStatus", (req, res) => {
  let { record_id, date_id, anime_name, watch_status } = req.body;
  let sql = `update anime_record set watch_status='${watch_status}' 
              where record_id='${record_id}' and date_id='${date_id}' and anime_name='${anime_name}'`;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(400).send({
        status: 400,
        msg: "修改追番记录的观看状态失败",
        data: err.message
      });
    } else {
      res.status(200).send({
        status: 200,
        msg: "success",
        data: results
      });
    }
  });
});

router.post("/addNewAnimeDate", (req, res) => {
  let { date_name } = req.body;
  let date_id = new Date().Format("yyyyMMddHHmmss");
  let sql = `insert into anime_date(date_id, date_name) values ('${date_id}', '${date_name}')`;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(400).send({
        status: 400,
        msg: "新增追番日期失败",
        data: err.message
      });
    } else {
      res.status(200).send({
        status: 200,
        msg: "success",
        data: results
      });
    }
  });
});

router.post("/deleteAnimeRecord", (req, res) => {
  let { date_id } = req.body;
  let sql_delete_in_anime_date = `delete from anime_date where date_id='${date_id}';`;
  let sql_delete_in_anime_record = `delete from anime_record where date_id='${date_id}';`;
  db.query(sql_delete_in_anime_date + sql_delete_in_anime_record, (err, results) => {
    if (err) {
      res.status(400).send({
        status: 400,
        msg: "删除追番记录表失败",
        data: err.message
      });
    } else {
      res.status(200).send({
        status: 200,
        msg: "success",
        data: results
      });
    }
  });
});

router.post("/updateRecordDateName", (req, res) => {
  let { date_id, date_name } = req.body;
  let sql = `update anime_date set date_name='${date_name}' where date_id='${date_id}'`;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(400).send({
        status: 400,
        msg: "更新追番日期失败",
        data: err.message
      });
    } else {
      res.status(200).send({
        status: 200,
        msg: "success",
        data: results
      });
    }
  });
});

router.post("/deleteAnime", (req, res) => {
  let { record_id, date_id, anime_name } = req.body;
  let sql = `delete from anime_record where record_id='${record_id}' and date_id='${date_id}' and anime_name='${anime_name}'`;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(400).send({
        status: 400,
        msg: "删除动画记录失败",
        data: err.message
      });
    } else {
      res.status(200).send({
        status: 200,
        msg: "success",
        data: results
      });
    }
  });
});

const multer = require("multer");
const path = require("path");
const { PicGo } = require("picgo");
const fs = require("fs");
const storage = multer.diskStorage({
  //设置存储路径
  destination: (req, file, cb) => {
    cb(null, path.resolve("./temp"));
  },
  //设置存储的文件名
  filename: (req, file, cb) => {
    filename = `animerecord-${file.originalname}`;
    cb(null, filename);
  }
});
const upload = multer({ dest: "./temp", storage: storage });
const picgo = new PicGo();
router.post(
  "/uploadImage",
  upload.fields([{ name: "image", maxCount: 1 }, { name: "recordId" }, { name: "dateId" }]),
  async (req, res) => {
    try {
      // 将上传的图片保存为临时图片
      const fileName = req.files.image[0].filename;
      const dateId = req.body.dateId;
      const recordId = req.body.recordId;
      const fullFileName = `${path.resolve("./temp")}/${fileName}`;
      // 使用 PicGo 上传文件
      const result = await picgo.upload([fullFileName]);
      if (result?.[0].imgUrl) {
        // 删除临时图片
        fs.unlinkSync(fullFileName);
        const imageUrl = result[0].imgUrl;
        const sql = `update anime_record set image_url='${imageUrl}' where record_id='${recordId}' and date_id='${dateId}'`;
        db.query(sql, (err, results) => {
          if (err) {
            res.status(500).send({
              status: 500,
              msg: "服务器写入图片到数据库失败",
              data: results
            });
          } else {
            res.status(200).send({
              status: 200,
              msg: "success",
              data: results
            });
          }
        });
      } else {
        res.status(500).send({ status: 500, msg: "服务器上传失败", data: result });
      }
    } catch (err) {
      res.status(500).send({ status: 500, msg: "服务器上传错误", data: err.message });
    }
  }
);

module.exports = router;
