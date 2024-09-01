import express from 'express';
import { getPayment, getPayments, addPayment, editPayment, removePayment} from '../controllers/paymentController.js';

const router = express.Router();


router.get('/:id',getPayment);
router.get('/',getPayments);

router.post('/',addPayment);

router.put('/:id',editPayment);

router.delete('/:id',removePayment);




export default router;
