import express from 'express';
import { getUser, addUser, editUser, removeUser, loginRequest } from '../controllers/userController.js';

const router = express.Router();


router.get('/:id',getUser);

router.post('/',addUser);
router.post('/login',loginRequest);

router.put('/:id',editUser);

router.delete('/:id',removeUser);




export default router;
