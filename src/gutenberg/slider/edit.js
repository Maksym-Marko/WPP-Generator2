import { __ } from '@wordpress/i18n';
import metadata from './block.json';
import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import './editor.css';

const ALLOWED_BLOCKS = [
	'mxsfwn/review-box'
];

const TEMPLATE = [
	['mxsfwn/review-box', {
		backgroundColor: 'bg-gray-300'
	}]
];

export default function edit({ attributes, setAttributes }) {
	const { backgroundColor } = attributes;

	const blockProps = useBlockProps({
		className: backgroundColor
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Multiple Slider Section Settings', metadata.textdomain)}>
					<p>{__('Configure your multiple slider section settings here.', metadata.textdomain)}</p>
				</PanelBody>
			</InspectorControls>

			<section {...blockProps} className={`${blockProps.className} mxsfwn-multiple-slider-horizontal-section`}>
				<div className="container max-w-[1200px] mx-auto relative px-4 md:px-[2.2rem]">
					<div className="flex flex-col sm:flex-row justify-center sm:justify-between">
						<div className="w-full max-w-72"></div>
						<div className="flex justify-end w-full max-w-40 mxsfwn-slider-nav-wrapper self-end">
							<div className="w-full flex justify-between max-w-36">
								<button className="flex items-center justify-center p-4 mxsfwn-slider-nav-prev">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
										<path d="M24 13.6161L24 10.8843L5.26829 10.8843L13.6585 2.49411L11.7073 0.542886L1.04907e-06 12.2502L11.7073 23.9575L13.6585 22.0063L5.26829 13.6161L24 13.6161Z" fill="#261C0A" />
									</svg>
								</button>
								<button className="flex items-center justify-center p-4 mxsfwn-slider-nav-next">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
										<path d="M-9.23607e-07 10.8839L-2.31436e-06 13.6157L18.7317 13.6157L10.3415 22.0059L12.2927 23.9571L24 12.2498L12.2927 0.542483L10.3415 2.4937L18.7317 10.8839L-9.23607e-07 10.8839Z" fill="#261C0A" />
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="flex gap-4 pt-5 justify-center">
					<InnerBlocks
						allowedBlocks={ALLOWED_BLOCKS}
						template={TEMPLATE}
						templateLock={false}
					/>
				</div>
				
			</section>
		</>
	);
}
