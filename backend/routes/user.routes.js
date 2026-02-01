import { Router } from 'express'
import { deleteUser, getuserlisting, test, updateUser ,getUser} from '../controllers/user.controll.js'
import { verifyToken } from '../utils/veryfyToken.js';

const router = Router();

router.get('/',test)

router.put('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)
router.get('/listing/:id',verifyToken,getuserlisting)
router.get('/:id',verifyToken,getUser)



export default router;



