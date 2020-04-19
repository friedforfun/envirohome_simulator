# source of base image - https://github.com/mhart/alpine-node
FROM mhart/alpine-node:13 AS builder


# install build deps
RUN apk add --no-cache ca-certificates bash tini git
RUN apk --update-cache --repository http://dl-3.alpinelinux.org/alpine/edge/testing/ add android-tools
RUN apk add --no-cache --virtual .build-deps make gcc g++ python && yarn global add expo-cli && yarn global add react-native-cli

# copy directory into container
WORKDIR /usr/src/app
COPY . .

# RUN npm install && \	
# 	npm install -g expo-cli

# Clear build dependencies from builder
RUN apk del .build-deps

# ENTRYPOINT ["/sbin/tini", "--"]

# run linters, setup and tests
# FROM builder AS test
# COPY . .
# RUN  npm run lint && npm run setup && npm run test

# image without build dependencies:
FROM builder

COPY --from=builder /usr/src/app .

# ENV ADB_IP="192.168.1.1"
# ENV REACT_NATIVE_PACKAGER_HOSTNAME=$host_domain
ENV EXPO_DEBUG=true

# Bind these ports in the docker-compose configuration
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
EXPOSE 19006

RUN yarn cache clean && yarn install

# CMD adb connect $ADB_IP && \
#   yarn run android
# CMD ["yarn", "run", "android"]