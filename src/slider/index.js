
import { __ } from '@wordpress/i18n';
import './style.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

export const name = 'ov/slider';
export const settings = {
	title: __( 'Slider', 'ov' ),
	description: __(
		'Contains slides.',
		'ov'
	),
	category: 'widgets',
	icon: 'smiley',
	attributes: {
		clientId: {
			type: 'string',
		}
	},
	edit,
	save,
};
