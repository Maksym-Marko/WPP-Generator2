import { __ } from '@wordpress/i18n';
import metadata from './block.json';
import { useBlockProps, InnerBlocks, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import './editor.css';

const ALLOWEDBLOCKS = [
	'mxsfwn/image-cards-item'
];

const TEMPLATE = [
	['mxsfwn/image-cards-item', {}],
];

export default function edit({ attributes, setAttributes }) {

	const { blockBackgroundColor } = attributes;

	let style = {};
	if (blockBackgroundColor) {
		style.backgroundColor = blockBackgroundColor;
	}

	const blockProps = useBlockProps({
		style
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Image Cards Settings', 'wpp-generator-next')}>
					<PanelColorSettings
						title={__('Background Color', 'wpp-generator-next')}
						initialOpen={false}
						colorSettings={[
							{
								value: blockBackgroundColor,
								onChange: value => setAttributes({ blockBackgroundColor: value }),
								label: __('Background Color', 'wpp-generator-next'),
							},
						]}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<InnerBlocks
					allowedBlocks={ALLOWEDBLOCKS}
					template={TEMPLATE}
					templateLock={false}
				/>
			</div>
		</>
	);
}
