export type bodyRequest = {
  email: string;
  phoneNumber: string;
};

export type bodyResponse = {
  primaryContatctId: number;
  emails: string[];
  phoneNumbers: string[];
  secondaryContactIds: number[];
};

export type customerDetails = {
  id: number;
  phone_number: string | null;
  email: string | null;
  linkedid: number | null;
  linkprecedence: LinkPrecedence;
  created_at: Date;
  updated_at: Date;
};

enum LinkPrecedence {
  primary = "primary",
  secondary = "secondary",
}

export type customersDetails = {
  count: number | null;
  result: customerDetails[];
};
