import logger from '../../../utils/logger.js';
import jwtProvider from '../../../class/jwtProvider.js';
import response from '../../../class/response.js';
import dotenv from 'dotenv';

dotenv.config();


export const validateRefreshToken = async (req) => {

	const jwtprovider = new jwtProvider('1m', '3d');
	const refreshToken = req.cookies.refreshToken;
	const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	try {
	
		const decoded_refesh = jwtprovider.verifyToken(refreshToken, 'refresh');
		
		if (clientIp === decoded_refesh.clientIp){
			const newAccessToken = jwtprovider.issueToken({'loginid': decoded_refesh.loginid, 'clientIp': decoded_refesh.clientIp}, 'access');
			return newAccessToken;
		} else {
			const error = new Error('IP Not validate');
			error.status = 401;
			throw error;
		}
		
	} catch (error){
		logger.error(`validateRefreshToken :::: ` + error);
		throw error;
	}
};

