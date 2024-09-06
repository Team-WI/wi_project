class Shipping {
    constructor(shippingId, orderId, shippingDate, deliveryDate, courier, courierInvoiceNumber, deliveryFee) {
		this.shippingId = shippingId;
        this.orderId = orderId;
        this.shippingDate = shippingDate;
        this.deliveryDate = deliveryDate;
		this.courier = courier;
		this.courierInvoiceNumber = courierInvoiceNumber;
		this.deliveryFee = deliveryFee;	
    }	
}

export default Shipping;