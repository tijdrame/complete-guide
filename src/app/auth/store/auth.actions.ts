import { Action } from '@ngrx/store';

export const LOGIN_START = '[AUTH]LOGIN START';
export const AUTHENTICATE_SUCCESS = '[AUTH]LOGIN';
export const AUTHENTICATION_FAIL = '[AUTH]LOGIN FAIL';
export const SIGNUP_START = '[AUTH]SIGNUP START';
export const SIGNUP = '[AUTH]SIGNUP';
export const CLEAR_ERROR = '[AUTH]CLEAR ERROR';
export const AUTO_LOGIN = '[AUTH]AUTO LOGIN';
export const LOGOUT = '[AUTH]LOGOUT';

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    }
  ) { }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string; password: string }) { }
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATION_FAIL;
  constructor(public payload: string) { }
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor(public payload: { email: string; password: string }) { }
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AuthActions = AuthenticateSuccess | Logout | LoginStart |
  AuthenticateFail | SignupStart | ClearError | AutoLogin;