import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import passport from "passport";
import { googleCallback } from "../controllers/auth.controller.js";
import { registerValidation } from "../validators/auth.validator.js";
import { validate } from "../middlewares/validation.middleware.js";
import { verifyEmail } from "../controllers/auth.controller.js";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account and send a verification email.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Hiam Mostafa
 *               email:
 *                 type: string
 *                 example: hiam@gmail.com
 *               password:
 *                 type: string
 *                 example: Password123
 *               role:
 *                 type: string
 *                 enum:
 *                   - user
 *                   - organizer
 *                 example: user
 *     responses:
 *       201:
 *         description: Registration successful.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Registration successful. Please verify your email.
 *       400:
 *         description: Invalid data or email already exists.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Email already exists
 *       403:
 *         description: Cannot register as admin.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Cannot register as admin
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Internal server error
 */
router.post(
  "/register",
  registerValidation,
  validate,
  register
);
/**
 * @swagger
 * /api/auth/verify/{token}:
 *   get:
 *     summary: Verify user email
 *     description: Verify a user's email using the verification token.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Email verified successfully
 *       400:
 *         description: Invalid verification token.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Invalid token
 */
router.get(
  "/verify/:token",
  verifyEmail
);
/**
 * @swagger
 * /api/auth/verify/{token}:
 *   get:
 *     summary: Verify user email
 *     description: Verify a user's email using the verification token.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Email verified successfully
 *       400:
 *         description: Invalid verification token.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Invalid token
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Login with Google
 *     description: Redirect the user to Google OAuth authentication.
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirect to Google authentication.
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     description: Handle Google's callback and return the authenticated user with a JWT token.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Google login successful.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               token: jwt_token_here
 *               user:
 *                 _id: 6860c0c2d7d5d56f9a123456
 *                 name: Hiam Mostafa
 *                 email: hiam@gmail.com
 *                 role: user
 *       401:
 *         description: Authentication failed.
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  googleCallback
);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Send password reset email
 *     description: Generate a reset token and send a password reset email.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: hiam@gmail.com
 *     responses:
 *       200:
 *         description: Password reset email sent successfully.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Password reset email sent
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User not found
 *       500:
 *         description: Internal server error.
 */
router.post("/forgot-password", forgotPassword);

/**
 * @swagger
 * /api/auth/reset-password/{token}:
 *   post:
 *     summary: Reset password
 *     description: Reset the user's password using the reset token.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 example: NewPassword123
 *     responses:
 *       200:
 *         description: Password reset successful.
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Password reset successful
 *       400:
 *         description: Invalid or expired token.
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Invalid or expired token
 *       500:
 *         description: Internal server error.
 */
router.post("/reset-password/:token", resetPassword);

export default router;
