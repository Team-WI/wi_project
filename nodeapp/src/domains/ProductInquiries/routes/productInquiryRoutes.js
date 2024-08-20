import express from 'express';
import { getProductInquiry, getProductInquiries, addProductInquiry, editProductInquiry, removeProductInquiry } from '../controllers/productInquiryController.js';

const router = express.Router();


router.get('/:id', getProductInquiry);
router.get('/', getProductInquiries);

router.post('/', addProductInquiry);

router.put('/:id', editProductInquiry);

router.delete('/:id', removeProductInquiry);


export default router;
