const router = require("express").Router();

router.get("/*", (req, res) => {
  res.render("ready");
});

module.exports = router;
