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
#     src/wordpress-media \ 
#     odi-publishing
# Also do a checkout to fully prevent any content merges
git checkout test src/templates/_data
git checkout test src/templates/wordpress/menu
git checkout test src/templates/wordpress/pages
git checkout test src/templates/wordpress/posts
git checkout test src/templates/wordpress/redirects
git checkout test src/wordpress-media
git checkout test src/sh
git checkout test odi-publishing
git checkout test .github/workflows
#git commit -m "Selective merge: development into test"