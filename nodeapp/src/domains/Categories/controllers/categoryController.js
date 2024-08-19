import { getCategoryById, createCategory, updateCategory, deleteCategory } from '../services/categoryService.js';
import response from '../../../class/response.js';
import HttpStatus from '../../../constants/HttpStatus.js';
import logger from '../../../utils/logger.js';


export const getCategory = async (req,res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called getCategory`);
	        const category = await getCategoryById(req);
			console.log(category);
	        res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: Category Are Found', category ));
	} catch (error){
		console.log(error);
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: Category Not Found', {error : error.massage} ));		
	}
};

export const addCategory = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called addCategory`);
		const newCategory = await createCategory(req);
		console.log(newCategory);
	    res.status(HttpStatus.CREATED.code)
			.send(new response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'Completed: Category are Created', newCategory ));
	} catch (error) {
		res.status(HttpStatus.BAD_REQUEST.code)
			.send(new response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Error: BAD_REQUEST', {error : error.massage} ));		
	}	
};

export const editCategory = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called editCategory`);
		const updatedCategory = await updateCategory(req);
		res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: Category are updated', updatedCategory ));
			
	} catch (error) {
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: Category Not Found', {error : error.massage} ));		
	}	
	
};

export const removeCategory = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called removeCategory`);
		const deletedCategory = await deleteCategory(req);
		res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: Category are removed', deletedCategory ));
	} catch (error) {
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: Category Not Found', {error : error.massage} ));
	}
};