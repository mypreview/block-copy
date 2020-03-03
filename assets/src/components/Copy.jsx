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
const { _x } = wp.i18n;
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
			getMultiSelectedBlocks = select( 'core/block-editor' ).getMultiSelectedBlocks();

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
								{ _x( 'Copy Block', 'button label', 'block-copy' ) }
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