FROM node:10.9.0

ENV PORT=4000 
ENV MONGODB_URI=mongodb://hssi-db:27017/people 
ENV DEBUG=notes:*
 
RUN mkdir -p /people

COPY package.json *.js /people/
COPY models/ /people/models/
COPY db/ /people/db/

WORKDIR /people

RUN printf "deb http://archive.debian.org/debian/ jessie main\ndeb-src http://archive.debian.org/debian/ jessie main\ndeb http://security.debian.org jessie/updates main\ndeb-src http://security.debian.org jessie/updates main" > /etc/apt/sources.list

RUN apt-get update -y  \
    && apt-get -y install curl python build-essential git ca-certificates  \
    && npm install --unsafe-perm
 
EXPOSE 4000 

CMD npm run docker 
