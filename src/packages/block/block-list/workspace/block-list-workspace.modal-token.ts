import type { UmbBlockWorkspaceData } from '@umbraco-cms/backoffice/block';
import type { UmbWorkspaceModalData, UmbWorkspaceModalValue } from '@umbraco-cms/backoffice/workspace';
import { UmbModalToken } from '@umbraco-cms/backoffice/modal';

export interface UmbBlockListWorkspaceOriginData {
	index: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UmbBlockListWorkspaceData extends UmbBlockWorkspaceData<UmbBlockListWorkspaceOriginData> {}

export const UMB_BLOCK_LIST_WORKSPACE_MODAL = new UmbModalToken<UmbBlockListWorkspaceData, UmbWorkspaceModalValue>(
	'Umb.Modal.Workspace',
	{
		modal: {
			type: 'sidebar',
			size: 'medium',
		},
		data: { entityType: 'block', preset: {}, originData: { index: -1 }, baseDataPath: undefined as unknown as string },
	},
	// Recast the type, so the entityType data prop is not required:
) as UmbModalToken<Omit<UmbWorkspaceModalData, 'entityType'>, UmbWorkspaceModalValue>;
