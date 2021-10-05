FROM node:latest AS build

WORKDIR "/app"

COPY ["package.json", "yarn.lock*", "./"]
RUN ["yarn"]

COPY ["tsconfig.json", "webpack.config.js", "babel.config.json", "./"]
COPY ["src", "./src"]
RUN ["yarn", "run", "build"]

FROM node:latest AS app

WORKDIR "/app"

COPY --from=build /app/dist/bundle.js ./

EXPOSE 3000

CMD ["node", "bundle.js"]