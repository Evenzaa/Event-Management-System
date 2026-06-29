import express from "express";

import {
  userDashboard,
  organizerDashboard,
  adminDashboard,
} from "../controllers/dashboard.controller.js";

import {
  protect,
  authorize,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/dashboards/user:
 *   get:
 *     tags: [Dashboard]
 *     summary: Get user dashboard statistics
 *     description: Retrieve dashboard statistics for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User dashboard retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               dashboard:
 *                 totalBookings: 8
 *                 upcomingEvents: 3
 *                 cancelledBookings: 1
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Not authorized
 *       403:
 *         description: Access denied.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Access denied
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/user",
  protect,
  authorize("user", "organizer", "admin"),
  userDashboard
);

/**
 * @swagger
 * /api/dashboards/organizer:
 *   get:
 *     tags: [Dashboard]
 *     summary: Get organizer dashboard statistics
 *     description: Retrieve organizer statistics such as events, bookings, and revenue.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Organizer dashboard retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               dashboard:
 *                 totalEvents: 12
 *                 totalBookings: 145
 *                 totalRevenue: 27500
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Organizer access required.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Access denied
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/organizer",
  protect,
  authorize("organizer"),
  organizerDashboard
);

/**
 * @swagger
 * /api/dashboards/admin:
 *   get:
 *     tags: [Dashboard]
 *     summary: Get admin dashboard statistics
 *     description: Retrieve overall platform statistics for administrators.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               dashboard:
 *                 totalUsers: 250
 *                 totalOrganizers: 18
 *                 totalEvents: 94
 *                 totalBookings: 1360
 *                 totalRevenue: 185000
 *       401:
 *         description: Unauthorized.
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
router.get(
  "/admin",
  protect,
  authorize("admin"),
  adminDashboard
);

export default router;
