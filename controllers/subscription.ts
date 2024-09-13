import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export default {
  getAllSubscriptionPlans: async (req: Request, res: Response) => {
    try {
      const subscriptionPlans = await prisma.subscriptionPlan.findMany();
      res.json(subscriptionPlans);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching subscription plans' });
    }
  },

  getSubscriptionPlan: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const subscriptionPlan = await prisma.subscriptionPlan.findUnique({
        where: { id: parseInt(id, 10) },
      });
      if (!subscriptionPlan) {
        return res.status(404).json({ error: 'Subscription plan not found' });
      }
      res.json(subscriptionPlan);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching subscription plan' });
    }
  },

  createSubscriptionPlan: async (req: Request, res: Response) => {
    const { planName, planCost } = req.body;
    try {
      const subscriptionPlan = await prisma.subscriptionPlan.create({
        data: {
          planName,
          planCost,
        },
      });
      res.status(201).json(subscriptionPlan);
    } catch (error) {
      res.status(500).json({ error: 'Error creating subscription plan' });
    }
  },

  updateSubscriptionPlan: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { planName, planCost, features } = req.body;
    try {
      const subscriptionPlan = await prisma.subscriptionPlan.update({
        where: { id: parseInt(id, 10) },
        data: {
          planName,
          planCost,
          // features,
        },
      });
      res.json(subscriptionPlan);
    } catch (error) {
      res.status(500).json({ error: 'Error updating subscription plan' });
    }
  },

  deleteSubscriptionPlan: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prisma.subscriptionPlan.delete({
        where: { id: parseInt(id, 10) },
      });
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Error deleting subscription plan' });
    }
  },
};