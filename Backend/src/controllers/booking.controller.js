import Booking from "../models/Booking.js";
import Event from "../models/Event.js";
import Coupon from "../models/Coupon.js";
import QRCode from "qrcode";
import { sendEmail } from "../utils/sendEmail.js";

export const createBooking = async (req, res, next) => {
  try {
    const {
      eventId,
      tickets,
      couponCode,
      paymentMethod,
    } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    if (!tickets || !Array.isArray(tickets) || tickets.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Tickets are required",
      });
    }

    let bookingTickets = [];
    let totalPrice = 0;

    for (const item of tickets) {
      const { ticketType, quantity } = item;

      if (!["general", "vip"].includes(ticketType)) {
        return res.status(400).json({
          success: false,
          message: `Invalid ticket type: ${ticketType}`,
        });
      }

      const eventTicket = event.ticketTypes[ticketType];

      if (!eventTicket) {
        return res.status(400).json({
          success: false,
          message: `${ticketType} ticket not found`,
        });
      }

      if (eventTicket.availableSeats < quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough ${ticketType} seats`,
        });
      }

      const subtotal = eventTicket.price * quantity;
      totalPrice += subtotal;

      bookingTickets.push({
        ticketType,
        quantity,
        price: eventTicket.price,
        subtotal,
      });
    }

    let appliedCoupon = null;

    if (couponCode) {
      appliedCoupon = await Coupon.findOne({
        code: couponCode.toUpperCase(),
        isActive: true,
        expiresAt: { $gt: new Date() },
      });

      if (!appliedCoupon) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired coupon",
        });
      }

      totalPrice -=
        (totalPrice * appliedCoupon.discount) / 100;
    }

    for (const item of tickets) {
      event.ticketTypes[item.ticketType].availableSeats -= item.quantity;
    }

    await event.save();

    const ticketNumber = `TKT-${Date.now()}`;
    const qrCode = await QRCode.toDataURL(ticketNumber);

    const booking = await Booking.create({
      userId: req.user.id,
      eventId,
      tickets: bookingTickets,
      totalPrice,
      couponCode: appliedCoupon
        ? appliedCoupon.code
        : null,
      paymentMethod: paymentMethod || "card",
      paymentStatus: "pending",
      ticketNumber,
      qrCode,
    });

    if (req.user.email) {
      let ticketDetails = bookingTickets
        .map(
          (t) =>
            `${t.ticketType.toUpperCase()} x${t.quantity} = ${t.subtotal}`
        )
        .join("\n");

      await sendEmail(
        req.user.email,
        "Booking Confirmation",
        `Your booking has been confirmed.

Ticket Number: ${ticketNumber}

Tickets:
${ticketDetails}

Total Price: ${totalPrice}`
      );
    }

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({
      userId: req.user.id,
    }).populate("eventId");

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (
      booking.userId.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const event = await Event.findById(booking.eventId);

    if (event) {
      for (const item of booking.tickets) {
        event.ticketTypes[item.ticketType].availableSeats += item.quantity;
      }

      await event.save();
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    next(error);
  }
};
