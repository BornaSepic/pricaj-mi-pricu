#!/bin/bash

set -Eeuo pipefail

./bin/symlink-node-modules.sh

echo 'Installing npm packages'
pnpm install

exec "$@"
