/* eslint-disable prettier/prettier */
import { v4 as uuidv4 } from 'uuid';
/* eslint-disable prettier/prettier */
export class ProviderModel {
  id: string;
  providerName: string;

  public constructor(name: string) {
    this.id = uuidv4();
    this.providerName = name;
  }
}
