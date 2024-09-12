export class Order {
    constructor(orderId, userId, orderDate, totalAmount, status,requestReason,requestReasonComment) {
        this.orderId = orderId;
        this.userId = userId;
        this.orderDate = orderDate;
		this.totalAmount = totalAmount;
		this.status = status;
		this.requestReason = requestReason;
		this.requestReasonComment = requestReasonComment;
    }	
}

export default Order;