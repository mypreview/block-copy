/**
 * External dependencies
 */
import size from 'lodash/size';
const { withDispatch, select } = wp.data;

/**
 * WordPress dependencies
 */
const { _n, sprintf } = wp.i18n;

/**
 * Generate block data.
 */
const applyWithDispatch = withDispatch( ( dispatch ) => {
	const { createNotice } = dispatch( 'core/notices' );

	return {
		onCopy() {
			const selectedBlocks = select( 'core/block-editor' ).getMultiSelectedBlocks(),
				numBlocks = size( selectedBlocks ),
				/* translators: %s: number of blocks selected. */
				notice = sprintf(
					_n( 'A single block copied.', '%s blocks copied.', numBlocks + 1, 'block-copy' ),
					numBlocks
				);

			createNotice( 'info', notice, {
				isDismissible: true,
				type: 'snackbar',
			} );
		},
	};
} );

export default applyWithDispatch;
