/* EXAMPLE STATE

state = {
    sliders: {
        SLIDER_CLIENT_ID_1: {
            currentSlide: SLIDE_CLIENT_ID_1,
            slides: [
                SLIDE_CLIENT_ID_1,
                SLIDE_CLIENT_ID_2,
                ...
            ]
        }
    }
}
*/

/* EXAMPLE ACTIONS

action = {
    type: 'REGISTER_SLIDE'
    clientId: SLIDE_CLIENT_ID_1,
    parentClientId: SLIDER_CLIENT_ID_1
}

action = {
    type: 'NEXT_SLIDE'
    clientId: SLIDER_CLIENT_ID_1
}

action = {
    type: 'PREV_SLIDE'
    clientId: SLIDER_CLIENT_ID_1
}

*/

import { registerStore } from '@wordpress/data';

const initState = {
    sliders: {},
};

const actions = {
    registerSlide( clientId, parentClientId ) {
        return {
            type: 'REGISTER_SLIDE',
            clientId,
            parentClientId,
        };
    },
    nextSlide( clientId ) {
        return {
            type: 'NEXT_SLIDE',
            clientId,
        };
    },
    prevSlide( clientId ) {
        return {
            type: 'PREV_SLIDE',
            clientId,
        };
    },
}

const reducer = (state = initState, action) => {
    const newState = Object.assign({}, state);
    if (action.type === 'REGISTER_SLIDE') {
        if (newState.sliders.hasOwnProperty(action.parentClientId)) {
            newState.sliders[action.parentClientId].slides.push(action.clientId);
        } else {
            newState.sliders[action.parentClientId] = {
                currentSlide: action.clientId,
                slides: [action.clientId],
            }
        }
    }
    if (action.type === 'NEXT_SLIDE' || action.type === 'PREV_SLIDE') {
        const modifiedSlider = newState.sliders[action.clientId];
            const currentSlideClientId = modifiedSlider.currentSlide;
            const currentSliderIndex = modifiedSlider.slides.indexOf(currentSlideClientId);
            if (action.type === 'NEXT_SLIDE') {
                if (currentSliderIndex !== modifiedSlider.slides.length - 1) {
                    modifiedSlider.currentSlide = modifiedSlider.slides[currentSliderIndex + 1];
                } else {
                    modifiedSlider.currentSlide = modifiedSlider.slides[0];
                }
            } else if (action.type === 'PREV_SLIDE') {
                if (currentSliderIndex !== modifiedSlider.slides.length - 1) {
                    modifiedSlider.currentSlide = modifiedSlider.slides[currentSliderIndex + 1];
                } else {
                    modifiedSlider.currentSlide = modifiedSlider.slides[0];
                }
            }
    }
    return newState;
};

const selectors = {
    isSliderActive(state, clientId, parentClientId) {
        return true;
    }
}

//Register reducer with WordPress
const state = registerStore( 'sliderController', { reducer, actions } );
