import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

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
            { label: __('Default', 'wpp-generator-next'), value: '' },
            { label: __('Highlight Yellow', 'wpp-generator-next'), value: 'bg-primary-yellow-05' },
            { label: __('Highlight Blue', 'wpp-generator-next'), value: 'bg-primary-blue-05' },
            { label: __('Highlight Green', 'wpp-generator-next'), value: 'bg-support-green-05' },
            { label: __('Highlight Purple', 'wpp-generator-next'), value: 'bg-support-purple-05' },
            { label: __('Highlight Orange', 'wpp-generator-next'), value: 'bg-support-orange-05' },
            { label: __('Text Yellow', 'wpp-generator-next'), value: 'text-primary-yellow-05' },
            { label: __('Text Blue', 'wpp-generator-next'), value: 'text-primary-blue-05' },
            { label: __('Text Green', 'wpp-generator-next'), value: 'text-support-green-07' },
            { label: __('Large Text', 'wpp-generator-next'), value: 'text-lg' },
            { label: __('Bold Text', 'wpp-generator-next'), value: 'font-bold' },
            { label: __('Italic Text', 'wpp-generator-next'), value: 'italic' },
            { label: __('Centered Text', 'wpp-generator-next'), value: 'text-center' },
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
                        title={__('Paragraph Styles', 'wpp-generator-next')} 
                        initialOpen={false}
                    >
                        <SelectControl
                            label={__('Style', 'wpp-generator-next')}
                            help={__('Choose a style to apply to this paragraph', 'wpp-generator-next')}
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