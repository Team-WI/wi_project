import express from 'express';
import { getOrder, addOrder, editOrder, removeOrder, getOrderShipping } from '../controllers/orderController.js';

const router = express.Router();

router.get('/:id',getOrder);

router.post('/',addOrder);
router.get('/shippingList/',getOrderShipping);

router.put('/:id',editOrder);

router.delete('/:id',removeOrder);



export default router;
