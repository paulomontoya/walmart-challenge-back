import Mustache = require('mustache');
import es = require('../locales/es.json');
import en = require('../locales/en.json');

class HttpError extends Error {
  public status: number;

  public name: string;

  public messages: { en: string; es: string };

  public params;

  constructor(name = 'InternalServer', status = 500, params = {}) {
    super(name);

    this.name = name;
    this.status = status;
    this.messages = {
      en: Mustache.render(en.errors[this.name] || '', params) || undefined,
      es: Mustache.render(es.errors[this.name] || '', params) || undefined,
    };
    this.params = params;
  }
}

export default HttpError;
