Notes:

- update src/js/charts/cannabis-local-ordinances/adr/03-autocomplete.md
- credit w3.com
- dynamically generate place list
- wire selects to map/table actions

Operate:

```diff

# src/templates/wordpress/pages/where-cannabis-business-is-legal-in-california.html

+ <cagov-places></cagov-places>


```

- Delete src/templates/wordpress/posts for a faster build.
- Delete src/js/charts/cannabis-local-ordinances
