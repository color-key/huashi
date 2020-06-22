import { Product } from '../product/index.d';

export interface Order {
  createdOn: string;
  orderAmount: number;
  orderId: string;
  orderPricePerUnit: number;
  orderUnits: number;
  payAmount: number;
  product: Product;
  productName: string;
  status: 'UnPaid' | 'Paid' | 'Fail' | 'Expired';
  userId: string;
  remainingPayTime: number;
}
