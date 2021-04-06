export default interface Session {
  id?: number | undefined;
  userId: number;
  token: string;
  active: boolean;
}
