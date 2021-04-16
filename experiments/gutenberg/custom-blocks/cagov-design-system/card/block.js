/**
 * CAGov card
 *
 * Simple block, renders and saves the same content without interactivity.
 *
 * Using inline styles - no external stylesheet needed.  Not recommended
 * because all of these styles will appear in `post_content`.
 */
 ( function( blocks, editor, i18n, element, components, _ ) {
	var __ = i18n.__;
	var el = element.createElement;
	var RichText = editor.RichText;

	blocks.registerBlockType( 'cagov/card', {
		title: __( 'CAGov: Card', 'gutenberg-examples' ),
		icon: 'universal-access-alt',
		category: 'layout',
		attributes: {
			title: {
				type: 'array',
				source: 'children',
				selector: 'h3',
			},
			body: {
				type: 'array',
				source: 'children',
				selector: 'p',
			}
		},
		example: {
			attributes: {
				title: __( 'Card title', 'gutenberg-examples' ),
				body: __( 'Card body', 'gutenberg-examples' )
			}
		},
		edit: function( props ) {
			var attributes = props.attributes;

			return el(
				'div',
				{ className: 'cagov-card cagov-stack' },
				el( RichText, {
					tagName: 'h3',
					inline: true,
					placeholder: __(
						'Write card title…',
						'gutenberg-examples'
					),
					value: attributes.title,
					onChange: function( value ) {
						props.setAttributes( { title: value } );
					},
				} ),
				el( RichText, {
					tagName: 'p',
					inline: true,
					placeholder: __(
						'Write card body',
						'gutenberg-examples'
					),
					value: attributes.body,
					onChange: function( value ) {
						props.setAttributes( { body: value } );
					},
				} )
			);
		},
		save: function(props) {
			var attributes = props.attributes;
			return el(
				'div',
				{ className: 'cagov-card cagov-stack' },
				el( RichText.Content, {
					tagName: 'h3',
					value: attributes.title,
				} ),
				el( RichText.Content, {
					tagName: 'p',
					value: attributes.body,
				} )
			);
		},
	} );
} )(
	window.wp.blocks,
	window.wp.editor,
	window.wp.i18n,
	window.wp.element,
	window.wp.components,
	window._
);
