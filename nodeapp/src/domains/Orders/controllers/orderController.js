import { getOrderById, createOrder, updateOrder, deleteOrder, getOrderShippingAll, getOrderShippingDetailById } from '../services/orderService.js';
import response from '../../../class/response.js';
import HttpStatus from '../../../constants/HttpStatus.js';
import logger from '../../../utils/logger.js';


export const getOrder = async (req,res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called getOrder`);
	        const order = await getOrderById(req.params.id);
			console.log(order);
	        res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: Order Are Found', order ));
	} catch (error){
		console.log(error);
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: Order Not Found', {error : error.massage} ));		
	}
};

export const addOrder = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called addOrder`);
		const newOrder = await createOrder(req.body);
		console.log(newOrder);
	    res.status(HttpStatus.CREATED.code)
			.send(new response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'Completed: Order are Created', newOrder ));
	} catch (error) {
		res.status(HttpStatus.BAD_REQUEST.code)
			.send(new response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Error: BAD_REQUEST', {error : error.massage} ));		
	}	
};

export const editOrder = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called editOrder`);
		const updatedOrder = await updateOrder(req.params.id, req.body);
		console.log(updatedOrder);
		res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: Order are updated', updatedOrder ));
	} catch (error) {
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: Order Not Found', {error : error.massage} ));		
	}	
	
};

export const removeOrder = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called removeOrder`);
		const deletedOrder = await deleteOrder(req.params.id);
		res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: Order are removed', deletedOrder ));
	} catch (error) {
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: Order Not Found', {error : error.massage} ));
	}
};

export const getOrderShipping = async (req,res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called getOrderShipping`);
	        const OrderShipping = await getOrderShippingAll(req);
			console.log(OrderShipping);
	        res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: OrderShipping Are Found', OrderShipping ));
	} catch (error){
		console.log(error);
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: OrderShipping Not Found', {error : error.massage} ));		
	}
};


export const getOrderShippingDetail = async (req,res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called getOrderShippingDetail`);
	        const OrderShippingDetail = await getOrderShippingDetailById(req);
			console.log(OrderShippingDetail);
			
	        res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: OrderShipping Are Found', OrderShippingDetail ));
	} catch (error){
		console.log(error);
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: getOrderShippingDetail Not Found', {error : error.massage} ));		
	}
};
