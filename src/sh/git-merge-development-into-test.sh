#!/bin/sh
git fetch
git checkout development
git pull
git checkout test
git pull
git merge --no-ff --no-commit development
# git restore --source=HEAD --staged --worktree -- \ 
#     src/templates/_data \ 
#     src/templates/wordpress/menu \ 
#     src/templates/wordpress/pages \ 
#     src/templates/wordpress/posts \ 
#     src/templates/wordpress/redirects \ 
#     src/templates/wordpress-media \ 
#     odi-publishing
# Also do a checkout to fully prevent any content merges
git checkout development src/templates/_data \ 
    src/templates/wordpress/menu \ 
    src/templates/wordpress/pages \ 
    src/templates/wordpress/posts \ 
    src/templates/wordpress/redirects \ 
    src/templates/wordpress-media \ 
    src/sh \ 
    odi-publishing \ 
    .github/workflows
#git commit -m "Selective merge: development into test"