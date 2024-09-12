import logger from '../../../utils/logger.js';
import connectionPool from '../../../dbconfig/spmallDBC.js';
import mysql from 'mysql2/promise';
import ShoppingCart from '../models/shoppingCartModel.js';
import jwtProvider from '../../../class/jwtProvider.js';
import dotenv from 'dotenv';

dotenv.config();

export const getShoppingCartById = async (req) => {

	const jwtprovider = new jwtProvider();
	jwtprovider.verifyAccessToken(req);
	
	try {

		const connection = await connectionPool.getConnection();
		const query = 'SELECT sc.shoppingCartId, sc.userId, p.productName, sc.quantity '
						+ 'FROM ShoppingCarts sc '
						+ 'JOIN Products p ON p.productId = sc.productId ' 
						+ 'WHERE sc.userId = (?);';
		const result = await connection.execute(query, [req.params.id]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('ShoppingCart not found');
			
		} else {
			connection.release();
			
			const shoppingCart = result[0].map(row => new ShoppingCart(
				row.shoppingCartId,
				row.userId,
				row.productName,
				row.quantity,
				));
			return shoppingCart;
		}

	} catch (error) {
		logger.error(`getShoppingCartById :::: ` + error);
		throw new Error('ShoppingCart not found');
	}
};


export const createShoppingCart = async (req) => {
	
	const jwtprovider = new jwtProvider();
	jwtprovider.verifyAccessToken(req);
	
	
	try {
		
		const connection = await connectionPool.getConnection();
		const query = 'INSERT INTO ShoppingCarts (userId, productId, quantity) VALUES (?,?,?)';
		const result = await connection.execute(query, [req.body.userId, req.body.productId, req.body.quantity]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('ShoppingCart not found');
		} else {
			connection.release();
			return result[0];
		}
		
	} catch (error) {
		logger.error(`createShoppingCart :::: ` + error);
		throw new Error('ShoppingCart can\'t create');
	}
};

export const updateShoppingCart = async (req) => {

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
		const query = 'UPDATE ShoppingCarts SET ' 
						+ querySetData
						+ ' where shoppingCartId = (?)';
		console.log(query);

		const result = await connection.execute(query, [req.params.id]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('ShoppingCart not found');
		} else {
			connection.release();
			return result[0];
		}


	} catch (error) {
		logger.error(`updateShoppingCart :::: ` + error);
		throw new Error('ShoppingCart can\'t update');
	}
};

export const deleteShoppingCart = async (req) => {

	const jwtprovider = new jwtProvider();
	jwtprovider.verifyAccessToken(req);

	try {

		const connection = await connectionPool.getConnection();
		const query = 'DELETE FROM ShoppingCarts where shoppingCartId = (?)';
		const result = await connection.execute(query, [req.params.id]);
	
		if(result[0].length === 0) {
			connection.release();
			throw new Error('ShoppingCart not found');
		} else {
			connection.release();
			return result[0];
		}
	
	} catch {
		logger.error(`deleteShoppingCart :::: ` + error);
		throw new Error('ShoppingCart can\'t delete');
	}
};