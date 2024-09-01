export class Orderitem {
    constructor(orderItemId, orderId, productId, price, quantity) {
        this.orderItemId = orderItemId;
        this.orderId = orderId;
        this.productId = productId;
		this.price = price;
		this.quantity = quantity;
    }	
}

export default Orderitem;