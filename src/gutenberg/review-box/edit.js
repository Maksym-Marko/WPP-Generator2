import { __ } from '@wordpress/i18n';
import metadata from './block.json';
import { useBlockProps, InspectorControls, RichText, InnerBlocks, MediaUpload, MediaUploadCheck, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl } from '@wordpress/components';
import './editor.css';

const ALLOWEDBLOCKS = [
	'mxsfwn/counter-item'
];

const TEMPLATE = [
	['mxsfwn/counter-item', {
		number: '25',
		postfix: '%',
		text: 'Uplift in reservations',
		backgroundColor: '#F2F2E9'
	}],
	['mxsfwn/counter-item', {
		prefix: '+',
		number: '15',
		postfix: '%',
		text: 'Stat qualifier',
		backgroundColor: '#F2F2E9'
	}],
	['mxsfwn/counter-item', {
		number: '95',
		postfix: '%',
		text: 'Longer stat qualifier on two lines',
		backgroundColor: '#F2F2E9'
	}],
];

export default function edit({ attributes, setAttributes }) {
	const {
		testimonial,
		customerName,
		customerTitle,
		linkText,
		linkUrl,
		avatarId,
		avatarUrl,
		avatarAlt,
		backgroundColor,
		textColor,
		statsBgColor
	} = attributes;

	const blockProps = useBlockProps();

	const style = {};

	if(backgroundColor) {
		style.backgroundColor = backgroundColor;
	}
	if(textColor) {
		style.color = textColor;
	}

	const onSelectAvatar = (media) => {
		setAttributes({
			avatarId: media.id,
			avatarUrl: media.url,
			avatarAlt: media.alt || ''
		});
	};

	const removeAvatar = () => {
		setAttributes({
			avatarId: 0,
			avatarUrl: '',
			avatarAlt: ''
		});
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Review Section Settings', metadata.textdomain)}>

					{/* Stats Background Color */}
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
							{
								value: statsBgColor,
								onChange: (color) => setAttributes({ statsBgColor: color }),
								label: __('Stats Background Color', metadata.textdomain),
							}
						]}
					/>

					<TextControl
						label={__('Link URL', metadata.textdomain)}
						value={linkUrl}
						onChange={(value) => setAttributes({ linkUrl: value })}
						placeholder="https://example.com"
					/>

					{avatarUrl && (
						<div className="mb-4">
							<img
								src={avatarUrl}
								alt={avatarAlt}
								className="max-w-[80px] h-auto rounded-md"
							/>
						</div>
					)}
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectAvatar}
							allowedTypes={['image']}
							value={avatarId}
							render={({ open }) => (
								<div>
									<Button
										onClick={open}
										variant="secondary"
										className="editor-post-featured-image__toggle"
									>
										{avatarUrl ? __('Replace Avatar', metadata.textdomain) : __('Choose Avatar', metadata.textdomain)}
									</Button>
									{avatarUrl && (
										<Button
											onClick={removeAvatar}
											variant="link"
											isDestructive
										>
											{__('Remove Avatar', metadata.textdomain)}
										</Button>
									)}
								</div>
							)}
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps} className={`${blockProps.className} flex flex-col md:flex-row justify-between items-start gap-4 max-w-[1144px] p-6 mx-auto md:items-center shadow-lg rounded-md`} style={style}>

				{/* Left: Avatar and Text */}
				<div className="flex-1 flex flex-col items-start gap-4 max-w-[760px] mxsfwn-review-section-left">

					<div className="w-20 h-20 aspect-[100/100] overflow-hidden">
						{avatarUrl ? (
							<img
								src={avatarUrl}
								alt={avatarAlt}
								className="w-full object-cover flex-shrink-0"
							/>
						) : (
							<div className="w-full h-full bg-gray-950 flex items-center justify-center text-white text-sm font-medium">
								<div>80×80</div>
							</div>
						)}
					</div>

					<div>
						<RichText
							tagName="p"
							value={testimonial}
							onChange={(value) => setAttributes({ testimonial: value })}
							placeholder={__('Enter customer testimonial...', metadata.textdomain)}
							className="text-gray-950 font-stix text-xl leading-[1.4] mb-12"
							style={{ color: textColor }}
						/>

						<div className="text-gray-950 mt-6 mb-6 mxsfwn-customer-info">
							<RichText
								tagName="span"
								value={customerName}
								onChange={(value) => setAttributes({ customerName: value })}
								placeholder={__('Customer name...', metadata.textdomain)}
								className="block font-medium text-xl font-host"
								style={{ color: textColor }}
							/>
							<RichText
								tagName="span"
								value={customerTitle}
								onChange={(value) => setAttributes({ customerTitle: value })}
								placeholder={__('Customer title...', metadata.textdomain)}
								className="text-gray-950 font-host font-light text-base"
								style={{ color: textColor }}
							/>
						</div>

						{linkUrl && (
							<div className="flex gap-2 border-b border-neutral-chalk-07 pb-4 last:border-b-0">
								<span>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
										<path d="M13.765 11.265L10.765 14.265C10.6939 14.3312 10.5999 14.3673 10.5027 14.3656C10.4056 14.3639 10.3129 14.3245 10.2442 14.2558C10.1755 14.1871 10.1361 14.0944 10.1344 13.9973C10.1327 13.9001 10.1688 13.8061 10.235 13.735L12.5944 11.375H4.5C4.40054 11.375 4.30516 11.3355 4.23484 11.2652C4.16451 11.1948 4.125 11.0995 4.125 11V2C4.125 1.90054 4.16451 1.80516 4.23484 1.73483C4.30516 1.66451 4.40054 1.625 4.5 1.625C4.59946 1.625 4.69484 1.66451 4.76516 1.73483C4.83549 1.80516 4.875 1.90054 4.875 2V10.625H12.5944L10.235 8.265C10.1982 8.23067 10.1686 8.18927 10.1481 8.14327C10.1276 8.09727 10.1166 8.04761 10.1157 7.99726C10.1148 7.94691 10.1241 7.8969 10.1429 7.8502C10.1618 7.80351 10.1899 7.76109 10.2255 7.72548C10.2611 7.68987 10.3035 7.6618 10.3502 7.64294C10.3969 7.62408 10.4469 7.61482 10.4973 7.6157C10.5476 7.61659 10.5973 7.62761 10.6433 7.64811C10.6893 7.66861 10.7307 7.69816 10.765 7.735L13.765 10.735C13.8352 10.8053 13.8747 10.9006 13.8747 11C13.8747 11.0994 13.8352 11.1947 13.765 11.265Z" fill="#261C0A"></path>
									</svg>
								</span>


								<RichText
									tagName="a"
									value={linkText}
									onChange={(value) => setAttributes({ linkText: value })}
									placeholder={__('Link text...', metadata.textdomain)}
									className="text-blue-600 hover:underline no-underline text-base font-host"
									href={linkUrl}
									style={{ color: textColor }}
								/>

							</div>
						)}
					</div>
				</div>

				{/* Right: Stats Box */}
				<div className="flex flex-col w-full max-w-full sm:max-w-[310px] mx-auto mxsfwn-review-section-right mb-6 md:mb-0 p-4 rounded-md" style={{backgroundColor: statsBgColor}}>
					<InnerBlocks
						allowedBlocks={ALLOWEDBLOCKS}
						template={TEMPLATE}
						templateLock={false}
					/>
				</div>
			</div>
		</>
	);
}
