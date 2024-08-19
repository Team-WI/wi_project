import logger from '../../../utils/logger.js';
import connectionPool from '../../../dbconfig/spmallDBC.js';
import mysql from 'mysql2/promise';
import Category from '../models/categoryModel.js';
import response from '../../../class/response.js';
import jwtProvider from '../../../class/jwtProvider.js';
import dotenv from 'dotenv';

dotenv.config();



export const getCategoryById = async (req) => {
	try {

		const connection = await connectionPool.getConnection();
		const query = 'SELECT * from Categories where categoryId = ?;';
		const result = await connection.execute(query, [req.params.id]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Category not found');
			
		} else {
			connection.release();
			
			const category = result[0].map(row => new Category(
				row.categoryId,
				row.categoryName,
				row.parentId
				));
			return category[0];
		}

	} catch (error) {
		logger.error(`getCategoryById :::: ` + error);
		throw new Error('Category not found');
	}
};

//이 기능은 관리자 페이지에서 사용할 것으로 예상
export const createCategory = async (req) => {
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