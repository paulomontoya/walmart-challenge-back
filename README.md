# Walmart Challenge Back end

This is the back end repo of my Walmart challenge. You can see the parent repo with docker-compose [here](https://github.com/paulomontoya/walmart-challenge)

## Technologies

- Node
- Typescript
- Express
- Mongoose
- ESLint
- Prettier
- Jest
- MongoDB Memory Server
- Docker
- Factories
- Migrations

[See the front end project here](https://github.com/paulomontoya/walmart-challenge-front)

This project has only one valid endpoint and has no auth validation and no pagination. The objective here is to search for products into a DB and give a discount based on the repeated chars of the product description.

I'm hosting this with a free dyno in Heroku with Docker, so the performance is TRASH right now. But you can take a look here:

`GET https://paulo-walmart-backend.herokuapp.com/products/search/{query}`

## Know issues

- I'm not using `chai` or another library to help me with the tests of objects values
- SKU field it's not `uniq: true`
