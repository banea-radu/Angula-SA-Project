export type DbSubscriptionSession = {
  clientId: string;
  createdBy: string;
  dateCreated: Date;
  datePaid: Date;
  id: string;
  type: string;
  status: DbSubscriptionSessionStatus;
}

export type DbSubscriptionClient = {
  createdBy: string;
  dateCreated: Date;
  id: string;
  name: string;
}

type DbSubscriptionSessionStatus = 'AVAILABLE' | 'USED';