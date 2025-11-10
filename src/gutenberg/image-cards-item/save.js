import { useBlockProps, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';

export default function save({ attributes }) {
	const { hotelName, imageId, imageUrl, imageAlt, linkUrl, imageBackgroundOpacity } = attributes;
	const blockProps = useBlockProps.save();

	let style = {};
	if (imageBackgroundOpacity) {
		style.opacity = imageBackgroundOpacity;
		style['--tw-bg-opacity'] = imageBackgroundOpacity + '';
	}

	return (
		<a href={linkUrl} {...blockProps} className={`${blockProps.className} relative aspect-square bg-stone-800 text-white overflow-hidden w-full no-underline`}>

			<div className="absolute top-0 left-0 w-full h-full bg-stone-800 bg-opacity-45" style={style}></div>

			<div className="absolute top-0 left-0 w-full p-6 text-xl font-host">
				<RichText.Content tagName="span" value={hotelName} className="text-inherit" />
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
		</a>
	);
}
