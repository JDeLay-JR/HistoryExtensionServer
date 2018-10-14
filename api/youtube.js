const router = require('express').Router();

module.exports = router;

router.get('/:historyData', (req, res, next) => {
  try {
    const { historyData } = req.params;
    res.send(`Hit Youtube route: ${historyData}`);
  } catch (err) {
    next(err);
  }
});
