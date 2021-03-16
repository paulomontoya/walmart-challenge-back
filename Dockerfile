FROM node:14.16.0

ARG PORT 

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN yarn install 

EXPOSE ${PORT}

CMD ["yarn", "start"]