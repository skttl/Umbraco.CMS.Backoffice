/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HealthCheckActionRequestModel } from '../models/HealthCheckActionRequestModel';
import type { HealthCheckGroupPresentationModel } from '../models/HealthCheckGroupPresentationModel';
import type { HealthCheckGroupWithResultResponseModel } from '../models/HealthCheckGroupWithResultResponseModel';
import type { HealthCheckResultResponseModel } from '../models/HealthCheckResultResponseModel';
import type { PagedHealthCheckGroupResponseModel } from '../models/PagedHealthCheckGroupResponseModel';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class HealthCheckResource {
    /**
     * @returns PagedHealthCheckGroupResponseModel Success
     * @throws ApiError
     */
    public static getHealthCheckGroup({
        skip,
        take = 100,
    }: {
        skip?: number,
        take?: number,
    }): CancelablePromise<PagedHealthCheckGroupResponseModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/umbraco/management/api/v1/health-check-group',
            query: {
                'skip': skip,
                'take': take,
            },
            errors: {
                401: `The resource is protected and requires an authentication token`,
            },
        });
    }
    /**
     * @returns any Success
     * @throws ApiError
     */
    public static getHealthCheckGroupByName({
        name,
    }: {
        name: string,
    }): CancelablePromise<HealthCheckGroupPresentationModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/umbraco/management/api/v1/health-check-group/{name}',
            path: {
                'name': name,
            },
            errors: {
                401: `The resource is protected and requires an authentication token`,
                404: `Not Found`,
            },
        });
    }
    /**
     * @returns any Success
     * @throws ApiError
     */
    public static postHealthCheckGroupByNameCheck({
        name,
    }: {
        name: string,
    }): CancelablePromise<HealthCheckGroupWithResultResponseModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/umbraco/management/api/v1/health-check-group/{name}/check',
            path: {
                'name': name,
            },
            errors: {
                401: `The resource is protected and requires an authentication token`,
                404: `Not Found`,
            },
        });
    }
    /**
     * @returns any Success
     * @throws ApiError
     */
    public static postHealthCheckExecuteAction({
        requestBody,
    }: {
        requestBody?: HealthCheckActionRequestModel,
    }): CancelablePromise<HealthCheckResultResponseModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/umbraco/management/api/v1/health-check/execute-action',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `The resource is protected and requires an authentication token`,
            },
        });
    }
}
