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
