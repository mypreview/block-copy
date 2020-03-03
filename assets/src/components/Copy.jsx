/**
 * Internal dependencies
 */
import size from 'lodash/size';
import icon from '../utils/icon';
import applyWithSelect from '../utils/withSelect';
import applyWithDispatch from '../utils/withDispatch';

/**
 * WordPress dependencies
 */
const { _n, sprintf } = wp.i18n;
const { select } = wp.data;
const { compose } = wp.compose;
const { serialize } = wp.blocks;
const { Fragment, Component } = wp.element;
const { PluginBlockSettingsMenuItem } = wp.editPost;
const { withSpokenMessages, ClipboardButton, Dashicon } = wp.components;

export default compose(
	applyWithSelect,
	applyWithDispatch,
	withSpokenMessages
)(
	class Copy extends Component {
		constructor( props ) {
			super( ...arguments );
			this.getSelection = this.getSelection.bind( this );
		}

		getSelection() {
			const {
				getSelectedBlock,
				getSelectedBlockCount
			} = this.props,
			getMultiSelectedBlocks = select( 'core/block-editor' ).getMultiSelectedBlocks();

			if ( 1 === getSelectedBlockCount ) return serialize( getSelectedBlock );

			if ( size( getMultiSelectedBlocks ) > 0 ) return serialize( getMultiSelectedBlocks );
		}

		render() {
			const {
				onCopy,
				getSelectedBlock
			} = this.props,
			getMultiSelectedBlocks = select( 'core/block-editor' ).getMultiSelectedBlocks(),
			numBlocks = size( getMultiSelectedBlocks ) + 1;

			if ( ! getSelectedBlock && size( getMultiSelectedBlocks ) < 1 ) return false;

			return (
				<Fragment>
					<PluginBlockSettingsMenuItem
						icon={ icon }
						label={
							<ClipboardButton
								onCopy={ onCopy }
								text={ this.getSelection() }
								style={ { 
									paddingLeft: '0'
								} }
							>
								{ 
									/* translators: %s: number of blocks selected. */
									sprintf( _n( 'Copy Block', 'Copy %s Blocks', numBlocks, 'block-copy' ), numBlocks ) 
								}
							</ClipboardButton>
						}
						onClick={ () => {} }
					>
					</PluginBlockSettingsMenuItem>
				</Fragment>
			);
		}
	}
);