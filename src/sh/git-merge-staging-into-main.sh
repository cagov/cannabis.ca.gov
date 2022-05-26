#!/bin/sh
git fetch
git checkout staging
git pull
git checkout main
git pull
git merge --no-ff --no-commit staging
# git restore --source=HEAD --staged --worktree -- \ 
#     src/templates/_data \ 
#     src/templates/wordpress/menu \ 
#     src/templates/wordpress/pages \ 
#     src/templates/wordpress/posts \ 
#     src/templates/wordpress/redirects \ 
#     src/wordpress-media \ 
#     odi-publishing
# Also do a checkout to fully prevent any content merges
git checkout staging src/templates/_data
git checkout staging src/templates/wordpress/menu
git checkout staging src/templates/wordpress/pages
git checkout staging src/templates/wordpress/posts
git checkout staging src/templates/wordpress/redirects
git checkout staging src/wordpress-media
git checkout staging src/sh
git checkout staging odi-publishing
git checkout staging .github/workflows
#git commit -m "Selective merge: staging into main"