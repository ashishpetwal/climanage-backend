import express from 'express';
import membershipController from '../controllers/membership.js';

const membershipRouter = express.Router();

membershipRouter.get('/', membershipController.getAllMemberships);
membershipRouter.get('/:id', membershipController.getMembership);
membershipRouter.post('/', membershipController.createMembership);
membershipRouter.put('/:id', membershipController.updateMembership);
membershipRouter.delete('/:id', membershipController.deleteMembership);

export default membershipRouter;