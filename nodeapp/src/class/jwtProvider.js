import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class jwtProvider {

	constructor(payload ='',  expiresIn = '1h', secretKey = process.env.JWT_SECRET_KEY, algorithm = 'HS256'){
		this.payload = payload;
		this.expiresIn = expiresIn;
		this.secretKey = secretKey;
		this.algorithm = algorithm;
	}
	
	
	setPayload(payload){
		this.payload = payload;
	}
	
	setAlgorithm(algorithm){
		this.algorithm = algorithm;
	}
	
	setExpiresIn(expiresIn){
		this.expiresIn = expiresIn;
	}
		
	getPayload(payload){
		return this.payload;
	}
	
	toString(){
		console.log(this.payload, '::', this.expiresIn, '::', this.algorithm);
	}
	
	
	// 토큰 발급
	// 로그인 성공한 사용자에게 토큰을 최초 발급
	issueFirstToken(){

		// ex) jwt.sign({id: result[0][0].loginId}, process.env.JWT_SECRET_KEY, {algorithm: 'HS256', expiresIn: '1h'});	
		const token = jwt.sign(this.payload, this.secretKey, {algorithm: this.algorithm, expiresIn: this.expiresIn});

		return token;
	}
	
	
	// 토큰 재발급
	reIssueAccessToken(refreshToken){
		
		
		try {
			if(verifyToken(refreshToken)){
			
			}

		
		} catch (err) {
			throw new Error('refreshToken is expired');
		}
		
	}
	
	// 토큰 검증
	verifyToken(token){
		
		try {
			const verify = jwt.verify(token, this.secretKey, { algorithms: [this.algorithm] });
			console.log('verify ::', verify);
			return verify;
			
        } catch (err) {
            throw new Error('Token is invalid');
        }
	}
	
	
}

export default jwtProvider;