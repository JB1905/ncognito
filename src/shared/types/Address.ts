import { IncognitoPattern } from '../enums/IncognitoPattern';

export interface Address {
  readonly url: string;
  readonly type: IncognitoPattern;
};
