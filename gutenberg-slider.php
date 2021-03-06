<?php
/**
 * Plugin Name:     Gutenberg slider
 * Description:     A simple slider block
 * Version:         0.1.0
 * Author:          László Madarász
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     ov
 *
 * @package         ov
 */


function ov_first_block_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the Gutenberg slider block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'ov-slider-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'ov-slider-block-editor', 'ov' );

	$editor_css = 'build/index.css';
	wp_register_style(
		'ov-slider-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'ov-slider-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'ov/slide', array(
		'editor_script' => 'ov-slider-block-editor',
		'editor_style'  => 'ov-slider-block-editor',
		'style'         => 'ov-slider-block',
	) );

	register_block_type( 'ov/slider', array(
		'editor_script' => 'ov-slider-block-editor',
		'editor_style'  => 'ov-slider-block-editor',
		'style'         => 'ov-slider-block',
	) );
}
add_action( 'init', 'ov_first_block_block_init' );

function ov_first_block_enqueue_scripts() {
	$slider_controller_script = '/script/sliderController.js';
	wp_enqueue_script( 'ov-slider-slider-controller', plugins_url( $slider_controller_script, __FILE__ ), array( 'jquery' ));
}

add_action( 'wp_enqueue_scripts', 'ov_first_block_enqueue_scripts' );
