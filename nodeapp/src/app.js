import express from 'express';
import cors from 'cors';
import path from 'path';
import * as url from 'url';
import cookieParser from 'cookie-Parser';
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

import userRoutes from './domains/Users/routes/userRoutes.js';
import productRoutes from './domains/Products/routes/productRoutes.js';
import orderRoutes from './domains/Orders/routes/orderRoutes.js';
import shippingRoutes from './domains/Shipping/routes/shippingRoutes.js';
import productInquiryRoutes from './domains/ProductInquiries/routes/productInquiryRoutes.js';
import reviewRoutes from './domains/Reviews/routes/reviewRoutes.js';
import categoryRoutes from './domains/Categories/routes/categoryRoutes.js';
import boardRoutes from './domains/Boards/routes/boardRoutes.js';
import paymentRoutes from './domains/Payments/routes/paymentRoutes.js';

const app = express();

let corsOptions = {
  origin: "*"
}
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// body-parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// JWT
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // HTTPS에서는 true로 설정
}));



// Set filePath
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

//app.use('요청 경로', express.static('실제 경로'));
app.use('/', express.static(path.join(__dirname, 'public/build')));
//app.use('/assets', express.static(path.join(__dirname, '/public/build/assets')));



// 테이블 route 작성
app.use('/api/users/', userRoutes);
app.use('/api/products/', productRoutes);
app.use('/api/orders/', orderRoutes);
app.use('/api/shippings/', shippingRoutes);
app.use('/api/reviews/', reviewRoutes);
app.use('/api/productInquiries/', productInquiryRoutes);
app.use('/api/categories/', categoryRoutes);
app.use('/api/boards/', boardRoutes);
app.use('/api/payments/', paymentRoutes);



app.get('/', (req, res) => {
  res.sendFile("index.html");
});


app.get("/review", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/html", "/review_modify.html"));
});


export default app;