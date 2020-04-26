/**
 * Internal dependencies
 */
import icon from './utils/icon';
import render from './components/Copy.jsx';

/**
 * WordPress dependencies
 */
const { registerPlugin } = wp.plugins;

registerPlugin( 'mypreview-block-copy', {
	icon,
	render,
} );
