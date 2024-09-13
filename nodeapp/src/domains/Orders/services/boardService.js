import logger from '../../../utils/logger.js';
import { addHour } from '../../../utils/myUtil.js';
import connectionPool from '../../../dbconfig/spmallDBC.js';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import Board from '../models/boardModel.js';
import response from '../../../class/response.js';
import jwtProvider from '../../../class/jwtProvider.js';
import dotenv from 'dotenv';

dotenv.config();

export const getBoardById = async (req) => {
	try {
		
		const connection = await connectionPool.getConnection();
		const query = 'SELECT * from Boards where boardId = ?;';
		const result = await connection.execute(query, [req.params.id]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Board not found');
			
		} else {
			connection.release();
			
			const board = result[0].map(row => new Board(
				row.boardId,
				row.administratorsId,
				row.inquiryCategory,
				addHour(row.inquiryDate),
				row.inquiryContent
				));
			return board[0];
		}

	} catch (error) {
		logger.error(`getBoardById :::: ` + error);
		throw new Error('Board not found');
	}
};


export const getBoardAll = async () => {
	try {	
			
		const connection = await connectionPool.getConnection();
		const query = 'SELECT * from Boards;';
		const result = await connection.execute(query);

		console.log('result ::::', result)

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Boards not found');
			
		} else {
			connection.release();
			
			const board = result[0].map(row => new Board(
				row.boardId,
				row.administratorsId,
				row.inquiryCategory,
				addHour(row.inquiryDate),
				row.inquiryContent
				));
			return board;
		}

	} catch (error) {
		logger.error(`getBoardAll :::: ` + error);
		throw new Error('Board not found');
	}
};




export const createBoard = async (req) => {
	try {
	
		const connection = await connectionPool.getConnection();
		const query = 'INSERT INTO Boards (administratorsId, inquiryCategory, inquiryContent) VALUES (?,?,?)';
		const result = await connection.execute(query, [req.body.administratorsId, req.body.inquiryCategory, req.body.inquiryContent]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Board not found');
		} else {
			connection.release();
			return result[0];
		}
		
	} catch (error) {
		logger.error(`createBoard :::: ` + error);
		throw new Error('Board can\'t create');
	}
};

export const updateBoard = async (req) => {
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
		const query = 'UPDATE Boards SET ' 
						+ querySetData
						+ ' where boardId = (?)';
		console.log(query);

		const result = await connection.execute(query, [req.params.id]);

		if(result[0].length === 0) {
			connection.release();
			throw new Error('Board not found');
		} else {
			connection.release();
			return result[0];
		}


	} catch (error) {
		logger.error(`updateBoard :::: ` + error);
		throw new Error('Board can\'t update');
	}
};

export const deleteBoard = async (req) => {
	try {
		const connection = await connectionPool.getConnection();
		const query = 'DELETE FROM Boards where boardId = (?)';
		const result = await connection.execute(query, [req.params.id]);
	
		if(result[0].length === 0) {
			connection.release();
			throw new Error('Board not found');
		} else {
			connection.release();
			return result[0];
		}
	
	} catch {
		logger.error(`deleteBoard :::: ` + error);
		throw new Error('Board can\'t delete');
	}
};