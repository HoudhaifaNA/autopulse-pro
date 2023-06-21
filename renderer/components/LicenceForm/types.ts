export interface Attachment {
  id: string;
  file: File;
}

interface Seller {
  id: number;
  name: string;
}

export interface Values {
  created_at: Date;
  releasedDate: Date;
  seller: Seller;
  moudjahid: string;
  serialNumber: string;
  wilaya: string;
  price: number | string;
  attachments: Attachment[];
}
