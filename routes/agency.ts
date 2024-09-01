import express from 'express';
const agencyRouter = express.Router();
import agencyController from '../controllers/agency.js';

agencyRouter.get('/get-all', agencyController.getAll);

agencyRouter.post('/add', agencyController.add)

agencyRouter.get('/get-one/:id', agencyController.getOne);

agencyRouter.put('/update/:id', agencyController.update);

agencyRouter.delete('/delete/:id', agencyController.delete);

export default agencyRouter;