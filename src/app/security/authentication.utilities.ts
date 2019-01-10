import {AuthorizedUser} from './authorized-user.model';
import {AuthenticationStatus} from './authentication-status.enum';

export class AuthenticationUtilities {
  public static decodeToken(token: string, loginStatus: string): AuthorizedUser {
    if (!token) {
      return undefined;
    }

    const sections: string[] = token.split('.');
    if (!sections || sections.length !== 3) {
      return undefined;
    }

    // the 2nd section contains the claim information
    const decodedClaim = JSON.parse(atob(sections[1]));

    const userId        = Number(decodedClaim.sub);
    const issueDate     = new Date(0);
    const expiryDate    = new Date(0);

    let status: AuthenticationStatus = AuthenticationStatus.STATUS_INVALID;
    switch (loginStatus) {
      case 'DISABLED':
        status = AuthenticationStatus.STATUS_DISABLED;
        break;

      case 'LOCKED':
        status = AuthenticationStatus.STATUS_LOCKED;
        break;

      case 'EXPIRED':
        status = AuthenticationStatus.STATUS_EXPIRED;
        break;

      case 'TEMPORARY':
        status = AuthenticationStatus.STATUS_TEMPORARY;
        break;

      case 'VALID':
        status = AuthenticationStatus.STATUS_VALID;
        break;
    }

    issueDate.setUTCSeconds(Number(decodedClaim.iat));
    expiryDate.setUTCSeconds(Number(decodedClaim.exp));

    return new AuthorizedUser(userId, status, issueDate, expiryDate);
  }
}
