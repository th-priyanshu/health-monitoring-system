#!/bin/bash
# A sample check: verify if the package.json exists
if [ -f "package.json" ]; then
    echo "OK"
else
    echo "FAIL"
fi