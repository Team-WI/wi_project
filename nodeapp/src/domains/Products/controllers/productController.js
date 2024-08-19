import { getProductById, createProduct, updateProduct, deleteProduct } from '../services/productService.js';
import response from '../../../class/response.js';
import HttpStatus from '../../../constants/HttpStatus.js';
import logger from '../../../utils/logger.js';


export const getProduct = async (req,res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called getProduct`);
	        const product = await getProductById(req.params.id);
			console.log(product);
	        res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: Product Are Found', product ));
	} catch (error){
		console.log(error);
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: Product Not Found', {error : error.massage} ));		
	}
};

export const addProduct = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called addProduct`);
		const newProduct = await createProduct(req.body);
		console.log(newProduct);
	    res.status(HttpStatus.CREATED.code)
			.send(new response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'Completed: Product are Created', newProduct ));
	} catch (error) {
		res.status(HttpStatus.BAD_REQUEST.code)
			.send(new response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Error: BAD_REQUEST', {error : error.massage} ));		
	}	
};

export const editProduct = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called editProduct`);
		const updatedProduct = await updateProduct(req.params.id, req.body);
		console.log(updatedProduct);
		res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: Product are updated', updatedProduct ));
	} catch (error) {
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: Product Not Found', {error : error.massage} ));		
	}	
	
};

export const removeProduct = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called removeProduct`);
		const deletedProduct = await deleteProduct(req.params.id);
		res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: Product are removed', deletedProduct ));
	} catch (error) {
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: Product Not Found', {error : error.massage} ));
	}
};