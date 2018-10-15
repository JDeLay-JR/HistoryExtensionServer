const router = require('express').Router();
const search = require('youtube-search');
const { YouTubeAPIKey } = require('../secrets_file');

const opts = {
  maxResults: 5,
  key: YouTubeAPIKey,
};

router.post('/:historyData', (req, res, next) => {
  try {
    let { historyData } = req.params;
    historyData = historyData.split('_').join(' ');
    console.log(`History Data: ${historyData}`);
    search(historyData, opts, (err, results) => {
      if (err) return console.log(err);
      console.dir(results);
      return res.send(results);
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
