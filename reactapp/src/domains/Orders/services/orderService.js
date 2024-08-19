import logger from '../../../utils/logger.js';
import connectionPool from '../../../dbconfig/spmallDBC.js';
import mysql from 'mysql2/promise';
import Order from '../models/orderModel.js';
import response from '../../../class/response.js';


export const getOrderById = async (orderId) => {
	try {
		console.log(orderId);
		const connection = await connectionPool.getConnection();
		const query = 'SELECT * from Orders where orderId = (?);';
		const result = await connection.execute(query, [orderId]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Order not found');
			
		} else {
			connection.release();
			
			const order = result[0].map(row => new Order(
				row.orderId,
				row.userId,
				row.orderDate,
				row.totalAmount,
				row.status
				));	
			return order[0];
		}

	} catch (error) {
		logger.error(`getOrderById :::: ` + error);
		throw new Error('Order not found');
	}
};


export const createOrder = async (OrderData) => {
	try {

		const connection = await connectionPool.getConnection();
		const query = 'INSERT INTO Orders (userId, totalAmount) VALUES (?,?)';
		const result = await connection.execute(query, [OrderData.userId, OrderData.totalAmount]);

		console.log(result);


		if(result[0].length === 0) {
			connection.release();
			throw new Error('Order not found');
		} else {
			connection.release();
			return result[0];
		}
		
	} catch (error) {
		logger.error(`createOrder :::: ` + error);
	}
};

export const updateOrder = async (orderId, updateData) => {
	try {
		
		const keys = Object.keys(updateData);
		const values = Object.values(updateData);
				
		let querySetData = "";		
				
		for(let i=0; i < keys.length; i++){

			if(i == keys.length-1){
				querySetData += ( keys[i] + "='" + values[i] + "'");
			} else {
				querySetData += ( keys[i] + "='" + values[i] + "'" + ',');
			}
			
		}
		
		const connection = await connectionPool.getConnection();
		const query = 'UPDATE Orders SET '
						+ querySetData
						+ ' where orderId = (?)';
		console.log(query);

		const result = await connection.execute(query, [orderId]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Order not found');
		} else {
			connection.release();
			return result[0];
		}


	} catch (error) {
		logger.error(`updateOrder :::: ` + error);
	}
};

export const deleteOrder = async (orderId) => {
	try {
		
		const connection = await connectionPool.getConnection();
		const query = 'DELETE FROM Orders where orderId = (?)';
		const result = await connection.execute(query, [orderId]);
	
		if(result[0].length === 0) {
			connection.release();
			throw new Error('Order not found');
		} else {
			connection.release();
			return result[0];
		}
	
	} catch {
		logger.error(`deleteOrder :::: ` + error);
	}
};









