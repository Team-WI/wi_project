import logger from '../../../utils/logger.js';
import connectionPool from '../../../dbconfig/spmallDBC.js';
import mysql from 'mysql2/promise';
import Shipping from '../models/shippingModel.js';
import response from '../../../class/response.js';


export const getShippingById = async (shippingId) => {
	try {
		
		const jwtprovider = new jwtProvider();
		jwtprovider.verifyAccessToken(req);
		
		const connection = await connectionPool.getConnection();
		const query = 'SELECT * from Shipping where shippingId = (?);';
		const result = await connection.execute(query, [shippingId]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Shipping not found');
			
		} else {
			connection.release();
			
			const shipping = result[0].map(row => new Shipping(
				row.shippingId,
				row.orderId,
				row.shippingDate,
				row.deliveryDate,
				row.trackingNumber
				));	
			return shipping[0];
		}

	} catch (error) {
		logger.error(`getShippingById :::: ` + error);
		throw new Error('Shipping not found');
	}
};


export const createShipping = async (ShippingData) => {
	try {

		const connection = await connectionPool.getConnection();
		const query = 'INSERT INTO Shipping (orderId) VALUES (?)';
		const result = await connection.execute(query, [ShippingData.orderId]);

		console.log(result);


		if(result[0].length === 0) {
			connection.release();
			throw new Error('Shipping not found');
		} else {
			connection.release();
			return result[0];
		}
		
	} catch (error) {
		logger.error(`createShipping :::: ` + error);
	}
};

export const updateShipping = async (shippingId, updateData) => {
	try {
		
		const jwtprovider = new jwtProvider();
		jwtprovider.verifyAccessToken(req);
	
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
		const query = 'UPDATE Shipping SET '
						+ querySetData
						+ ' where shippingId = (?)';
		console.log(query);

		const result = await connection.execute(query, [shippingId]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Shipping not found');
		} else {
			connection.release();
			return result[0];
		}


	} catch (error) {
		logger.error(`updateShipping :::: ` + error);
	}
};

export const deleteShipping = async (shippingId) => {
	try {
		
		const jwtprovider = new jwtProvider();
		jwtprovider.verifyAccessToken(req);
		
		const connection = await connectionPool.getConnection();
		const query = 'DELETE FROM Shipping where shippingId = (?)';
		const result = await connection.execute(query, [shippingId]);
	
		if(result[0].length === 0) {
			connection.release();
			throw new Error('Shipping not found');
		} else {
			connection.release();
			return result[0];
		}
	
	} catch {
		logger.error(`deleteShipping :::: ` + error);
	}
};









