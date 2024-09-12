import express from 'express';
import { addShoppingCart, editShoppingCart, getShoppingCart, removeShoppingCart} from '../controllers/shoppingCartController.js';

const router = express.Router();


router.get('/:id', getShoppingCart);

router.post('/', addShoppingCart);

router.put('/:id', editShoppingCart);

router.delete('/:id', removeShoppingCart);




export default router;
