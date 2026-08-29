// DTOs for the registered-customer area (GccOrder backend, /api/customer/**).
// Contract source: GccOrder/docs/features/FOR_AI_FRONTEND.md

export type ProblemFieldError = {
  objectName?: string;
  field: string;
  message: string;
};

/** Normalised error payload surfaced by the BFF routes to the client. */
export type CustomerError = {
  message: string;
  status: number;
  /** Optional machine-readable discriminator, e.g. 'NOT_ACTIVATED'. */
  code?: string;
  fieldErrors?: ProblemFieldError[];
};

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

export type CustomerRegistrationRequest = {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  street: string;
  city: string;
  zip: string;
  country?: string;
  vatId?: string;
  langKey?: string;
};

export type ResetPasswordFinishRequest = {
  key: string;
  newPassword: string;
};

export type CreditBalance = {
  registeredCustomerId: string;
  balance: string;
  currency: string;
};

export type CreditTransactionType = 'DEPOSIT_STRIPE' | 'PURCHASE' | 'REFUND';

export type CreditTransaction = {
  id: number;
  amount: string;
  transactionType: CreditTransactionType;
  referenceId: string | null;
  description: string | null;
  createdAt: string;
};

/** Spring-Data Page envelope. */
export type Page<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
};

export type DepositRequest = {
  amount: number;
};

export type DepositResponse = {
  id: string;
  clientSecret: string;
};

export type PaymentMethod = 'STRIPE' | 'CREDIT' | 'INVOICE';

export type DashboardInquiry = {
  orderId: string;
  creditReportId: number;
  paymentMethod: PaymentMethod;
  orderNumber: string;
  company: string;
  email: string;
};

export type ApiKeySummary = {
  id: number;
  keyPrefix: string;
  description: string | null;
  createdAt: string;
  revokedAt: string | null;
  lastUsedAt: string | null;
};

export type InvoicePaymentRequestStatus =
  | 'SUBMITTED'
  | 'IN_REVIEW'
  | 'APPROVED'
  | 'REJECTED';

export type DashboardInvoicePaymentRequest = {
  id: number;
  status: InvoicePaymentRequestStatus;
  decidedAt: string | null;
  rejectionReason: string | null;
};

export type CollectiveInvoiceStatus = 'OPEN' | 'PAID' | 'OVERDUE';

export type CollectiveInvoiceSummary = {
  id: number;
  invoiceNumber: string;
  invoicePeriod: string;
  invoiceDate: string;
  totalAmount: string;
  status: CollectiveInvoiceStatus;
};

export type CustomerDashboard = {
  registeredCustomerId: string;
  company: string;
  firstName: string;
  lastName: string;
  email: string;
  balance: string;
  currency: string;
  recentTransactions: CreditTransaction[];
  recentInquiries: DashboardInquiry[];
  apiKeys: ApiKeySummary[];
  invoicePaymentRequest: DashboardInvoicePaymentRequest | null;
  recentCollectiveInvoices: CollectiveInvoiceSummary[];
};
