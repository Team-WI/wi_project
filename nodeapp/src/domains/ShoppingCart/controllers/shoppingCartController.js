import { createShoppingCart, deleteShoppingCart, getShoppingCartById, updateShoppingCart } from '../services/shoppingCartService.js';
import response from '../../../class/response.js';
import HttpStatus from '../../../constants/HttpStatus.js';
import logger from '../../../utils/logger.js';

export const getShoppingCart = async (req,res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called getShoppingCart`);
	        const ShoppingCart = await getShoppingCartById(req);
			console.log(ShoppingCart);
	        res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: ShoppingCart Are Found', ShoppingCart ));
	} catch (error){
		console.log(error);
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: ShoppingCart Not Found', {error : error.massage} ));		
	}
};

export const addShoppingCart = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called addShoppingCart`);
		const newShoppingCart = await createShoppingCart(req);
		console.log(newShoppingCart);
	    res.status(HttpStatus.CREATED.code)
			.send(new response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'Completed: ShoppingCart are Created', newShoppingCart ));
	} catch (error) {
		res.status(HttpStatus.BAD_REQUEST.code)
			.send(new response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Error: BAD_REQUEST', {error : error.massage} ));		
	}	
};

export const editShoppingCart = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called editShoppingCart`);
		const updatedShoppingCart = await updateShoppingCart(req);
		res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: ShoppingCart are updated', updatedShoppingCart ));
			
	} catch (error) {
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: ShoppingCart Not Found', {error : error.massage} ));		
	}	
	
};

export const removeShoppingCart = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called removeShoppingCart`);
		const deletedShoppingCart = await deleteShoppingCart(req);
		res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: ShoppingCart are removed', deletedShoppingCart ));
	} catch (error) {
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: ShoppingCart Not Found', {error : error.massage} ));
	}
};