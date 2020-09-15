import { registerBlockType } from '@wordpress/blocks';

import sliderController from './sliderController.js'
import * as slide from './slide';
import * as slider from './slider';

const blocks = [
    slide,
    slider
];

function registerBlock( block ) {
    const { name, settings } = block;
    registerBlockType( name, settings );
}

blocks.forEach( registerBlock );