import express from 'express';
import getAll from './getAll';
import add from './add';
import search from './search';

const router = express.Router();

router.use('/', getAll);
router.use('/add', add);
router.use('/search', search);

export default router;