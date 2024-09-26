import type { ManifestTiptapExtension, ManifestTiptapExtensionButtonKind } from '../tiptap-extension.js';

export const manifests: Array<ManifestTiptapExtension | ManifestTiptapExtensionButtonKind> = [
	{
		type: 'tiptapExtension',
		kind: 'button',
		alias: 'Umb.Tiptap.Blockquote',
		name: 'Blockquote Tiptap Extension',
		api: () => import('./blockquote.extension.js'),
		weight: 995,
		meta: {
			alias: 'blockquote',
			icon: 'icon-blockquote',
			label: 'Blockquote',
		},
	},
	{
		type: 'tiptapExtension',
		kind: 'button',
		alias: 'Umb.Tiptap.Bold',
		name: 'Bold Tiptap Extension',
		api: () => import('./bold.extension.js'),
		weight: 999,
		meta: {
			alias: 'bold',
			icon: 'icon-bold',
			label: 'Bold',
		},
	},
	{
		type: 'tiptapExtension',
		kind: 'button',
		alias: 'Umb.Tiptap.BulletList',
		name: 'Bullet List Tiptap Extension',
		api: () => import('./bullet-list.extension.js'),
		weight: 993,
		meta: {
			alias: 'bulletList',
			icon: 'icon-bulleted-list',
			label: 'Bullet List',
		},
	},
	{
		type: 'tiptapExtension',
		kind: 'button',
		alias: 'Umb.Tiptap.CodeBlock',
		name: 'Code Block Tiptap Extension',
		api: () => import('./code-block.extension.js'),
		weight: 994,
		meta: {
			alias: 'codeBlock',
			icon: 'icon-code',
			label: 'Code Block',
		},
	},
	{
		type: 'tiptapExtension',
		alias: 'Umb.Tiptap.Figure',
		name: 'Figure Tiptap Extension',
		api: () => import('./figure.extension.js'),
		weight: 955,
		meta: {
			alias: 'figure',
			icon: 'icon-frame',
			label: 'Figure',
		},
	},
	{
		type: 'tiptapExtension',
		kind: 'button',
		alias: 'Umb.Tiptap.Heading1',
		name: 'Heading 1 Tiptap Extension',
		api: () => import('./heading1.extension.js'),
		weight: 949,
		meta: {
			alias: 'heading1',
			icon: 'icon-heading-1',
			label: 'Heading 1',
		},
	},
	{
		type: 'tiptapExtension',
		kind: 'button',
		alias: 'Umb.Tiptap.Heading2',
		name: 'Heading 2 Tiptap Extension',
		api: () => import('./heading2.extension.js'),
		weight: 948,
		meta: {
			alias: 'heading2',
			icon: 'icon-heading-2',
			label: 'Heading 2',
		},
	},
	{
		type: 'tiptapExtension',
		kind: 'button',
		alias: 'Umb.Tiptap.Heading3',
		name: 'Heading 3 Tiptap Extension',
		api: () => import('./heading3.extension.js'),
		weight: 947,
		meta: {
			alias: 'heading3',
			icon: 'icon-heading-3',
			label: 'Heading 3',
		},
	},
	{
		type: 'tiptapExtension',
		kind: 'button',
		alias: 'Umb.Tiptap.HorizontalRule',
		name: 'Horizontal Rule Tiptap Extension',
		api: () => import('./horizontal-rule.extension.js'),
		weight: 991,
		meta: {
			alias: 'horizontalRule',
			icon: 'icon-horizontal-rule',
			label: 'Horizontal Rule',
		},
	},
	{
		type: 'tiptapExtension',
		alias: 'Umb.Tiptap.Image',
		name: 'Image Tiptap Extension',
		api: () => import('./image.extension.js'),
		meta: {
			alias: 'image',
		},
	},
	{
		type: 'tiptapExtension',
		kind: 'button',
		alias: 'Umb.Tiptap.Italic',
		name: 'Italic Tiptap Extension',
		api: () => import('./italic.extension.js'),
		weight: 998,
		meta: {
			alias: 'italic',
			icon: 'icon-italic',
			label: 'Italic',
		},
	},
	{
		type: 'tiptapExtension',
		kind: 'button',
		alias: 'Umb.Tiptap.OrderedList',
		name: 'Ordered List Tiptap Extension',
		api: () => import('./ordered-list.extension.js'),
		weight: 992,
		meta: {
			alias: 'orderedList',
			icon: 'icon-ordered-list',
			label: 'Ordered List',
		},
	},
	{
		type: 'tiptapExtension',
		kind: 'button',
		alias: 'Umb.Tiptap.Strike',
		name: 'Strike Tiptap Extension',
		api: () => import('./strike.extension.js'),
		weight: 996,
		meta: {
			alias: 'strike',
			icon: 'icon-strikethrough',
			label: 'Strike',
		},
	},
	{
		type: 'tiptapExtension',
		kind: 'button',
		alias: 'Umb.Tiptap.TextAlignCenter',
		name: 'Text Align Center Tiptap Extension',
		api: () => import('./text-align-center.extension.js'),
		weight: 918,
		meta: {
			alias: 'text-align-center',
			icon: 'icon-text-align-center',
			label: 'Text Align Center',
		},
	},
	{
		type: 'tiptapExtension',
		kind: 'button',
		alias: 'Umb.Tiptap.TextAlignJustify',
		name: 'Text Align Justify Tiptap Extension',
		api: () => import('./text-align-justify.extension.js'),
		weight: 916,
		meta: {
			alias: 'text-align-justify',
			icon: 'icon-text-align-justify',
			label: 'Text Align Justify',
		},
	},
	{
		type: 'tiptapExtension',
		kind: 'button',
		alias: 'Umb.Tiptap.TextAlignLeft',
		name: 'Text Align Left Tiptap Extension',
		api: () => import('./text-align-left.extension.js'),
		weight: 919,
		meta: {
			alias: 'text-align-left',
			icon: 'icon-text-align-left',
			label: 'Text Align Left',
		},
	},
	{
		type: 'tiptapExtension',
		kind: 'button',
		alias: 'Umb.Tiptap.TextAlignRight',
		name: 'Text Align Right Tiptap Extension',
		api: () => import('./text-align-right.extension.js'),
		weight: 917,
		meta: {
			alias: 'text-align-right',
			icon: 'icon-text-align-right',
			label: 'Text Align Right',
		},
	},
	{
		type: 'tiptapExtension',
		kind: 'button',
		alias: 'Umb.Tiptap.Underline',
		name: 'Underline Tiptap Extension',
		api: () => import('./underline.extension.js'),
		weight: 997,
		meta: {
			alias: 'underline',
			icon: 'icon-underline',
			label: 'Underline',
		},
	},
];
