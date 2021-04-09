export default interface Question {
  id?: number;
  userId: number | undefined;
  title: string;
  body: string;
  slug: string;
}
