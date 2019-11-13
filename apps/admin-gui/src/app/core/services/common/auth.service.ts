import { EventEmitter, Injectable, Injector } from '@angular/core';
import {User, UserManager, UserManagerSettings} from 'oidc-client';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';

export function getClientSettings(appConfig: any): UserManagerSettings {
  const instanceConfig = appConfig.oidc_client;
  return {
    authority: instanceConfig.oauth_authority,
    client_id: instanceConfig.oauth_client_id,
    redirect_uri: instanceConfig.oauth_redirect_uri,
    post_logout_redirect_uri: instanceConfig.oauth_post_logout_redirect_uri,
    response_type: 'id_token token',
    scope: 'openid profile perun_api perun_admin',
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    silent_redirect_uri: instanceConfig.oauth_silent_redirect_uri
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router: Router;

  constructor(
    private injector: Injector
  ) {
    setTimeout(() => {
      this.router = this.injector.get(Router);
    });
  }
  manager: UserManager;

  userSet: EventEmitter<User> = new EventEmitter<User>();

  user: User = null;
  loggedIn = false;

  redirectUrl: string;


  getUserManager(): UserManager {
    return this.manager;
  }

  loadConfigData(config: any) {
    this.manager = new UserManager(getClientSettings(config));
    this.setUser();
    this.manager.events.addUserLoaded(user => {
      this.user = user;
    });
  }

  authenticate(): Promise<any> {
    const currentPathname = window.location.pathname;

    if (currentPathname === '/api-callback') {
      return this.handleAuthCallback();
    } else {
      return this.verifyAuthentication(currentPathname);
    }
  }

  isLoggedInPromise(): Observable<boolean> {
    return from(this.manager.getUser()).pipe(map<User, boolean>((user) => {
      if (user) {
        return true;
      } else {
        return false;
      }
    }));
  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  getClaims(): any {
    return this.user.profile;
  }

  getAuthorizationHeaderValue(): string {
    return 'Bearer ' + this.user.access_token;
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
      this.user = user;
      this.userSet.emit(this.user);
    });
  }

  startSigninMainWindow() {
    this.manager.signinRedirect({ data: this.redirectUrl }).then(function () {
      console.log('signinRedirect done');
    }).catch(function (err) {
      console.log(err);
    });
  }

  setUser() {
    this.manager.getUser().then( user => {
      this.user = user;
    });
  }

  /**
   * Check if the user is logged in and if not,
   * save current path and start authentication;
   *
   * @param path current url path
   */
  private verifyAuthentication(path: string): Promise<any> {
    return this.isLoggedInPromise()
      .toPromise()
      .then(isLoggedIn => {
      if (!isLoggedIn) {
        sessionStorage.setItem('auth:redirect', path);
        this.startAuthentication().then(r => console.log('R:' + r));
      }
    });
  }

  /**
   * This method is used to handle oauth callbacks.
   *
   * First, it finishes the authentication and then redirects user to the url
   * he wanted to visit.
   *
   */
  private handleAuthCallback(): Promise<any> {
    return this.completeAuthentication().then(() => {
      const redirectUrl = sessionStorage.getItem('auth:redirect');
      if (redirectUrl) {
        sessionStorage.removeItem('auth:redirect');
        this.router.navigate([redirectUrl]);
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}