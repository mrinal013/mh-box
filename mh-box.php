<?php
/**
 * Plugin Name:       Mh Box
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       mh-box
 *
 * @package           create-block
 */

 // Exit if request is outside from WordPress
if ( ! defined( 'ABSPATH' ) ) {
	header( 'Status: 403 Forbidden' );
	header( 'HTTP/1.1 403 Forbidden' );
	exit;
}

if ( ! class_exists( 'MH_Blocks' ) ) {

	final class MH_Blocks {
		protected static $instance = null;

		/**
		 * Initialize the plugin
		 * @return \MH_Blocks
		 */
		public static function init() {
			if( is_null( self::$instance ) ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 * Constructor
		 * @return void
		 */
		public function __construct() {
			add_action( 'init', array( $this, 'mh_box_mh_box_block_init' ) );
			add_shortcode( 'mh_box', array( $this, 'mh_box_shortcode_callback' ) );
		}

		/**
		 * Registers the block using the metadata loaded from the `block.json` file.
		 * Behind the scenes, it registers also all assets so they can be enqueued
		 * through the block editor in the corresponding context.
		 *
		 * @see https://developer.wordpress.org/reference/functions/register_block_type/
		 */
		function mh_box_mh_box_block_init() {
			register_block_type( __DIR__ . '/build', array(
				'render_callback' => array( $this, 'mh_box_render' ),
			) );
		}
		
		
		function mh_box_render( $attributes, $content ) {
			
			$title = isset( $attributes['title'] ) ? $attributes['title'] : '';
			$description = isset( $attributes['description'] ) ? $attributes['description'] : '';
			
			if ( isset( $attributes['boxPadding']['top'], $attributes['boxPadding']['right'], $attributes['boxPadding']['bottom'], $attributes['boxPadding']['left'] ) ) {
				$padding = $attributes['boxPadding']['top'] . ' ' . $attributes['boxPadding']['right'] . ' ' . $attributes['boxPadding']['bottom'] . ' ' . $attributes['boxPadding']['left'];
			}
			if ( isset( $attributes['boxBorder']['width'], $attributes['boxBorder']['style'], $attributes['boxBorder']['color'] ) ) {
				$border = $attributes['boxBorder']['width'] . ' ' . $attributes['boxBorder']['style'] . ' ' . $attributes['boxBorder']['color'];
			}
		
			$box_wrapper_style = 'background-color:' . esc_html( $attributes['boxBG'] ) . '; padding:' . $padding . '; border:' . $border;
		
			$title_color = isset( $attributes['titleColor'] ) ? $attributes['titleColor'] : '';
			$title_style = 'color:' . $title_color . ';';
		
			$description_color = isset( $attributes['descriptionColor'] ) ? $attributes['descriptionColor'] : '';
			$description_style = 'color:' . $description_color . ';';
		
			return "[mh_box title='" . $title . "' description='" . $description . "' box_style='" . $box_wrapper_style . "' title_style='" . $title_style . "' description_style='" . $description_style . "']";
		
		}
		
		
		function mh_box_shortcode_callback( $attr ) {
			ob_start();
			
			$title = $attr['title'];
			$description = $attr['description'];
			$box_style = $attr['box_style'];
			$title_style = $attr['title_style'];
			$description_style = $attr['description_style'];
			?>
			<div style="<?php echo $box_style; ?>">
				<div class="text-wrapper">
					<h2 style="<?php echo $title_style; ?>"><?php echo $title; ?></h2>
					<p style="<?php echo $description_style; ?>"><?php echo $description; ?></p>
				</div>
			</div>
			<?php
			return ob_get_clean();
		}
	}
}

/**
 * Initialize the plugin
 * @return \MH_Blocks
 */
function mh_blocks_init() {
	return MH_Blocks::init();
}

// kick-off the plugin
mh_blocks_init();
