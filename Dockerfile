FROM alpine:latest

RUN apk update
RUN apk add --update micro
RUN apk add --update bash
RUN apk add --update nodejs npm

RUN npm install -g pnpm
# RUN npm install -g next
RUN npm install -g nextui-cli

WORKDIR /opt
VOLUME /opt

RUN (sleep 10; echo -ne '\r'; \
	 sleep 3; echo -ne '\r'; \
	 sleep 3; echo -ne '\r'; \
	 echo -ne '\r') | \
	 nextui init -t app -p npm my-nextui-app

# RUN nextui init -t app -p npm my-app
# RUN npx create-next-app -e https://github.com/nextui-org/next-app-template

WORKDIR /opt/my-nextui-app
RUN nextui add --all
RUN npm install

# RUN npm run dev
CMD ["npm", "run", "dev"]
