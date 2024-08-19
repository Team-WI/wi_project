import express from 'express';
import { getShipping, addShipping, editShipping, removeShipping } from '../controllers/shippingController.js';

const router = express.Router();

router.get('/:id',getShipping);

router.post('/',addShipping);

router.put('/:id',editShipping);

router.delete('/:id',removeShipping);



export default router;
