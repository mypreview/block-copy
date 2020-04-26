<?php
/**
 * The `Block Copy` bootstrap file.
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * Block Copy is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * @link                    https://www.mypreview.one
 * @since                   1.0.1
 * @package                 block-copy
 * @author                  MyPreview (Github: @mahdiyazdani, @mypreview)
 * @copyright               © 2015 - 2020 MyPreview. All Rights Reserved.
 *
 * @wordpress-plugin
 * Plugin Name:             Block Copy
 * Plugin URI:              https://www.mypreview.one
 * Description:             A Gutenberg editor extension that provides a simple GUI based solution to copy a single or number of blocks to the clipboard.
 * Version:                 1.0.1
 * Author:                  MyPreview
 * Author URI:              https://www.upwork.com/o/profiles/users/_~016ad17ad3fc5cce94
 * License:                 GPL-3.0
 * License URI:             http://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain:             block-copy
 * Domain Path:             /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	wp_die();
} // End If Statement

/**
 * Gets the path to a plugin file or directory.
 *
 * @see     https://codex.wordpress.org/Function_Reference/plugin_basename
 * @see     http://php.net/manual/en/language.constants.predefined.php
 */
$block_copy_plugin_data = get_file_data(
	__FILE__,
	array(
		'author_uri' => 'Author URI',
		'version'    => 'Version',
	),
	'plugin'
);
define( 'BLOCK_COPY_VERSION', $block_copy_plugin_data['version'] );
define( 'BLOCK_COPY_AUTHOR_URI', $block_copy_plugin_data['author_uri'] );
define( 'BLOCK_COPY_SLUG', 'block-copy' );
define( 'BLOCK_COPY_FILE', __FILE__ );
define( 'BLOCK_COPY_BASENAME', basename( BLOCK_COPY_FILE ) );
define( 'BLOCK_COPY_PLUGIN_BASENAME', plugin_basename( BLOCK_COPY_FILE ) );
define( 'BLOCK_COPY_DIR_URL', plugin_dir_url( BLOCK_COPY_FILE ) );
define( 'BLOCK_COPY_DIR_PATH', plugin_dir_path( BLOCK_COPY_FILE ) );

if ( ! class_exists( 'Block_Copy' ) ) :

	/**
	 * The Block Copy - Class
	 */
	final class Block_Copy {

		/**
		 * Instance of the class.
		 *
		 * @var  object   $instance
		 */
		private static $instance = null;

		/**
		 * Main `Block_Copy` instance
		 * Ensures only one instance of `Block_Copy` is loaded or can be loaded.
		 *
		 * @access  public
		 * @return  instance
		 */
		public static function instance() {

			if ( is_null( self::$instance ) ) {
				self::$instance = new self();
			} // End If Statement

			return self::$instance;

		}

		/**
		 * Setup class.
		 *
		 * @access  protected
		 * @return  void
		 */
		protected function __construct() {

			add_action( 'init', array( $this, 'textdomain' ) );
			add_action( 'enqueue_block_editor_assets', array( $this, 'editor_enqueue' ) );
			add_filter( sprintf( 'plugin_action_links_%s', BLOCK_COPY_PLUGIN_BASENAME ), array( $this, 'additional_links' ) );

		}

		/**
		 * Cloning instances of this class is forbidden.
		 *
		 * @access  protected
		 * @return  void
		 */
		protected function __clone() {

			_doing_it_wrong( __FUNCTION__, esc_html_x( 'Cloning instances of this class is forbidden.', 'clone', 'block-copy' ), esc_html( BLOCK_COPY_VERSION ) );

		}

		/**
		 * Unserializing instances of this class is forbidden.
		 *
		 * @access  public
		 * @return  void
		 */
		public function __wakeup() {

			_doing_it_wrong( __FUNCTION__, esc_html_x( 'Unserializing instances of this class is forbidden.', 'wakeup', 'block-copy' ), esc_html( BLOCK_COPY_VERSION ) );

		}

		/**
		 * Load languages file and text domains.
		 * Define the internationalization functionality.
		 *
		 * @access  public
		 * @return  void
		 */
		public function textdomain() {

			load_plugin_textdomain( 'block-copy', false, dirname( dirname( BLOCK_COPY_PLUGIN_BASENAME ) ) . '/languages/' );

		}

		/**
		 * Register the stylesheets and JavaScript for the Gutenberg (editor) side of the site.
		 *
		 * @access   public
		 * @return   void
		 */
		public function editor_enqueue() {

			$script_path       = sprintf( '%sdist/script.js', BLOCK_COPY_DIR_PATH );
			$script_asset_path = sprintf( '%sdist/script.asset.php', BLOCK_COPY_DIR_PATH );
			$script_asset      = file_exists( $script_asset_path ) ? require $script_asset_path : array(
				'dependencies' => array( 'wp-blocks', 'wp-dom-ready', 'lodash' ),
				'version'      => filemtime( $script_path ),
			);
			$script_url        = sprintf( '%sdist/script.js', BLOCK_COPY_DIR_URL );
			// Enqueue the script.
			wp_enqueue_script( BLOCK_COPY_SLUG, $script_url, $script_asset['dependencies'], $script_asset['version'], true );
			wp_set_script_translations( BLOCK_COPY_SLUG, 'block-data-attribute', sprintf( '%s/languages/', BLOCK_COPY_DIR_PATH ) );

		}

		/**
		 * Display additional links in plugins table page.
		 * Filters the list of action links displayed for a specific plugin in the Plugins list table.
		 *
		 * @access  public
		 * @param   array $links      An array of plugin action links.
		 * @return  array   $links
		 */
		public function additional_links( $links ) {

			$plugin_links = array();
			/* translators: 1: Open anchor tag, 2: Close anchor tag. */
			$plugin_links[] = sprintf( _x( '%1$sHire Me!%2$s', 'plugin link', 'block-copy' ), sprintf( '<a href="%s" class="button-link-delete" target="_blank" rel="noopener noreferrer nofollow" title="%s">', esc_url( BLOCK_COPY_AUTHOR_URI ), esc_attr_x( 'Looking for help? Hire Me!', 'upsell', 'block-copy' ) ), '</a>' );

			return array_merge( $plugin_links, $links );

		}

	}
endif;

if ( ! function_exists( 'block_copy_init' ) ) :

	/**
	 * Returns the main instance of Block_Copy to prevent the need to use globals.
	 *
	 * @return  object(class)   Block_Copy::instance
	 */
	function block_copy_init() {
		return Block_Copy::instance();
	}

	block_copy_init();
endif;
