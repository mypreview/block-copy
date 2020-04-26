/**
 * External dependencies
 */
const { withSelect } = wp.data;

/**
 * Generate block data.
 */
const applyWithSelect = withSelect( ( select ) => {
	const { getSelectedBlock, getSelectedBlockCount } = select( 'core/block-editor' );

	if ( ! getSelectedBlock() ) return {};

	return {
		getSelectedBlock: getSelectedBlock(),
		getSelectedBlockCount: getSelectedBlockCount(),
	};
} );

export default applyWithSelect;
