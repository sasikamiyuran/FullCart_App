export interface OrderItemProductModel{
    name: string,
    description: string,
    brandId?: number,
    categoryId?: number,
    imagePath: string,
    orderItemId: number,
    productId: number,
    quantity: number,
    price: number
}