These are files that are used on the Flywheel cannabis.ca.gov production site.

The files in use on production are in these folders:
CSS
JS

Follow the version numbering in those folders to iterate a new file. We keep every change that we upload to production versioned here.


The other files here are archival in case we need to pull Aaron or Konstantin back in on the Design System style overlay.

Update process

Go to: https://api.cannabis.ca.gov/wp-admin/admin.php?page=caweb_options
Custom JS
Custom CSS

You can replace the relevant files to test your change fully integrated:
Here is what the CSS looks like.

Click the red X to remove just the file you don't want
Upload a new file
Save changes
At this point the file should update.
Every once it a while the cache may get stuck, in which case, you can add another point version to increment the file.

To update the data viz, get the latest numbered version bundle from: https://github.com/cagov/cannabis.ca.gov/tree/main/src/js/charts/cannabis-local-ordinances/build.
