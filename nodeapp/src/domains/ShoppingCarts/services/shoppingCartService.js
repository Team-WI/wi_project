import logger from '../../../utils/logger.js';
import connectionPool from '../../../dbconfig/spmallDBC.js';
import jwtProvider from '../../../class/jwtProvider.js';
import SignedUrl from '../../../class/generateSignedUrl.js';
import dotenv from 'dotenv';


dotenv.config();

export const getShoppingCartById = async (req) => {

//	const jwtprovider = new jwtProvider();
//	jwtprovider.verifyAccessToken(req);
	
	const signedUrl = new SignedUrl();

	try {

		const connection = await connectionPool.getConnection();
		const query = 'SELECT sc.shoppingCartId, sc.userId, p.productName, sc.quantity, pi.image_large, pi.image_medium, pi.image_small '
						+ 'FROM ShoppingCarts sc '
						+ 'JOIN Products p ON p.productId = sc.productId ' 
						+ 'LEFT JOIN ProductImages pi ON pi.productId = p.productId '
						+ 'WHERE sc.userId = (?);';
		const result = await connection.execute(query, [req.params.id]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('ShoppingCart not found');
			
		} else {
			connection.release();
			
			let shoppingCartArr = [];
			
			//2024-09-21 이미지 추가
			for (const row in result[0]) {
				const categoryItem = {

					'shoppingCartId' : result[0][row].shoppingCartId,
					'userId' : result[0][row].userId,
					'productName' : result[0][row].productName,
					'quantity' : result[0][row].quantity,
					'image_small' : signedUrl.generateSignedUrl(result[0][row].image_small),
					'image_medium' : result[0][row].image_medium,
					'image_large' : result[0][row].image_large
				};
				shoppingCartArr.push(categoryItem);
			}
			return shoppingCartArr;
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