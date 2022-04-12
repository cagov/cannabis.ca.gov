#!/bin/sh
git fetch
git checkout test
git pull
git checkout test-staging
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
git checkout test-staging src/templates/_data
git checkout test-staging src/templates/wordpress/menu
git checkout test-staging src/templates/wordpress/pages
git checkout test-staging src/templates/wordpress/posts
git checkout test-staging src/templates/wordpress/redirects
git checkout test-staging src/wordpress-media
git checkout test-staging src/sh
git checkout test-staging odi-publishing
git checkout test-staging .github/workflows
#git commit -m "Selective merge: test into test-staging"