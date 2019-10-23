import { Router } from 'express';
import SearchController from '../controllers/SearchController';

const router = Router();

const { customSearch } = SearchController;

router.get('/', customSearch);

export default router;
