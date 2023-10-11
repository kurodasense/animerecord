const express = require('express');
const router = express.Router();

// 导入mysql模块
const db = require('../animerecord_mysql/database');

// 获取所有的追番日期
router.get('/getAnimeDate', (req, res) => {
  let sql = `select date_id, date_name from anime_date`;
  db.query(sql, (err, results) => {
    if (err) {
      res.send({
        status: 400,
        msg: '获取所有的追番日期失败',
        data: err.message
      });
    } else {
      res.send({
        status: 200,
        msg: 'success',
        data: results
      });
    }
  });
});

// 根据追番日期的id来得到相应的追番记录
router.get('/getAnimeRecordByDateId', (req, res) => {
  let date_id = req.query.date_id;
  let sql = `select anime_name, watch_status 
              from anime_record
              where date_id=${date_id}`;
  db.query(sql, (err, results) => {
    if (err) {
      res.send({
        status: 400,
        msg: '获取对应的追番记录失败',
        data: err.message
      })
    } else {
      res.send({
        status: 200,
        msg: 'success',
        data: results
      });
    }
  });
});

// 新增新的追番记录到相应的追番日期中
// 如果追番记录存在则更新，否则插入
router.post('/addNewAnimeRecord', (req, res) => {
  let { record_id, date_id, anime_name, watch_status } = req.body;
  // let sql = `if not exists (select * from anime_record where date_id = ${date_id}, anime_name='${anime_name}, watch_status='${watch_status}')
  //             insert into anime_record(date_id, anime_name, watch_status) values(${date_id}, '${anime_name}', '${watch_status}'
  //             else
  //             update anime_record set date_id=${date_id}, anime_name='${anime_name}', watch_status='${watch_status}' where record_id=${record_id}`;
  let sql = `replace into anime_record(record_id, date_id, anime_name, watch_status) values(${record_id}, ${date_id}, '${anime_name}', '${watch_status}')`;
  db.query(sql, (err, results) => {
    if (err) {
      res.send({
        status: 400,
        msg: '更新追番记录失败',
        data: err.message
      });
    } else {
      res.send({
        status: 200,
        msg: 'success',
        data: results
      });
    }
  });
});

module.exports = router;