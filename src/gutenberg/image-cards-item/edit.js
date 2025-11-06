import { __ } from '@wordpress/i18n';
import metadata from './block.json';
import { useBlockProps, RichText, MediaUpload, InspectorControls, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, TextControl, PanelBody, RangeControl } from '@wordpress/components';
import './editor.css';

export default function edit({ attributes, setAttributes }) {
	const { hotelName, imageId, imageUrl, imageAlt, linkUrl, imageBackgroundOpacity } = attributes;

	const blockProps = useBlockProps();

	const onSelectImage = (media) => {
		setAttributes({
			imageId: media.id,
			imageUrl: media.url,
			imageAlt: media.alt || imageAlt
		});
	};

	const removeImage = () => {
		setAttributes({
			imageId: 0,
			imageUrl: '',
			imageAlt: ''
		});
	};

	let style = {};

	if (imageBackgroundOpacity) {
		style.opacity = imageBackgroundOpacity;
		style['--tw-bg-opacity'] = imageBackgroundOpacity + '!important';
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Link Settings', 'wpp-generator-next')}>

					{/* Link Label */}
					<TextControl
						label={__('Link Label', 'wpp-generator-next')}
						value={hotelName}
						onChange={value => setAttributes({ hotelName: value })}
						placeholder={__('Enter link label...', 'wpp-generator-next')}
					/>

					{/* Link URL */}
					<TextControl
						label={__('Link URL', 'wpp-generator-next')}
						value={linkUrl}
						onChange={value => setAttributes({ linkUrl: value })}
						placeholder={__('Paste link here...', 'wpp-generator-next')}
					/>
				</PanelBody>

				<PanelBody title={__('Image Settings', 'wpp-generator-next')}>

					{/* Image */}
					{imageUrl && (
						<>
							{/* Image Preview */}
							<div className="mb-4">
								<img
									src={imageUrl}
									alt={imageAlt}
									className="max-w-[200px] h-auto"
								/>
							</div>

							{/* Image Alt Text */}
							<div className="mb-4">

								<TextControl
									label={__('Image Alt Text', 'wpp-generator-next')}
									value={imageAlt}
									onChange={value => setAttributes({ imageAlt: value })}
									placeholder={__('Enter image alt text...', 'wpp-generator-next')}
								/>
							</div>

							{/* Image background opacity */}
							<RangeControl
								label={__('Image Background Opacity', 'wpp-generator-next')}
								value={imageBackgroundOpacity}
								onChange={value => setAttributes({ imageBackgroundOpacity: value })}
								min={0}
								max={1}
								step={0.05}
							/>
						</>
					)}
					<div className="mb-4">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onSelectImage}
								allowedTypes={['image']}
								value={imageId}
								render={({ open }) => (
									<div>
										<Button
											onClick={open}
											variant="secondary"
											className="editor-post-featured-image__toggle"
										>
											{imageUrl ? __('Replace Image', 'wpp-generator-next') : __('Choose Image', 'wpp-generator-next')}
										</Button>
										{imageUrl && (
											<Button
												onClick={removeImage}
												variant="link"
												isDestructive
											>
												{__('Remove Image', 'wpp-generator-next')}
											</Button>
										)}
									</div>
								)}
							/>
						</MediaUploadCheck>
					</div>

				</PanelBody>

			</InspectorControls>

			<div data-href={linkUrl} {...blockProps} className={`${blockProps.className} relative aspect-square bg-stone-800 text-white overflow-hidden w-full no-underline cursor-pointer`}>

				<div className="absolute top-0 left-0 w-full h-full bg-stone-800 bg-opacity-45" style={style}></div>

				<div className="absolute top-0 left-0 w-full p-6 text-xl font-host">
					<RichText
						tagName="span"
						value={hotelName}
						onChange={value => setAttributes({ hotelName: value })}
						placeholder={__('Hotel name...', 'wpp-generator-next')}
						className="text-inherit"
					/>
				</div>

				{imageUrl ? (
					<img
						src={imageUrl}
						alt={imageAlt}
						className="w-full aspect-square object-cover"
					/>
				) : (
					<div className="flex items-center justify-center w-full h-full text-center">
						<div className="p-10">
							<p>{__('Image Placeholder', 'wpp-generator-next')}<br />{__('600×600px', 'wpp-generator-next')}</p>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
