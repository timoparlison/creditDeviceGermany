// DTOs for the customer portal and admin area (GccOrder backend, Bestellsystem V2).
// Contract source: GccOrder/docs/requirements/bestellsystem-v2.md and the Kotlin DTOs in
// GccOrder/src/main/kotlin/.../service/{customer,order,billing}. Money arrives as JSON numbers
// (BigDecimal), timestamps as ISO strings (Instant = UTC, LocalDateTime = Europe/Berlin, no zone).

export type ProblemFieldError = {
  objectName?: string;
  field: string;
  message: string;
};

/** Normalised error payload surfaced by the BFF routes to the client. */
export type CustomerError = {
  message: string;
  status: number;
  /** Machine-readable discriminator: 'NOT_ACTIVATED' or a backend key such as 'error.creditLimitExceeded'. */
  code?: string;
  fieldErrors?: ProblemFieldError[];
};

// --- Auth (JHipster) ----------------------------------------------------

export type LoginRequest = {
  username: string;
  password: string;
  rememberMe?: boolean;
};

export type AuthResponse = {
  id_token: string;
};

export type Account = {
  id: number;
  login: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  imageUrl: string | null;
  activated: boolean;
  langKey: string;
  authorities: string[];
};

export const ROLE_ADMIN = 'ROLE_ADMIN';

/** JHipster `POST /api/register` (ManagedUserVM). */
export type RegistrationRequest = {
  login: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  langKey: string;
};

export type ResetPasswordFinishRequest = {
  key: string;
  newPassword: string;
};

export type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

// --- Customer account (R-APP) -------------------------------------------

export type Product = 'FULL' | 'PEP';
export const PRODUCTS: Product[] = ['FULL', 'PEP'];

export type CustomerAccountStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type CustomerApplication = {
  company: string;
  firstname: string;
  lastname: string;
  email: string;
  street: string;
  zip: string;
  city: string;
  /** ISO 3166-1 alpha-2 */
  country: string;
  vatId?: string;
  /** Berechtigtes Interesse */
  legitimate: string;
};

export type CustomerAccount = CustomerApplication & {
  id: number;
  status: CustomerAccountStatus;
  vatId: string | null;
  customerNumber: string | null;
  creditLimitGross: number | null;
  billingCycle: 'MONTHLY' | null;
  productDiscounts: Partial<Record<Product, number>>;
  rejectionReason: string | null;
  appliedAt: string;
  decidedAt: string | null;
};

/** Body of approve / conditions (admin). */
export type CustomerConditions = {
  creditLimitGross: number;
  productDiscounts: Partial<Record<Product, number>>;
};

// --- Overview & prices (R-AX-1/2) ----------------------------------------

export type AccountOverview = {
  customerNumber: string | null;
  company: string;
  /** yyyy-MM */
  period: string;
  creditLimitGross: number;
  toleranceGross: number;
  usedGross: number;
  availableGross: number;
  ordersInPeriod: number;
  discounts: Partial<Record<Product, number>>;
};

export type PriceView = {
  listNet: number;
  discountPercent: number;
  net: number;
  vat: number;
  gross: number;
  currency: string;
};

export type PriceZone = 'PRICE_ZONE_DE' | 'PRICE_ZONE_1' | 'PRICE_ZONE_2' | 'PRICE_ZONE_3' | 'PRICE_ZONE_FLAT';

export type PriceQuote = {
  product: Product;
  priceZone: PriceZone;
  price: PriceView;
  withinCreditLimit: boolean;
};

// --- Orders (R-ORD, R-AX-3/4) --------------------------------------------

export type OrderChannel = 'PORTAL' | 'API';

export type FullReportOrderRequest = {
  creditSafeObjectId: string;
  isoLanguageCode?: string;
  customerReference?: string;
};

export type PepSearchType = 'broad_search' | 'general_search' | 'focused_search' | 'exact_search';

/** FirstLink PsCheckRequest, passed through unchanged (same shape as the guest PEP check). */
export type PsCheckRequest = Record<string, unknown>;

export type PepCheckOrderRequest = {
  search: PsCheckRequest;
  customerReference?: string;
};

export type OrderResponse = {
  orderId: string;
  orderedAt: string;
  product: Product;
  price: PriceView;
  creditSafeObjectId?: string;
  testMode?: boolean;
};

export type CustomerOrderView = {
  orderId: string;
  product: Product;
  orderedAt: string;
  objectRef: string | null;
  customerReference: string | null;
  channel: OrderChannel;
  net: number;
  gross: number;
  invoiced: boolean;
};

export type CustomerOrderDetail = {
  orderId: string;
  orderedAt: string;
  product: Product;
  price: PriceView;
  objectRef: string | null;
  customerReference: string | null;
  channel: OrderChannel;
  invoiced: boolean;
  customerReport?: Record<string, unknown>;
  psCheckResponse?: Record<string, unknown>;
};

export type OrderFilter = {
  page?: number;
  size?: number;
  product?: Product;
  from?: string;
  to?: string;
  customerReference?: string;
};

// --- Invoices (R-BIL-9) ----------------------------------------------------

export type CollectiveInvoiceView = {
  id: number;
  invoiceNumber: string;
  billingPeriod: string;
  invoiceDate: string;
  net: number;
  vat: number;
  gross: number;
};

// --- API keys (R-API-4, R-AX-6/7) ---------------------------------------

export type ApiKeyMode = 'LIVE' | 'TEST';

export type ApiKeyView = {
  mode: ApiKeyMode;
  prefix: string;
  createdAt: string;
  lastUsedAt: string | null;
};

// --- Admin billing (R-BIL-8) ------------------------------------------

export type BillingRunResult = {
  period: string;
  createdInvoiceIds: number[];
  skippedAccountIds: number[];
  failedAccountIds: number[];
};
