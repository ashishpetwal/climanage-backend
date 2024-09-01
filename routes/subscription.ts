import express from 'express';
import subscriptionController from '../controllers/subscription.js';

const subscriptionRouter = express.Router();

subscriptionRouter.get('/', subscriptionController.getAllSubscriptionPlans);
subscriptionRouter.get('/:id', subscriptionController.getSubscriptionPlan);
subscriptionRouter.post('/', subscriptionController.createSubscriptionPlan);
subscriptionRouter.put('/:id', subscriptionController.updateSubscriptionPlan);
subscriptionRouter.delete('/:id', subscriptionController.deleteSubscriptionPlan);

export default subscriptionRouter;