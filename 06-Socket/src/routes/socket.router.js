const { Router } = require('express');
const hbsRoutes = Router();

hbsRoutes.get('/', (req, res) => {
  res.render('layouts/index')
})

module.exports = hbsRoutes;
