import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

  
const defaultSecretKey = process.env.SIGNED_FILE_URL_SECRET_KEY;
const defaultUri = '/home/ubuntu/srv/wi_file_server';
const defaultExpireTime = 3600;


class SignedUrl {

  constructor(expireTime=defaultExpireTime, uri=defaultUri, secretKey=defaultSecretKey){
    this.expireTime = expireTime;
		this.uri = uri;
		this.secretKey = secretKey;
  }

  generateSignedUrl(inputUri) {

      const expires = Math.floor(Date.now() / 1000) + this.expireTime;
      
      const uri = '/files/' + inputUri;
      // Secure link 전달 파라미터: "expires + uri + " " +  secret_key"
      //const secureLink = `${expires}${uri} ${this.secretKey}`;
      const secureLink = `${uri} ${this.secretKey}`;
      // MD5 해시 생성
      const hash = crypto.createHash('md5').update(secureLink).digest('hex');

      // 서명된 URL 생성
      //const signedUrl = `${uri}?st=${hash}&expires=${this.expireTime}`;
      const signedUrl = `${uri}?st=${hash}`;

      return signedUrl;
  }

}

export default SignedUrl;
