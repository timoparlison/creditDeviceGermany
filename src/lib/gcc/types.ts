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
  /** Optional, gegen Doppel-Submit beim Anlegen des PaymentIntents. */
  idempotencyKey?: string;
};

export type CreatePaymentResponse = {
  id: string;
  client_secret: string;
};

/** update-payment-intent: gleicher Body wie create, aber mit gesetztem `id` (pi_…). */
export type UpdatePaymentRequest = CreatePaymentRequest & { id: string };

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
  /** Pflicht – succeeded PaymentIntent (productName "FULL"), sonst 402. */
  paymentIntentId: string;
};

/* ------------------------------------------------------------------ *
 * PEP-/Sanctions-Check (FirstLink)                                   *
 * ------------------------------------------------------------------ */

export type PepSearchType =
  | 'broad_search'
  | 'general_search'
  | 'focused_search'
  | 'exact_search';

export type PepSearch = {
  /** Pflicht – bindet zugleich den PaymentIntent (objectId === name). */
  name: string;
  search_type: PepSearchType;
  /** ISO-3166-1 alpha-2, Großschreibung (z. B. "GB"). */
  countries: string[];
  /** ISO-3166-1 alpha-2, Großschreibung. */
  citizenships: string[];
  /** z. B. "Sanctions", "PEPs". */
  categories: string[];
  entity_types: string[];
  customer_reference: string;
};

export type PepOrderer = {
  legitimate: string;
  firstname: string;
  lastname: string;
  company: string;
  email: string;
  street: string;
  city: string;
  zip: string;
  payment: string;
  adult: boolean;
  other: string | null;
  /** ≤ 20 Zeichen. */
  orderNumber: string;
  vatId: string;
  customerNumber: string;
};

export type PepCheckOrderDto = {
  search: PepSearch;
  orderer: PepOrderer;
  /** Pflicht – succeeded PaymentIntent mit productName "PEP". */
  paymentIntentId: string;
};

export type PsNameAlias = {
  fullName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  maidenName?: string | null;
  nickName?: string | null;
  lowQualityName?: boolean | null;
};

export type PsCitizenship = {
  country?: string | null;
  countryCode?: string | null;
};

export type PsAddress = {
  city?: string | null;
  country?: string | null;
  countryCode?: string | null;
};

export type PsAdditionalInfo = {
  label?: string | null;
  values?: string[] | null;
};

export type PsCheckResult = {
  recordNumber?: string | number | null;
  recordUUID?: string | null;
  name?: string | null;
  entityType?: string | null;
  source?: string | null;
  lists?: string[] | null;
  citizenships?: PsCitizenship[] | null;
  dobs?: string[] | null;
  pobs?: string[] | null;
  lowQualityName?: boolean | null;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  maidenName?: string | null;
  nickName?: string | null;
  nameAliases?: PsNameAlias[] | null;
  addresses?: PsAddress[] | null;
  relationships?: Record<string, unknown>[] | null;
  url?: string | null;
  title?: string | null;
  snippet?: string | null;
  article?: string | null;
  additional_info?: PsAdditionalInfo[] | null;
  lastUpdated?: string | null;
};

export type PsCheckResults = {
  totalResults?: number | null;
  results?: PsCheckResult[] | null;
};

export type PsCheckResponse = {
  orderUUID?: string | null;
  message?: string | null;
  results?: PsCheckResults | null;
};
