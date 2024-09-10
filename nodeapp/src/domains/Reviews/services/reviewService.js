import logger from '../../../utils/logger.js';
import connectionPool from '../../../dbconfig/spmallDBC.js';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import Review from '../models/reviewModel.js';
import response from '../../../class/response.js';
import jwtProvider from '../../../class/jwtProvider.js';
import dotenv from 'dotenv';

dotenv.config();

export const getReviewById = async (req) => {
	try {
		
		const jwtprovider = new jwtProvider();
		jwtprovider.verifyAccessToken(req);
		
		const connection = await connectionPool.getConnection();
		const query = 'SELECT * from Reviews where reviewId = ?;';
		const result = await connection.execute(query, [req.params.id]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Review not found');
			
		} else {
			connection.release();
			
			const review = result[0].map(row => new Review(
				row.reviewId,
				row.productId,
				row.userId,
				row.rating,
				row.comment,
				row.reviewDate,
				row.helpCount,
				row.noHelpCount
				));
			return review[0];
		}

	} catch (error) {
		logger.error(`getReviewById :::: ` + error);
		throw new Error('Review not found');
	}
};


export const createReview = async (req) => {
	try {
		
		const jwtprovider = new jwtProvider();
		jwtprovider.verifyAccessToken(req);
	
		const connection = await connectionPool.getConnection();
		const query = 'INSERT INTO Reviews (productId, userId, rating, comment, helpCount, noHelpCount) VALUES (?,?,?,?,?,?)';
		const result = await connection.execute(query, [req.body.productId, req.body.userId, req.body.rating, req.body.comment, 0, 0]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Review not found');
		} else {
			connection.release();
			return result[0];
		}
		
	} catch (error) {
		logger.error(`createReview :::: ` + error);
		throw new Error('Review can\'t create');
	}
};

export const updateReview = async (req) => {
	try {

		const jwtprovider = new jwtProvider();
		jwtprovider.verifyAccessToken(req);
		
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
		const query = 'UPDATE Reviews SET ' 
						+ querySetData
						+ ' where reviewId = (?)';
		console.log(query);

		const result = await connection.execute(query, [req.params.id]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Review not found');
		} else {
			connection.release();
			return result[0];
		}


	} catch (error) {
		logger.error(`updateReview :::: ` + error);
		throw new Error('Review can\'t update');
	}
};

export const deleteReview = async (req) => {
	try {
		
		const jwtprovider = new jwtProvider();
		jwtprovider.verifyAccessToken(req);
		
		const connection = await connectionPool.getConnection();
		const query = 'DELETE FROM Reviews where reviewId = (?)';
		const result = await connection.execute(query, [req.params.id]);
	
		if(result[0].length === 0) {
			connection.release();
			throw new Error('Review not found');
		} else {
			connection.release();
			return result[0];
		}
	
	} catch {
		logger.error(`deleteReview :::: ` + error);
		throw new Error('Review can\'t delete');
	}
};