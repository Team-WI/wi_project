class ShoppingCart {
    constructor(shoppingCartId, userId, productId, quantity) {
        this.shoppingCartId = shoppingCartId;
        this.userId = userId;
        this.productId = productId;
		this.quantity = quantity;
    }
}
export default ShoppingCart;