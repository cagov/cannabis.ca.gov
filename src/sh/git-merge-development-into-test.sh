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
git checkout development src/templates/_data
git checkout development src/templates/wordpress/menu
git checkout development src/templates/wordpress/pages
git checkout development src/templates/wordpress/posts
git checkout development src/templates/wordpress/redirects
git checkout development src/templates/wordpress-media
git checkout development src/sh
git checkout development odi-publishing
git checkout development .github/workflows
#git commit -m "Selective merge: development into test"