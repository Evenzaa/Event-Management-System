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
 *     description: Book one or more ticket types (General / VIP) in a single booking.
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
 *               - tickets
 *             properties:
 *               eventId:
 *                 type: string
 *                 example: 685a7d4d0a123456789abcd1
 *               tickets:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - ticketType
 *                     - quantity
 *                   properties:
 *                     ticketType:
 *                       type: string
 *                       enum:
 *                         - general
 *                         - vip
 *                       example: general
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *               couponCode:
 *                 type: string
 *                 example: SUMMER20
 *               paymentMethod:
 *                 type: string
 *                 enum:
 *                   - card
 *                 example: card
 *     responses:
 *       201:
 *         description: Booking created successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Booking created successfully
 *               data:
 *                 _id: 6860d5f0a123456789abcd12
 *                 eventId: 685a7d4d0a123456789abcd1
 *                 tickets:
 *                   - ticketType: general
 *                     quantity: 2
 *                     price: 300
 *                     subtotal: 600
 *                   - ticketType: vip
 *                     quantity: 1
 *                     price: 700
 *                     subtotal: 700
 *                 totalPrice: 1300
 *                 paymentStatus: pending
 *                 status: confirmed
 *       400:
 *         description: Invalid request, invalid coupon or not enough seats.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Event not found.
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
 *               count: 1
 *               data:
 *                 - _id: 6860d5f0a123456789abcd12
 *                   tickets:
 *                     - ticketType: general
 *                       quantity: 2
 *                       price: 300
 *                       subtotal: 600
 *                     - ticketType: vip
 *                       quantity: 1
 *                       price: 700
 *                       subtotal: 700
 *                   totalPrice: 1300
 *                   status: confirmed
 *       401:
 *         description: Unauthorized.
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
 *       404:
 *         description: Booking not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  "/:id",
  protect,
  cancelBooking
);

export default router;
