// Generated by https://quicktype.io

export interface TransactionEvent {
	event: string;
	geTransactionDtoRequest: GeTransactionDtoRequest;
	environment: string;
	signature: null;
	timestamp: number;
	sentAt: string;
}

export interface GeTransactionDtoRequest {
	transaction: Transaction;
}

export interface Transaction {
	id: string;
	amountInCents: number;
	reference: string;
	customerEmail: string;
	currency: string;
	paymentMethodType: string;
	redirectUrl: string;
	status: string;
	shippingAddress: null;
	paymentLinkId: string;
	paymentSourceId: null;
}