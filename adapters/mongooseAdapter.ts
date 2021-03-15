/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Document } from 'mongoose';

class MongooseAdapter {
  public build(model: Model<any>, attributes: any) {
    // eslint-disable-next-line new-cap
    return new model(attributes);
  }

  public get(doc: Document, attr: string) {
    return doc.get(attr);
  }

  public set(props: any, doc: Document) {
    return doc.set(props);
  }

  public save(doc: Document) {
    return doc.save();
  }

  public destroy(doc: Document) {
    return doc.remove();
  }
}

export default new MongooseAdapter();
