import logger from '../../../utils/logger.js';
import connectionPool from '../../../dbconfig/spmallDBC.js';
import Product from '../../Products/models/productModel.js';
import jwtProvider from '../../../class/jwtProvider.js';
import { addHour } from '../../../utils/myUtil.js';
import dotenv from 'dotenv';

dotenv.config();


export const getCategoryItemById = async (req) => {
	try {

		const connection = await connectionPool.getConnection();
		const query = 'SELECT p.*, pi.image_large, pi.image_medium, pi.image_small '
					  + 'from Products p '
					  + 'JOIN Product_Category pc ON p.productId = pc.productId '
				      + 'JOIN Categories c ON pc.categoryId = c.categoryId '
					  + 'LEFT JOIN ProductImages pi ON pi.productId = p.productId '
					  + 'WHERE c.categoryName = (?) '
					  + 'OR c.parentId = (SELECT categoryId FROM Categories WHERE categoryname = (?));';
		const result = await connection.execute(query, [req.params.id, req.params.id]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Category > Product not found');
			
		} else {
			connection.release();
			
			let categoryItemArr = [];
			
			//2024-09-21 이미지 추가
			for (const row in result[0]) {
				const categoryItem = {

					'productId' : result[0][row].productId,
					'productName' : result[0][row].productName,
					'description' : result[0][row].description,
					'created_at' : addHour(result[0][row].created_at),
					'price' : result[0][row].price,
					'stock' : result[0][row].stock,
					'image_small' : result[0][row].image_small,
					'image_medium' : result[0][row].image_medium,
					'image_large' : result[0][row].image_large
				};
				
				categoryItemArr.push(categoryItem);
			}

			return categoryItemArr;
		}

	} catch (error) {
		logger.error(`getCategoryItemById :::: ` + error);
		throw new Error('CategoryName > Product not found');
	}
};

export const getCategoryItemBySubId = async (req) => {
	try {

		const connection = await connectionPool.getConnection();
		const query = 'SELECT p.*, pi.image_large, pi.image_medium, pi.image_small '
					  +	'FROM Products p '
					  +	'JOIN Product_Category pc ON p.productId = pc.productId '
					  +	'JOIN Categories c ON pc.categoryId = c.categoryId '
					  +	'LEFT JOIN ProductImages pi ON pi.productId = p.productId '
					  +	'WHERE c.parentId = (SELECT categoryId FROM Categories WHERE categoryName = (?)) '
					  + 'AND c.categoryName = (?);';

		const result = await connection.execute(query, [req.params.id, req.params.subId]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Category not found');
			
		} else {
			connection.release();
			
			let categoryItemArr = [];
			
			//2024-09-21 이미지 추가
			for (const row in result[0]) {
				const categoryItem = {

					'productId' : result[0][row].productId,
					'productName' : result[0][row].productName,
					'description' : result[0][row].description,
					'created_at' : addHour(result[0][row].created_at),
					'price' : result[0][row].price,
					'stock' : result[0][row].stock,
					'image_small' : result[0][row].image_small,
					'image_medium' : result[0][row].image_medium,
					'image_large' : result[0][row].image_large
				};
				
				categoryItemArr.push(categoryItem);
			}

			return categoryItemArr;
		}

	} catch (error) {
		logger.error(`getCategoryItemBySubId :::: ` + error);
		throw new Error('CategorySubClass > Product not found');
	}
};


//이 기능은 관리자 페이지에서 사용할 것으로 예상
export const createCategory = async (req) => {

	const jwtprovider = new jwtProvider();
	jwtprovider.verifyAccessToken(req);

	try {

		const connection = await connectionPool.getConnection();
		const query = 'INSERT INTO Categories (categoryName, parentId) VALUES (?,?)';
		const result = await connection.execute(query, [req.body.categoryName, req.body.parentId]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Category not found');
		} else {
			connection.release();
			return result[0];
		}
		
	} catch (error) {
		logger.error(`createCategory :::: ` + error);
		throw new Error('Category can\'t create');
	}
};

export const updateCategory = async (req) => {

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
		const query = 'UPDATE Categories SET ' 
						+ querySetData
						+ ' where categoryId = (?)';
		console.log(query);

		const result = await connection.execute(query, [req.params.id]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Category not found');
		} else {
			connection.release();
			return result[0];
		}

	} catch (error) {
		logger.error(`updateCategory :::: ` + error);
		throw new Error('Category can\'t update');
	}
};

export const deleteCategory = async (req) => {

	const jwtprovider = new jwtProvider();
	jwtprovider.verifyAccessToken(req);

	try {
		
		const connection = await connectionPool.getConnection();
		const query = 'DELETE FROM Categories where categoryId = (?)';
		const result = await connection.execute(query, [req.params.id]);
	
		if(result[0].length === 0) {
			connection.release();
			throw new Error('Category not found');
		} else {
			connection.release();
			return result[0];
		}
	
	} catch {
		logger.error(`deleteCategory :::: ` + error);
		throw new Error('Category can\'t delete');
	}
};