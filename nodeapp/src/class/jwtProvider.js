import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
	
const JWT_ACC_SECRET_KEY = process.env.JWT_ACC_SECRET_KEY;
const JWT_REF_SECRET_KEY = process.env.JWT_REF_SECRET_KEY;
	
class jwtProvider {

	constructor(accessExpiresIn = '30m', refreshExpiresIn='1d'){
		this.accessExpiresIn = accessExpiresIn;
		this.refreshExpiresIn = refreshExpiresIn;
		this.accessSecretKey = JWT_ACC_SECRET_KEY;
		this.refreshSecretKey = JWT_REF_SECRET_KEY;
		this.algorithm = 'HS256';
	}
	
	setAccessExpiresIn(accessExpiresIn){
		this.accessExpiresIn = accessExpiresIn;
	}
	
	setRefreshExpiresIn(refreshExpiresIn){
		this.refreshExpiresIn = refreshExpiresIn;
	}
	
	setAlgorithm(algorithm){
		this.algorithm = algorithm;
	}
	
	// 토큰 발급 access / refresh
	issueToken(payload, tokenType='access'){
	
		if (tokenType == 'access'){
			return jwt.sign(payload, this.accessSecretKey, {algorithm: this.algorithm, expiresIn: this.accessExpiresIn});
		} else if (tokenType == 'refresh') {
			return jwt.sign(payload, this.refreshSecretKey, {algorithm: this.algorithm, expiresIn: this.refreshExpiresIn});
		} else {
			throw new Error("Need token Type");
		}

	}
	
	// 토큰 검증
	verifyToken(token, tokenType){
		try {
			if (tokenType == 'access'){
				return jwt.verify(token, this.accessSecretKey);
			} else if (tokenType == 'refresh') {
				return jwt.verify(token, this.refreshSecretKey);
			} else {
				throw new Error("Need token Type");
			}
			
        } catch (err) {
            throw new Error('Token is invalid ::::', err);
        }
	}
	
	// 토큰 재발급
	reIssueAccessToken(refreshToken){
		
		try {
			const decoded = this.verifyToken(refreshToken, 'refresh');

			if (decoded) {
				return this.issueToken({ 'loginId' : decoded.loginId}, 'access');
			} 
		
		} catch (err) {
			throw new Error('refreshToken is expired ::::', err);
		}
		
	}	
	
	verifyAccessToken(req){
		
		const accessToken = req.cookies.accessToken;
		console.log('Income accessToken :: ', accessToken);
	
		if (!accessToken) {
			const err = new Error('AccessToken not Found');
			err.status = 401;
			throw err;
		}
		
		try {
			const decoded = this.verifyToken(accessToken, 'access');
			console.log('decoded ::',decoded);
		} catch (err) {
			err = new Error('AccessToken Expired');
			err.status = 401;
			throw err;
		}
	}
	
	
	
	
	
}

export default jwtProvider;