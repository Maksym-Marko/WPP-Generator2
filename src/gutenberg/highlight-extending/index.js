import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.css';
import metadata from './block.json';

/**
 * Check if block should be extended
 * 
 * @param {string} blockName - The block name to check
 * @returns {boolean} Whether the block should be extended
 */
const shouldExtendBlock = (blockName) => {
    return blockName === 'core/paragraph';
};

/**
 * Higher-order component to add inspector controls
 */
const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        // Only extend core/paragraph blocks
        if (!shouldExtendBlock(props.name)) {
            return <BlockEdit {...props} />;
        }

        const { attributes, setAttributes } = props;
        const extendedSettings = attributes.extendedSettings || {};

        // Style options for paragraph classes
        const styleOptions = [
            { label: __('Default', metadata.textdomain), value: '' },
            { label: __('Yellow', metadata.textdomain), value: 'highlight-strong-yellow' },
            { label: __('Blue', metadata.textdomain), value: 'highlight-strong-blue' },
            { label: __('Green', metadata.textdomain), value: 'highlight-strong-green' }
        ];

        const handleStyleChange = (selectedStyle) => {
            setAttributes({
                extendedSettings: {
                    ...extendedSettings,
                    selectedStyle: selectedStyle
                }
            });
        };

        return (
            <Fragment>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelBody
                        title={__('Color Highlight', metadata.textdomain)}
                        initialOpen={false}
                    >
                        <SelectControl
                            label={__('Color', metadata.textdomain)}
                            help={__('Choose a style to apply to this paragraph', metadata.textdomain)}
                            value={extendedSettings.selectedStyle || ''}
                            options={styleOptions}
                            onChange={handleStyleChange}
                        />
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    };
}, 'withInspectorControls');

/**
 * Add custom attributes to core/paragraph blocks
 */
addFilter(
    'blocks.registerBlockType',
    'mxsfwn/extending/add-attributes',
    (props, name) => {
        if (!shouldExtendBlock(name)) {
            return props;
        }

        const attributes = {
            ...props.attributes,
            extendedSettings: {
                type: 'object',
                default: {
                    selectedStyle: ''
                }
            }
        };

        return { ...props, attributes };
    }
);

/**
 * Add inspector controls to core/paragraph blocks
 */
addFilter(
    'editor.BlockEdit',
    'mxsfwn/extending/add-inspector-controls',
    withInspectorControls
);

/**
 * Add custom class to core/paragraph block wrapper on frontend
 */
addFilter(
    'blocks.getSaveContent.extraProps',
    'mxsfwn/extending/add-frontend-class',
    (props, blockType, attributes) => {
        if (blockType.name !== 'core/paragraph') {
            return props;
        }

        const { extendedSettings } = attributes;

        if (extendedSettings && extendedSettings.selectedStyle) {
            const existingClassName = props.className || '';
            props.className = existingClassName
                ? `${existingClassName} ${extendedSettings.selectedStyle}`
                : extendedSettings.selectedStyle;
        }

        return props;
    }
);

/**
 * Add custom class to core/paragraph block wrapper in editor
 */
addFilter(
    'editor.BlockListBlock',
    'mxsfwn/extending/add-editor-class',
    createHigherOrderComponent((BlockListBlock) => {
        return (props) => {
            const { block, className } = props;

            // Only apply to core/paragraph blocks
            if (block.name !== 'core/paragraph') {
                return <BlockListBlock {...props} />;
            }

            const { extendedSettings } = block.attributes;

            if (extendedSettings && extendedSettings.selectedStyle) {
                const newClassName = className
                    ? `${className} ${extendedSettings.selectedStyle}`
                    : extendedSettings.selectedStyle;

                return <BlockListBlock {...props} className={newClassName} />;
            }

            return <BlockListBlock {...props} />;
        };
    }, 'withEditorClass')
);