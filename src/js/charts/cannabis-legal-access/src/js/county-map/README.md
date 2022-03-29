# County Map Chart

import { Meta } from '@storybook/addon-docs/blocks';
import Diagram_Intro from './../assets/screenshot-original-map.png';

<Meta title="@cagov/county-map/docs" />

<style>{`
  .content {
    margin: 50px;
  }
  .medium-image {
    max-width: 550px;
  }
`}</style>

# `CaGovCountyMap`

* Version: 2.0.0
* Status: Prototype / Draft

## Goal
Render a basic d3 map of California with some data highlighted.

This is based on the Tier Status Maps used on the covid19.ca.cov [State Dashboard](https://covid19.ca.gov/state-dashboard) and [Safer Economy](https://covid19.ca.gov/safer-economy) page.

Learn more about [this project](https://cagov.github.io/covid19.ca.gov-site-handbook/tech)


### Example
For this example, we will start to recreate this map in d3.

D3 will render an interactive SVG graphic that is:

* light-weight
* loads fast
* allows translated legends 
* used web-based accessibility features
* works on mobile devices.

### Main Steps

1. Add d3 library. [Learn more about D3]()
2. Get county boundaries data as topoJSON. County boundaries come from
3. Connect highlighted sample data to color the map regions. Our sample data will be the current tier assignments across all California counties for January 12, 2021. For the most up to date information, please refer to https://covid19.ca.gov/safer-economy#county-status.
4. Add a chart legend in three languages: English, Spanish & Tagalog/Filipino language. In January 2021, these were the top three languages requested by people seeking information about COVID-19 on covid19.ca.gov. covid19.ca.gov supports 7 languages, but for the purposes of learning d3 today without getting overwhelmed, we will focus on the top 3 & you will see how to extend the chart to support all the language translations you need.

<div className="content">
</div>
