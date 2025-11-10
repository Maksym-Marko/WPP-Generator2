import { __ } from '@wordpress/i18n';
import metadata from './block.json';
import { useBlockProps, RichText, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import './editor.css';

export default function edit({ attributes, setAttributes }) {
	const { prefix, number, postfix, text, backgroundColor, textColor } = attributes;

	const blockProps = useBlockProps();

	const style = {};

	if(backgroundColor) {
		style.backgroundColor = backgroundColor;
	}
	if(textColor) {
		style.color = textColor;
	}

	return (
		<>
			<InspectorControls>
				<div className="wp-block-mxsfwn-counter-item-controls">
					<TextControl
						label={__('Prefix', metadata.textdomain)}
						value={prefix}
						onChange={(value) => setAttributes({ prefix: value })}
						placeholder={__('Enter prefix (e.g., +)', metadata.textdomain)}
					/>
					<TextControl
						label={__('Number', metadata.textdomain)}
						value={number}
						onChange={(value) => setAttributes({ number: value })}
						placeholder={__('Enter number', metadata.textdomain)}
					/>
					<TextControl
						label={__('Postfix', metadata.textdomain)}
						value={postfix}
						onChange={(value) => setAttributes({ postfix: value })}
						placeholder={__('Enter postfix (e.g., %, +)', metadata.textdomain)}
					/>
				</div>
				<PanelColorSettings
					title={__('Color Settings', metadata.textdomain)}
					initialOpen={false}
					colorSettings={[
						{
							value: backgroundColor,
							onChange: (color) => setAttributes({ backgroundColor: color }),
							label: __('Background Color', metadata.textdomain),
						},
						{
							value: textColor,
							onChange: (color) => setAttributes({ textColor: color }),
							label: __('Text Color', metadata.textdomain),
						},
					]}
				/>
			</InspectorControls>

			<div
				{...blockProps}
				className={`${blockProps.className} wp-block-mxsfwn-counter-item flex flex-col justify-between flex-1 w-full min-w-[200px] p-2`}
				style={style}
			>
				<div className="text-5xl font-light mb-2 mxsfwn-count-up-container">
					{prefix && <span>{prefix}</span>}
					<span className="mxsfwn-count-up">{number}</span>
					{postfix && <span>{postfix}</span>}
				</div>
				<RichText
					tagName="div"
					value={text}
					onChange={(value) => setAttributes({ text: value })}
					placeholder={__('Enter text content...', metadata.textdomain)}
					className="text-sm"
				/>
			</div>
		</>
	);
}
