# 3. Autocomplete/combobox

Date: 5/23/2022

## Status

Introducing first prototype of an accessible, performant, adaptation of the W3 combo-box, with a couple of alterations to help it work for an interactive data viz web component.

## Context
For the Cannabis Local Ordinances data visualization, we needed a reliable, fully and definitively accessible combo-box/autocomplete solution for one of the map filters. This did not exist in the CA Design System. @chachasikes tried the USWDS combo-box. Ran into some issues with its highly integrated & abstracted event system, though the pure components code seemed promising. The covid19 site had included an autocomplete feature on the What's Open search, but in our deep stress-testing of this components, we noticed some accessibility issues that Chach could not fully replicate and debug with the accessibility debugging tools the aria-tags with enough rapid confidence to be able to re-write that component in during the peak of the pandemic. Zakiya shared that SF.gov used our covid19 combo-box as a reference. Chach kept a detailed diary/notebook of trying the USWDS components under the stress of a government deadline.

Since this would be a really helpful project for the Design System to include (and understand what the best autocomplete web component could be), and because the default HTML select option worked great (though it caused a managable and not-entirely horrible UX issue) that we could take the time to resolve completely, correctly, sensibly - we decided to invest some energy to get a great solution in place and sort this out for web components.

Zakiya shared in the Office of Digital Innovation's Engineering team's weekly Codeshare how she reviewed a variety of components, and introduced this component to this repo in the prior pull request. Our process includes stress-testing component code on production sites, so we will be QA testing this component to try to include it in an update. It looks good already and has passed our teams initial code reviews and checks (especially accessibilty, translatability, performance.)

See issue #484 for more details.

## Decision

Using [W3.org Combobox With Both List and Inline Autocomplete Example](https://www.w3.org/TR/wai-aria-practices-1.1/examples/combobox/aria1.0pattern/combobox-autocomplete-both.html) as a basis for the places select.

## Consequences
Process note: On launch, will set calendar reminders for the team to review this component quarterly or every six months for an update on what the consequences have been. Eventually someone will write a consequences file about what happened to this component. Hello future person. Please find @chachasikes, @zakiya, @aaronhans and let us know what happened!👋