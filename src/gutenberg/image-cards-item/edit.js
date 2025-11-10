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
		style['--tw-bg-opacity'] = imageBackgroundOpacity + '';
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Link Settings', metadata.textdomain)}>

					{/* Link Label */}
					<TextControl
						label={__('Link Label', metadata.textdomain)}
						value={hotelName}
						onChange={value => setAttributes({ hotelName: value })}
						placeholder={__('Enter link label...', metadata.textdomain)}
					/>

					{/* Link URL */}
					<TextControl
						label={__('Link URL', metadata.textdomain)}
						value={linkUrl}
						onChange={value => setAttributes({ linkUrl: value })}
						placeholder={__('Paste link here...', metadata.textdomain)}
					/>
				</PanelBody>

				<PanelBody title={__('Image Settings', metadata.textdomain)}>

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
									label={__('Image Alt Text', metadata.textdomain)}
									value={imageAlt}
									onChange={value => setAttributes({ imageAlt: value })}
									placeholder={__('Enter image alt text...', metadata.textdomain)}
								/>
							</div>

							{/* Image background opacity */}
							<RangeControl
								label={__('Image Background Opacity', metadata.textdomain)}
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
											{imageUrl ? __('Replace Image', metadata.textdomain) : __('Choose Image', metadata.textdomain)}
										</Button>
										{imageUrl && (
											<Button
												onClick={removeImage}
												variant="link"
												isDestructive
											>
												{__('Remove Image', metadata.textdomain)}
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
						placeholder={__('Hotel name...', metadata.textdomain)}
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
							<p>{__('Image Placeholder', metadata.textdomain)}<br />{__('600×600px', metadata.textdomain)}</p>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
