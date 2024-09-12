import { getShippingById, createShipping, updateShipping, deleteShipping } from '../services/shippingService.js';
import response from '../../../class/response.js';
import HttpStatus from '../../../constants/HttpStatus.js';
import logger from '../../../utils/logger.js';


export const getShipping = async (req,res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called getShipping`);
	        const shipping = await getShippingById(req.params.id);
			console.log(shipping);
	        res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: Shipping Are Found', shipping ));
	} catch (error){
		if (error.status === 401) {
			res.status(HttpStatus.UNAUTHORIZED.code)
				.send(new response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Error: User Not Found', error ));		
		} else {
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: Shipping Not Found', {error : error.massage} ));		
		}
	}
};

export const addShipping = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called addShipping`);
		const newShipping = await createShipping(req.body);
		console.log(newShipping);
	    res.status(HttpStatus.CREATED.code)
			.send(new response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'Completed: Shipping are Created', newShipping ));
	} catch (error) {
		res.status(HttpStatus.BAD_REQUEST.code)
			.send(new response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Error: BAD_REQUEST', {error : error.massage} ));		
	}	
};

export const editShipping = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called editShipping`);
		const updatedShipping = await updateShipping(req.params.id, req.body);
		console.log(updatedShipping);
		res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: Shipping are updated', updatedShipping ));
	} catch (error) {
		if (error.status === 401) {
			res.status(HttpStatus.UNAUTHORIZED.code)
				.send(new response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Error: User Not Found', error ));		
		} else {	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: Shipping Not Found', {error : error.massage} ));		
		}	
	}
};

export const removeShipping = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called removeShipping`);
		const deletedShipping = await deleteShipping(req.params.id);
		res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: Shipping are removed', deletedShipping ));
	} catch (error) {
		if (error.status === 401) {
			res.status(HttpStatus.UNAUTHORIZED.code)
				.send(new response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Error: User Not Found', error ));		
		} else {	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: Shipping Not Found', {error : error.massage} ));
		}
	}
};