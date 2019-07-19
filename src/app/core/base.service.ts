import {JsonConvert, OperationMode, ValueCheckingMode} from 'json2typescript';
import {map} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

export abstract class BaseService {
  protected readonly JSON_CONVERT = new JsonConvert(OperationMode.ENABLE, ValueCheckingMode.DISALLOW_NULL);

  /**
   * Custom operator to deserialize a single object of a given type. Tslint is disabled because it thinks the semicolon is unnecessary.
   *
   * "type: new(...args: any[]) => any" indicates a Class object ("new" refers to the structure of the constructor function of the class),
   * see https://stackoverflow.com/a/39393254/4504895
   *
   * This is a function that returns a partially applied function where the data (called res) is supplied later in a process otherwise known
   * as currying. The "pipe" operator demands functions be composed in this manner.
   * More info on currying: https://stackoverflow.com/a/36321/4504895
   */
  public deserializeJsonObject = (type: new(...args: any[]) => any) =>
    map(result => result ? this.JSON_CONVERT.deserialize(result, type) : undefined)

  /**
   * Custom operator to deserialize an Array of a given type. Tslint is disabled because it thinks the semicolon is unnecessary.
   *
   * "type: new(...args: any[]) => any" indicates a Class object ("new" refers to the structure of the constructor function of the class),
   * see https://stackoverflow.com/a/39393254/4504895
   *
   * This is a function that returns a partially applied function where the data (called res) is supplied later in a process otherwise known
   * as currying. The "pipe" operator demands functions be composed in this manner.
   * More info on currying: https://stackoverflow.com/a/36321/4504895
   */
  public deserializeJsonArray = (type: new(...args: any[]) => any) =>
    map((results: any[]) => results ? this.JSON_CONVERT.deserializeArray(results, type) : [])

  /**
   * Serialize an object to JSON. Uses the @code json2typescript framework to do so and does not modify the result in any way.
   * @param data The object to serialize.
   * @returns The serialized object. {@code json2typescript} makes no guarantee as to whether this is a {@link String} or not.
   */
  public serializeJson(data: any): any {
    return this.JSON_CONVERT.serialize(data);
  }

  public handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error);
  }
}
