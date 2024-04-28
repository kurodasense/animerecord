const express = require("express");
const cors = require("cors");
const router = require("./animerecord_router/router");

// 创建web服务器
const app = express();

// 解决跨域，使用默认配置
app.use(cors());

// 注册router
app.use(express.urlencoded({ extended: false }));
// 使post请求可以用req.body接受参数
app.use(express.json());
app.use("/api", router);

let listen_port = 8091;
app.listen(listen_port, () => {
  console.log(`animerecord server running in port ${listen_port}.`);
});
