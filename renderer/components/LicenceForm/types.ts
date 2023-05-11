export interface Attachment {
  id: string;
  file: File;
}

export interface Values {
  seller: string;
  moudjahid: string;
  wilaya: string;
  price: number;
  attachments: Attachment[];
}
