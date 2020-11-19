import { ErrorCode } from './codes';
import { ErrorMessageReplacers } from './message.replacers';

// tslint:disable-next-line typedef variable-name (Acts like a type with static properties.)
export const ErrorMessage = {
  [ErrorCode.MissingName]: 'Name is required',
  [ErrorCode.GeneralError]: 'Sorry...',
  [ErrorCode.RequestFailed]: `Request finalized with error ${ErrorMessageReplacers.HttpErrorCode} - ${ErrorMessageReplacers.ErrorDescription}`,
};
