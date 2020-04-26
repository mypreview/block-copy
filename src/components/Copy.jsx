/**
 * External dependencies
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
const { withSpokenMessages, ClipboardButton } = wp.components;

export default compose(
	applyWithSelect,
	applyWithDispatch,
	withSpokenMessages
)(
	class Copy extends Component {
		getSelection() {
			const { getSelectedBlock, getSelectedBlockCount } = this.props;

			if ( 1 === getSelectedBlockCount ) {
				return serialize( getSelectedBlock );
			}

			const getMultiSelectedBlocks = select( 'core/block-editor' ).getMultiSelectedBlocks();

			if ( size( getMultiSelectedBlocks ) > 0 ) {
				return serialize( getMultiSelectedBlocks );
			}
		}

		render() {
			const { onCopy, getSelectedBlock } = this.props,
				getMultiSelectedBlocks = select( 'core/block-editor' ).getMultiSelectedBlocks(),
				numBlocks = size( getMultiSelectedBlocks );

			if ( ! getSelectedBlock && numBlocks < 1 ) {
				return false;
			}

			return (
				<Fragment>
					<PluginBlockSettingsMenuItem
						icon={ icon }
						label={
							<div
								style={ {
									width: 'calc(100% + 21px)',
									display: 'inline-grid',
									margin: '0 -30px',
								} }
							>
								<ClipboardButton
									onCopy={ onCopy }
									text={ this.getSelection() }
									style={ {
										color: 'inherit',
										background: 'transparent',
										height: 'auto',
										paddingLeft: '30px',
										boxShadow: 'none',
										width: '100%',
									} }
								>
									{ /* translators: %s: number of blocks selected. */
									sprintf(
										_n( 'Copy Block', 'Copy %s Blocks', numBlocks + 1, 'block-copy' ),
										numBlocks
									) }
								</ClipboardButton>
							</div>
						}
						onClick={ () => {} }
					></PluginBlockSettingsMenuItem>
				</Fragment>
			);
		}
	}
);
