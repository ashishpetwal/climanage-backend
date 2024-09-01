import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export default {
  getAllMemberships: async (req: Request, res: Response) => {
    try {
      const memberships = await prisma.membership.findMany({
        include: {
          entity: true,
          subscriptionPlan: true,
        },
      });
      res.json(memberships);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching memberships' });
    }
  },

  getMembership: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const membership = await prisma.membership.findUnique({
        where: { id: parseInt(id, 10) },
        include: {
          entity: true,
          subscriptionPlan: true,
        },
      });
      if (!membership) {
        return res.status(404).json({ error: 'Membership not found' });
      }
      res.json(membership);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching membership' });
    }
  },

  createMembership: async (req: Request, res: Response) => {
    const { entityId, subscriptionPlanId, startDate, endDate } = req.body;
    try {
      const membership = await prisma.membership.create({
        data: {
          entityId,
          subscriptionPlanId,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        },
      });
      res.status(201).json(membership);
    } catch (error) {
      res.status(500).json({ error: 'Error creating membership' });
    }
  },

  updateMembership: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { entityId, subscriptionPlanId, startDate, endDate } = req.body;
    try {
      const membership = await prisma.membership.update({
        where: { id: parseInt(id, 10) },
        data: {
          entityId,
          subscriptionPlanId,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        },
      });
      res.json(membership);
    } catch (error) {
      res.status(500).json({ error: 'Error updating membership' });
    }
  },

  deleteMembership: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prisma.membership.delete({
        where: { id: parseInt(id, 10) },
      });
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Error deleting membership' });
    }
  },
};