/**
 * Internal dependencies
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
const applyWithDispatch = withDispatch( dispatch => {
    const { 
    	createNotice } = dispatch( 'core/notices' );

    return {
        onCopy() {
			const selectedBlocks = select( 'core/block-editor' ).getMultiSelectedBlocks(),
			numBlocks = size( selectedBlocks ),
			notice = sprintf( _n( 'A single block copied.', '%s blocks copied.', numBlocks, 'block-copy' ), numBlocks );

			createNotice(
				'info',
				notice,
				{
					isDismissible: true,
					type: 'snackbar',
				}
			);
		}
    };
} );

export default applyWithDispatch;