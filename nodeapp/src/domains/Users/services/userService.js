import logger from '../../../utils/logger.js';
import connectionPool from '../../../dbconfig/spmallDBC.js';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import response from '../../../class/response.js';
import jwtProvider from '../../../class/jwtProvider.js';
import dotenv from 'dotenv';

dotenv.config();



export const getUserById = async (req) => {
	try {
		
		/* check Token */
			/*
	    const token = req.headers['authorization'];
		const jwtprovider = new jwtProvider();
		
		console.log('Income Token :: ', token);
		if (!token) {
			throw new Error('Token not Found');
		}
		
		try {
			const decoded = jwtprovider.verifyToken(token);
			console.log('decoded ::',decoded);
		} catch (err) {
			throw new Error('Invalid Token');
		}
	*/
	
		const connection = await connectionPool.getConnection();
		const query = 'SELECT * from Users where loginId = ?;';
		const result = await connection.execute(query, [req.params.id]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('User not found');
			
		} else {
			connection.release();
			
			const user = result[0].map(row => new User(
				row.userId,
				row.loginId,
				row.email,
				row.name,
				row.email,
				row.phone,
				row.status,
				row.gender,
				row.grade,
				row.created_at,
				row.pw_updated_at			
				));
			return user[0];
		}

	} catch (error) {
		logger.error(`getUserById :::: ` + error);
		throw new Error('User not found');
	}
};


export const createUser = async (userData) => {
	try {
	
		// bcrypt를 이용하여유저PW hash 변환
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(userData.password, salt);

		const connection = await connectionPool.getConnection();
		const query = 'INSERT INTO Users (loginId, password, name , email, phone) VALUES (?,?,?,?,?)';
		const result = await connection.execute(query, [userData.loginId, hash, userData.name, userData.email, userData.phone]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('User not found');
		} else {
			connection.release();
			return result[0];
		}
		
	} catch (error) {
		logger.error(`createUser :::: ` + error);
	}
};

export const updateUser = async (req) => {
	try {
		
		/* check Token */
		/*
	    const token = req.headers['authorization'];
		
		const jwtprovider = new jwtProvider();
		
		
		console.log('Income Token :: ', token);
		if (!token) {
			throw new Error('Token not Found');
		}
		
		try {
			const decoded = jwtprovider.verifyToken(token);
			res.json({ message: 'Token valid', user: decoded });
		} catch (err) {
			throw new Error('Invalid Token');
		}
		*/
		
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
		const query = 'UPDATE Users SET ' 
						+ querySetData
						+ ' where userId = (?)';
		console.log(query);

		const result = await connection.execute(query, [req.params.id]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('User not found');
		} else {
			connection.release();
			return result[0];
		}


	} catch (error) {
		logger.error(`updateUser :::: ` + error);
		throw error
	}
};

export const deleteUser = async (userId) => {
	try {
    
		const connection = await connectionPool.getConnection();
		const query = 'DELETE FROM Users where userId = (?)';
		const result = await connection.execute(query, [userId]);
	
		if(result[0].length === 0) {
			connection.release();
			throw new Error('User not found');
		} else {
			connection.release();
			return result[0];
		}
	
	} catch {
		logger.error(`deleteUser :::: ` + error);
	}
};

export const login = async (req) => {
	try {

		// 비밀번호 조회
		const connection = await connectionPool.getConnection();
		const query = 'SELECT * from Users where loginId = (?);';
		const result = await connection.execute(query, [req.body.id]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('User not found');
			
		} else {
			connection.release();
		}

		// 비밀번호 확인	  
		const isPasswordCorrect = await bcrypt.compare(
			  req.body.password,
			  result[0][0].password
		);


		// 토큰 발급
		if(isPasswordCorrect){
				const jwtprovider = new jwtProvider({id: result[0][0].loginId}, '1h');
				console.log('Object JWTProvider ::::');
				jwtprovider.toString();
				
				const accessToken = jwtprovider.issueToken();
				console.log(accessToken);

				jwtprovider.setExpiresIn('2h');
				const refreshToken = jwtprovider.issueToken();
				
				console.log(refreshToken);
				
			//return {'accessToken':accessToken, 'refreshToken':refreshToken};
			//return {'accessToken':accessToken };
			return accessToken;
		} else {
			throw new Error('jwtProvider False');
		}
	
  }catch {
    logger.error(`fetching login :::: ` + error);
	throw new Error('fetching login False');
  }
};


export const checkDuplicate = async (req) => {
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
		const query = 'SELECT * FROM Users where ' + querySetData;
		console.log(query);

		const result = await connection.execute(query);

		if(result[0].length === 0) {
			connection.release();
			return {'checkDuplicate' : 'NotDuplicated'};
		} else {
			connection.release();
			return {'checkDuplicate' : 'Duplicated'};
		}


	} catch (error) {
		logger.error(`checkDuplicate :::: ` + error);
		throw new Error('checkDuplicate False');
	}
};
