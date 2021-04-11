import User from 'core/entities/User';
import Question from 'core/entities/Question';
import {
  QuestionArray,
  QuestionNotificationArray
} from 'data/interfaces/question';

export interface DataObject {
  [index: string]:
    | string
    | number
    | boolean
    | User
    | Question
    | QuestionArray
    | QuestionNotificationArray
    | null;
}

// export interface QuestionDataObject {
//   [index: string]: string | number | boolean | User | Question;
// }

export interface ResponseObject {
  message: string;
  status: string;
  data: DataObject | null;
}

export interface FinalResponse {
  statusCode: number;
  data: ResponseObject;
}
