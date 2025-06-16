#!/bin/bash
cd /home/kavia/workspace/code-generation/webtictactoe-45573-66133f93/webtic_tac_toe
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

