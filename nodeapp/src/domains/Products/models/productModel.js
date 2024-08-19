class Product {
    constructor(productId, productName, description, price, stock, created_at) {
        this.productId = productId;
        this.productName = productName;
        this.description = description;
		this.price = price;
		this.stock = stock;
		this.created_at = created_at;
    }	
}

export default Product;