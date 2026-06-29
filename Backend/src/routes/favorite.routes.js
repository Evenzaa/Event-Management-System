import express from "express";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/favorite.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/favorites/{eventId}:
 *   post:
 *     tags: [Favorites]
 *     summary: Add event to favorites
 *     description: Add an event to the authenticated user's favorites list.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event added to favorites successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Event added to favorites
 *       400:
 *         description: Event is already in favorites.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Event already in favorites
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
  "/:eventId",
  protect,
  addFavorite
);

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     tags: [Favorites]
 *     summary: Get user favorite events
 *     description: Retrieve all favorite events for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Favorites retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               favorites:
 *                 - _id: 6860d5f0a123456789abcd12
 *                   title: Tech Conference 2026
 *                   location: Cairo
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
  "/",
  protect,
  getFavorites
);

/**
 * @swagger
 * /api/favorites/{eventId}:
 *   delete:
 *     tags: [Favorites]
 *     summary: Remove event from favorites
 *     description: Remove an event from the authenticated user's favorites.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event removed from favorites successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Event removed from favorites
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Not authorized
 *       404:
 *         description: Favorite or event not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Favorite not found
 *       500:
 *         description: Internal server error.
 */
router.delete(
  "/:eventId",
  protect,
  removeFavorite
);

export default router;
