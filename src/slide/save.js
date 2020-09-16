import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { bgImageUrl, clientId, parentClientId } = attributes;

	let styles = {};
	styles = { 
		width: '100%',
		minHeight: '300px',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat'
	};
	if ( bgImageUrl ) {
		styles.backgroundImage = `url(${ bgImageUrl })`;
	}
	return (
		<div 
			className={`ov-slide ov-slide-${clientId}`}
			data-client-id={clientId}
			data-parent-client-id={parentClientId}
		>
			<div style={ styles }>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
