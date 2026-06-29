import express from "express";

import {
  createCoupon,
  getCoupons,
  deleteCoupon,
} from "../controllers/coupon.controller.js";

import {
  protect,
  authorize,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(
  protect,
  authorize("admin")
);

/**
 * @swagger
 * /api/coupons:
 *   post:
 *     tags: [Coupons]
 *     summary: Create a new coupon
 *     description: Create a new discount coupon (Admin only).
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - discount
 *               - expiresAt
 *             properties:
 *               code:
 *                 type: string
 *                 example: SUMMER20
 *               discount:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 100
 *                 example: 20
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-12-31T23:59:59.000Z"
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Coupon created successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Coupon created successfully
 *               coupon:
 *                 _id: 6860d5f0a123456789abcd12
 *                 code: SUMMER20
 *                 discount: 20
 *                 isActive: true
 *       400:
 *         description: Invalid coupon data.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Coupon code already exists
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Not authorized
 *       403:
 *         description: Admin access required.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Access denied
 *       500:
 *         description: Internal server error.
 */
router.post("/", createCoupon);

/**
 * @swagger
 * /api/coupons:
 *   get:
 *     tags: [Coupons]
 *     summary: Get all coupons
 *     description: Retrieve all available coupons (Admin only).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Coupons retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               coupons:
 *                 - _id: 6860d5f0a123456789abcd12
 *                   code: SUMMER20
 *                   discount: 20
 *                   isActive: true
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Not authorized
 *       403:
 *         description: Admin access required.
 *       500:
 *         description: Internal server error.
 */
router.get("/", getCoupons);

/**
 * @swagger
 * /api/coupons/{id}:
 *   delete:
 *     tags: [Coupons]
 *     summary: Delete coupon
 *     description: Delete a coupon by its ID (Admin only).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coupon deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Coupon deleted successfully
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Admin access required.
 *       404:
 *         description: Coupon not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Coupon not found
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", deleteCoupon);

export default router;
