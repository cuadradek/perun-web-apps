/**
 * Perun RPC API
 * Perun Remote Procedure Calls Application Programming Interface
 *
 * The version of the OpenAPI document: 3.9.0
 * Contact: perun@cesnet.cz
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

import { PerunException } from '../model/perunException';
import { UserRoles } from '../model/userRoles';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';



@Injectable({
  providedIn: 'root'
})
export class SetRoleService {

    protected basePath = 'https://perun.cesnet.cz/krb/rpc';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }



    /**
     * Set role for authorizedGroup and complementaryObject
     * @param role 
     * @param groups list of Group ids List&lt;Integer&gt;
     * @param complementaryObject Object (e.g.: vo | group | facility ) to associate role and user with.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public setRoleWithGroupComplementaryObject(role: UserRoles, groups: Array<number>, complementaryObject: object, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public setRoleWithGroupComplementaryObject(role: UserRoles, groups: Array<number>, complementaryObject: object, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public setRoleWithGroupComplementaryObject(role: UserRoles, groups: Array<number>, complementaryObject: object, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public setRoleWithGroupComplementaryObject(role: UserRoles, groups: Array<number>, complementaryObject: object, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (role === null || role === undefined) {
            throw new Error('Required parameter role was null or undefined when calling setRoleWithGroupComplementaryObject.');
        }
        if (groups === null || groups === undefined) {
            throw new Error('Required parameter groups was null or undefined when calling setRoleWithGroupComplementaryObject.');
        }
        if (complementaryObject === null || complementaryObject === undefined) {
            throw new Error('Required parameter complementaryObject was null or undefined when calling setRoleWithGroupComplementaryObject.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (role !== undefined && role !== null) {
            queryParameters = queryParameters.set('role', <any>role);
        }
        if (groups) {
            groups.forEach((element) => {
                queryParameters = queryParameters.append('groups[]', <any>element);
            })
        }
        if (complementaryObject !== undefined && complementaryObject !== null) {
            queryParameters = queryParameters.set('complementaryObject', <any>complementaryObject);
        }

        let headers = this.defaultHeaders;

        // authentication (ApiKeyAuth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (BearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.post<any>(`${this.configuration.basePath}/urlinjsonout/authzResolver/setRole/g-co`,
            null,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Set role for user and complementaryObject
     * @param role 
     * @param user id of User
     * @param complementaryObject Object (e.g.: vo | group | facility ) to associate role and user with.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public setRoleWithUserComplementaryObject(role: UserRoles, user: Array<number>, complementaryObject: object, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public setRoleWithUserComplementaryObject(role: UserRoles, user: Array<number>, complementaryObject: object, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public setRoleWithUserComplementaryObject(role: UserRoles, user: Array<number>, complementaryObject: object, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public setRoleWithUserComplementaryObject(role: UserRoles, user: Array<number>, complementaryObject: object, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (role === null || role === undefined) {
            throw new Error('Required parameter role was null or undefined when calling setRoleWithUserComplementaryObject.');
        }
        if (user === null || user === undefined) {
            throw new Error('Required parameter user was null or undefined when calling setRoleWithUserComplementaryObject.');
        }
        if (complementaryObject === null || complementaryObject === undefined) {
            throw new Error('Required parameter complementaryObject was null or undefined when calling setRoleWithUserComplementaryObject.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (role !== undefined && role !== null) {
            queryParameters = queryParameters.set('role', <any>role);
        }
        if (user) {
            user.forEach((element) => {
                queryParameters = queryParameters.append('user[]', <any>element);
            })
        }
        if (complementaryObject !== undefined && complementaryObject !== null) {
            queryParameters = queryParameters.set('complementaryObject', <any>complementaryObject);
        }

        let headers = this.defaultHeaders;

        // authentication (ApiKeyAuth) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // authentication (BasicAuth) required
        if (this.configuration.username || this.configuration.password) {
            headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
        }
        // authentication (BearerAuth) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.post<any>(`${this.configuration.basePath}/urlinjsonout/authzResolver/setRole/u-co`,
            null,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
