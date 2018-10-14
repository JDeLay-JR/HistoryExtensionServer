const router = require('express').Router();

module.exports = router;

router.use('/youtube', require('./youtube'));
// router.use('/wiki', require('./wiki'))
// router.use('/furtherReading', require('./furtherReading'))


router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
