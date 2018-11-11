#!/usr/bin/env bash

function cd_to_root_dir(){
  CURRENT_DIR=`pwd | awk -F/ '{print $NF}'`;

  if [ "$CURRENT_DIR" == "scripts" ]
  then
    cd ..
  fi
}

function throw_if_exception(){
  RETURN_CODE=$?;

  if [ "$RETURN_CODE" != 0 ]; then
    exit $?
  fi
}
