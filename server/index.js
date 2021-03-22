// Imports
const path = require('path');
const express = require('express');
const app = express();
const db = require('./db/db')
const dg_syncAndSeed = require('./db/syncAndSeed/DynamicGame')

// Set port 
const PORT = process.env.PORT || 3000;

// Middleware
const PUBLIC_PATH = path.join(__dirname, '../public');
const DIST_PATH = path.join(__dirname, '../dist');
app.use(express.json());
app.engine('html', require('ejs').renderFile);
app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));

//mount api router
app.use('/api', require('./api'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

// Initialize server
const init = async () => {
  try {
    if (process.env.SEED) {
      await dg_syncAndSeed();
    }
    else {
      await db.sync()
    }
    app.listen(PORT, () => console.log(`\n\nCheck out the website!\nhttp://localhost:${PORT}\n\n`))
  } catch (ex) {
    console.log(ex)
  }
}

init();