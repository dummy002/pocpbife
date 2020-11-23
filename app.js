const express = require('express');
const path = require('path');
var cors = require('cors');
const app = express();

app.use(cors())
app.use(express.static(path.resolve(__dirname, 'build')));

app.listen(8080);