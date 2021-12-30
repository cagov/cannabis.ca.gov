#!/bin/sh
git fetch
git checkout main
git pull
git checkout development
git pull
git merge --no-ff --no-commit main
# git restore --source=HEAD --staged --worktree -- \ 
#     src/templates/_data \ 
#     src/templates/wordpress/menu \ 
#     src/templates/wordpress/pages \ 
#     src/templates/wordpress/posts \ 
#     src/templates/wordpress/redirects \ 
#     src/templates/wordpress-media \ 
#     odi-publishing
# Also do a checkout to fully prevent any content merges
git checkout main src/templates/_data \ 
    src/templates/wordpress/menu \ 
    src/templates/wordpress/pages \ 
    src/templates/wordpress/posts \ 
    src/templates/wordpress/redirects \ 
    src/templates/wordpress-media \ 
    odi-publishing \ 
    .github/workflows   
#git commit -m "Selective merge: main into development"