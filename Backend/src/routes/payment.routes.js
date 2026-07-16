import express from "express";

import {
 payBooking
} from "../controllers/payment.controller.js";


const router = express.Router();


/**
 * @swagger
 * /api/payment/pay:
 *   post:
 *     summary: Pay booking
 *     tags:
 *       - Payment
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentRequest'
 *
 *     responses:
 *       200:
 *         description: Payment successful
 *
 *       404:
 *         description: Booking not found
 *
 *       500:
 *         description: Server error
 */


router.post(
 "/pay",
 payBooking
);



export default router;