import { UMB_DOCUMENT_BLUEPRINT_ENTITY_TYPE, UMB_DOCUMENT_BLUEPRINT_FOLDER_ENTITY_TYPE } from '../entity.js';
//import { manifests as folderManifests } from './folder/manifests.js';
import { manifests as reloadManifests } from './reload-tree-item-children/manifests.js';
import { UmbDocumentBlueprintTreeRepository } from './document-blueprint-tree.repository.js';
import { UmbDocumentBlueprintTreeStore } from './document-blueprint-tree.store.js';
import type {
	ManifestRepository,
	ManifestTree,
	ManifestTreeItem,
	ManifestTreeStore,
} from '@umbraco-cms/backoffice/extension-registry';

export const UMB_DOCUMENT_BLUEPRINT_TREE_REPOSITORY_ALIAS = 'Umb.Repository.DocumentBlueprint.Tree';
export const UMB_DOCUMENT_BLUEPRINT_TREE_STORE_ALIAS = 'Umb.Store.DocumentBlueprint.Tree';
export const UMB_DOCUMENT_BLUEPRINT_TREE_ALIAS = 'Umb.Tree.DocumentBlueprint';

const treeRepository: ManifestRepository = {
	type: 'repository',
	alias: UMB_DOCUMENT_BLUEPRINT_TREE_REPOSITORY_ALIAS,
	name: 'Document Blueprint Tree Repository',
	api: UmbDocumentBlueprintTreeRepository,
};

const treeStore: ManifestTreeStore = {
	type: 'treeStore',
	alias: UMB_DOCUMENT_BLUEPRINT_TREE_STORE_ALIAS,
	name: 'Document Blueprint Tree Store',
	api: UmbDocumentBlueprintTreeStore,
};

const tree: ManifestTree = {
	type: 'tree',
	kind: 'default',
	alias: UMB_DOCUMENT_BLUEPRINT_TREE_ALIAS,
	name: 'Document Blueprints Tree',
	meta: {
		repositoryAlias: UMB_DOCUMENT_BLUEPRINT_TREE_REPOSITORY_ALIAS,
	},
};

const treeItem: ManifestTreeItem = {
	type: 'treeItem',
	kind: 'default',
	alias: 'Umb.TreeItem.DocumentBlueprint',
	name: 'Document Blueprint Tree Item',
	forEntityTypes: [UMB_DOCUMENT_BLUEPRINT_ENTITY_TYPE, UMB_DOCUMENT_BLUEPRINT_FOLDER_ENTITY_TYPE],
};

export const manifests = [treeRepository, treeStore, tree, treeItem, ...reloadManifests];
//...folderManifests,
