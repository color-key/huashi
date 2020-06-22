import {Product} from '../product/index.d';

export interface Contract{
  createdOn: string
  holdUnits: number
  id: string
  product: Product
  productName: string
  status: string
  userId: string
}