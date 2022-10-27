import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import type { UUIButtonState } from '@umbraco-ui/uui';
import type { UmbNotificationDefaultData } from '../../../../core/services/notification/layouts/default';
import type { UmbNotificationService } from '../../../../core/services/notification';
import { UmbUserGroupContext } from '../user-group.context';
import { UmbContextConsumerMixin } from '@umbraco-cms/context-api';
import { UmbUserGroupStore } from 'src/core/stores/user/user-group.store';

@customElement('umb-editor-action-user-group-save')
export class UmbEditorActionUserGroupSaveElement extends UmbContextConsumerMixin(LitElement) {
	static styles = [UUITextStyles, css``];

	@state()
	private _saveButtonState?: UUIButtonState;

	private _userGroupStore?: UmbUserGroupStore;
	private _userGroupContext?: UmbUserGroupContext;
	private _notificationService?: UmbNotificationService;

	connectedCallback(): void {
		super.connectedCallback();

		this.consumeAllContexts(['umbUserGroupStore', 'umbUserGroupContext', 'umbNotificationService'], (instances) => {
			this._userGroupStore = instances['umbUserGroupStore'];
			this._userGroupContext = instances['umbUserGroupContext'];
			this._notificationService = instances['umbNotificationService'];
		});
	}

	private async _handleSave() {
		// TODO: What if store is not present, what if node is not loaded....
		if (!this._userGroupStore || !this._userGroupContext) return;

		try {
			this._saveButtonState = 'waiting';
			const user = this._userGroupContext.getData();
			await this._userGroupStore.save([user]);
			const data: UmbNotificationDefaultData = { message: 'User Saved' };
			this._notificationService?.peek('positive', { data });
			this._saveButtonState = 'success';
		} catch (error) {
			this._saveButtonState = 'failed';
		}
	}

	render() {
		return html`<uui-button
			@click=${this._handleSave}
			look="primary"
			color="positive"
			label="save"
			.state="${this._saveButtonState}"></uui-button>`;
	}
}

export default UmbEditorActionUserGroupSaveElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-editor-action-user-group-save': UmbEditorActionUserGroupSaveElement;
	}
}
