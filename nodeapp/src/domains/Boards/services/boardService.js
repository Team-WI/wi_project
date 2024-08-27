import logger from '../../../utils/logger.js';
import connectionPool from '../../../dbconfig/spmallDBC.js';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import Board from '../models/boardModel.js';
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