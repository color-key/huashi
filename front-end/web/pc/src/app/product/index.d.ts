export interface Product {
  createdOn: string
  desc: string
  dueDate: string
  dueDateDesc: string
  id: string
  minSubscribeUnits: number
  miningCoinType: string
  name: string
  pricePerUnit: number
  productCycle: number
  productCycleDesc: string
  productIntroduce: string
  productMaterial: string | null
  productShowDate: string
  profitSettlementCycle: number
  remainingUnits: number
  serviceFee: number
  serviceFeeDesc: string
  status: string
  subscribeBeginDate: string
  subscribeEndDate: string
  supportPayMethod: string[]
  totalUnits: number
}