FROM postgres:15.5-bookworm

ENV PGDATA=/mnt/pgdata \
    PGTAP_VERSION=1.3.1

RUN echo 'Installing extra dependencies' \
    && apt-get -qq update \
    && apt-get -qq --assume-yes --no-install-recommends install \
        build-essential \
        ca-certificates \
        git \
        perl \
        postgresql-server-dev-15 \
    && echo 'Cleaning up package manager cache' \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /var/cache/apt

RUN echo 'Installing pgTAP extension' \
    && git clone --quiet https://github.com/theory/pgtap.git \
    && cd pgtap \
    && git checkout --quiet "v${PGTAP_VERSION}" \
    && cpan TAP::Parser::SourceHandler::pgTAP \
    && make -s \
    && make -s install \
    && echo 'pgTAP extension installed'

RUN echo 'Activating pgTAP extension' \
    && printf 'CREATE EXTENSION IF NOT EXISTS pgtap;\n' > /docker-entrypoint-initdb.d/activate-pgtap.sql
