#!/bin/bash

while true; do
  curl -X GET http://localhost:9999/contagem-pessoas \
       -H "Content-Type: application/json"
  echo -e "\n"
  sleep 10
done