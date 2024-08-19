import express from 'express';
import { getReview, addReview, editReview, removeReview} from '../controllers/reviewController.js';

const router = express.Router();


router.get('/:id',getReview);

router.post('/',addReview);

router.put('/:id',editReview);

router.delete('/:id',removeReview);




export default router;
