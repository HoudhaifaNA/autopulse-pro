export interface Attachment {
  id: string;
  file: File;
}

interface Seller {
  id: number;
  name: string;
}

export interface Values {
  releasedDate: Date;
  seller: Seller;
  moudjahid: string;
  wilaya: string;
  price: number;
  attachments: Attachment[];
}
