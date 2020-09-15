
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import './style.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

export const name = 'ov/slider';
export const settings = {
	title: __( 'Slider', 'first-block' ),
	description: __(
		'Contains slides.',
		'first-block'
	),
	category: 'widgets',
	icon: 'smiley',
	supports: {
		html: true,
	},
	attributes: {
		clientId: {
			type: 'string',
		}
	},
	edit,
	save,
};
