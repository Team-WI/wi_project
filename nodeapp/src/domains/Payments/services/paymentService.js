import logger from '../../../utils/logger.js';
import { addHour } from '../../../utils/myUtil.js';
import connectionPool from '../../../dbconfig/spmallDBC.js';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import Payment from '../models/paymentModel.js';
import response from '../../../class/response.js';
import jwtProvider from '../../../class/jwtProvider.js';
import dotenv from 'dotenv';

dotenv.config();

export const getPaymentById = async (req) => {

	const jwtprovider = new jwtProvider();
	jwtprovider.verifyAccessToken(req);

	try {
		
		const connection = await connectionPool.getConnection();
		const query = 'SELECT * from Payments where paymentId = ?;';
		const result = await connection.execute(query, [req.params.id]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Payment not found');
			
		} else {
			connection.release();
			
			const payment = result[0].map(row => new Payment(
				row.paymentId,
				row.orderId,
				row.paymentMethodID,
				row.amount,
				addHour(row.paymentDate)
				));
			return payment[0];
		}

	} catch (error) {
		logger.error(`getPaymentById :::: ` + error);
		throw new Error('Payment not found');
	}
};


export const getPaymentAll = async () => {

	const jwtprovider = new jwtProvider();
	jwtprovider.verifyAccessToken(req);

	try {	
		
		const connection = await connectionPool.getConnection();
		const query = 'SELECT * from Payments;';
		const result = await connection.execute(query);

		console.log('result ::::', result)

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Payments not found');
			
		} else {
			connection.release();
			
			const payment = result[0].map(row => new Payment(
				row.boardId,
				row.administratorsId,
				row.inquiryCategory,
				addHour(row.inquiryDate),
				row.inquiryContent
				));
			return payment;
		}

	} catch (error) {
		logger.error(`getPaymentAll :::: ` + error);
		throw new Error('Payment not found');
	}
};

export const createPayment = async (req) => {

	const jwtprovider = new jwtProvider();
	jwtprovider.verifyAccessToken(req);

	try {
	
		const connection = await connectionPool.getConnection();
		const query = 'INSERT INTO Payments (orderId, paymentMethodID, amount) VALUES (?,?,?)';
		const result = await connection.execute(query, [req.body.orderId, req.body.paymentMethodID, req.body.amount]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Payment not found');
		} else {
			connection.release();
			return result[0];
		}
		
	} catch (error) {
		logger.error(`createPayment :::: ` + error);
		throw new Error('Payment can\'t create');
	}
};

export const updatePayment = async (req) => {

	const jwtprovider = new jwtProvider();
	jwtprovider.verifyAccessToken(req);

	try {
		
		const keys = Object.keys(req.body);
		const values = Object.values(req.body);
				
		let querySetData = "";		
				
		for(let i=0; i < keys.length; i++){

			if(i == keys.length-1){
				querySetData += ( keys[i] + "='" + values[i] + "'");
			} else {
				querySetData += ( keys[i] + "='" + values[i] + "'" + ',');
			}
			
		}
		
		const connection = await connectionPool.getConnection();
		const query = 'UPDATE Payments SET ' 
						+ querySetData
						+ ' where boardId = (?)';
		console.log(query);

		const result = await connection.execute(query, [req.params.id]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Payment not found');
		} else {
			connection.release();
			return result[0];
		}


	} catch (error) {
		logger.error(`updatePayment :::: ` + error);
		throw new Error('Payment can\'t update');
	}
};

export const deletePayment = async (req) => {

	const jwtprovider = new jwtProvider();
	jwtprovider.verifyAccessToken(req);

	try {
		
		const connection = await connectionPool.getConnection();
		const query = 'DELETE FROM Payments where boardId = (?)';
		const result = await connection.execute(query, [req.params.id]);
	
		if(result[0].length === 0) {
			connection.release();
			throw new Error('Payment not found');
		} else {
			connection.release();
			return result[0];
		}
	
	} catch {
		logger.error(`deletePayment :::: ` + error);
		throw new Error('Payment can\'t delete');
	}
};