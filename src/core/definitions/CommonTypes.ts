export interface DataObject {
  [index: string]: string | number | boolean;
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
