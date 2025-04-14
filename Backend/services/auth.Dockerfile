# Auth Service Dockerfile
FROM node:18

WORKDIR /app

# Since package.json is in Backend, we adjust the path for Docker
COPY ./package*.json ./
RUN npm install

# Now copy only the auth.js service files
COPY ./services/auth.js ./services/auth.js

CMD ["npm", "run", "nodeService"]
