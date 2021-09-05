// Use of import/require
import express from 'express';
// const express = require('express')
import { runJsScript } from './public/js_refresher.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 8000;

// For attaching html file to node.js server
app.use(express.static(__dirname + '/public'));

// Use of another path to see results for js_refresher.js
app.get('/jsrefresher', (req, res) => {
  const result = runJsScript()
  res.send(result)
});

// To listen to port 8000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
  runJsScript();
});