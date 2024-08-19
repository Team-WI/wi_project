import express from 'express';
import { getProductInquiry, addProductInquiry, editProductInquiry, removeProductInquiry } from '../controllers/productInquiryController.js';

const router = express.Router();


router.get('/:id', getProductInquiry);

router.post('/', addProductInquiry);

router.put('/:id', editProductInquiry);

router.delete('/:id', removeProductInquiry);


export default router;
