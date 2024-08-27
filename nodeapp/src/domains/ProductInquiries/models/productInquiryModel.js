class ProductInquiry {
    constructor(inquiryId, productId, userId, inquiryCategory, inquiryDate, inquiryTitle, userComment, sellerComment) {
        this.inquiryId = inquiryId;
        this.productId = productId;
        this.userId = userId;
		this.inquiryCategory = inquiryCategory;
		this.inquiryDate = inquiryDate;
        this.inquiryTitle = inquiryTitle;
        this.userComment = userComment;
        this.sellerComment = sellerComment;
    }	
}

export default ProductInquiry;