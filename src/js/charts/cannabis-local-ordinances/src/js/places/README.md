Notes:

- update src/js/charts/cannabis-local-ordinances/adr/03-autocomplete.md
- credit w3.com
- dynamically generate place list
- wire selects to map/table actions
- be mindful of tooltips losing acess to data on select change.
  - src/js/charts/cannabis-local-ordinances/src/js/county-map/index.js#L68
- Code pen to parse places from html.
Operate:

```diff

# src/templates/wordpress/pages/where-cannabis-business-is-legal-in-california.html

+ <cagov-places></cagov-places>


```

- Delete src/templates/wordpress/posts for a faster build.
- Delete src/js/charts/cannabis-local-ordinances/src/js/combo-box
