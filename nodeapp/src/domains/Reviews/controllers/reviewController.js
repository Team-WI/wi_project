import { getReviewById, createReview, updateReview, deleteReview } from '../services/reviewService.js';
import response from '../../../class/response.js';
import HttpStatus from '../../../constants/HttpStatus.js';
import logger from '../../../utils/logger.js';


export const getReview = async (req,res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called getReview`);
	        const review = await getReviewById(req);
			console.log(review);
	        res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: Review Are Found', review ));
	} catch (error){
		if (error.status === 401) {
			res.status(HttpStatus.UNAUTHORIZED.code)
				.send(new response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Error: User Not Found', error ));		
		} else {
	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: Review Not Found', {error : error.massage} ));		
		}
	}
};

export const addReview = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called addReview`);
		const newReview = await createReview(req);
		console.log(newReview);
	    res.status(HttpStatus.CREATED.code)
			.send(new response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, 'Completed: Review are Created', newReview ));
	} catch (error) {
		if (error.status === 401) {
			res.status(HttpStatus.UNAUTHORIZED.code)
				.send(new response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Error: User Not Found', error ));		
		} else {		res.status(HttpStatus.BAD_REQUEST.code)
			.send(new response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, 'Error: BAD_REQUEST', {error : error.massage} ));		
		}	
	}
};

export const editReview = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called editReview`);
		const updatedReview = await updateReview(req);
		res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: Review are updated', updatedReview ));
			
	} catch (error) {
		if (error.status === 401) {
			res.status(HttpStatus.UNAUTHORIZED.code)
				.send(new response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Error: User Not Found', error ));		
		} else {	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: Review Not Found', {error : error.massage} ));		
		}	
	}
};

export const removeReview = async (req, res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called removeReview`);
		const deletedReview = await deleteReview(req);
		res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Completed: Review are removed', deletedReview ));
	} catch (error) {
		if (error.status === 401) {
			res.status(HttpStatus.UNAUTHORIZED.code)
				.send(new response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Error: User Not Found', error ));		
		} else {	    res.status(HttpStatus.NOT_FOUND.code)
			.send(new response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Error: Review Not Found', {error : error.massage} ));
		}
	}
};