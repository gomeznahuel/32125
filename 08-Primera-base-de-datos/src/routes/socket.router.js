const { Router } = require("express");
const basicRouter = Router();

basicRouter.get("/", (req, res) => {
  res.render("index");
});

module.exports = basicRouter;
