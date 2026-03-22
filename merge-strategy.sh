#!/bin/bash

# This script automates the merging of the backend and Eltilingg branches into the main branch

# Function to merge branches
merge_branches() {
    git checkout main
    git pull origin main

    # Merge backend branch
    git merge backend
    if [ $? -ne 0 ]; then
        echo "Backend merge failed!"
        exit 1
    fi

    # Merge Eltilingg branch
    git merge Eltilingg
    if [ $? -ne 0 ]; then
        echo "Eltilingg merge failed!"
        exit 1
    fi

    # Push changes to remote main branch
    git push origin main
}

# Execute the merging function
merge_branches