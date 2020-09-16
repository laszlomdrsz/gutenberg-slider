import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { InspectorControls, InnerBlocks, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, Button, ResponsiveWrapper, Spinner } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';


import './editor.scss';

const ALLOWED_MEDIA_TYPES = [ 'image' ];
const SLIDE_ALLOWED_BLOCKS = [ 'core/paragraph', 'core/heading', 'core/buttons' ];

class SlideEdit extends Component {
    render() {
        const { attributes, setAttributes, bgImage, className, clientId, parentClientId, slideNumber } = this.props;
        const { bgImageId } = attributes;
        const instructions = <p>{ __( 'To edit the background image, you need permission to upload media.', 'image-selector-example' ) }</p>;
        
        setAttributes( {
            clientId,
            parentClientId
        } );
        
        let styles = {
            width: '100%',
            minHeight: '300px',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            overflow: 'auto'
        };
        if ( bgImage && bgImage.source_url ) {
            styles.backgroundImage = `url(${ bgImage.source_url })`;
        }

        const onUpdateImage = ( image ) => {
            setAttributes( {
                bgImageId: image.id,
                bgImageUrl: image.url
            } );
        };

        const onRemoveImage = () => {
            setAttributes( {
                bgImageId: undefined,
                bgImageUrl: undefined
            } );
        };

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody
                        title={ __( 'Background settings', 'image-selector-example' ) }
                        initialOpen={ true }
                    >
                        <div className="wp-block-image-selector-example-image">
                            <MediaUploadCheck fallback={ instructions }>
                                <MediaUpload
                                    title={ __( 'Background image', 'image-selector-example' ) }
                                    onSelect={ onUpdateImage }
                                    allowedTypes={ ALLOWED_MEDIA_TYPES }
                                    value={ bgImageId }
                                    render={ ( { open } ) => (
                                        <Button
                                            className={ ! bgImageId ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview' }
                                            onClick={ open }>
                                            { ! bgImageId && ( __( 'Set background image', 'image-selector-example' ) ) }
                                            { !! bgImageId && ! bgImage && <Spinner /> }
                                            { !! bgImageId && bgImage &&
                                                <ResponsiveWrapper
                                                    naturalWidth={ bgImage.media_details.width }
                                                    naturalHeight={ bgImage.media_details.height }
                                                >
                                                    <img src={ bgImage.source_url } alt={ __( 'Background image', 'image-selector-example' ) } />
                                                </ResponsiveWrapper>
                                            }
                                        </Button>
                                    ) }
                                />
                            </MediaUploadCheck>
                            { !! bgImageId && bgImage &&
                                <MediaUploadCheck>
                                    <MediaUpload
                                        title={ __( 'Background image', 'image-selector-example' ) }
                                        onSelect={ onUpdateImage }
                                        allowedTypes={ ALLOWED_MEDIA_TYPES }
                                        value={ bgImageId }
                                        render={ ( { open } ) => (
                                            <Button onClick={ open } isDefault>
                                                { __( 'Replace background image', 'image-selector-example' ) }
                                            </Button>
                                        ) }
                                    />
                                </MediaUploadCheck>
                            }
                            { !! bgImageId &&
                                <MediaUploadCheck>
                                    <Button onClick={ onRemoveImage } isLink isDestructive>
                                        { __( 'Remove background image', 'image-selector-example' ) }
                                    </Button>
                                </MediaUploadCheck>
                            }
                        </div>
                    </PanelBody>
                </InspectorControls>
                <div className={ className }>
                    <div className="ov-slide-edit-title">
                        <p>Slide { slideNumber }</p>
                    </div>
                    <div style={ styles }>
                        <InnerBlocks 
                            allowedBlocks={ SLIDE_ALLOWED_BLOCKS }
                        />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default compose(
    withSelect( ( select, props ) => {
        const { getMedia } = select('core');
        const { getBlocksByClientId, getBlockHierarchyRootClientId } = select('core/editor');

        const { bgImageId, clientId } = props.attributes;
        const parentClientId = getBlockHierarchyRootClientId(clientId);
        let slideNumber = '';
        const parentBlock = getBlocksByClientId(parentClientId)[0];
        if (parentBlock && parentBlock.innerBlocks) {
            const childIndex = parentBlock.innerBlocks.findIndex(innerBlock => innerBlock.clientId === clientId);
            slideNumber = childIndex + 1;
        }

        return {
            bgImage: bgImageId ? getMedia( bgImageId ) : null,
            parentClientId,
            slideNumber
        };
    } ),
)( SlideEdit );
