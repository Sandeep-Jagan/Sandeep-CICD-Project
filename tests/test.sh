#!/bin/bash

echo "Running application tests..."

if [ ! -f "src/index.html" ]; then
    echo "ERROR: index.html not found"
    exit 1
fi

if [ ! -f "src/style.css" ]; then
    echo "ERROR: style.css not found"
    exit 1
fi

if [ ! -f "src/script.js" ]; then
    echo "ERROR: script.js not found"
    exit 1
fi

grep -q "<title>Github CI/CD Demo</title>" src/index.html

if [ $? -ne 0 ]; then
    echo "ERROR: Application title not found"
    exit 1
fi

echo "All tests passed successfully."