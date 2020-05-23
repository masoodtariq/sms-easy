const express = require("express");
const bcrypt = require("bcrypt");
const query = require("./connect");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, pass } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(pass, salt);
    await query(
      `INSERT INTO users VALUES('${Date.now()}', '${username}', '${email}', '${hashedPass}')`
    );
  } catch (ex) {
    console.error(ex);
  }
  res.redirect("/msg");
});

module.exports = router;