FROM node:18

RUN apt update -y && apt upgrade -y
RUN apt-get update && \
  apt-get install -y \
  neofetch \
  coreutils \
  python \
  zip \
  ffmpeg && \
  rm -rf /var/lib/apt/lists/*
  
WORKDIR /root/xyvnz
COPY package.json .
COPY . .
RUN git clone  https://VanzGantengz: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@github.com/VanzGantengz/es6
RUN curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
RUN python3 get-pip.py
RUN pip install requests bs4 cursor pystyle pillow
RUN npm i -g pm2
RUN mv es6 xyvnz && cp -r xyvnz /root
RUN npm install
CMD pm2-runtime index.js
