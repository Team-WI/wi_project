import logger from '../../../utils/logger.js';
import connectionPool from '../../../dbconfig/spmallDBC.js';
import { addHour } from '../../../utils/myUtil.js';
import jwtProvider from '../../../class/jwtProvider.js';
import dotenv from 'dotenv';

dotenv.config();

export const getReviewById = async (req) => {

	const jwtprovider = new jwtProvider();
	jwtprovider.verifyAccessToken(req);

	try {

		const connection = await connectionPool.getConnection();
		const query = 'SELECT r.*, p.productName, pi.image_large, pi.image_medium, pi.image_small '
						+ 'FROM Reviews r '
						+ 'JOIN Products p ON p.productId = r.productId '
						+ 'LEFT JOIN ProductImages pi ON pi.productId = p.productId '
						+ 'WHERE r.reviewId = (?);';

		const result = await connection.execute(query, [req.params.id]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Review not found');
			
		} else {
			connection.release();
			
				
			let reviewArr = [];
			
			//2024-09-21 이미지 추가
			for (const row in result[0]) {
				const review = {

					'reviewId' : result[0][row].reviewId,
					'productId' : result[0][row].productId,
					'userId' : result[0][row].userId,
					'rating' : result[0][row].rating,
					'comment' : result[0][row].comment,
					'reviewDate' : addHour(result[0][row].reviewDate),
					'helpCount' : result[0][row].helpCount,
					'noHelpCount' : result[0][row].noHelpCount,
					'productName' : result[0][row].productName,
					'image_small' : result[0][row].image_small,
					'image_medium' : result[0][row].image_medium,
					'image_large' : result[0][row].image_large
				};
				reviewArr.push(review);
			}
			return reviewArr;

		}

	} catch (error) {
		logger.error(`getReviewById :::: ` + error);
		throw new Error('Review not found');
	}
};


export const createReview = async (req) => {

	const jwtprovider = new jwtProvider();
	jwtprovider.verifyAccessToken(req);

	try {
		
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

	const jwtprovider = new jwtProvider();
	jwtprovider.verifyAccessToken(req);

	try {

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