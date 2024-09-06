export class Order {
    constructor(orderId, userId, orderDate, totalAmount, status) {
        this.orderId = orderId;
        this.userId = userId;
        this.orderDate = orderDate;
		this.totalAmount = totalAmount;
		this.status = status;
    }	
}

export default Order;