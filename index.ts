import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');
import routes from './routes';
import errorMiddleware from './middlewares/errors';
import Database from './config/database';

class App {
  public app = express();

  public port = process.env.PORT || 4000;

  public listen() {
    this.app.listen(this.port, () => {
      console.info(`[server]: Running at http://localhost:${this.port}`);
    });
  }

  constructor() {
    this.app.use(cors());
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(routes);

    // error handler
    this.app.use(errorMiddleware);
  }
}

if (process.env.NODE_ENV !== 'test') new Database().connect();

if (module === require.main) {
  new App().listen();
}

export default new App().app;
