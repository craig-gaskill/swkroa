import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Dictionary} from '../dictionary/dictionary';
import {DictionaryValue} from '../dictionary/dictionary-value';
import {JsonServiceUtil} from '../utils/JsonServiceUtils';

/**
 * Service used to get dictionaries and their values. {@link DictionaryServiceConfig} must be implemented in the calling app.
 * To provide your implementation, add the following to your root module <code>providers</code> array:
 * <code>{ provide: "PlatformDictionaryServiceConfig", useClass: **Implemented class name** }</code>
 */
@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  private readonly baseUrl: string;

  constructor(private httpClient: HttpClient, @Inject('PlatformDictionaryServiceConfig') private config: DictionaryServiceConfig) {
    this.baseUrl = config.baseUrl;
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
  public getDictionaries(start = 0, limit = 20, name: string = null): Observable<Dictionary[]> {
    let params = new HttpParams()
      .set('start', start.toString())
      .set('limit', limit.toString());

    if (name != null) {
      params = params.set('name', name);
    }

    return this.httpClient.get<any>(this.baseUrl, {params: params})
      .pipe(JsonServiceUtil.deserializeArray(Dictionary));
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

    const url = `${this.baseUrl}/${meaning}`;

    return this.httpClient.get<any>(url, {params: params})
      .pipe(JsonServiceUtil.deserializeSingle(Dictionary));
  }

  /**
   * Create a {@link Dictionary}.
   *
   * @param dictionary The {@link Dictionary} to create.
   * @param source The source from which the dictionary is being added.
   *
   * @returns An {@link Observable} that returns the added {@link Dictionary}, null if not added.
   */
  public createDictionary(dictionary: Dictionary, source: string): Observable<Dictionary> {
    const sourceHeader = new HttpHeaders()
      .set('Source', source);

    const body = JsonServiceUtil.serialize(dictionary);

    return this.httpClient.post<Dictionary>(`${this.baseUrl}`, body, {headers: sourceHeader})
      .pipe(JsonServiceUtil.deserializeSingle(Dictionary));
  }

  /**
   * Updates the {@link Dictionary}.
   *
   * @param dictionary The {@link Dictionary} to update.
   * @param source The source from which the dictionary is being updated.
   *
   * @returns An {@link Observable} that returns the updated {@link Dictionary}, null if not added.
   */
  public updateDictionary(dictionary: Dictionary, source: string): Observable<Dictionary> {
    const sourceHeader = new HttpHeaders()
      .set('Source', source);

    const url  = `${this.baseUrl}/${dictionary.dictionaryId}`;
    const body = JsonServiceUtil.serialize(dictionary);

    return this.httpClient.put<Dictionary>(url, body, {headers: sourceHeader})
      .pipe(JsonServiceUtil.deserializeSingle(Dictionary));
  }

  /**
   * Deletes the {@link Dictionary}.
   *
   * @param dictionary The {@link Dictionary} to delete.
   * @param source The source from which the dictionary was deleted.
   *
   * @returns An {@link Observable} that returns a boolean to indicate if the delete was successful.
   */
  public deleteDictionary(dictionary: Dictionary, source: string): Observable<boolean> {
    const sourceHeader = new HttpHeaders()
      .set('Source', source);

    const url  = `${this.baseUrl}/${dictionary.dictionaryId}`;

    return this.httpClient.delete<boolean>(url, {headers: sourceHeader, observe: 'response'})
      .pipe(map(response => response.status === 204));
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

    const url = `${this.baseUrl}/${meaning}/values`;

    return this.httpClient.get<any>(url, {params: params})
      .pipe(JsonServiceUtil.deserializeArray(DictionaryValue));
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

    const url = `${this.baseUrl}/${dictionaryMeaning}/values/${dictionaryValue}`;

    return this.httpClient.get<DictionaryValue>(url, {params: params})
      .pipe(JsonServiceUtil.deserializeSingle(DictionaryValue));
  }

  /**
   * Create a {@link DictionaryValue} in a given dictionary.
   *
   * @param meaning The dictionary to add a value to.
   * @param dictionaryValue The value to add.
   * @param source The source from which the value is being added.
   *
   * @returns An {@link Observable} that returns the added {@link DictionaryValue}, null if not added.
   */
  public createDictionaryValue(meaning: string, dictionaryValue: DictionaryValue, source: string): Observable<DictionaryValue> {
    const sourceHeader = new HttpHeaders()
      .set('Source', source);

    const url = `${this.baseUrl}/${meaning}/values`;
    const body = JsonServiceUtil.serialize(dictionaryValue);

    return this.httpClient.post<DictionaryValue>(url, body, {headers: sourceHeader})
      .pipe(JsonServiceUtil.deserializeSingle(DictionaryValue));
  }

  /**
   * Update a {@link DictionaryValue} in a given dictionary.
   *
   * @param meaning The dictionary to update the value to.
   * @param dictionaryValue The updated value (which one to update is determined by ID).
   * @param source The source from which the value is being updated.
   *
   * @returns An {@link Observable} that returns the updated {@link DictionaryValue}, null if not added.
   */
  public updateDictionaryValue(meaning: string, dictionaryValue: DictionaryValue, source: string): Observable<DictionaryValue> {
    const sourceHeader = new HttpHeaders()
      .set('Source', source);

    const url = `${this.baseUrl}/${meaning}/values/${dictionaryValue.dictionaryValueId}`;
    const body = JsonServiceUtil.serialize(dictionaryValue);

    return this.httpClient.put<DictionaryValue>(url, body, {headers: sourceHeader})
      .pipe(JsonServiceUtil.deserializeSingle(DictionaryValue));
  }

  /**
   * Delete a {@link DictionaryValue} from a given dictionary.
   *
   * @param meaning The dictionary to delete the value from.
   * @param dictionaryValue The value to delete.
   * @param source The source from which the value is being deleted.
   *
   * @returns An {@link Observable} that returns whether or not the delete was successful.
   */
  public deleteDictionaryValue(meaning: string, dictionaryValue: DictionaryValue, source: string): Observable<boolean> {
    const sourceHeader = new HttpHeaders()
      .set('Source', source);

    const url = `${this.baseUrl}/${meaning}/values/${dictionaryValue.dictionaryValueId}`;

    return this.httpClient.delete<boolean>(url, {headers: sourceHeader, observe: 'response'})
      .pipe(map(response => response.status === 204));
  }
}

/**
 * Interface used by consumers of this API to configure the URL of the application-specific endpoint.
 * When implementing, set {@code baseUrl} to the API base with the dictionary endpoint appended.
 * It is recommended to store this in an {@code environment} file.
 */
export interface DictionaryServiceConfig {
  baseUrl: string;
}
