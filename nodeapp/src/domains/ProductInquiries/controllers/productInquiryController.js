import { getProductInquiryById, getProductInquiryAll, createProductInquiry, updateProductInquiry, deleteProductInquiry } from '../services/productInquiryService.js';
import response from '../../../class/response.js';
import HttpStatus from '../../../constants/HttpStatus.js';
import logger from '../../../utils/logger.js';


export const getProductInquiry = async (req,res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called getProductInquiry`);
	        const productInquiry = await getProductInquiryById(req);
			console.log(productInquiry);

	        res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: ProductInquiry Are Found', productInquiry ));
	} catch (error){
		console.log(error);
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: ProductInquiry Not Found', {error : error.massage} ));		
	}
};


export const getProductInquiries = async (req,res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called getProductInquiry`);
	        const productInquiry = await getProductInquiryAll();
	        res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: ProductInquiry Are Found', productInquiry ));
	} catch (error){
		console.log(error);
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: ProductInquiry Not Found', {error : error.massage} ));		
	}
};

export const addProductInquiry = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called addProductInquiry`);
		const newProductInquiry = await createProductInquiry(req);
		console.log(newProductInquiry);
	    res.status(HttpStatus.CREATED.code)
			.send(new response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'Completed: newProductInquiry are Created', newProductInquiry ));
	} catch (error) {
		res.status(HttpStatus.BAD_REQUEST.code)
			.send(new response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Error: BAD_REQUEST', {error : error.massage} ));		
	}	
};

export const editProductInquiry = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called editProductInquiry`);
		const updatedProductInquiry = await updateProductInquiry(req);
		res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: ProductInquiry are updated', updatedProductInquiry ));
	} catch (error) {
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: ProductInquiry Not Found', {error : error.massage} ));		
	}	
	
};

export const removeProductInquiry = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called removeProductInquiry`);
		const deletedProductInquiry = await deleteProductInquiry(req);
		res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: ProductInquiry are removed', deletedProductInquiry ));
	} catch (error) {
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: ProductInquiry Not Found', {error : error.massage} ));
	}
};