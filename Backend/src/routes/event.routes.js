import express from "express";

import {
  createEvent,
  getEvents,
  getEventById,
  getFeaturedEvents,
  toggleFeaturedEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";

import {
  protect,
  authorize,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/events:
 *   post:
 *     tags: [Events]
 *     summary: Create a new event
 *     description: Create a new event (Organizer/Admin only).
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - date
 *               - location
 *               - price
 *               - capacity
 *             properties:
 *               title:
 *                 type: string
 *                 example: Tech Conference 2026
 *               description:
 *                 type: string
 *                 example: Annual technology conference
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-12-01T10:00:00.000Z"
 *               location:
 *                 type: string
 *                 example: Cairo
 *               price:
 *                 type: number
 *                 example: 250
 *               capacity:
 *                 type: integer
 *                 example: 100
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - https://example.com/image1.jpg
 *                   - https://example.com/image2.jpg
 *               category:
 *                 type: string
 *                 example: Technology
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - tech
 *                   - conference
 *     responses:
 *       201:
 *         description: Event created successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Event created successfully
 *               event:
 *                 _id: 6860d5f0a123456789abcd12
 *                 title: Tech Conference 2026
 *                 status: pending
 *       400:
 *         description: Invalid request data.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Access denied.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/",
  protect,
  authorize("organizer", "admin"),
  createEvent
);

/**
 * @swagger
 * /api/events:
 *   get:
 *     tags: [Events]
 *     summary: Get all events
 *     description: Retrieve all available events.
 *     responses:
 *       200:
 *         description: Events retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               events:
 *                 - _id: 6860d5f0a123456789abcd12
 *                   title: Tech Conference 2026
 *                   location: Cairo
 *                   price: 250
 *       500:
 *         description: Internal server error.
 */
router.get("/", getEvents);

/**
 * @swagger
 * /api/events/featured:
 *   get:
 *     tags: [Events]
 *     summary: Get featured events
 *     description: Retrieve all featured events.
 *     responses:
 *       200:
 *         description: Featured events retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               events:
 *                 - title: AI Summit
 *                   featured: true
 *       500:
 *         description: Internal server error.
 */
router.get("/featured", getFeaturedEvents);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     tags: [Events]
 *     summary: Get event by ID
 *     description: Retrieve details of a specific event.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               event:
 *                 _id: 6860d5f0a123456789abcd12
 *                 title: Tech Conference 2026
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
router.get("/:id", getEventById);

/**
 * @swagger
 * /api/events/{id}/featured:
 *   put:
 *     tags: [Events]
 *     summary: Toggle featured event
 *     description: Mark or unmark an event as featured (Admin only).
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
 *         description: Featured status updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Featured status updated
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Admin access required.
 *       404:
 *         description: Event not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/:id/featured",
  protect,
  authorize("admin"),
  toggleFeaturedEvent
);

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     tags: [Events]
 *     summary: Update event
 *     description: Update an existing event (Organizer/Admin only).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               price:
 *                 type: number
 *               capacity:
 *                 type: integer
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               category:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Event updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Event updated successfully
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Access denied.
 *       404:
 *         description: Event not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/:id",
  protect,
  authorize("organizer", "admin"),
  updateEvent
);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     tags: [Events]
 *     summary: Delete event
 *     description: Delete an event (Organizer/Admin only).
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
 *         description: Event deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Event deleted successfully
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Access denied.
 *       404:
 *         description: Event not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  "/:id",
  protect,
  authorize("organizer", "admin"),
  deleteEvent
);

export default router;
