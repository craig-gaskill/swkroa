import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {BaseService} from '../base.service';
import {Dictionary} from './dictionary';
import {DictionaryValue} from './dictionary-value';

/**
 * Interface used by consumers of this API to configure the URL of the application-specific endpoint.
 * When implementing, set {@code baseUrl} to the API base with the dictionary endpoint appended.
 * It is recommended to store this in an {@code environment} file.
 */
export interface DictionaryServiceConfig {
  baseUrl: string;
}

/**
 * Service used to get dictionaries and their values. {@link DictionaryServiceConfig} must be implemented in the calling app.
 * To provide your implementation, add the following to your root module <code>providers</code> array:
 * <code>{ provide: "DictionaryServiceConfig", useClass: **Implemented class name** }</code>
 */
@Injectable({
  providedIn: 'root'
})
export class DictionaryService extends BaseService {
  private readonly BASE_URL: string;

  constructor(private _httpClient: HttpClient,
              @Inject('DictionaryServiceConfig') private config: DictionaryServiceConfig
  ) {
    super();
    this.BASE_URL = config.baseUrl;
  }

  /**
   * Get the list of available dictionaries.
   *
   * @param start Optional low-end parameter used in pagination. Set to <code>pageSize * (pageNumber - 1)</code>.
   * @param limit Optional high-end parameter used in pagination. Set to <code>pageSize</code>.
   * @param name Optional search parameter used to filter the returned results.
   *
   * @returns An {@link Observable} of {@link Dictionary} objects.
   */
  public getDictionaries(start = 0, limit = 20, name?: string): Observable<Dictionary[]> {
    let params = new HttpParams()
      .set('start', start.toString())
      .set('limit', limit.toString());

    if (name != null) {
      params = params.set('name', name);
    }

    return this._httpClient.get<any>(this.BASE_URL, {params})
      .pipe(
        this.deserializeJsonArray(Dictionary),
        catchError(this.handleError)
      );
  }

  /**
   * Get a {@link Dictionary} by its unique meaning.
   *
   * @param meaning The meaning of the dictionary to get.
   * @param include Extra values to return. Valid options are ("values", "attributes").
   *
   * @returns An {@link Observable} representing the found {@link Dictionary}.
   */
  public getDictionaryByMeaning(meaning: string, include: string[] = []): Observable<Dictionary> {
    let params = new HttpParams();
    if (include && include.length > 0) {
      for (const inc of include) {
        params = params.append('with', inc);
      }
    }

    const url = `${this.BASE_URL}/${meaning}`;

    return this._httpClient.get<any>(url, {params})
      .pipe(
        this.deserializeJsonObject(Dictionary),
        catchError(this.handleError)
      );
  }

  /**
   * Create a {@link Dictionary}.
   *
   * @param dictionary The {@link Dictionary} to create.
   *
   * @returns An {@link Observable} that returns the added {@link Dictionary}, null if not added.
   */
  public createDictionary(dictionary: Dictionary): Observable<Dictionary> {
    const body = this.serializeJson(dictionary);

    return this._httpClient.post<Dictionary>(`${this.BASE_URL}`, body)
      .pipe(
        this.deserializeJsonObject(Dictionary),
        catchError(this.handleError)
      );
  }

  /**
   * Updates the {@link Dictionary}.
   *
   * @param dictionary The {@link Dictionary} to update.
   *
   * @returns An {@link Observable} that returns the updated {@link Dictionary}, null if not added.
   */
  public updateDictionary(dictionary: Dictionary): Observable<Dictionary> {
    const url  = `${this.BASE_URL}/${dictionary.dictionaryId}`;
    const body = this.serializeJson(dictionary);

    return this._httpClient.put<Dictionary>(url, body)
      .pipe(
        this.deserializeJsonObject(Dictionary),
        catchError(this.handleError)
      );
  }

  /**
   * Deletes the {@link Dictionary}.
   *
   * @param dictionary The {@link Dictionary} to delete.
   *
   * @returns An {@link Observable} that returns a boolean to indicate if the delete was successful.
   */
  public deleteDictionary(dictionary: Dictionary): Observable<boolean> {
    const url  = `${this.BASE_URL}/${dictionary.dictionaryId}`;

    return this._httpClient.delete<boolean>(url, {observe: 'response'})
      .pipe(
        map(response => response.status === 204),
        catchError(this.handleError)
      );
  }

  /**
   * Get a list of dictionary values from a given dictionary.
   *
   * @param meaning The dictionary to get values from.
   * @param start Optional low-end parameter used in pagination. Set to <code>pageSize * (pageNumber - 1)</code>.
   * @param limit Optional high-end parameter used in pagination. Set to <code>pageSize</code>.
   * @param name Optional search parameter used to filter the returned results.
   * @param include Extra values to return. Valid options are ("mappings", "attributes").
   *
   * @returns An {@link Observable} of {@link DictionaryValue} objects.
   */
  public getDictionaryValues(meaning: string,
                             start = 0,
                             limit = 20,
                             name: string = null,
                             include: string[] = []): Observable<DictionaryValue[]> {
    let params = new HttpParams()
      .set('start', start.toString())
      .set('limit', limit.toString());

    if (name != null) {
      params = params.set('name', name);
    }
    if (include && include.length > 0) {
      for (const inc of include) {
        params = params.append('with', inc);
      }
    }

    const url = `${this.BASE_URL}/${meaning}/values`;

    return this._httpClient.get<any>(url, {params})
      .pipe(
        this.deserializeJsonArray(DictionaryValue),
        catchError(this.handleError)
      );
  }

  /**
   * Get a single {@link DictionaryValue} from a given dictionary.
   *
   * @param dictionaryMeaning The dictionary to get a value from.
   * @param dictionaryValue The ID or Meaning of the dictionary value to retrieve.
   * @param include An optional array of additional parameters (such as <code>mapping</code> or <code>attributes</code>).
   *
   * @returns An {@link Observable} representing a {@link DictionaryValue} object or null.
   */
  public getDictionaryValue(dictionaryMeaning: string, dictionaryValue: number|string, include: string[] = [])
    : Observable<DictionaryValue> {

    let params = new HttpParams();
    if (include && include.length > 0) {
      for (const inc of include) {
        params = params.append('with', inc);
      }
    }

    const url = `${this.BASE_URL}/${dictionaryMeaning}/values/${dictionaryValue}`;

    return this._httpClient.get<DictionaryValue>(url, {params})
      .pipe(
        this.deserializeJsonObject(DictionaryValue),
        catchError(this.handleError)
      );
  }

  /**
   * Create a {@link DictionaryValue} in a given dictionary.
   *
   * @param meaning The dictionary to add a value to.
   * @param dictionaryValue The value to add.
   *
   * @returns An {@link Observable} that returns the added {@link DictionaryValue}, null if not added.
   */
  public createDictionaryValue(meaning: string, dictionaryValue: DictionaryValue): Observable<DictionaryValue> {
    const url = `${this.BASE_URL}/${meaning}/values`;
    const body = this.serializeJson(dictionaryValue);

    return this._httpClient.post<DictionaryValue>(url, body)
      .pipe(
        this.deserializeJsonObject(DictionaryValue),
        catchError(this.handleError)
      );
  }

  /**
   * Update a {@link DictionaryValue} in a given dictionary.
   *
   * @param meaning The dictionary to update the value to.
   * @param dictionaryValue The updated value (which one to update is determined by ID).
   *
   * @returns An {@link Observable} that returns the updated {@link DictionaryValue}, null if not added.
   */
  public updateDictionaryValue(meaning: string, dictionaryValue: DictionaryValue): Observable<DictionaryValue> {
    const url = `${this.BASE_URL}/${meaning}/values/${dictionaryValue.dictionaryValueId}`;
    const body = this.serializeJson(dictionaryValue);

    return this._httpClient.put<DictionaryValue>(url, body)
      .pipe(
        this.deserializeJsonObject(DictionaryValue),
        catchError(this.handleError)
      );
  }

  /**
   * Delete a {@link DictionaryValue} from a given dictionary.
   *
   * @param meaning The dictionary to delete the value from.
   * @param dictionaryValue The value to delete.
   *
   * @returns An {@link Observable} that returns whether or not the delete was successful.
   */
  public deleteDictionaryValue(meaning: string, dictionaryValue: DictionaryValue): Observable<boolean> {
    const url = `${this.BASE_URL}/${meaning}/values/${dictionaryValue.dictionaryValueId}`;

    return this._httpClient.delete<boolean>(url, {observe: 'response'})
      .pipe(
        map(response => response.status === 204),
        catchError(this.handleError)
      );
  }
}
