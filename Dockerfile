FROM node:14.16.0

ARG NODE_PORT
RUN echo "ARG NODE_PORT: $NODE_PORT"

# Create app directory
WORKDIR /usr/src/app

COPY . .

RUN yarn install 

EXPOSE ${NODE_PORT}

CMD ["yarn", "start"]