import { getBoardById, getBoardAll, createBoard, updateBoard, deleteBoard } from '../services/boardService.js';
import response from '../../../class/response.js';
import HttpStatus from '../../../constants/HttpStatus.js';
import logger from '../../../utils/logger.js';


export const getBoard = async (req,res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called getBoard`);
	        const board = await getBoardById(req);
			console.log(board);
	        res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: Board Are Found', board ));
	} catch (error){
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: Board Not Found', {error : error.massage} ));
	}
};


export const getBoards = async (req,res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called getBoard`);
	        const board = await getBoardAll();
			console.log(board);
	        res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: Board Are Found', board ));
	} catch (error){
		if (error.status === 401) {
			res.status(HttpStatus.UNAUTHORIZED.code)
				.send(new response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Error: User Not Found', error ));		
		} else {		console.log(error);
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: Board Not Found', {error : error.massage} ));		
		}	
	}
};

export const addBoard = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called addBoard`);
		const newBoard = await createBoard(req);
		console.log(newBoard);
	    res.status(HttpStatus.CREATED.code)
			.send(new response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'Completed: Board are Created', newBoard ));
	} catch (error) {
		if (error.status === 401) {
			res.status(HttpStatus.UNAUTHORIZED.code)
				.send(new response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Error: User Not Found', error ));		
		} else {		res.status(HttpStatus.BAD_REQUEST.code)
			.send(new response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Error: BAD_REQUEST', {error : error.massage} ));		
		}	
	}
};

export const editBoard = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called editBoard`);
		const updatedBoard = await updateBoard(req);
		res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: Board are updated', updatedBoard ));
			
	} catch (error) {
		if (error.status === 401) {
			res.status(HttpStatus.UNAUTHORIZED.code)
				.send(new response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Error: User Not Found', error ));		
		} else {	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: Board Not Found', {error : error.massage} ));		
		}	
	}
};

export const removeBoard = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called removeBoard`);
		const deletedBoard = await deleteBoard(req);
		res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: Board are removed', deletedBoard ));
	} catch (error) {
		if (error.status === 401) {
			res.status(HttpStatus.UNAUTHORIZED.code)
				.send(new response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Error: User Not Found', error ));		
		} else {	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: Board Not Found', {error : error.massage} ));
		}
	}
};