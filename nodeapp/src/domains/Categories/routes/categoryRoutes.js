import express from 'express';
import { getCategoryItem, getCategoryItemSubClass, addCategory, editCategory, removeCategory } from '../controllers/categoryController.js';

const router = express.Router();


router.get('/:id', getCategoryItem);
router.get('/:id/:subId', getCategoryItemSubClass);

router.post('/',addCategory);

router.put('/:id',editCategory);

router.delete('/:id',removeCategory);




export default router;
