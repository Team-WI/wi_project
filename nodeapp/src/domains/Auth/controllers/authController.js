import { validateRefreshToken } from '../services/authService.js';
import response from '../../../class/response.js';
import HttpStatus from '../../../constants/HttpStatus.js';
import logger from '../../../utils/logger.js';


export const requestJwtRefreshToken = async (req,res) => {
	try {
		logger.info(`${req.method} ${req.originalUrl}, Called requestJwtRefreshToken`);
	        const newAccessToken = await validateRefreshToken(req);
			
			res.cookie('accessToken', newAccessToken, {
				httpOnly: true,   // 자바스크립트에서 쿠키 접근 불가
				secure: true,     // HTTPS 연결에서만 전송
				sameSite: 'Strict', // CSRF 방어
				maxAge: 3600000
			});
			
	        res.status(HttpStatus.OK.code)
			.send(new response(HttpStatus.OK.code, HttpStatus.OK.status, 'Token is authorized'));
			
	} catch (error){
		console.log(error);
	    res.status(HttpStatus.UNAUTHORIZED.code)
			.send(new response(HttpStatus.UNAUTHORIZED.code, HttpStatus.UNAUTHORIZED.status, 'Error: UNAUTHORIZED TOKEN', {error : error.massage} ));		
	}
};