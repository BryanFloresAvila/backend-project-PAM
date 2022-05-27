const express = require('express');
const fileStream = require('fs');
const router = express.Router();

const PATH_ROUTES = __dirname;

const removeExtension = (fileName) => {
  return fileName.split('.').shift();
};

fileStream.readdirSync(PATH_ROUTES).forEach((fileName) => {
  const name = removeExtension(fileName);
  if (name !== 'index') {
    router.use(`/${name}`, require(`./${fileName}`));
  }
});
module.exports = router;
