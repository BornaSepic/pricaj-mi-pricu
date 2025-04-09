# Use the official Node.js image as the base image
FROM node:20 as foundation

ARG GROUP_ID=1001
ARG USER_ID=1001

ENV CARGO_HOME=/usr/local/cargo \
    npm_config_cache="${TMP_DIR}/npm-cache" \
    npm_config_store_dir="${TMP_DIR}/pnpm-store" \
    SHELL=/bin/bash \
    TMP_DIR=/mnt/tmp \
    WORKDIR=/app

WORKDIR ${WORKDIR}

RUN echo "Installing pnpm" \
    && PNPM_VERSION='9.15.4' \
    && npm install -g "pnpm@${PNPM_VERSION}"

RUN echo 'Creating "node" user' \
    && echo 'Configuring folder permissions' \
    && if [ ! -d "$TMP_DIR" ] ; then mkdir "$TMP_DIR" ; fi \
    && if [ ! -d "$CARGO_HOME" ] ; then mkdir "$CARGO_HOME" ; fi \
    && chown -R node:node ${CARGO_HOME} ${TMP_DIR} ${WORKDIR} \
    && echo 'Done'

# Expose the application port
EXPOSE 3000

#### DEVELOPMENT
FROM foundation as development

ENV NODE_ENV=development 

ENTRYPOINT []

#### PRODUCTION
FROM foundation as production

ENV NODE_ENV=production

COPY --chown=node:node package.json tsconfig.json tsconfig.build.json pnpm-lock*.yaml ./

RUN echo 'Installing node dependencies' \
    && pnpm install \
    && echo 'Done'

COPY --chown=node:node . .


RUN echo 'Building the project' \
    && pnpm run build \
    && echo 'Done'

ENTRYPOINT []

CMD ["pnpm", "run", "start:prod"]