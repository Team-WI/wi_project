import express from 'express';
import { getBoard, getBoards, addBoard, editBoard, removeBoard} from '../controllers/boardController.js';

const router = express.Router();


router.get('/:id',getBoard);
router.get('/',getBoards);

router.post('/',addBoard);

router.put('/:id',editBoard);

router.delete('/:id',removeBoard);




export default router;
