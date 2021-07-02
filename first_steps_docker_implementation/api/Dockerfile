# to build the image simply run:
# sudo docker build -t express-docker .
FROM node:9-slim
WORKDIR /workdir
COPY package.json /workdir
RUN npm install
COPY . /workdir
CMD ["npm", "start"]