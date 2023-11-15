export interface TransactionDetail {
	id?: string;
	name: string;
	amount_in_cents: number;
	currency?: string;
	single_use?: boolean;
	description: string;
	sku?: null;
	expires_at?: null;
	collect_shipping?: boolean;
	collect_customer_legal_id?: boolean;
	redirect_url?: string;
	image_url?: null;
	active?: boolean;
	customer_data?: null;
	created_at?: string;
	updated_at?: string;
	taxes?: any[];
	merchant_public_key?: string;
}
