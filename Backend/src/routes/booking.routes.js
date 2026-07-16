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
 *           example:
 *             eventId: 685a7d4d0a123456789abcd1
 *             tickets:
 *               - ticketType: general
 *                 quantity: 2
 *               - ticketType: vip
 *                 quantity: 1
 *             couponCode: SUMMER20
 *             paymentMethod: card
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
 *                 userId: 685a7d4d0a123456789abcd2
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
 *                 couponCode: SUMMER20
 *                 paymentMethod: card
 *                 paymentStatus: pending
 *                 ticketNumber: TKT-1753456789012
 *                 qrCode: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
 *                 status: confirmed
 *                 createdAt: "2026-07-16T18:30:00.000Z"
 *                 updatedAt: "2026-07-16T18:30:00.000Z"
 *       400:
 *         description: Invalid request, invalid coupon, invalid ticket type or not enough seats.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Not enough vip seats
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
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
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
 *                   userId: 685a7d4d0a123456789abcd2
 *                   eventId:
 *                     _id: 685a7d4d0a123456789abcd1
 *                     title: Music Event
 *                     location: Cairo
 *                     date: "2026-08-01T18:00:00.000Z"
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
 *                   couponCode: SUMMER20
 *                   paymentMethod: card
 *                   paymentStatus: pending
 *                   ticketNumber: TKT-1753456789012
 *                   qrCode: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
 *                   status: confirmed
 *                   createdAt: "2026-07-16T18:30:00.000Z"
 *                   updatedAt: "2026-07-16T18:30:00.000Z"
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Not authorized
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal Server Error
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
