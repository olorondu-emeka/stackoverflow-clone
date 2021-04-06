import User from 'core/entities/User';

export interface DataObject {
  [index: string]: string | number | boolean | User;
}

export interface ResponseObject {
  message: string;
  status: string;
  data: DataObject | null;
}

export interface FinalResponse {
  statusCode: number;
  data: ResponseObject;
}
