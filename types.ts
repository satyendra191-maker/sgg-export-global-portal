
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  minOrder: string;
}

export interface RFQSubmission {
  id: string;
  name: string;
  email: string;
  product: string;
  quantity: string;
  message: string;
  timestamp: Date;
  status: 'Pending' | 'Reviewed' | 'Contacted';
}

export interface Booking {
  id: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Pending';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
}
