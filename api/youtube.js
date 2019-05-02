const router = require('express').Router();
const search = require('youtube-search');
const { YouTubeAPIKey } = require('../secrets_file');

module.exports = router;

const opts = {
  maxResults: 5,
  key: YouTubeAPIKey,
};

router.post('/:historyData', (req, res, next) => {
  try {
    let { historyData } = req.params;
    historyData = historyData.split('_').join(' ');
    search(historyData, opts, (err, results) => {
      if (err) {
        const wikiErr = new Error('Error connecting to Wikipedia')
        next(wikiErr)
      }
      return res.send(results);
    });
  } catch (err) {
    next(err);
  }
});
