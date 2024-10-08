import logger from '../../../utils/logger.js';
import connectionPool from '../../../dbconfig/spmallDBC.js';
import mysql from 'mysql2/promise';
import Product from '../models/productModel.js';
import response from '../../../class/response.js';


export const getProductById = async (productId) => {
	try {
		console.log(productId);
		const connection = await connectionPool.getConnection();
		const query = 'SELECT * from Products where productId = (?);';
		const result = await connection.execute(query, [productId]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Product not found');
			
		} else {
			connection.release();
			
			const product = result[0].map(row => new Product(
				row.productId,
				row.productName,
				row.description,
				row.price,
				row.stock,
				row.created_at
				));
			return product[0];
		}

	} catch (error) {
		logger.error(`getProductById :::: ` + error);
		throw new Error('Product not found');
	}
};


export const createProduct = async (ProductData) => {
	try {

		const connection = await connectionPool.getConnection();
		const query = 'INSERT INTO Products (productName, description, price , stock) VALUES (?,?,?,?)';
		const result = await connection.execute(query, [ProductData.productName, ProductData.description, ProductData.price, ProductData.stock]);

		console.log(result);


		if(result[0].length === 0) {
			connection.release();
			throw new Error('Product not found');
		} else {
			connection.release();
			return result[0];
		}
		
	} catch (error) {
		logger.error(`createProduct :::: ` + error);
	}
};

export const updateProduct = async (productId, updateData) => {
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
		const query = 'UPDATE Products SET '
						+ querySetData
						+ ' where productId = (?)';
		console.log(query);

		const result = await connection.execute(query, [productId]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Product not found');
		} else {
			connection.release();
			return result[0];
		}


	} catch (error) {
		logger.error(`updateProduct :::: ` + error);
	}
};

export const deleteProduct = async (productId) => {
	try {
		
		const connection = await connectionPool.getConnection();
		const query = 'DELETE FROM Products where productId = (?)';
		const result = await connection.execute(query, [productId]);
	
		if(result[0].length === 0) {
			connection.release();
			throw new Error('Product not found');
		} else {
			connection.release();
			return result[0];
		}
	
	} catch {
		logger.error(`deleteProduct :::: ` + error);
	}
};









