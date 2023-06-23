import type { ManifestPropertyEditorSchema } from '@umbraco-cms/backoffice/extension-registry';

export const manifest: ManifestPropertyEditorSchema = {
	type: 'propertyEditorSchema',
	name: 'Email Address',
	alias: 'Umbraco.ImageCropper',
	meta: {
		defaultPropertyEditorUiAlias: 'Umb.PropertyEditorUi.ImageCropper',
		settings: {
			properties: [
				{
					alias: 'crops',
					label: 'Define Crops',
					propertyEditorUiAlias: 'Umb.PropertyEditorUi.ImageCropsConfiguration',
				},
			],
		},
	},
};
