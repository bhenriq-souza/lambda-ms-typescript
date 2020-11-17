import { ErrorCode } from './codes';

// tslint:disable-next-line typedef variable-name (Acts like a type with static properties.)
export const ErrorMessage = {
  [ErrorCode.MissingName]: 'Name is required',
  [ErrorCode.GeneralError]: 'Sorry...',
};
