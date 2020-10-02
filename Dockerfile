FROM ubuntu:18.04
COPY . ./
RUN ["npm", "install", "-D"]
CMD ["npm", "run", "init"]