import { WebComponent } from './../web-component-container';
import { data } from './../data/all-data.js';
export default {
  title: '@cagov/county-map',
  argTypes: {
    // onClick: { action: 'onClick' },
  },
  decorators: []
};

var Template = (args) => WebComponent(args);

export const CountyMapEnglish = Template.bind({});
CountyMapEnglish.storyName = "County Map (English API data)";
CountyMapEnglish.args = {
  // data: data["en"],
  countystatus: data["en"].countystatus.data,
  title: "Hello",
};

// NOTE: These variations currently have English text. Can grab existing translated data if it exists.
export const CountyMapSpanish = Template.bind({});
CountyMapSpanish.storyName = "County Map (Spanish API data)";
CountyMapSpanish.args = {
  // data: data["es"],
  countystatus: data["es"].countystatus.data,
  title: "Hola",
};

// NOTE: These variations currently have English text. Can grab existing translated data if it exists.
export const CountyMapTagalog = Template.bind({});
CountyMapTagalog.storyName = "County Map (Tagalog API data)";
CountyMapTagalog.args = {
  // data: data["tl"],
  countystatus: data["tl"].countystatus.data,
  title: "Kamusta",
};

