export enum ResponseCodes {
  SUCCESS = 'SUCCESS',

  CLIENT_ERROR = 'CLIENT_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  MAILER_ERROR = 'MAILER_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
}

export enum Messages {
  /**
   * * Auth
   */

  AUTH_ACTIVATE_ACCOUNT_DEFAULT = 'Please wait, we will activate your account!',
  AUTH_ACTIVATE_ACCOUNT_SUCCESS = 'Your account has already activated, thanks!',
  AUTH_LOGIN = 'You are logged in your account!',
  AUTH_REGISTER = 'Registration successful! Please activate your account via your email, thanks!',
  AUTH_LOGOUT = 'Logged out success!',

  /**
   * * Errors
   */

  TOKEN_ERR = 'Token expired or undefined!',
  ERR = 'Something went wrong! Please try again!',
  VALIDATION_ERR = 'Please, fill all fields correctly!',

  /**
   * * Video
   */

  VIDEO_WISHLIST_ADDED = 'Video has been added to your wishlist!',
  VIDEO_WISHLIST_DELETED = 'Video has been deleted from your wishlist!',

  VIDEO_LATER_LIST_ADDED = 'Video has been added to your later list!',
  VIDEO_LATER_LIST_DELETED = 'Video has been deleted from your later list!',

  /**
   * * User
   */

  USER_UNDEFINED = 'Please log in your account!',
  USER_PROFILE_EDITED = 'Your profile successful updated!',

  /**
   * * Room
   */

  ROOM_NOT_FOUND = 'Error! Room not found!',
}