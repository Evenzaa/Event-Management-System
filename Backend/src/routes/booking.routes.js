import express from "express";
import {
  createBooking,
  getMyBookings,
  cancelBooking,
} from "../controllers/booking.controller.js";

import {
  protect,
  authorize,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     tags: [Bookings]
 *     summary: Create a new booking
 *     description: Create a booking for an event with optional coupon and payment method.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *               - quantity
 *             properties:
 *               eventId:
 *                 type: string
 *                 example: 685a7d4d0a123456789abcd1
 *               quantity:
 *                 type: integer
 *                 example: 2
 *               couponCode:
 *                 type: string
 *                 example: SUMMER20
 *               paymentMethod:
 *                 type: string
 *                 example: card
 *     responses:
 *       201:
 *         description: Booking created successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Booking created successfully
 *               booking:
 *                 _id: 6860d5f0a123456789abcd12
 *                 quantity: 2
 *                 totalPrice: 500
 *                 status: confirmed
 *       400:
 *         description: Invalid coupon or not enough available seats.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Not enough available seats
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Not authorized
 *       404:
 *         description: Event not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Event not found
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/",
  protect,
  authorize("user", "organizer", "admin"),
  createBooking
);

/**
 * @swagger
 * /api/bookings/my:
 *   get:
 *     tags: [Bookings]
 *     summary: Get current user bookings
 *     description: Retrieve all bookings for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Bookings retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               bookings:
 *                 - _id: 6860d5f0a123456789abcd12
 *                   quantity: 2
 *                   status: confirmed
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Not authorized
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/my",
  protect,
  getMyBookings
);

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     tags: [Bookings]
 *     summary: Cancel booking
 *     description: Cancel an existing booking by its ID.
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
 *         description: Booking cancelled successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Booking cancelled successfully
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Not authorized
 *       404:
 *         description: Booking not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Booking not found
 *       500:
 *         description: Internal server error.
 */
router.delete(
  "/:id",
  protect,
  cancelBooking
);

export default router;
