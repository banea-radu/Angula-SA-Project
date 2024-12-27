export type DbSubscriptionSession = {
  id: string;
  name: string;
  sessionsLeft: number;
  lastPaid: Date;
};

export type DbSubscriptionClient = {
  createdBy: string;
  dateCreated: Date;
  id: string;
  name: string;
};