#!/bin/bash

set -Eeuo pipefail

docker compose exec db /bin/bash -c \
  'pg_prove -d postgres://postgres:postgres@db:5432/postgres --verbose --normalize /mnt/spec/*.spec.sql /mnt/spec/**/*.spec.sql'
