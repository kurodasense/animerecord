const config = require("../config");
const { createJWT } = require("../utils");
const express = require("express");
const router = express.Router();

router.post("/permission", (req, res) => {
  const { secret } = req.body;
  if (secret !== config.SECRET) {
    res.status(400).send({
      status: 400,
      msg: "权限验证失败",
      data: "权限验证失败",
    });
  } else {
    const token = createJWT();
    res.status(200).send({
      status: 200,
      msg: "权限验证成功",
      data: { token },
    });
  }
});
module.exports = router;
