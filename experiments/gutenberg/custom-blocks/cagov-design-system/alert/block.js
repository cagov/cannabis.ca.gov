/**
 * CAGov alert
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

	blocks.registerBlockType( 'cagov/alert', {
		title: __( 'CAGov: Alert', 'gutenberg-examples' ),
		icon: 'warning',
		category: 'layout',
		attributes: {
			title: {
				type: 'array',
				source: 'children',
				selector: 'p',
			},
			body: {
				type: 'array',
				source: 'children',
				selector: 'p',
			},
			button: {
				type: 'array',
				source: 'children',
				selector: 'p',
			},
		},
		example: {
			attributes: {
				title: __( 'Alert title', 'gutenberg-examples' ),
				body: __( 'Alert body', 'gutenberg-examples' ),
				button: __( 'Alert button', 'gutenberg-examples' ),
			}
		},
		edit: function( props ) {
			var attributes = props.attributes;

			return el(
				'div',
				{ className: 'cagov-alert cagov-stack full-bleed' },
				el(
					'div',
					{ className: 'container' },
				el( RichText, {
					tagName: 'p',
					className: 'alert-title',
					inline: true,
					placeholder: __(
						'Write alert title…',
						'gutenberg-examples'
					),
					value: attributes.title,
					onChange: function( value ) {
						props.setAttributes( { title: value } );
					},
				} ),
				el( RichText, {
					tagName: 'p',
					className: 'alert-text',
					inline: true,
					placeholder: __(
						'Write alert body',
						'gutenberg-examples'
					),
					value: attributes.body,
					onChange: function( value ) {
						props.setAttributes( { body: value } );
					},
				} ),
				el( RichText, {
					tagName: 'p',
					className: 'button-white',
					inline: true,
					placeholder: __(
						'Write alert button text',
						'gutenberg-examples'
					),
					value: attributes.button,
					onChange: function( value ) {
						props.setAttributes( { button: value } );
					},
				} ),
			),
			);
		},
		save: function(props) {
			var attributes = props.attributes;
			return el(
				'div',
				{ className: 'cagov-alert cagov-stack full-bleed' },
				el(
					'div',
					{ className: 'container' },
				el( RichText.Content, {
					tagName: 'p',
					className: 'alert-title',
					value: attributes.title,
				} ),
				el( RichText.Content, {
					tagName: 'p',
					className: 'alert-text',
					value: attributes.body,
				} ),
				el( RichText.Content, {
					tagName: 'p',
					className: 'button-white',
					value: attributes.button,
				} ),
			),
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
