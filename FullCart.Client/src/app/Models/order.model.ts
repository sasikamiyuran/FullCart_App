import { OrderItemModel } from "./order-item.model";

export interface OrderModel {
  orderId: number;
  userId: string;
  orderDate: Date;
  totalPrice: number;
  status: string;
  orderItems: OrderItemModel[];
}
