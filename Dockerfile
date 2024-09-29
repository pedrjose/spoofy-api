FROM --platform=$BUILDPLATFORM node:current-alpine

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]