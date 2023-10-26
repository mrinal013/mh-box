/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * This module allows you to create and use standalone block editors.
 * Import useBlockProps, InspectorControls, RichText
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#inspectorcontrols
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#richtext
 * 
 */
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';

/**
 * This package includes a library of generic WordPress components 
 * to be used for creating common UI elements shared 
 * between screens and features of the WordPress dashboard.
 * Import PanelBody, ColorPicker, BoxControl, BorderBoxControl
 * 
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/panel/
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/color-picker/
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/box-control/
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/border-control/
 * 
 */
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

	const { title, description, boxBG, titleColor, descriptionColor, boxPadding, boxBorder } = attributes;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
				title={ __( 'Box', 'mh-box' ) }

				>
					<ColorPicker
						label={ __( 'Background Color', 'mh-box' ) }
						color={boxBG}
						onChangeComplete = { ( value ) => setAttributes( {
							boxBG:value.hex
						} ) }
						enableAlpha={true}
					/>
					<BoxControl
						label={ __( 'Padding', 'mh-box' ) }
						values={ boxPadding }
						onChange = { ( values ) => setAttributes( {
							boxPadding: values
						} ) }
					/>
					<BorderBoxControl
						label={ __( 'Borders', 'mh-box' ) }
						onChange = { ( value ) => setAttributes( {
							boxBorder: value
						} ) }
						value={ boxBorder }
					/>
				</PanelBody>
				<PanelBody
				title = { __( 'Title', 'mh-box' ) }
				initialOpen = { false }
				>
					<ColorPicker
						label = { __( 'Color', 'mh-box' ) }
						color = { titleColor }
						onChangeComplete = { ( value ) => setAttributes( {
							titleColor:value.hex
						} ) }
						enableAlpha = { true }
					/>
				</PanelBody>
				<PanelBody
				title={__( 'Description', 'mh-box' )}
				initialOpen={false}
				>
					<ColorPicker
						label={ __( 'Color', 'mh-box' ) }
						color={descriptionColor}
						onChangeComplete={(value) => setAttributes({
							descriptionColor:value.hex
						})}
						enableAlpha={true}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps( {
				style: {
					backgroundColor: boxBG,
					padding: `${boxPadding.top} ${boxPadding.right} ${boxPadding.bottom} ${boxPadding.left}`,
					border: `${boxBorder.width} ${boxBorder.style} ${boxBorder.color}`
				}
			} ) } >
				<div>
					<RichText
					tagName='h2'
					value={title}
					onChange={ (value) => setAttributes( {
						title:value
					} ) }
					style={{
						color:titleColor,
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
					}}
					/>
				</div>
			</div>
		</Fragment>
	);
}
