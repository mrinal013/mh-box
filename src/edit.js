/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls, RichText, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { PanelBody, ColorPicker, __experimentalBoxControl as BoxControl, __experimentalBorderBoxControl as BorderBoxControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

const { Fragment } = wp.element;

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { title, description, boxBG, titleColor, descriptionColor, boxPadding, titleAlign, descriptionAlign, boxBorder } = attributes;
	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
				title={__( 'Box', 'mh-box' )}

				>
					<ColorPicker
						label={ __( 'Background Color', 'mh-box' ) }
						color={boxBG}
						onChangeComplete={(value) => setAttributes({
							boxBG:value.hex
						})}
						enableAlpha={true}
					/>
					<BoxControl
						label={ __( 'Padding', 'mh-box' ) }
						values={ boxPadding }
						onChange={ ( values ) => setAttributes( {
							boxPadding: values
						}) }
					/>
					<BorderBoxControl
						label={ __( 'Borders', 'mh-box' ) }
						onChange={ (value) => setAttributes( {
							boxBorder: value
						}) }
						value={ boxBorder }
					/>
				</PanelBody>
				<PanelBody
				title={__( 'Title', 'mh-box' )}
				initialOpen={false}
				>
					<ColorPicker
						color={titleColor}
						onChangeComplete={(value) => setAttributes({
							titleColor:value.hex
						})}
						enableAlpha={true}
					/>
				</PanelBody>
				<PanelBody
				title={__( 'Description Color', 'mh-box' )}
				initialOpen={false}
				>
					<ColorPicker
						color={descriptionColor}
						onChangeComplete={(value) => setAttributes({
							descriptionColor:value.hex
						})}
						enableAlpha={true}
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
					<AlignmentToolbar
						value={attributes.titleAlign}
						onChange={(newalign) => setAttributes({ titleAlign: newalign })}
					/>
					<AlignmentToolbar
						value={attributes.descriptionAlign}
						onChange={(newalign) => setAttributes({ descriptionAlign: newalign })}
					/>
				</BlockControls>
			<div { ...useBlockProps({
				style: {
					backgroundColor: boxBG,
					padding: `${boxPadding.top} ${boxPadding.right} ${boxPadding.bottom} ${boxPadding.left}`,
					border: `${boxBorder.width} ${boxBorder.style} ${boxBorder.color}`
				}
			}) } >
				<div>
					<RichText
					tagName='h2'
					value={title}
					onChange={ (value) => setAttributes( {
						title:value
					} ) }
					style={{
						color:titleColor,
						textAlign: titleAlign
					}}
					/>
					<RichText
					tagName='p'
					value={description}
					onChange={ (value) => setAttributes( {
						description:value
					} ) }
					style={{
						color:descriptionColor,
						textAlign: descriptionAlign
					}}
					/>
				</div>
			</div>
		</Fragment>
	);
}
