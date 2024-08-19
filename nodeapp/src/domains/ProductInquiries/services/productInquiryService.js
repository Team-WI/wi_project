import logger from '../../../utils/logger.js';
import connectionPool from '../../../dbconfig/spmallDBC.js';
import mysql from 'mysql2/promise';
import ProductInquiry from '../models/productInquiryModel.js';
import response from '../../../class/response.js';
import jwtProvider from '../../../class/jwtProvider.js';
import dotenv from 'dotenv';

dotenv.config();



export const getProductInquiryById = async (req) => {
	try {
			
		const connection = await connectionPool.getConnection();
		const query = 'SELECT * from ProductInquiries where inquiryId = ?;';
		const result = await connection.execute(query, [req.params.id]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('ProductInquiries not found');
			
		} else {
			connection.release();
			
			const productInquiry = result[0].map(row => new ProductInquiry(
				row.inquiryId,
				row.productId,
				row.userId,
				row.inquiryCategory,
				row.inquiryDate
				));
			return productInquiry[0];
		}

	} catch (error) {
		logger.error(`getProductInquiryById :::: ` + error);
		throw new Error('ProductInquiry not found');
	}
};


export const createProductInquiry = async (req) => {
	try {

		const connection = await connectionPool.getConnection();
		const query = 'INSERT INTO ProductInquiries (productId, userId, inquiryCategory) VALUES (?,?,?)';
		const result = await connection.execute(query, [req.body.productId, req.body.userId, req.body.inquiryCategory]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('ProductInquiry not found');
		} else {
			connection.release();
			return result[0];
		}
		
	} catch (error) {
		logger.error(`createProductInquiry :::: ` + error);
		throw new Error('ProductInquiry can\'t create');
	}
};

export const updateProductInquiry = async (req) => {
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
		const query = 'UPDATE ProductInquiries SET ' 
						+ querySetData
						+ ' where inquiryId = (?)';
		console.log(query);

		const result = await connection.execute(query, [req.params.id]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('ProductInquiry not found');
		} else {
			connection.release();
			return result[0];
		}

	} catch (error) {
		logger.error(`updateProductInquiry :::: ` + error);
		throw new Error('ProductInquiry can\'t update');
	}
};

export const deleteProductInquiry = async (req) => {
	try {
		const connection = await connectionPool.getConnection();
		const query = 'DELETE FROM ProductInquiries where inquiryId = (?)';
		const result = await connection.execute(query, [req.params.id]);
	
		if(result[0].length === 0) {
			connection.release();
			throw new Error('ProductInquiry not found');
		} else {
			connection.release();
			return result[0];
		}
	
	} catch {
		logger.error(`deleteProductInquiry :::: ` + error);
		throw new Error('ProductInquiry can\'t delete');
	}
};