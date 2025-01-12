export type DbSubscriptionSession = {
  clientId: string;
  createdBy: string;
  dateCreated: Date;
  datePaid: Date;
  id: string;
  status: DbSubscriptionSessionStatus;
  subscriptionSessionsType: number;
}

export type DbSubscriptionClient = {
  createdBy: string;
  dateCreated: Date;
  id: string;
  name: string;
}

export type DbSubscriptionSessionStatus = 'AVAILABLE' | 'USED';