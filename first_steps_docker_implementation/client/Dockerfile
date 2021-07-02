# to build the image simply run:
# sudo docker build -t react-docker .
FROM node:14-slim
WORKDIR /workdir
COPY package.json /workdir
RUN npm install
COPY . /workdir
CMD [ "npm", "start"]