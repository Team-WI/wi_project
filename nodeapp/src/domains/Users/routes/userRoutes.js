import express from 'express';
import { getUser, addUser, editUser, removeUser, loginRequest, checkId, checkEmail } from '../controllers/userController.js';

const router = express.Router();


router.get('/:id',getUser);

router.post('/',addUser);
router.post('/login',loginRequest);
router.post('/checkId',checkId);
router.post('/checkEmail',checkEmail);


router.put('/:id',editUser);

router.delete('/:id',removeUser);




export default router;
