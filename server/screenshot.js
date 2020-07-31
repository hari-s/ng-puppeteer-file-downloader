var express = require('express');
var router = express.Router();
const fs = require('fs');

const { takeScreenShot } = require('./utils');

router.get('/files', async function(req, res) {
  fs.readdir(`${__dirname}/uploads/`, (err, files) => {
    if (err) {
      throw err;
    }
    res.json(files);
  })
})

router.get('/generate', async function(req, res, next) {
  const url = req.query.url;
  await takeScreenShot(url);
  res.json({
    message: `screenshot of page ${url} take successfully`
  })
});

router.get('/download', async function(req, res, next) {
  const file = req.query.file;
  res.download(`${__dirname}/uploads/${file}`);
});

module.exports = router;
