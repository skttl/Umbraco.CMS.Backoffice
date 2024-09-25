import type { UmbBlockDataValueModel, UmbBlockExposeModel, UmbBlockValueType } from '../types.js';
import type { UmbContentValueModel } from '@umbraco-cms/backoffice/content';
import type {
	UmbPropertyValueResolver,
	UmbPropertyValueResolverEnsureVariantArgs,
} from '@umbraco-cms/backoffice/property';

export class UmbBlockValueResolver
	implements UmbPropertyValueResolver<UmbContentValueModel<UmbBlockValueType>, UmbBlockDataValueModel>
{
	async processValues(
		property: UmbContentValueModel<UmbBlockValueType>,
		valuesCallback: (values: Array<UmbBlockDataValueModel>) => Promise<Array<UmbBlockDataValueModel> | undefined>,
	) {
		if (property.value) {
			const contentData = await Promise.all(
				property.value.contentData?.map(async (entry) => ({
					...entry,
					values: (await valuesCallback(entry.values)) ?? [],
				})),
			);
			const settingsData = await Promise.all(
				property.value.settingsData?.map(async (entry) => ({
					...entry,
					values: (await valuesCallback(entry.values)) ?? [],
				})),
			);

			return {
				...property,
				value: {
					...property.value,
					contentData,
					settingsData,
				},
			};
		}
		return property;
	}

	async ensureVariants(
		property: UmbContentValueModel<UmbBlockValueType>,
		args: UmbPropertyValueResolverEnsureVariantArgs,
	) {
		if (property.value && args.selectedVariants) {
			const currentExposes = property.value.expose ?? [];
			const contentKeys = property.value.contentData.map((x) => x.key);

			const newExposes = contentKeys.flatMap((contentKey) =>
				args.selectedVariants.map((v) => ({
					contentKey: contentKey,
					culture: v.culture,
					segment: v.segment,
				})),
			) as Array<UmbBlockExposeModel>;

			// make exposes unique:
			const expose = [
				...currentExposes,
				...newExposes.filter(
					(n) =>
						!currentExposes.some(
							(p) => p.contentKey === n.contentKey && p.culture === n.culture && p.segment === n.segment,
						),
				),
			];

			return {
				...property,
				value: {
					...property.value,
					expose,
				},
			};
		}
		return property;
	}

	destroy(): void {}
}
