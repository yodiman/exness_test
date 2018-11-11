#!/usr/bin/env bash
echo "$OSTYPE"

SCRIPT_DIR="$(dirname "$0")"
if [[ "$OSTYPE" == "msys" ]]; then
  SCRIPT_DIR="$SCRIPT_DIR/scripts"
fi

echo $SCRIPT_DIR

source $SCRIPT_DIR/tools.sh
cd_to_root_dir

rm -f ".env"
cp "./env/.env.$1.example" "./env/.env"
