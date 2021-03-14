import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

class App {
  public app = express();

  public port = process.env.NODE_PORT || 4000;

  public listen() {
    this.app.listen(this.port, () => {
      console.info(`[server]: Running at http://localhost:${this.port}`);
    });
  }

  constructor() {
    this.app.use(cors());
    this.app.use(bodyParser.json({ limit: '50mb' }));
    // this.app.use(routes);
  }
}

const app = new App();
app.listen();
