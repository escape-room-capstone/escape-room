const path = require('path');
const express = require('express');
const app = express();
const db = require('./db/db')



const PORT = process.env.PORT || 8080;
const PUBLIC_PATH = path.join(__dirname, '../public');
const DIST_PATH = path.join(__dirname, '../dist');

app.use(express.json());
app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));

//mount api router
app.use('/api', require('./api'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


const init = async () => {
  try {
    await db.sync();
  } catch (err) {
    console.log(rr)
  }
  app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
  });
};

init();
