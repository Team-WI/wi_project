import logger from '../../../utils/logger.js';
import connectionPool from '../../../dbconfig/spmallDBC.js';
import mysql from 'mysql2/promise';
import Category from '../models/categoryModel.js';
import Product from '../../Products/models/productModel.js';
import response from '../../../class/response.js';
import jwtProvider from '../../../class/jwtProvider.js';
import dotenv from 'dotenv';

dotenv.config();


function addHour(transDate){
	
	const originalDate = new Date(transDate);

	// 9시간을 밀리초로 변환 (9시간 * 60분 * 60초 * 1000밀리초)
	const nineHoursInMilliseconds = 9 * 60 * 60 * 1000;

	// 9시간 더하기
	const newDate = new Date(originalDate.getTime() + nineHoursInMilliseconds);
	
	// 연도, 월, 일, 시간, 분, 초 추출 및 포맷팅
	const year = newDate.getFullYear();
	const month = String(newDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
	const day = String(newDate.getDate()).padStart(2, '0');
	const hours = String(newDate.getHours()).padStart(2, '0');
	const minutes = String(newDate.getMinutes()).padStart(2, '0');
	const seconds = String(newDate.getSeconds()).padStart(2, '0');

	// 원하는 형식으로 조합
	const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	
	return formattedDate;
	
}


export const getCategoryItemById = async (req) => {
	try {

		const connection = await connectionPool.getConnection();
		const query = 'SELECT P.* '
					  + 'from Products P '
					  + 'JOIN Product_Category PC ON P.productId = PC.productId '
				      + 'JOIN Categories C ON PC.categoryId = C.categoryId '
					  + 'WHERE C.categoryName = (?) '
					  + 'OR C.parentId = (SELECT categoryId FROM Categories WHERE categoryname = (?));';
		const result = await connection.execute(query, [req.params.id, req.params.id]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Category > Product not found');
			
		} else {
			connection.release();
			
			const product = result[0].map(row => new Product(
				row.productId,
				row.productName,
				row.description,
				row.price,
				row.stock,
				addHour(row.created_at)
				));
			return product;

		}

	} catch (error) {
		logger.error(`getCategoryItemById :::: ` + error);
		throw new Error('CategoryName > Product not found');
	}
};

export const getCategoryItemBySubId = async (req) => {
	try {

		const connection = await connectionPool.getConnection();
		const query = 'SELECT P.* '
					  + 'from Products P '
					  + 'JOIN Product_Category PC ON P.productId = PC.productId '
				      + 'JOIN Categories C ON PC.categoryId = C.categoryId '
					  + 'WHERE C.parentId = (SELECT categoryId FROM Categories WHERE categoryName = (?)) '
					  + 'AND C.categoryName = (?)';
		const result = await connection.execute(query, [req.params.id, req.params.subId]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Category not found');
			
		} else {
			connection.release();
			
			const product = result[0].map(row => new Product(
				row.productId,
				row.productName,
				row.description,
				row.price,
				row.stock,
				addHour(row.created_at)
				));
			return product[0];
		}

	} catch (error) {
		logger.error(`getCategoryItemBySubId :::: ` + error);
		throw new Error('CategorySubClass > Product not found');
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