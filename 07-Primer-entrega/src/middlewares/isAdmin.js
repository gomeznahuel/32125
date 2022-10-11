const isAdmin = (req, res, next) => {
  const { admin } = req.query;

  if (admin !== 'true') res.status(401).json({ error: 'Unauthorized' });
  else next();
};

module.exports = isAdmin;
