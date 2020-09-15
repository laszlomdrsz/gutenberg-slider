
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import './style.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

export const name = 'ov/slide';
export const settings = {
	title: __( 'Slide', 'first-block' ),
	description: __(
		'Contains background image with paragraphs, headings and buttons.',
		'first-block'
	),
	category: 'widgets',
	icon: 'smiley',
	parent: ['ov/slider'],
	supports: {
		html: true,
	},
	attributes: {
		bgImageId: {
			type: 'number',
		},
		bgImageUrl: {
			type: 'string',
		},
		clientId: {
			type: 'string',
		},
		parentClientId: {
			type: 'string',
		}
	},
	edit,
	save,
};
