## CONTRIBUTORS

### Development flow

#### This repo (combobox-places)

- This code pen was used to parse places from html https://codepen.io/zakiyadrupal/pen/popYmBa.

```bash
cd cannabis.ca.gov/src/js/charts/cannabis-local-ordinances/src/js/combobox-places

# if devving js only
npm run watch:js

# if devving css only
npm run watch:scss

# regenerate template
npm run template

# regenerate css, js, and template
npm run template

```

#### Ordinance map (cannabis-local-ordinances)

```bash
cd cannabis.ca.gov/src/js/charts/cannabis-local-ordinances

# Watch and reload.
npm run start:dev

# Manually copy code from src/js/combobox-places/template.html
# to index.html

# Generate bundle for main site consumption
npm run build:prod
```

#### Site (cannabis.ca.gov)

```bash

cd cannabis.ca.gov

# Use browsersync
npm run build && npm run dev

# Manually copy code from src/js/combobox-places/template.html
# to cannabis.ca.gov/pages/wordpress/pages/where-cannabis-business-is-legal-in-california.html

# urlpath cannabis-laws/where-cannabis-business-is-legal-in-california/
```
