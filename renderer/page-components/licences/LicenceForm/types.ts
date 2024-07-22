export interface Attachment {
  id: string;
  file: File;
}

export interface LicenceInitalValues {
  purchased_at: string;
  moudjahid: string;
  seller: string;
  seller_id: number;
  wilaya: string;
  serial_number: string;
  price: number;
  issue_date: string;
  note: string;
  attachments: Attachment[];
}
