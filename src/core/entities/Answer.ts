export default interface Answer {
  id?: number;
  questionId: number;
  userId: number | undefined;
  body: string;
  accepted?: boolean;
  votes?: number;
}
