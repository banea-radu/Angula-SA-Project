export interface DbContact {
  dateSubmitted: Date;
  email: string;
  message: string;
  name: string;
  reply?: string;
  subject: string;
}