export type Address = {
  simpleValue?: string;
  street?: string;
  city?: string;
  postCode?: string | number;
};

export type Price = {
  priceZone?: string;
  priceType?: string;
  product?: string;
  net?: number;
  gross?: number;
  currency?: string;
  custNr?: string | null;
};

export type Company = {
  id: string;
  country?: string;
  regNo?: string | null;
  vatNo?: string[] | null;
  safeNo?: string;
  name: string;
  tradingNames?: string[] | null;
  tradingNamesText?: string;
  address?: Address;
  status?: string;
  type?: string;
  dateOfLatestAccounts?: string | null;
  dateOfLatestChange?: string | null;
  matchScore?: number;
  statusDescription?: string;
  previousNames?: string[] | null;
  pricing?: Price[];
};

export type CustomerQueryResult = {
  correlationId?: string;
  totalSize?: number;
  companies?: Company[];
};

export type CreatePaymentRequest = {
  objectId: string;
  productName: string;
  id: string;
  vatId: string | null;
};

export type CreatePaymentResponse = {
  id: string;
  client_secret: string;
};

export type StripeKeyResponse = {
  stripeKey: string;
};

export type Orderer = {
  legitimate: string;
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  street: string;
  city: string;
  zip: string;
  country: string;
  payment: string;
  vatId?: string;
  adult: boolean;
};

export type CreditInformationOrderDto = {
  creditSafeObjectId: string;
  userId: number;
  isoLanguageCode: string;
  reportType: string;
  orderer: Orderer;
  reasonCode: { germanCodes?: number };
};
