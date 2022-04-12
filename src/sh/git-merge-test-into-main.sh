#!/bin/sh
git fetch
git checkout test
git pull
git checkout main
git pull
git merge --no-ff --no-commit test
# git restore --source=HEAD --staged --worktree -- \ 
#     src/templates/_data \ 
#     src/templates/wordpress/menu \ 
#     src/templates/wordpress/pages \ 
#     src/templates/wordpress/posts \ 
#     src/templates/wordpress/redirects \ 
#     src/wordpress-media \ 
#     odi-publishing
# Also do a checkout to fully prevent any content merges
git checkout main src/templates/_data
git checkout main src/templates/wordpress/menu
git checkout main src/templates/wordpress/pages
git checkout main src/templates/wordpress/posts
git checkout main src/templates/wordpress/redirects
git checkout main src/wordpress-media
# git checkout main src/sh
# git checkout main odi-publishing
# git checkout main .github/workflows
#git commit -m "Selective merge: test into main"