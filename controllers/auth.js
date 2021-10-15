exports.postLogin = (req, res, next) => {
  const { username } = req.body;
  res.json({ user: username });
};
