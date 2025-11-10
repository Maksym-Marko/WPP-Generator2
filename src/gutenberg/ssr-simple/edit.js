import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import './editor.css';
import metadata from './block.json';

export default function Edit({ attributes, setAttributes }) {
  const { text } = attributes;
  const blockProps = useBlockProps({
    className: 'wppg-next-ssr-simple-editor',
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Text Settings', metadata.textdomain)}>
          <TextControl
            label={__('Text', metadata.textdomain)}
            value={text}
            onChange={(value) => setAttributes({ text: value })}
            help={__('Enter the text to display in the block', metadata.textdomain)}
            __next40pxDefaultSize={true}
            __nextHasNoMarginBottom={true}
          />
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        <ServerSideRender
          block={metadata.name}
          attributes={attributes}
        />
      </div>
    </>
  );
}
