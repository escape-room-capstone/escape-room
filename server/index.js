const { db, syncAndSeed } = require('./db');
const PORT = process.env.PORT || 3000;
const app = require('./app');

const init = async () => {
  try {
    if (process.env.SEED) {
      await syncAndSeed();
    } else {
      await db.sync();
    }
    // app.listen(PORT, () => {
    //   console.log(`Server listening on PORT: ${PORT}`);
    // });
  } catch (ex) {
    console.log(ex);
  }
};

init();
