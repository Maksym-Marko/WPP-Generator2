import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { prefix, number, postfix, text, backgroundColor, textColor } = attributes;
	
	const blockProps = useBlockProps.save();

	const style = {};

	if(backgroundColor) {
		style.backgroundColor = backgroundColor;
	}
	if(textColor) {
		style.color = textColor;
	}

	return (
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
			<RichText.Content
				tagName="div"
				value={text}
				className="text-sm"
			/>
		</div>
	);
}
