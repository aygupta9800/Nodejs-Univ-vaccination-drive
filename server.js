import express from 'express';
// const express = require('express')
import { runJsScript } from './public/js_refresher.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 8000;

app.get('/jsrefresher', (req, res) => {
  
  const result =runJsScript()
  res.send(result)
});

app.use(express.static(__dirname + '/public'));

// fs.readFile('./src/index.html', function (err, html) {

//   if (err) throw err;    

//   http.createServer(function(request, response) {  
//       response.writeHeader(200, {"Content-Type": "text/html"});  
//       response.write(html);  
//       response.end();  
//   }).listen(PORT);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
  runJsScript();
});