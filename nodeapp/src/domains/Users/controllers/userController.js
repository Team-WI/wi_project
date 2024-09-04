import { getUserById, createUser, updateUser, deleteUser, login, checkDuplicate } from '../services/userService.js';
import response from '../../../class/response.js';
import HttpStatus from '../../../constants/HttpStatus.js';
import logger from '../../../utils/logger.js';


export const getUser = async (req,res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called getUser`);
	        const user = await getUserById(req);
			console.log(user);
	        res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: User Are Found', user ));
	} catch (error){
		console.log(error);
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: User Not Found', {error : error.massage} ));		
	}
};

export const addUser = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called addUser`);
		const newUser = await createUser(req.body);
		console.log(newUser);
	    res.status(HttpStatus.CREATED.code)
			.send(new response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'Completed: User are Created', newUser ));
	} catch (error) {
		res.status(HttpStatus.BAD_REQUEST.code)
			.send(new response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Error: BAD_REQUEST', {error : error.massage} ));		
	}	
};

export const editUser = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called editUser`);
		const updatedUser = await updateUser(req);
		res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: User are updated', updatedUser ));
			
	} catch (error) {
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: User Not Found', {error : error.massage} ));		
	}	
	
};

export const removeUser = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called removeUser`);
		const deletedUser = await deleteUser(req.params.id);
		res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: User are removed', deletedUser ));
	} catch (error) {
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: User Not Found', {error : error.massage} ));
	}
};


export const loginRequest = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called User loginRequest`);
		const token = await login(req);
		console.log('Issued login AccessToken ::::',token.accessToken);
		console.log('Issued login refreshToken ::::',token.refreshToken);
					
		res.cookie('accessToken', token.accessToken, { httpOnly: true, secure: false });
		req.session.refreshToken = token.refreshToken;
		
		console.log('done');
		
		res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: User are verified', token));
	} catch(error) {
	    res.status(HttpStatus.UNAUTHORIZED.code)
			.send(new response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Error: Login Fail', {error : error.massage} ));
	}
};


export const checkId = async (req,res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called getUser`);
	        const check_Duplicate = await checkDuplicate(req);
			console.log('check_Duplicate :::: ', check_Duplicate);
	        res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: User table Inquery Done', check_Duplicate ));
	} catch (error){
		console.log(error);
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: User Not Found', {error : error.massage} ));		
	}
};


export const checkEmail = async (req,res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called getUser`);
	        const check_Duplicate = await checkDuplicate(req);
			console.log('check_Duplicate :::: ', check_Duplicate);
	        res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: User table Inquery Done', check_Duplicate ));
	} catch (error){
		console.log(error);
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: User Not Found', {error : error.massage} ));		
	}
};
