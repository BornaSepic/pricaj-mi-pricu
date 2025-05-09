#!/bin/bash

set -Eeuo pipefail

MOUNTED_NODE_MODULES="${TMP_DIR}/node_modules"
APP_NODE_MODULES="${WORKDIR}/node_modules"

if [[ -d $MOUNTED_NODE_MODULES ]]; then
  echo "$MOUNTED_NODE_MODULES folder exists"
else
  mkdir $MOUNTED_NODE_MODULES
fi

if [[ -h $APP_NODE_MODULES ]]; then
  echo "Symbolic link to $MOUNTED_NODE_MODULES already exists"
else
  rm -rfv $APP_NODE_MODULES
  ln -fsv $MOUNTED_NODE_MODULES $WORKDIR
fi

# Sometimes, pnpm removes the target node_modules folder if it's empty
touch "${MOUNTED_NODE_MODULES}/.gitkeep"