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

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function mh_box_mh_box_block_init() {
	register_block_type( __DIR__ . '/build', array(
		'render_callback' => 'mh_box_shortcode',
	) );
}
add_action( 'init', 'mh_box_mh_box_block_init' );

function mh_box_shortcode( $attributes, $content ) {
	ob_start();
	echo '<pre>';
	print_r($attributes);
	echo '</pre>';
	print_r($content);
	$title = $attributes['title'];
	$description = $attributes['description'];

	if ( isset( $attributes['boxBorder']['width'], $attributes['boxBorder']['style'], $attributes['boxBorder']['color'] ) ) {
		$border = $attributes['boxBorder']['width'] . ' ' . $attributes['boxBorder']['style'] . ' ' . $attributes['boxBorder']['color'];
	}
	?>
	<div 
	style="background-color:<?php echo esc_html( $attributes['boxBG'] ); ?>; padding:<?php echo $attributes['boxPadding']['top'] . ' ' . $attributes['boxPadding']['right'] . ' ' . $attributes['boxPadding']['bottom'] . ' ' . $attributes['boxPadding']['left']; ?>; border: <?php echo esc_html( $border ); ?>"
	>
		<div class="text-wrapper">
			<h2 style="color:<?php echo esc_html( $attributes['titleColor'] ); ?>; text-align: <?php echo esc_html( $attributes['titleAlign'] ); ?>"><?php echo $title; ?></h2>
			<p  style="color:<?php echo esc_html( $attributes['descriptionColor'] ); ?>"><?php echo esc_html( $description ); ?></p>
		</div>
	</div>
	<?php
	$output = ob_get_contents();
	ob_end_clean();
	return $output;
}
