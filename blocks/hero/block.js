/**
 * CAGov hero
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
	var MediaUpload = editor.MediaUpload;

	blocks.registerBlockType( 'cagov/hero', {
		title: __( 'CAGov: hero', 'cagov-design-system' ),
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
			},
			buttontext: {
				type: 'array',
				source: 'children',
				selector: 'a',
			},
			mediaID: {
				type: 'number',
			},
			mediaURL: {
				type: 'string',
				source: 'attribute',
				selector: 'img',
				attribute: 'src',
			}
		},
		example: {
			attributes: {
				title: __( 'hero title', 'cagov-design-system' ),
				body: __( 'hero body', 'cagov-design-system' ),
				buttontext: __( 'hero button text', 'cagov-design-system' ),
				mediaURL: 'http://www.fillmurray.com/720/240',
			}
		},
		edit: function( props ) {
			var attributes = props.attributes;
			var onSelectImage = function( media ) {
				return props.setAttributes( {
					mediaURL: media.url,
					mediaID: media.id,
				} );
			};
			return el('div', { className: 'cagov-with-sidebar cagov-with-sidebar-left cagov-featured-section cagov-border' },
				el('div', {},
					el('div', { className: 'cagov-stack cagov-p-2 cagov-featured-sidebar' },
						el( RichText, {
							tagName: 'h3',
							inline: true,
							placeholder: __(
								'Write hero title…',
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
								'Write hero body',
								'cagov-design-system'
							),
							value: attributes.body,
							onChange: function( value ) {
								props.setAttributes( { body: value } );
							},
						} ),
						el( RichText, {
							tagName: 'a',
							className: 'cagov-action-link',
							inline: true,
							placeholder: __(
								'Write button text',
								'cagov-design-system'
							),
							value: attributes.buttontext,
							onChange: function( value ) {
								props.setAttributes( { buttontext: value } );
							},
						} )
					),
					el('div', {  },
						el( MediaUpload, {
							onSelect: onSelectImage,
							allowedTypes: 'image',
							value: attributes.mediaID,
							render: function( obj ) {
								return el(
									components.Button,
									{
										className: attributes.mediaID
											? 'image-button'
											: 'button button-large',
										onClick: obj.open,
									},
									! attributes.mediaID
										? __( 'Upload Image', 'cagov-design-system' )
										: el( 'img', { src: attributes.mediaURL, className: 'cagov-featured-image', } )
								);
							},
						} )
						/*el('img', { className: 'cagov-featured-image', src: 'http://www.fillmurray.com/720/240' },
						),*/
					),
				),
			);
		},
		save: function(props) {
			var attributes = props.attributes;
			return el('div', { className: 'cagov-with-sidebar cagov-with-sidebar-left cagov-featured-section cagov-border' },
				el('div', {},
					el('div', { className: 'cagov-stack cagov-p-2 cagov-featured-sidebar' },
						{ className: 'cagov-hero cagov-stack' },
						el( RichText.Content, {
							tagName: 'h3',
							value: attributes.title,
						} ),
						el( RichText.Content, {
							tagName: 'p',
							value: attributes.body,
						} ),
						el( RichText.Content, {
							tagName: 'a',
							className: 'cagov-action-link',
							value: attributes.buttontext,
						} )
					),
					attributes.mediaURL && el('div', {  },
						el('img', { className: 'cagov-featured-image', src: attributes.mediaURL  },
						),
					),
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
