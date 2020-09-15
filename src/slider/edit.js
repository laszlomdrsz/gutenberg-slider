import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/editor';


import './editor.scss';

const SLIDER_ALLOWED_BLOCKS = [ 'ov/slide' ];

export default function edit( { className, clientId, setAttributes } ) {
    
    setAttributes( {
        clientId,
    } );
    
    return (
        <div className={ className }>
            <div className="ov-slider-edit-title">
                <p>Slider</p>
            </div>
            <InnerBlocks 
                allowedBlocks={ SLIDER_ALLOWED_BLOCKS }
            />
        </div>
    );
}
