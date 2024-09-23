import logger from '../../../utils/logger.js';
import connectionPool from '../../../dbconfig/spmallDBC.js';
import ProductInquiry from '../models/productInquiryModel.js';
import jwtProvider from '../../../class/jwtProvider.js';
import { addHour } from '../../../utils/myUtil.js';

import dotenv from 'dotenv';

dotenv.config();

export const getProductInquiryById = async (req) => {

	const jwtprovider = new jwtProvider();
	jwtprovider.verifyAccessToken(req);

	try {
		const connection = await connectionPool.getConnection();
		const query = 'SELECT pi.*, pm.image_small, pm.image_medium, pm.image_large '
						+ 'FROM ProductInquiries pi '
						+ 'JOIN ProductImages pm ON pm.productId = pi.productId '
						+ 'WHERE inquiryId = (?);';
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
				addHour(row.inquiryDate),
				row.inquiryTitle,
				row.userComment,
				row.sellerComment
			));
			//2024-09-21 이미지 추가
			productInquiry[0]['image_small'] = result[0][0].image_small;
			productInquiry[0]['image_medium'] = result[0][0].image_medium;
			productInquiry[0]['image_large'] = result[0][0].image_large;

			return productInquiry[0];
		}

	} catch (error) {
		logger.error(`getProductInquiryById :::: ` + error);
		throw new Error('ProductInquiry not found');
	}
};

export const getProductInquiryAll = async (req) => {

	const jwtprovider = new jwtProvider();
	jwtprovider.verifyAccessToken(req);

	try {	
	
		const connection = await connectionPool.getConnection();
		const query = 'SELECT pi.*, pm.image_small, pm.image_medium, pm.image_large '
						+ 'FROM ProductInquiries pi '
						+ 'JOIN Users u ON u.userId = pi.userId '
						+ 'LEFT JOIN ProductImages pm ON pm.productId = pi.productId '
						+ 'WHERE u.loginId = (?);';
						
		const result = await connection.execute(query, [req.params.id]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('ProductInquiries not found');
			
		} else {
			connection.release();
			
			let productInquiryArr = [];
			
			//2024-09-21 이미지 추가
			for (const row in result[0]) {
				const productInquiry = {
					'inquiryId' : result[0][row].inquiryId,
					'productId' : result[0][row].productId,
					'userId' : result[0][row].userId,
					'inquiryCategory' : result[0][row].inquiryCategory,
					'inquiryDate' : addHour(result[0][row].inquiryDate),
					'inquiryTitle' : result[0][row].inquiryTitle,
					'userComment' : result[0][row].userComment,
					'sellerComment' : result[0][row].sellerComment,
					'image_small' : result[0][row].image_small,
					'image_medium' : result[0][row].image_medium,
					'image_large' : result[0][row].image_large
				};
				
				productInquiryArr.push(productInquiry);
			}	
			return productInquiryArr;
		}

	} catch (error) {
		logger.error(`getProductInquiryById :::: ` + error);
		throw new Error('ProductInquiry not found');
	}
};

export const createProductInquiry = async (req) => {

	const jwtprovider = new jwtProvider();
	jwtprovider.verifyAccessToken(req);

	try {
		
		const connection = await connectionPool.getConnection();
		const query_user = 'SELECT userId from Users where loginId = (?)';
		const result_user = await connection.execute(query_user, [req.body.loginId]);
		
		if(result_user[0].length === 0) {
			connection.release();
			throw new Error('ProductInquiry User not found');
			
		} else {
		
			const query = 'INSERT INTO ProductInquiries (productId, userId, inquiryCategory, inquiryTitle, userComment) VALUES (?,?,?,?,?)';
			const result = await connection.execute(query, [req.body.productId, result_user[0][0].userId, req.body.inquiryCategory, req.body.inquiryTitle, req.body.userComment]);

			if(result[0].length === 0) {
				connection.release();
				throw new Error('ProductInquiry not found');
			} else {
				connection.release();
				return result[0];
			}
			
		}
		
	} catch (error) {
		logger.error(`createProductInquiry :::: ` + error);
		throw new Error('ProductInquiry can\'t create');
	}
};

export const updateProductInquiry = async (req) => {

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

	const jwtprovider = new jwtProvider();
	jwtprovider.verifyAccessToken(req);

	try {
		
		const connection = await connectionPool.getConnection();
		const query = 'DELETE FROM ProductInquiries where inquiryId = (?)';
		const result = await connection.execute(query, [req.params.id]);
	
		if(result[0].length === 0) {
			connection.release();
			throw new Error('ProductInquiry not found');
		} else {
			connection.release();
			return { 'ok': true };
		}
	
	} catch {
		logger.error(`deleteProductInquiry :::: ` + error);
		throw new Error('ProductInquiry can\'t delete');
	}
};