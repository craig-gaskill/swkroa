import {AuthenticationStatus} from './authentication-status.enum';

export class AuthorizedUser {
  constructor(private _userId: number,
              private _status: AuthenticationStatus,
              private _issueDate: Date,
              private _expiryDate: Date
  ) {
  }

  /**
   * @return The identifier for the User that is currently authenticated.
   */
  public get userId(): number {
    return this._userId;
  }

  /**
   * @return The status of the current authentication.
   */
  public get status(): AuthenticationStatus {
    return this._status;
  }

  /**
   * @return The date the token was issued.
   */
  public get issueDate(): Date {
    return this._issueDate;
  }

  /**
   * @return The date the token has or will expire.
   */
  public get expiryDate(): Date {
    return this._expiryDate;
  }

  /**
   * @return If the token has expired.
   */
  public get isExpired(): boolean {
    if (!this._expiryDate) {
      // if there is no expiry date, we will assume it never expires
      return false;
    }

    return !(this._expiryDate.getTime() > new Date().valueOf());
  }

  /**
   * @return If the User is currently authenticated to proceed
   */
  public get isAuthenticated(): boolean {
    return !!(!this.isExpired &&
             (this._status === AuthenticationStatus.STATUS_VALID || this._status === AuthenticationStatus.STATUS_TEMPORARY));
  }

  /**
   * @return If the User must change their password.
   */
  public get mustChangePassword(): boolean {
    return !!(this._status === AuthenticationStatus.STATUS_EXPIRED || this._status === AuthenticationStatus.STATUS_TEMPORARY);
  }
}
