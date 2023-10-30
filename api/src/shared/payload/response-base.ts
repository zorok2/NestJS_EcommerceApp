/* eslint-disable prettier/prettier */
import { v4 as uuidv4 } from 'uuid';
export enum ResponseStatus {
  Success = 'Success',
  Failure = 'Failure',
}
export class ResponseBase {
  public readonly id: string;
  public readonly timestamp: Date;
  public readonly apiVersion: string;
  public readonly status: string;
  public readonly message: string;
  public readonly data: any;

  constructor(status: string, message: string, data?: any) {
    this.id = uuidv4();
    this.timestamp = new Date();
    this.apiVersion = '1.0'; // or get from configuration or environment variable
    this.status = status;
    this.message = message;
    this.data = data;
  }

  protected toJSON(): any {
    return {
      id: this.id,
      timestamp: this.timestamp.toISOString(),
      apiVersion: this.apiVersion,
      status: this.status,
      message: this.message,
      data: this.data,
    };
  }
}
