export default interface Session {
  id?: number | undefined;
  userId: number | undefined;
  token: string;
  active: boolean;
}
