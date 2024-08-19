import express from 'express';
import { getCategory, addCategory, editCategory, removeCategory } from '../controllers/categoryController.js';

const router = express.Router();


router.get('/:id',getCategory);

router.post('/',addCategory);

router.put('/:id',editCategory);

router.delete('/:id',removeCategory);




export default router;
