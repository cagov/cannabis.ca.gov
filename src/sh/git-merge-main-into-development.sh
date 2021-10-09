#!/bin/sh
git fetch
git checkout main
git pull
git checkout development
git pull
git merge --no-ff --no-commit main
git restore --source=HEAD --staged --worktree -- \
    wordpress/posts \
    wordpress/pages \
    wordpress/media
    # wordpress/config
git commit -m "Selective merge: main into development"