const express = require('express');

const sanyaApp = express();

sanyaApp.get('/pensil', (req, res) => {
    res.send('penis');
});

module.exports = sanyaApp;