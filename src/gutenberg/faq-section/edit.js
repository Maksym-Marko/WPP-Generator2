import { useBlockProps, InnerBlocks, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

const ALLOWED_BLOCKS = ['core/heading', 'core/paragraph', 'core/buttons', 'core/columns'];
const TEMPLATE = [
  ['core/heading', { level: 2, placeholder: 'Section title…' }],
  ['core/paragraph', { placeholder: 'Write something…' }],
];

export default function Edit({ attributes, setAttributes }) {
  const { title } = attributes;
  const blockProps = useBlockProps({
    className: '',
    id: attributes.anchor
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title="Section Settings" initialOpen={true}>
          <TextControl
            label="Section Title"
            value={title || ''}
            onChange={(val) => setAttributes({ title: val })}
            help="Used for in-page links and SSR wrapper ID."
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps} className={`${blockProps.className} py-10 pb-10`}>
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-8 font-host text-neutral-coffee-05 px-4 md:px-[2.2rem] text-base">

          {/* Column 1: Title */}
          <div className="lg:col-span-3 flex flex-col justify-between h-full">
            <RichText
              tagName="h2"
              className="text-[1.9rem] font-light mb-14"
              value={title}
              onChange={(val) => setAttributes({ title: val })}
              placeholder="Section title..."
            />
          </div>

          {/* Column 2: Main Content */}
          <div className="lg:col-span-9 space-y-6 flex flex-col gap-10 faq-section-content">
            <InnerBlocks
              allowedBlocks={ALLOWED_BLOCKS}
              template={TEMPLATE}
              templateLock={false}
              renderAppender={InnerBlocks.ButtonBlockAppender}
            />
          </div>

        </div>
      </div>
    </>
  );
} 