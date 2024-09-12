import { getPaymentById, getPaymentAll, createPayment, updatePayment, deletePayment } from '../services/paymentService.js';
import response from '../../../class/response.js';
import HttpStatus from '../../../constants/HttpStatus.js';
import logger from '../../../utils/logger.js';


export const getPayment = async (req,res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called getPayment`);
	        const payment = await getPaymentById(req);
			console.log(payment);
	        res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: Payment Are Found', payment ));
	} catch (error){
		if (error.status === 401) {
			res.status(HttpStatus.UNAUTHORIZED.code)
				.send(new response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Error: User Not Found', error ));		
		} else {		console.log(error);
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: Payment Not Found', {error : error.massage} ));		
		}
	}
};


export const getPayments = async (req,res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called getPayment`);
	        const payment = await getPaymentAll();
			console.log(payment);
	        res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: Payment Are Found', payment ));
	} catch (error){
		if (error.status === 401) {
			res.status(HttpStatus.UNAUTHORIZED.code)
				.send(new response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Error: User Not Found', error ));		
		} else {		console.log(error);
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: Payment Not Found', {error : error.massage} ));		
		}
	}
};

export const addPayment = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called addPayment`);
		const newPayment = await createPayment(req);
		console.log(newPayment);
	    res.status(HttpStatus.CREATED.code)
			.send(new response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'Completed: Payment are Created', newPayment ));
	} catch (error) {
		if (error.status === 401) {
			res.status(HttpStatus.UNAUTHORIZED.code)
				.send(new response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Error: User Not Found', error ));		
		} else {		res.status(HttpStatus.BAD_REQUEST.code)
			.send(new response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Error: BAD_REQUEST', {error : error.massage} ));		
		}
	}
};

export const editPayment = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called editPayment`);
		const updatedPayment = await updatePayment(req);
		res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: Payment are updated', updatedPayment ));
			
	} catch (error) {
		if (error.status === 401) {
			res.status(HttpStatus.UNAUTHORIZED.code)
				.send(new response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Error: User Not Found', error ));		
		} else {	    
		res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: Payment Not Found', {error : error.massage} ));		
		}	
	}
};

export const removePayment = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called removePayment`);
		const deletedPayment = await deletePayment(req);
		res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: Payment are removed', deletedPayment ));
	} catch (error) {
		if (error.status === 401) {
			res.status(HttpStatus.UNAUTHORIZED.code)
				.send(new response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Error: User Not Found', error ));		
		} else {		
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: Payment Not Found', {error : error.massage} ));
		}
	}
};