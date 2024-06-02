import express from 'express'
import {test} from '../controllers/user.controller'

const router = express.Router();

router.get('/', test)

export default router;