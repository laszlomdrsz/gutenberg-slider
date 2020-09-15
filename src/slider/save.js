import { __ } from '@wordpress/i18n';

const { InnerBlocks } = wp.editor;

export default function save( { attributes } ) {
	const { clientId } = attributes;
	return (
		<div 
			className={`ov-slider ov-slider-${clientId}`}
			data-client-id={clientId}
		>
			<div className={`ov-prev-button ov-slider-button`} data-client-id={clientId}>{'<'}</div>
			<div className={`ov-next-button ov-slider-button`} data-client-id={clientId}>{'>'}</div>
			<InnerBlocks.Content />
		</div>
	);
}
