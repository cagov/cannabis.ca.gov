/**
 * CAGov BLOCK TEMPLATE
 *
 */
 ( function( blocks, editor, i18n, element, components, _ ) {
	var __ = i18n.__;
	var el = element.createElement;
	var RichText = editor.RichText;

	blocks.registerBlockType( 'cagov/template', {
		title: __( 'CAGov: Card', 'cagov-design-system' ),
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
				title: __( 'Card title', 'cagov-design-system' ),
				body: __( 'Card body', 'cagov-design-system' )
			}
		},
		edit: function( props ) {
			var attributes = props.attributes;

			return el(
				'div',
				{ className: 'cagov-template cagov-stack' },
				el( RichText, {
					tagName: 'h3',
					inline: true,
					placeholder: __(
						'Write template title…',
						'cagov-design-system'
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
						'Write template body',
						'cagov-design-system'
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
				{ className: 'cagov-template cagov-stack' },
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
