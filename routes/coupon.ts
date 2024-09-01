import express from 'express';
import couponController from '../controllers/coupon.js';

const couponRouter = express.Router();

couponRouter.get('/', couponController.getAllCoupons);
couponRouter.get('/:id', couponController.getCoupon);
couponRouter.post('/', couponController.createCoupon);
couponRouter.put('/:id', couponController.updateCoupon);
couponRouter.delete('/:id', couponController.deleteCoupon);

export default couponRouter;