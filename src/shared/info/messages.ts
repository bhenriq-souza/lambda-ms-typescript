import { InfoCode } from './codes';
import { InfoMessageReplacers } from './message.replacers';

// tslint:disable-next-line typedef variable-name (Acts like a type with static properties.)
export const InfoMessage = {
  [InfoCode.GeneralInfo]: 'This is a info!',
  [InfoCode.RequestReceived]: `${InfoMessageReplacers.HttpMethod} request received`,
  [InfoCode.RequestSuccess]: `${InfoMessageReplacers.HttpMethod} request finalized with success in ${InfoMessageReplacers.RequestTime}ms`,
};
