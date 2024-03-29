import mongoose = require('mongoose');

class Database {
  public db;

  public connection: mongoose.Mongoose;

  private mongoURL = process.env.MONGO_URL;

  public async connect(): Promise<boolean> {
    try {
      this.connection = await mongoose.connect(this.mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });

      if (process.env.NODE_ENV !== 'test') console.info('Successfully connected to mongo');
      return true;
    } catch (error) {
      console.error('Error connecting to database: ', error);
      return process.exit(1);
    }
  }

  public async close(): Promise<boolean> {
    try {
      this.connection.connection.close();
      return true;
    } catch (error) {
      console.error('Error closing mongo: ', error);
      return process.exit(1);
    }
  }
}

export default Database;
