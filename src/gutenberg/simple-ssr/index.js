import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import metadata from './block.json';

// Do not register `save` — render.php handles output
registerBlockType(metadata.name, {
  edit: Edit,
});
