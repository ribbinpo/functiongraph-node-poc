#!/bin/bash
FROM node:22-alpine3.19

ENV HOME=/home/templates
ENV GROUP_ID=1003
ENV GROUP_NAME=templates
ENV USER_ID=1003
ENV USER_NAME=templates

# Create the user and group if they do not already exist
RUN mkdir -m 550 ${HOME} \
    && if ! getent group ${GROUP_ID}; then addgroup -g ${GROUP_ID} ${GROUP_NAME}; fi \
    && if ! getent passwd ${USER_ID}; then adduser -u ${USER_ID} -G ${GROUP_NAME} -h ${HOME} -s /bin/sh -D ${USER_NAME}; fi

COPY --chown=${USER_ID}:${GROUP_ID} package.json ${HOME}
RUN cd ${HOME} && npm install

COPY --chown=${USER_ID}:${GROUP_ID} ./dist ${HOME}/dist

RUN chown -R ${USER_ID}:${GROUP_ID} ${HOME}
RUN find ${HOME} -type d | xargs chmod 500
RUN find ${HOME} -type f | xargs chmod 500

USER ${USER_NAME}
WORKDIR ${HOME}

EXPOSE 8000
ENTRYPOINT ["node", "/home/templates/dist/functions/templates/src/index.js"]