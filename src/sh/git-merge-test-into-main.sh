#!/bin/sh
git fetch
git checkout test
git pull
git checkout main
git pull
git merge --no-ff --no-commit test
git restore --source=HEAD --staged --worktree -- \ 
    src/templates/_data \ 
    src/templates/wordpress/menu \ 
    src/templates/wordpress/pages \ 
    src/templates/wordpress/posts \ 
    src/templates/wordpress/redirects \ 
    src/templates/wordpress-media \ 
    odi-publishing
# Also do a checkout to fully prevent any content merges
git checkout src/templates/_data \ 
    src/templates/wordpress/menu \ 
    src/templates/wordpress/pages \ 
    src/templates/wordpress/posts \ 
    src/templates/wordpress/redirects \ 
    src/templates/wordpress-media \ 
    odi-publishing
#git commit -m "Selective merge: test into main"