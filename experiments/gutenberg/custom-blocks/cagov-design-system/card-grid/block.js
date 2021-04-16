( function( blocks, element, blockEditor ) {
	var el = element.createElement;
	var InnerBlocks = blockEditor.InnerBlocks;
	const ALLOWED_BLOCKS = [ 'cagov/card' ];
	blocks.registerBlockType( 'cagov/card-grid', {
		title: 'CAGov card grid',
		category: 'layout',
		edit: function( props ) {
			return el(
				'div',
				{ className: 'cagov-grid' },
				el( InnerBlocks,
					{
						orientation:"horizontal",
						allowedBlocks: ALLOWED_BLOCKS
					}
				)
			);
		},
		save: function( props ) {
			return el(
				'div',
				{ className: 'cagov-grid' },
				el( InnerBlocks.Content )
			);
		},
	} );
} )( window.wp.blocks, window.wp.element, window.wp.blockEditor );
