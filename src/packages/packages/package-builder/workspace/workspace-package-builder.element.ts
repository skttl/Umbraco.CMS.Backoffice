import { UmbPackageRepository } from '../../package/repository/index.js';
import type { UmbCreatedPackageDefinition } from '../../types.js';
import type { UmbInputLanguageElement } from '../../../language/components/input-language/input-language.element.js';
import {
	css,
	html,
	customElement,
	property,
	query,
	state,
	when,
	nothing,
	ifDefined,
} from '@umbraco-cms/backoffice/external/lit';
import { blobDownload } from '@umbraco-cms/backoffice/utils';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UmbServerFilePathUniqueSerializer } from '@umbraco-cms/backoffice/server-file-system';
import { UmbTextStyles } from '@umbraco-cms/backoffice/style';
import { UMB_NOTIFICATION_CONTEXT } from '@umbraco-cms/backoffice/notification';
import type { UmbInputDocumentElement } from '@umbraco-cms/backoffice/document';
import type { UmbInputDocumentTypeElement } from '@umbraco-cms/backoffice/document-type';
import type { UmbInputEntityElement } from '@umbraco-cms/backoffice/components';
import type { UmbInputMediaTypeElement } from '@umbraco-cms/backoffice/media-type';
import type { UmbMediaItemModel } from '@umbraco-cms/backoffice/media';
import type { UmbNotificationContext } from '@umbraco-cms/backoffice/notification';
import type {
	UUIBooleanInputEvent,
	UUIButtonState,
	UUIInputElement,
	UUIInputEvent,
} from '@umbraco-cms/backoffice/external/uui';

@customElement('umb-workspace-package-builder')
export class UmbWorkspacePackageBuilderElement extends UmbLitElement {
	@property()
	entityUnique?: string;

	@property()
	workspaceAlias?: string;

	@state()
	private _package?: UmbCreatedPackageDefinition;

	@query('#package-name-input')
	private _packageNameInput?: UUIInputElement;

	@state()
	private _submitState?: UUIButtonState;

	#notificationContext?: UmbNotificationContext;
	#packageRepository = new UmbPackageRepository(this);
	#serverFilePathUniqueSerializer = new UmbServerFilePathUniqueSerializer();

	constructor() {
		super();
		this.consumeContext(UMB_NOTIFICATION_CONTEXT, (context) => {
			this.#notificationContext = context;
		});
	}

	connectedCallback(): void {
		super.connectedCallback();
		this.#getPackageCreated();
		requestAnimationFrame(() => this._packageNameInput?.focus());
	}

	async #getPackageCreated() {
		this._package = await this.#packageRepository.getCreatedPackage(this.entityUnique);
		this.requestUpdate('_package');
	}

	async #download() {
		if (!this._package?.unique) return;

		const data = await this.#packageRepository.getCreatePackageDownload(this._package.unique);
		if (!data) return;

		// TODO: [LK] Need to review what the server is doing, as different data is returned depending on schema configuration.
		// e.g. selecting Media items will return a ZIP file, otherwise it's an XML file. It should be consistent.
		//blobDownload(data, 'package.xml', 'text/xml');
		blobDownload(data, 'package.zip', 'application/zip');
	}

	#isNameDefined() {
		const valid = this._packageNameInput?.checkValidity() ?? false;
		if (!valid) this.#notificationContext?.peek('danger', { data: { message: 'Package missing a name' } });
		return valid;
	}

	async #save() {
		if (!this.#isNameDefined()) return;
		if (!this._package) return;

		this._submitState = 'waiting';

		const unique = await this.#packageRepository.saveCreatedPackage(this._package);
		if (!unique) return;

		this._package.unique = unique;
		this.requestUpdate('_package');

		this._submitState = 'success';

		this.#notificationContext?.peek('positive', { data: { message: 'Package saved' } });
	}

	async #update() {
		if (!this.#isNameDefined()) return;
		if (!this._package?.unique) return;

		this._submitState = 'waiting';

		const success = await this.#packageRepository.updateCreatedPackage(this._package);
		if (!success) return;

		this._submitState = 'success';

		this.#notificationContext?.peek('positive', { data: { message: 'Package updated' } });
	}

	render() {
		if (!this.workspaceAlias) return nothing;
		return html`
			<umb-workspace-editor alias=${this.workspaceAlias}>
				${this.#renderHeader()}
				${this.#renderEditors()}
				${this.#renderActions()}
			</umb-workspace-editor>
		`;
	}

	#renderHeader() {
		if (!this._package) return nothing;
		return html`
			<div id="header" slot="header">
				<uui-button href="section/packages/view/created" label=${this.localize.term('general_backToOverview')} compact>
					<uui-icon name="icon-arrow-left"></uui-icon>
				</uui-button>
				<uui-input
					id="package-name-input"
					required
					label="Name of the package"
					placeholder=${this.localize.term('placeholders_entername')}
					.value=${this._package?.name ?? ''}
					@input=${(e: UUIInputEvent) => (this._package!.name = e.target.value as string)}></uui-input>
			</div>
		`;
	}

	#renderActions() {
		return html`
			<div slot="actions">
				${when(
					this._package?.unique,
					() => html`
						<uui-button
							color="default"
							look="secondary"
							label=${this.localize.term('general_download')}
							@click=${this.#download}></uui-button>
					`,
				)}
				<uui-button
					color="positive"
					look="primary"
					state=${ifDefined(this._submitState)}
					label=${this._package?.unique ? 'Update' : 'Create'}
					@click=${this._package?.unique ? this.#update : this.#save}></uui-button>
			</div>
		`;
	}

	#renderEditors() {
		return html`
			<uui-box headline="Package Content">
			<umb-property-layout label="Content" description="">
				${this.#renderContentSection()}
			</umb-property-layout>

			<umb-property-layout label="Media" description="">${this.#renderMediaSection()} </umb-property-layout>

			<umb-property-layout label="Document Types" description="">
				${this.#renderDocumentTypeSection()}
			</umb-property-layout>

			<umb-property-layout label="Media Types" description=""> ${this.#renderMediaTypeSection()} </umb-property-layout>

			<umb-property-layout label="Languages" description=""> ${this.#renderLanguageSection()} </umb-property-layout>

			<umb-property-layout label="Dictionary" description=""> ${this.#renderDictionarySection()} </umb-property-layout>

			<umb-property-layout label="Data Types" description=""> ${this.#renderDataTypeSection()} </umb-property-layout>

			<umb-property-layout label="Templates" description=""> ${this.#renderTemplateSection()} </umb-property-layout>

			<umb-property-layout label="Stylesheets" description="">
				${this.#renderStylesheetsSection()}
			</umb-property-layout>

			<umb-property-layout label="Scripts" description=""> ${this.#renderScriptsSection()} </umb-property-layout>

			<umb-property-layout label="Partial Views" description="">
				${this.#renderPartialViewSection()}
			</umb-property-layout>
			</uui-box>
		`;
	}

	#renderContentSection() {
		return html`
			<div slot="editor">
				<umb-input-document
					.value=${this._package.contentNodeId ?? ''}
					max="1"
					@change="${(e: CustomEvent) =>
						(this._package.contentNodeId = (e.target as UmbInputDocumentElement).selection[0])}">
				</umb-input-document>
				<uui-checkbox
					label="Include child nodes"
					.checked="${this._package.contentLoadChildNodes ?? false}"
					@change="${(e: UUIBooleanInputEvent) => (this._package.contentLoadChildNodes = e.target.checked)}">
					Include child nodes
				</uui-checkbox>
			</div>
		`;
	}

	#renderMediaSection() {
		return html`
			<div slot="editor">
				<umb-input-media
					.selection=${this._package.mediaIds ?? []}
					@change="${(e: CustomEvent) =>
						(this._package.mediaIds = (e.target as UmbInputMediaElement).selection)}"></umb-input-media>
				<uui-checkbox
					label="Include child nodes"
					.checked="${this._package.mediaLoadChildNodes ?? false}"
					@change="${(e: UUIBooleanInputEvent) => (this._package.mediaLoadChildNodes = e.target.checked)}">
					Include child nodes
				</uui-checkbox>
			</div>
		`;
	}

	#renderDocumentTypeSection() {
		return html`<div slot="editor">
			<umb-input-checkbox-list></umb-input-checkbox-list>
		</div>`;
	}

	#renderMediaTypeSection() {
		return html`<div slot="editor">
			<umb-input-checkbox-list></umb-input-checkbox-list>
		</div>`;
	}

	#renderLanguageSection() {
		return html`<div slot="editor">
			<umb-input-language
				.value="${this._package.languages?.join(',') ?? ''}"
				@change="${(e: CustomEvent) => {
					this._package.languages = (e.target as UmbInputLanguageElement).selection;
				}}"></umb-input-language>
		</div>`;
	}

	#renderDictionarySection() {
		return html`<div slot="editor">
			<umb-input-checkbox-list></umb-input-checkbox-list>
		</div>`;
	}

	#renderDataTypeSection() {
		return html`<div slot="editor">
			<umb-data-type-input></umb-data-type-input>
		</div>`;
	}

	#renderTemplateSection() {
		return html`<div slot="editor">
			<umb-input-checkbox-list></umb-input-checkbox-list>
		</div>`;
	}

	#renderStylesheetsSection() {
		return html`<div slot="editor">
			<umb-input-checkbox-list></umb-input-checkbox-list>
		</div>`;
	}

	#renderScriptsSection() {
		return html`<div slot="editor">
			<umb-input-checkbox-list></umb-input-checkbox-list>
		</div>`;
	}

	#renderPartialViewSection() {
		return html`<div slot="editor">
			<umb-input-checkbox-list></umb-input-checkbox-list>
		</div>`;
	}

	static styles = [
		UmbTextStyles,
		css`
			:host {
				display: block;
				height: 100%;
			}

			#header {
				display: flex;
				gap: var(--uui-size-space-4);
				margin-right: var(--uui-size-layout-1);
				width: 100%;
			}

			uui-input {
				width: 100%;
			}

			uui-box {
				margin: var(--uui-size-layout-2);
			}

			uui-checkbox {
				margin-top: var(--uui-size-space-4);
			}
		`,
	];
}

export { UmbWorkspacePackageBuilderElement as element };

declare global {
	interface HTMLElementTagNameMap {
		'umb-workspace-package-builder': UmbWorkspacePackageBuilderElement;
	}
}
