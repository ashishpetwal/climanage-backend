import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { Request, Response } from 'express';

export default {
  getAllCoupons: async (req: Request, res: Response) => {
    try {
      const coupons = await prisma.couponCode.findMany({
      });
      res.json(coupons);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching coupons' });
    }
  },

  getCoupon: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const coupon = await prisma.couponCode.findUnique({
        where: { id: parseInt(id, 10) },
      });
      if (!coupon) {
        return res.status(404).json({ error: 'Coupon not found' });
      }
      res.json(coupon);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching coupon' });
    }
  },

  createCoupon: async (req: Request, res: Response) => {
    const { couponName, expiryDate, startDate, status, validForPlanId } = req.body;
    try {
      const coupon = await prisma.couponCode.create({
        data: {
          couponName,
          startDate: new Date(startDate),
          expiryDate: new Date(expiryDate),
          status,
          validForPlanId,
        },
      });
      res.status(201).json(coupon);
    } catch (error) {
      res.status(500).json({ error: 'Error creating coupon' });
    }
  },

  updateCoupon: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { couponName, expiryDate, startDate, status, validForPlanId } = req.body;
    try {
      const coupon = await prisma.couponCode.update({
        where: { id: parseInt(id, 10) },
        data: {
          couponName,
          status,
          startDate: new Date(startDate),
          expiryDate: new Date(expiryDate),
          validForPlanId,
        },
      });
      res.json(coupon);
    } catch (error) {
      res.status(500).json({ error: 'Error updating coupon' });
    }
  },

  deleteCoupon: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prisma.couponCode.delete({
        where: { id: parseInt(id, 10) },
      });
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Error deleting coupon' });
    }
  },
};