import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {

	const { blockBackgroundColor } = attributes;

	let style = {};
	if (blockBackgroundColor) {
		style.backgroundColor = blockBackgroundColor;
	}

	const blockProps = useBlockProps.save({
		style
	});

	return (
		<div {...blockProps} className={`${blockProps.className} grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4`}>
			<InnerBlocks.Content />
		</div>
	);
}
